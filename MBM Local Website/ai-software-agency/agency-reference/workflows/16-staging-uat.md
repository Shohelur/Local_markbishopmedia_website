# Phase 16 — Staging / User Acceptance Testing

## Purpose
Deploy to a staging environment that mirrors production, and obtain
Founder (and any stakeholder) sign-off that the product is ready for release.

## Role
QA Engineer · DevOps

## AI Actions

### Step 1: Staging Deployment
- Deploy the application to the staging environment
- Verify the staging environment mirrors production configuration
- Verify all environment variables are set correctly
- Run smoke tests in staging

### Step 2: UAT Guide
Produce a `docs/uat/uat-guide.md` containing:
- Overview of what to test
- Step-by-step test scenarios (based on core user journeys)
- Expected behavior for each scenario
- How to report issues

### Step 3: Facilitate UAT
Guide the Founder through UAT:
- Walk through each UAT scenario
- Record results: Pass / Fail / Needs attention
- Document any issues found

### Step 4: Resolve UAT Issues
For any issues found during UAT:
- Classify: Critical (must fix) / Minor (can defer)
- Fix critical issues
- Re-test in staging
- Document deferred items for future version

### Step 5: UAT Sign-off
Record UAT sign-off in `docs/DECISIONS.md`:
```markdown
## YYYY-MM-DD — UAT Sign-off
**Phase:** Staging / UAT (Phase 16)
**Decision:** UAT complete. Product approved for production release.
**Tester:** Founder
**Issues Deferred:** [List any deferred items]
**Approved By:** Founder
```

## Artifacts Produced
- `docs/uat/uat-guide.md`
- `docs/uat/uat-results.md`
- UAT sign-off in `docs/DECISIONS.md`

## Completion Criteria
- [ ] Staging deployment successful
- [ ] All core user journeys pass in staging
- [ ] UAT conducted with Founder
- [ ] All critical UAT issues resolved
- [ ] UAT sign-off recorded
- [ ] Committed to Git

## Next Phase
→ `17-release-approval.md` (GATE-05)
