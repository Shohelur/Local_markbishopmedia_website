# Rule 04 — Git / GitHub Standards

## Statement

Git and GitHub are first-class parts of the development lifecycle.
Every project and the Agency itself must be version-controlled.

## Repository Model

```
[Agency repo root]             ← Git repo: agency
│
Independent Project A          ← Git repo: project-a (separate directory)
Independent Project B          ← Git repo: project-b (separate directory)
```

Projects are NEVER nested inside the Agency repository.
Each project is an independent Git repo with its own GitHub remote.
Current Agency deployment path is documented in `README.md`.

## Agency Git Rules

- The Agency repo is version-controlled with semantic versioning tags.
- Tag Agency milestones: `agency/v1.0.0`, `agency/v1.1.0`, etc. (3-component semver)
- Never commit production project code to the Agency repo.

## Project Git Rules

### Branching Strategy

```
main          ← production-ready code only; protected
staging       ← pre-release / UAT integration
develop       ← active development integration
feature/*     ← individual feature branches
fix/*         ← bug fix branches
prototype/v1  ← prototype work — NEVER merged to develop or main; archived with a tag
docs/*        ← documentation-only changes
recovery/*    ← created when rolling back to a checkpoint (see Safe Recovery)
```

### Artifact-to-Branch Mapping

| Artifact | Branch | Can Merge to develop/main? |
|---|---|---|
| Prototype HTML/CSS/JS | `prototype/v1` | ❌ NEVER — archived with tag after approval |
| UX documentation (`docs/ux/`) | `develop` | ✅ Yes |
| Production source code | `develop` → `staging` → `main` | ✅ Yes (via PR) |
| Checkpoint | commit on current branch | N/A — see recovery procedure |

### Branch Rules
- `main` receives merges only via pull request (or explicit Founder instruction).
- Prototype branch is **explicitly isolated** — never merged into `develop` or `main`.
  After GATE-02 approval: `git tag -a <project>/prototype-v1 -m "Approved prototype — GATE-02"` then leave the branch as-is.
- Every feature is developed in its own `feature/<name>` branch.

## Commit Message Standard

```
<type>(<scope>): <short description>

Body (optional): Additional context, reasoning, or breaking change notes.

Types:
  feat      New feature or functionality
  fix       Bug fix
  docs      Documentation only
  chore     Maintenance, tooling, config
  refactor  Code restructure without behavior change
  test      Test additions or changes
  security  Security-related changes
  release   Production release commit
  checkpoint Recovery checkpoint before risky operation

Scope: agency | <project-name> | blueprint | prototype | arch | impl | qa | release

Examples:
  docs(agency): add technology evaluation skill
  feat(my-project): implement user authentication
  checkpoint(my-project): stable state before database migration
  release(my-project/v1.0.0): production release
  docs(blueprint): complete product blueprint v1 - GATE-01 approved
```

## Tagging Strategy

| Tag Pattern | Meaning |
|---|---|
| `agency/v1.0.0` | Agency version (3-component semver always) |
| `<project>/blueprint-v1` | Blueprint approved (GATE-01) |
| `<project>/prototype-v1` | Prototype approved (GATE-02) |
| `<project>/arch-v1` | Architecture approved (GATE-03) |
| `<project>/impl-plan-v1` | Implementation Plan approved (GATE-04) |
| `<project>/v1.0.0` | Production release |
| `<project>/v1.0.0-rc.1` | Release candidate |

## Recovery Checkpoints

### Canonical Checkpoint Mechanism

Recovery checkpoints are **always commit-based**:

```bash
git add -A
git commit -m "checkpoint(<scope>): stable state before <description>"
```

Do NOT create `checkpoint/*` branches for routine checkpoints.
Reserve `checkpoint/*` branches only for: major pre-release recovery snapshots,
or when a risky operation spans multiple work sessions.

### Before Any High-Risk Operation

The AI MUST:
1. Create a checkpoint commit (see above)
2. Record the checkpoint hash in `docs/DECISIONS.md`
3. If GitHub is authorized, push the checkpoint before proceeding

High-risk operations requiring checkpoints include:
- Database schema changes or migrations
- Major refactors touching core systems
- Dependency upgrades that may break the system
- Any operation that is difficult or impossible to reverse

---

## Safe Recovery Procedures

### ⚠️ NEVER use `git checkout <hash>` for rollback
`git checkout <hash>` creates a **detached HEAD** state — commits made in this
state are not on any branch and will be lost when switching branches.

### Recovery Scenario 1: Undo the Last Commit (not yet pushed)
```bash
# Option A: Undo commit but keep changes staged
git reset --soft HEAD~1

# Option B: Undo commit and discard all changes (DESTRUCTIVE)
git reset --hard HEAD~1
```

### Recovery Scenario 2: Revert a Bad Commit (already pushed or want to preserve history)
```bash
# Creates a new "undo" commit — safe for shared branches
git revert <commit-hash>
```

### Recovery Scenario 3: Roll Back to a Checkpoint Commit
```bash
# Step 1: Find the checkpoint
git log --oneline | grep "checkpoint"

# Step 2a: Create a recovery branch from the checkpoint (PREFERRED — preserves history)
git checkout -b recovery/<operation-name> <checkpoint-hash>

# Step 2b: Hard reset on current branch (DESTRUCTIVE — erases commits after checkpoint)
# Use only if those commits are confirmed bad and must be fully removed
git reset --hard <checkpoint-hash>
```

### Recovery Scenario 4: Restore a Specific File
```bash
git checkout <commit-hash> -- path/to/file.ext
```

### Recovery Scenario 5: Discard All Uncommitted Changes
```bash
git restore --staged .   # Unstage all staged changes
git restore .            # Discard all working directory changes
```

---

## GitHub Rules (CRITICAL)

The following actions require **explicit Founder authorization** before execution:
- Creating a new GitHub repository
- Making any repository public
- Pushing to any remote repository
- Adding collaborators or changing repository permissions
- Creating or deleting GitHub Actions workflows

NEVER automatically perform any of these actions.
