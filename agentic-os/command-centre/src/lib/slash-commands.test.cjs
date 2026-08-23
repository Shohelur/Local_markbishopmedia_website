const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const { loadTsModule } = require("./test-utils/load-ts-module.cjs");

const slash = loadTsModule(path.resolve(__dirname, "slash-commands.ts"));

test("skillNameFromSlashCommand only resolves skill commands", () => {
  assert.equal(slash.skillNameFromSlashCommand("/mkt-copywriting"), "mkt-copywriting");
  assert.equal(slash.skillNameFromSlashCommand("/team:mkt-copywriting"), "mkt-copywriting");
  assert.equal(slash.skillNameFromSlashCommand("/local:mkt-copywriting"), "mkt-copywriting");
  assert.equal(slash.skillNameFromSlashCommand("tool-youtube"), "tool-youtube");
  assert.equal(slash.skillNameFromSlashCommand("/gsd-plan-phase"), null);
  assert.equal(slash.skillNameFromSlashCommand("/meta-skill-creator"), null);
});

test("filterCommands hides denied skill commands but keeps non-skill commands", () => {
  const commands = slash.filterCommands("", ["mkt-copywriting"]);
  const names = commands.map((command) => command.command);

  assert.ok(names.includes("/mkt-copywriting"));
  assert.ok(!names.includes("/mkt-brand-voice"));
  assert.ok(names.includes("/gsd-plan-phase"));
  assert.ok(names.includes("/meta-skill-creator"));
});
