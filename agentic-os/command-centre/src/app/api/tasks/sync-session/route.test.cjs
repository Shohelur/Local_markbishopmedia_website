const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const { loadTsModule } = require("../../../../lib/test-utils/load-ts-module.cjs");

function jsonRequest(body) {
  return new Request("http://localhost/api/tasks/sync-session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function createDbStub({ existing = null, recentRunning = null } = {}) {
  const runs = [];
  const events = [];
  const updatedTask = existing || recentRunning || {
    id: "task-existing",
    status: "running",
    needsInput: 0,
    clientId: null,
  };

  const db = {
    prepare(sql) {
      return {
        get(...args) {
          if (sql.includes("WHERE claudeSessionId = ?")) return existing;
          if (sql.includes("julianday(?) - julianday(startedAt)")) return recentRunning;
          if (sql.includes("SELECT COALESCE(MIN(columnOrder)")) return { minOrder: 1 };
          if (sql.includes("SELECT * FROM tasks WHERE id = ?")) {
            return {
              ...updatedTask,
              id: args[0],
              status: "running",
              needsInput: 0,
            };
          }
          throw new Error(`Unhandled get SQL: ${sql}`);
        },
        run(...args) {
          runs.push({ sql, args });
          return { changes: 1 };
        },
      };
    },
  };

  return { db, runs, events };
}

function loadRoute({ db, events }) {
  return loadTsModule(path.resolve(__dirname, "route.ts"), {
    stubs: {
      "@/lib/db": { getDb: () => db },
      "@/lib/event-bus": {
        emitTaskEvent: (event) => events.push(event),
      },
      "@/lib/config": {
        detectClientIdFromCwd: (cwd) =>
          typeof cwd === "string" && cwd.replace(/\\/g, "/").includes("/clients/acme")
            ? "acme"
            : null,
      },
      "@/lib/identity/work-scope": {
        assertNoWorkScopeInput() {},
        createSoloStoredWorkScope(clientId) {
          return { mode: "solo", version: 1, clientId: clientId ?? null };
        },
        isWorkScopeError() {
          return false;
        },
        readWorkScopeFromRow(row) {
          return row.workScope == null
            ? { mode: "solo", version: 1, clientId: row.clientId ?? null }
            : row.workScope;
        },
        serializeStoredWorkScope(scope) {
          return JSON.stringify(scope);
        },
        workScopeErrorBody(error) {
          return { code: error.code, error: error.message };
        },
      },
    },
  });
}

test("sync-session creates terminal tasks with clientId detected from cwd", async () => {
  const { db, runs, events } = createDbStub();
  const route = loadRoute({ db, events });

  const response = await route.POST(jsonRequest({
    sessionId: "session-1",
    cwd: "C:/workspace/clients/acme/context",
    claudePid: 123,
  }));
  const body = await response.json();
  const insert = runs.find((run) => run.sql.includes("INSERT INTO tasks"));

  assert.equal(response.status, 201);
  assert.equal(body.isNew, true);
  assert.ok(insert, "task insert should run");
  assert.equal(insert.args[17], "acme");
  assert.deepEqual(JSON.parse(insert.args[18]), { mode: "solo", version: 1, clientId: "acme" });
  assert.equal(events[0].task.clientId, "acme");
});

test("sync-session keeps root terminal tasks unscoped", async () => {
  const { db, runs } = createDbStub();
  const route = loadRoute({ db, events: [] });

  const response = await route.POST(jsonRequest({
    sessionId: "session-root",
    cwd: "C:/workspace",
  }));
  const insert = runs.find((run) => run.sql.includes("INSERT INTO tasks"));

  assert.equal(response.status, 201);
  assert.ok(insert, "task insert should run");
  assert.equal(insert.args[17], null);
});

test("sync-session never infers a client for an existing legacy task", async () => {
  const { db, runs } = createDbStub({
    recentRunning: {
      id: "task-recent",
      status: "running",
      startedAt: "2026-06-24T00:00:00.000Z",
      updatedAt: "2026-06-24T00:00:00.000Z",
      needsInput: 0,
      clientId: null,
    },
  });
  const route = loadRoute({ db, events: [] });

  const response = await route.POST(jsonRequest({
    sessionId: "session-attach",
    cwd: "C:/workspace/clients/acme",
  }));
  const update = runs.find((run) => run.sql.includes("SET claudeSessionId = ?"));

  assert.equal(response.status, 200);
  assert.ok(update, "recent-running update should run");
  assert.equal(update.args.length, 4);
  assert.equal(update.args[3], "task-recent");
});
