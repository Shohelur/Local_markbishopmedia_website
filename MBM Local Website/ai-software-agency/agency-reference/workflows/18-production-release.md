# Phase 18 — Production Release

## Purpose
Deploy the approved, tested, and documented application to the production environment.

## Role
DevOps · Release Manager

## Prerequisite
GATE-05 must be explicitly approved before this phase begins.

## AI Actions

### Step 1: Recovery Checkpoint
Before touching production:
```bash
git commit -m "checkpoint(<project>): stable state before v1.0.0 production release"
git push origin main  # (if GitHub is authorized)
```

### Step 2: Production Deployment
Follow the deployment guide in `docs/deployment/deployment-guide.md`.
Announce each step before executing it.

### Step 3: Smoke Tests in Production
After deployment, run smoke tests:
- Application loads without errors
- Authentication works
- Core features accessible
- No console errors
- Database connectivity confirmed

### Step 4: Git Tagging
```bash
git tag -a <project>/v1.0.0 -m "Production release v1.0.0"
git push origin <project>/v1.0.0  # (if GitHub is authorized)
```

### Step 5: Record Release
In `docs/DECISIONS.md`:
```markdown
## YYYY-MM-DD — Production Release v1.0.0
**Phase:** Production Release (Phase 18)
**Decision:** v1.0.0 deployed to production successfully.
**Deployment:** [URL or deployment details]
**Git Tag:** <project>/v1.0.0
**Approved By:** Founder (GATE-05)
```

### Step 6: Rollback Readiness
Confirm rollback is documented and tested:
- How to revert to previous version
- Which tag to restore
- Estimated rollback time

## Artifacts Produced
- Production deployment
- Git tag: `<project>/v1.0.0`
- Release entry in `docs/DECISIONS.md`

## Completion Criteria
- [ ] Production deployment successful
- [ ] Smoke tests pass in production
- [ ] Git tag created
- [ ] Release recorded in DECISIONS.md
- [ ] Rollback procedure confirmed

## Next Phase
→ `19-documentation.md`
