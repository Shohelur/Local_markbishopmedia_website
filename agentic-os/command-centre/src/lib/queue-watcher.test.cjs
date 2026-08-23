const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

const cronRuntime = require("./cron-runtime.js");

const queueWatcherSourcePath = path.resolve(__dirname, "queue-watcher.ts");

class LocalProfileLockedError extends Error {}
class LocalProfileRequestError extends Error {}

function makeTempWorkspace() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "command-centre-queue-watcher-"));
}

function cleanupTempWorkspace(workspaceDir) {
  fs.rmSync(workspaceDir, { recursive: true, force: true });
}

function insertQueuedTask(db, id) {
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO tasks (
      id, title, description, status, level, parentId, columnOrder, createdAt, updatedAt,
      costUsd, tokensUsed, durationMs, activityLabel, errorMessage, startedAt, completedAt,
      clientId, needsInput, phaseNumber, gsdStep, cronJobSlug, permissionMode
    ) VALUES (?, ?, ?, 'queued', 'task', NULL, 0, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'default')`
  ).run(id, id, "Queue watcher profile recovery test", now, now);
}

function loadQueueWatcherModule(stubs = {}) {
  const source = fs.readFileSync(queueWatcherSourcePath, "utf-8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });

  const module = { exports: {} };
  const localRequire = (request) => {
    if (Object.prototype.hasOwnProperty.call(stubs, request)) {
      return stubs[request];
    }

    if (request === "./subprocess") {
      return { killProcessTreeByPid: () => {} };
    }

    if (request === "./cron-runtime.js") {
      return cronRuntime;
    }

    if (request === "./local-profile") {
      return { LocalProfileLockedError };
    }

    if (request === "./local-profile-lifecycle") {
      return {
        LocalProfileRequestError,
        assertLocalProfileActive: () => {},
        getLocalProfileRuntimeSession: (profile) => ({
          version: 1,
          profileKey: profile.profileKey,
          sessionId: "test-session",
          state: "active",
        }),
      };
    }

    if (request.startsWith("./") || request.startsWith("../")) {
      return require(path.resolve(path.dirname(queueWatcherSourcePath), request));
    }

    return require(request);
  };

  const compiled = new Function("require", "module", "exports", "__dirname", "__filename", outputText);
  compiled(localRequire, module, module.exports, path.dirname(queueWatcherSourcePath), queueWatcherSourcePath);
  return module.exports;
}

test("initQueueWatcher skips queued cron tasks when the daemon is already the leader", async () => {
  const workspaceDir = makeTempWorkspace();
  const db = cronRuntime.getDb(workspaceDir);
  const cronExecuteCalls = [];
  const processExecuteCalls = [];
  const listeners = [];
  const originalSetInterval = global.setInterval;

  try {
    global.setInterval = () => ({ unref() {} });

    const { initQueueWatcher } = loadQueueWatcherModule({
      "./db": { getDb: () => db },
      "./event-bus": {
        emitTaskEvent: () => {},
        onTaskEvent: (listener) => {
          listeners.push(listener);
        },
      },
      "./process-manager": {
        processManager: {
          executeTask: async (taskId) => {
            processExecuteCalls.push(taskId);
          },
          hasActiveSession: () => false,
        },
      },
      "./config": {
        getConfig: () => ({ agenticOsDir: workspaceDir }),
      },
      "./cron-runtime.js": {
        executeCronTask: async (agenticOsDir, taskId) => {
          cronExecuteCalls.push({ agenticOsDir, taskId });
        },
        buildRecoveredCronRunUpdate: cronRuntime.buildRecoveredCronRunUpdate,
      },
      "./cron-system-status": {
        getCronSystemStatus: () => ({ runtime: "daemon" }),
      },
      "./cron-scheduler": {
        getInProcessCronRuntimeIdentifier: () => "in-process-test",
      },
    });

    initQueueWatcher();
    assert.equal(listeners.length, 1);

    listeners[0]({
      type: "task:status",
      timestamp: new Date().toISOString(),
      task: {
        id: "task-daemon-skip",
        status: "queued",
        cronJobSlug: "test-job",
      },
    });

    await Promise.resolve();

    assert.deepEqual(cronExecuteCalls, []);
    assert.deepEqual(processExecuteCalls, []);
  } finally {
    global.setInterval = originalSetInterval;
    db.close();
    cleanupTempWorkspace(workspaceDir);
  }
});

test("initQueueWatcher routes queued cron tasks through cronRuntime exactly once when task:created and task:status both arrive", async () => {
  const workspaceDir = makeTempWorkspace();
  const db = cronRuntime.getDb(workspaceDir);
  const listeners = [];
  const cronExecuteCalls = [];
  const processExecuteCalls = [];
  let resolveCronExecution;
  const cronExecution = new Promise((resolve) => {
    resolveCronExecution = resolve;
  });
  const originalSetInterval = global.setInterval;

  try {
    global.setInterval = () => ({ unref() {} });

    const { initQueueWatcher } = loadQueueWatcherModule({
      "./db": { getDb: () => db },
      "./event-bus": {
        emitTaskEvent: () => {},
        onTaskEvent: (listener) => {
          listeners.push(listener);
        },
      },
      "./process-manager": {
        processManager: {
          executeTask: async (taskId) => {
            processExecuteCalls.push(taskId);
          },
          hasActiveSession: () => false,
        },
      },
      "./config": {
        getConfig: () => ({ agenticOsDir: workspaceDir }),
      },
      "./cron-runtime.js": {
        executeCronTask: async (agenticOsDir, taskId) => {
          cronExecuteCalls.push({ agenticOsDir, taskId });
          return cronExecution;
        },
        buildRecoveredCronRunUpdate: cronRuntime.buildRecoveredCronRunUpdate,
      },
      "./cron-system-status": {
        getCronSystemStatus: () => ({ runtime: "in-process" }),
      },
      "./cron-scheduler": {
        getInProcessCronRuntimeIdentifier: () => "in-process-test",
      },
    });

    initQueueWatcher();
    assert.equal(listeners.length, 1);

    const queuedTaskEvent = {
      timestamp: new Date().toISOString(),
      task: {
        id: "task-double-event",
        status: "queued",
        cronJobSlug: "test-job",
      },
    };

    listeners[0]({ type: "task:created", ...queuedTaskEvent });
    listeners[0]({ type: "task:status", ...queuedTaskEvent });

    await Promise.resolve();

    assert.deepEqual(cronExecuteCalls, [
      { agenticOsDir: workspaceDir, taskId: "task-double-event" },
    ]);
    assert.deepEqual(processExecuteCalls, []);
    resolveCronExecution();
  } finally {
    global.setInterval = originalSetInterval;
    db.close();
    cleanupTempWorkspace(workspaceDir);
  }
});

test("initQueueWatcher does not execute a restored task updated in review", async () => {
  const workspaceDir = makeTempWorkspace();
  const db = cronRuntime.getDb(workspaceDir);
  const listeners = [];
  const executeCalls = [];
  const originalSetInterval = global.setInterval;

  try {
    global.setInterval = () => ({ unref() {} });

    const { initQueueWatcher } = loadQueueWatcherModule({
      "./db": { getDb: () => db },
      "./event-bus": {
        emitTaskEvent: () => {},
        onTaskEvent: (listener) => listeners.push(listener),
      },
      "./process-manager": {
        processManager: {
          executeTask: async (taskId) => executeCalls.push(taskId),
          hasActiveSession: () => false,
        },
      },
      "./config": { getConfig: () => ({ agenticOsDir: workspaceDir }) },
      "./cron-system-status": { getCronSystemStatus: () => ({ runtime: "in-process" }) },
      "./cron-scheduler": { getInProcessCronRuntimeIdentifier: () => "in-process-test" },
    });

    initQueueWatcher();
    assert.equal(listeners.length, 1);

    listeners[0]({
      type: "task:updated",
      timestamp: new Date().toISOString(),
      task: {
        id: "restored-review-task",
        status: "review",
        needsInput: true,
        claudeSessionId: "saved-session-id",
      },
    });
    await Promise.resolve();

    assert.deepEqual(executeCalls, []);

    listeners[0]({
      type: "task:updated",
      timestamp: new Date().toISOString(),
      task: { id: "ordinary-queued-task", status: "queued" },
    });
    await Promise.resolve();

    assert.deepEqual(executeCalls, ["ordinary-queued-task"]);
  } finally {
    global.setInterval = originalSetInterval;
    db.close();
    cleanupTempWorkspace(workspaceDir);
  }
});

test("initQueueWatcher periodic queued-cron scan reuses the same in-process cron guard", async () => {
  const workspaceDir = makeTempWorkspace();
  const db = cronRuntime.getDb(workspaceDir);
  const listeners = [];
  const cronExecuteCalls = [];
  const processExecuteCalls = [];
  let intervalCallback = null;
  let resolveCronExecution;
  const cronExecution = new Promise((resolve) => {
    resolveCronExecution = resolve;
  });
  const originalSetInterval = global.setInterval;

  try {
    global.setInterval = (callback) => {
      intervalCallback = callback;
      return { unref() {} };
    };

    const { initQueueWatcher } = loadQueueWatcherModule({
      "./db": { getDb: () => db },
      "./event-bus": {
        emitTaskEvent: () => {},
        onTaskEvent: (listener) => {
          listeners.push(listener);
        },
      },
      "./process-manager": {
        processManager: {
          executeTask: async (taskId) => {
            processExecuteCalls.push(taskId);
          },
          hasActiveSession: () => false,
        },
      },
      "./config": {
        getConfig: () => ({ agenticOsDir: workspaceDir }),
      },
      "./cron-runtime.js": {
        executeCronTask: async (agenticOsDir, taskId) => {
          cronExecuteCalls.push({ agenticOsDir, taskId });
          return cronExecution;
        },
        buildRecoveredCronRunUpdate: cronRuntime.buildRecoveredCronRunUpdate,
      },
      "./cron-system-status": {
        getCronSystemStatus: () => ({ runtime: "in-process" }),
      },
      "./cron-scheduler": {
        getInProcessCronRuntimeIdentifier: () => "in-process-test",
      },
    });

    initQueueWatcher();
    assert.equal(listeners.length, 1);
    assert.equal(typeof intervalCallback, "function");

    const now = new Date().toISOString();
    db.prepare(
      `INSERT INTO tasks (
        id, title, description, status, level, parentId, columnOrder, createdAt, updatedAt,
        costUsd, tokensUsed, durationMs, activityLabel, errorMessage, startedAt, completedAt,
        clientId, needsInput, phaseNumber, gsdStep, cronJobSlug, permissionMode
      ) VALUES (?, ?, ?, 'queued', 'task', NULL, 0, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, ?, 'default')`
    ).run(
      "task-periodic-cron",
      "Periodic queued cron",
      "Should only dispatch once while already starting.",
      now,
      now,
      "periodic-job"
    );

    intervalCallback();
    intervalCallback();

    await Promise.resolve();

    assert.deepEqual(cronExecuteCalls, [
      { agenticOsDir: workspaceDir, taskId: "task-periodic-cron" },
    ]);
    assert.deepEqual(processExecuteCalls, []);
    resolveCronExecution();
  } finally {
    global.setInterval = originalSetInterval;
    db.close();
    cleanupTempWorkspace(workspaceDir);
  }
});

test("initQueueWatcher records inferred recovery for terminal cron rows instead of success", async () => {
  const workspaceDir = makeTempWorkspace();
  const db = cronRuntime.getDb(workspaceDir);
  const listeners = [];
  const originalSetInterval = global.setInterval;
  const now = new Date().toISOString();
  const taskId = "task-recovery";
  const cronRunId = db
    .prepare(
      `INSERT INTO cron_runs (jobSlug, taskId, startedAt, result, trigger, clientId, scheduledFor)
       VALUES (?, ?, ?, 'running', 'scheduled', NULL, ?)
       RETURNING id`
    )
    .get("test-job", taskId, now, now).id;

  db.prepare(
    `INSERT INTO tasks (
      id, title, description, status, level, parentId, columnOrder, createdAt, updatedAt,
      costUsd, tokensUsed, durationMs, activityLabel, errorMessage, startedAt, completedAt,
      clientId, needsInput, phaseNumber, gsdStep, cronJobSlug, permissionMode
    ) VALUES (?, ?, ?, 'review', 'task', NULL, 0, ?, ?, ?, NULL, ?, ?, NULL, ?, NULL, NULL, 0, NULL, NULL, ?, 'default')`
  ).run(
    taskId,
    "Cron recovery test",
    "Repro for stuck input recovery",
    now,
    now,
    7.25,
    12_345,
    "Completed after restart",
    now,
    "test-job"
  );

  try {
    global.setInterval = () => ({ unref() {} });

    const { initQueueWatcher } = loadQueueWatcherModule({
      "./db": { getDb: () => db },
      "./event-bus": {
        emitTaskEvent: () => {},
        onTaskEvent: (listener) => {
          listeners.push(listener);
        },
      },
      "./process-manager": {
        processManager: {
          executeTask: async () => {},
          hasActiveSession: () => false,
        },
      },
      "./config": {
        getConfig: () => ({ agenticOsDir: workspaceDir }),
      },
      "./cron-system-status": {
        getCronSystemStatus: () => ({ runtime: "in-process" }),
      },
      "./cron-scheduler": {
        getInProcessCronRuntimeIdentifier: () => "in-process-test",
      },
    });

    initQueueWatcher();

    const cronRun = db
      .prepare("SELECT result, resultSource, completionReason, exitCode FROM cron_runs WHERE id = ?")
      .get(cronRunId);
    const task = db.prepare("SELECT status, needsInput FROM tasks WHERE id = ?").get(taskId);

    assert.equal(cronRun.result, "failure");
    assert.equal(cronRun.resultSource, "inferred");
    assert.equal(cronRun.completionReason, "recovered_from_terminal_task_state");
    assert.equal(cronRun.exitCode, 1);
    assert.equal(task.status, "review");
    assert.equal(task.needsInput, 0);
  } finally {
    global.setInterval = originalSetInterval;
    db.close();
    cleanupTempWorkspace(workspaceDir);
  }
});

test("initQueueWatcher quietly pauses, recovers each profile activation, and resumes work", async () => {
  const workspaceA = makeTempWorkspace();
  const workspaceB = makeTempWorkspace();
  const dbA = cronRuntime.getDb(workspaceA);
  const dbB = cronRuntime.getDb(workspaceB);
  const listeners = [];
  const executeCalls = [];
  const loggedErrors = [];
  const originalSetInterval = global.setInterval;
  const originalConsoleError = console.error;
  let reaper = null;
  let profileState = "locked";
  let currentProfileKey = "profile-a";
  let currentSessionId = "session-a-1";

  const profiles = {
    "profile-a": {
      version: 1,
      mode: "team",
      profileKey: "profile-a",
      dataDir: workspaceA,
      stateDir: workspaceA,
      tempDir: workspaceA,
      dbPath: path.join(workspaceA, "command-centre.db"),
    },
    "profile-b": {
      version: 1,
      mode: "team",
      profileKey: "profile-b",
      dataDir: workspaceB,
      stateDir: workspaceB,
      tempDir: workspaceB,
      dbPath: path.join(workspaceB, "command-centre.db"),
    },
  };

  try {
    global.setInterval = (callback) => {
      reaper = callback;
      return { unref() {} };
    };
    console.error = (...args) => loggedErrors.push(args);

    const { initQueueWatcher } = loadQueueWatcherModule({
      "./db": {
        getActiveLocalProfileDescriptor: () => {
          if (profileState === "locked") throw new LocalProfileLockedError("profile locked");
          return profiles[currentProfileKey];
        },
        getDb: () => currentProfileKey === "profile-a" ? dbA : dbB,
      },
      "./event-bus": {
        emitTaskEvent: () => {},
        onTaskEvent: (listener) => listeners.push(listener),
      },
      "./process-manager": {
        processManager: {
          executeTask: async (taskId) => executeCalls.push(taskId),
          hasActiveSession: () => false,
        },
      },
      "./config": { getConfig: () => ({ agenticOsDir: workspaceA }) },
      "./cron-system-status": { getCronSystemStatus: () => ({ runtime: "in-process" }) },
      "./cron-scheduler": { getInProcessCronRuntimeIdentifier: () => "in-process-test" },
      "./local-profile": { LocalProfileLockedError },
      "./local-profile-lifecycle": {
        LocalProfileRequestError,
        assertLocalProfileActive: () => {
          if (profileState === "closing") throw new LocalProfileRequestError("profile closing");
        },
        getLocalProfileRuntimeSession: (profile) => ({
          version: 1,
          profileKey: profile.profileKey,
          sessionId: currentSessionId,
          state: "active",
        }),
      },
    });

    initQueueWatcher();
    assert.equal(typeof reaper, "function");
    assert.equal(listeners.length, 1);
    reaper();
    reaper();
    listeners[0]({ type: "task:created", profileKey: "profile-a", task: { id: "locked-event", status: "queued" } });
    assert.deepEqual(executeCalls, []);
    assert.deepEqual(loggedErrors, []);

    insertQueuedTask(dbA, "orphan-a");
    profileState = "active";
    reaper();
    assert.equal(dbA.prepare("SELECT status FROM tasks WHERE id = ?").get("orphan-a").status, "review");
    listeners[0]({ type: "task:created", profileKey: "profile-a", task: { id: "fresh-a", status: "queued" } });
    await Promise.resolve();
    assert.deepEqual(executeCalls, ["fresh-a"]);

    insertQueuedTask(dbB, "orphan-b");
    insertQueuedTask(dbB, "before-recovery-b");
    currentProfileKey = "profile-b";
    currentSessionId = "session-b-1";
    listeners[0]({ type: "task:created", profileKey: "profile-b", task: { id: "before-recovery-b", status: "queued" } });
    assert.deepEqual(executeCalls, ["fresh-a", "before-recovery-b"]);
    assert.equal(dbB.prepare("SELECT status FROM tasks WHERE id = ?").get("orphan-b").status, "review");
    assert.equal(dbB.prepare("SELECT status FROM tasks WHERE id = ?").get("before-recovery-b").status, "queued");

    insertQueuedTask(dbB, "orphan-b-activation-2");
    insertQueuedTask(dbB, "before-reactivation");
    currentSessionId = "session-b-2";
    listeners[0]({ type: "task:created", profileKey: "profile-b", task: { id: "before-reactivation", status: "queued" } });
    assert.deepEqual(executeCalls, ["fresh-a", "before-recovery-b", "before-reactivation"]);
    assert.equal(
      dbB.prepare("SELECT status FROM tasks WHERE id = ?").get("orphan-b-activation-2").status,
      "review",
    );
    assert.equal(dbB.prepare("SELECT status FROM tasks WHERE id = ?").get("before-reactivation").status, "queued");

    profileState = "locked";
    reaper();
    insertQueuedTask(dbB, "orphan-b-after-lock");
    insertQueuedTask(dbB, "before-unlock-recovery");
    profileState = "active";
    listeners[0]({ type: "task:created", profileKey: "profile-b", task: { id: "before-unlock-recovery", status: "queued" } });
    assert.deepEqual(executeCalls, [
      "fresh-a",
      "before-recovery-b",
      "before-reactivation",
      "before-unlock-recovery",
    ]);
    assert.equal(
      dbB.prepare("SELECT status FROM tasks WHERE id = ?").get("orphan-b-after-lock").status,
      "review",
    );
    assert.equal(dbB.prepare("SELECT status FROM tasks WHERE id = ?").get("before-unlock-recovery").status, "queued");

    profileState = "closing";
    reaper();
    listeners[0]({ type: "task:created", profileKey: "profile-b", task: { id: "closing-event", status: "queued" } });
    assert.deepEqual(executeCalls, [
      "fresh-a",
      "before-recovery-b",
      "before-reactivation",
      "before-unlock-recovery",
    ]);
    assert.deepEqual(loggedErrors, []);
  } finally {
    global.setInterval = originalSetInterval;
    console.error = originalConsoleError;
    dbA.close();
    dbB.close();
    cleanupTempWorkspace(workspaceA);
    cleanupTempWorkspace(workspaceB);
  }
});
