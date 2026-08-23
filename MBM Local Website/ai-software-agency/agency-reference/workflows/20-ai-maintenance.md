# Phase 20 — AI-Assisted Maintenance

## Purpose
Establish the maintenance protocol that allows any AI assistant to safely maintain the production system long after launch.

## Role
AI Maintenance Specialist · Senior Software Engineer

## AI Actions

### For Maintenance Requests

When the Founder asks for a change, bug fix, or update AFTER release:

**Step 1: Read Context (Strict Order per Rule 06)**
Read these files before touching anything:
1. `docs/PROJECT.md` — Current state and phase overview
2. `docs/DECISIONS.md` — Full decision history and gate approvals
3. `docs/PRODUCT-BLUEPRINT.md` — Authoritative product definition
4. `docs/ARCHITECTURE.md` — Authoritative technical design
5. `docs/AI-MAINTENANCE.md` — Maintenance procedures and rollback guide
6. `docs/REQUIREMENTS.md` — Functional requirement IDs (FR-NNN)

**Step 2: Assess Change Risk**
Classify the requested change:
- **Safe**: Minor bug fix or copy change in isolated area → proceed with unit test
- **Moderate**: Change touching core systems or shared modules → create checkpoint commit first
- **Risky**: Architectural change, database schema migration, major framework upgrade → invoke Architecture Deviation Protocol and mini-lifecycle

**Step 3: Canonical Recovery Checkpoint (for Moderate/Risky)**
Create a commit-based checkpoint on the current branch (do NOT create `checkpoint/*` branches):
```bash
git add -A
git commit -m "checkpoint(<project>): stable state before <change-description>"
```
Record checkpoint hash in `docs/DECISIONS.md`.

**Step 4: Implement and Test**
- Implement the change
- Run tests with actual command execution (`npm test`, `pytest`, etc.)
- Capture and verify execution output (AI must NOT self-certify tests)
- Commit: `fix(<project>): [description]` or `feat(<project>): [description]`

**Step 5: Update Project Memory**
- Update `docs/DECISIONS.md` with decision rationale and hash
- Update `docs/PROJECT.md`
- Update `docs/REQUIREMENTS.md` if new requirement added
- Update `docs/AI-MAINTENANCE.md` if procedures changed

**Step 6: Deploy (if authorized)**
Follow the deployment and rollback guide in `docs/AI-MAINTENANCE.md`.

---

### Maintenance Categories

| Type | Examples | Process |
|---|---|---|
| Bug fix | UI bug, logic error | Read docs → test → fix → re-test → commit |
| Small feature | Add field, add filter | FR-NNN requirement addition → mini plan → develop → deploy |
| Performance | Query optimization, caching | Checkpoint commit → optimize → verify logs |
| Security patch | Dependency upgrade | Checkpoint commit → update → run test suite |
| Architecture | New DB model, API rewrite | Mini GATE-03 deviation protocol → re-gate |

---

## Next Phase
→ `21-future-iterations.md`
