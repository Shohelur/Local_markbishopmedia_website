---
name: git-workflow
description: >
  Enforces Git branching, commit message standards, tagging, recovery checkpoints,
  and GitHub authorization rules. Activate when performing any Git operation,
  creating commits, tagging releases, or advising on version control strategy.
---

# Skill: Git Workflow

## Overview
This skill governs all version control operations for both the Agency and
all projects built with the Agency.

## Read First
Full Git standards: `.agents/plugins/ai-software-agency/agency-core/rules/04-git-standards.md`

---

## Quick Reference

### Commit Before You Commit
Before any significant action, ask:
1. Is the current state stable and worth preserving?
2. Should I create a recovery checkpoint commit before proceeding?
3. Is this commit message meaningful and searchable?

### Commit Message Formula
```
<type>(<scope>): <imperative short description (≤72 chars)>

[Optional body: WHY this change was made, context, links]
[Optional footer: BREAKING CHANGE: description]
```

### Type → When to Use
| Type | When |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `chore` | Maintenance: deps, config, tooling |
| `refactor` | Code change with no behavior change |
| `test` | Test additions or changes |
| `security` | Security patch or hardening |
| `release` | Production release commit |
| `checkpoint` | Recovery checkpoint before risky operation |

---

## Recovery Checkpoints (Commit-Based)

```bash
# Step 1: Create checkpoint commit on current branch
git add -A
git commit -m "checkpoint(<scope>): stable state before <operation description>"

# Step 2: Record hash in docs/DECISIONS.md
```

---

## Safe Recovery Procedures (DO NOT use `git checkout <hash>`)

⚠️ `git checkout <hash>` creates a **detached HEAD** state — commits made here will be lost.

```bash
# Scenario A: Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Scenario B: Undo last commit & discard changes (DESTRUCTIVE)
git reset --hard HEAD~1

# Scenario C: Revert a commit (safe for shared history)
git revert <commit-hash>

# Scenario D: Roll back to checkpoint (PREFERRED — creates recovery branch)
git checkout -b recovery/<operation-name> <checkpoint-hash>

# Scenario E: Hard reset to checkpoint (DESTRUCTIVE — erases commits after checkpoint)
git reset --hard <checkpoint-hash>
```

---

## Prototype Branch Isolation Rule (Rule 04)

- Prototype code lives on branch `prototype/v1`.
- Prototype code is **NEVER merged** into `develop` or `main`.
- After GATE-02 approval: tag the branch `git tag -a <project>/prototype-v1 -m "Approved prototype — GATE-02"` and archive.
- Production development begins fresh on `develop` in Phase 13.

---

## GitHub Authorization Gate

NEVER run these without explicit Founder authorization:
```bash
git remote add origin <url>          # ← REQUIRES AUTHORIZATION
git push origin <branch>             # ← REQUIRES AUTHORIZATION
git push --tags                      # ← REQUIRES AUTHORIZATION
gh repo create                       # ← REQUIRES AUTHORIZATION
```

---

## Tagging Strategy (3-Component Semver Always)

### Agency Tags
```bash
agency/v1.0.0     ← Initial Agency operational release
agency/v1.1.0     ← Audit remediation release (all 33 findings repaired)
agency/v1.2.0     ← Production Engineering Skill Architecture release
agency/v2.0.0     ← Major Agency revision
```

### Project Milestone Tags
```bash
<project>/blueprint-v1     ← GATE-01 approved
<project>/prototype-v1     ← GATE-02 approved (archived prototype branch)
<project>/arch-v1          ← GATE-03 approved
<project>/impl-plan-v1     ← GATE-04 approved
<project>/v1.0.0-rc.1      ← Release candidate
<project>/v1.0.0            ← Production release
```

---

## Good Commit Examples
```
docs(blueprint): complete product blueprint v1 - awaiting GATE-01
feat(auth): implement JWT authentication with refresh tokens (FR-001)
fix(dashboard): resolve incorrect date formatting in timeline
security(deps): upgrade express to 4.18.3 (CVE-2024-XXXX)
checkpoint(my-project): stable state before database schema migration
release(my-project/v1.0.0): production release
```
