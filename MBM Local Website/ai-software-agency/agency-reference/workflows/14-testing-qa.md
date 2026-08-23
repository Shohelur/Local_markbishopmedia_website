# Phase 14 — Testing / QA

## Purpose
Systematically verify that the production application meets all requirements,
is free of critical bugs, and is ready for security review and release.

## Role
QA Engineer

## Skill
Load and follow: `.agents/skills/testing-qa/SKILL.md`

## Inputs Required
- Phase 13: Completed production code
- Phase 5: Requirements (for acceptance criteria)
- Phase 12: Implementation plan (for Definition of Done)

## Test Coverage Required

### Unit Tests
- All business logic functions
- All data transformations
- All validation logic
- All edge cases for critical paths
- Coverage target: ≥80% for business logic

### Integration Tests
- API endpoints (request/response correctness)
- Database operations (CRUD)
- Authentication/authorization flows
- Third-party service integrations

### End-to-End Tests
- All core user journeys from the blueprint
- Happy path + critical error paths
- Cross-browser: Chrome, Firefox, Safari (if web)

### Performance Tests
- Load time targets met (from non-functional requirements)
- API response times under expected load
- Database query performance

### Accessibility Tests (if applicable)
- WCAG 2.1 AA compliance check
- Screen reader compatibility
- Keyboard navigation

## AI Actions

### Step 1: Execute Test Plan
Run all automated tests. Document results:
- Tests run
- Tests passed
- Tests failed (and root cause)
- Coverage percentage

### Step 2: Manual QA
Walk through all core user journeys manually:
- Follow the prototype flows as a reference
- Verify all requirements are met
- Test edge cases not covered by automated tests

### Step 3: Bug Triage
For each bug found:
- **Critical**: Blocks a core user journey — fix before release
- **Major**: Significantly degrades experience — fix before release
- **Minor**: Small UX issue — fix or defer to next version
- **Enhancement**: Improvement idea — log for future version

### Step 4: Regression Testing
After fixing bugs, re-run all tests to ensure no regressions.

## Artifacts Produced
- `docs/testing/test-results.md` — Test run results
- `docs/testing/bug-report.md` — All bugs found and their status

## Completion Criteria
- [ ] All automated tests pass
- [ ] All core user journeys work manually
- [ ] All critical and major bugs fixed
- [ ] No known data loss or security bugs
- [ ] Test results committed to Git

## Next Phase
→ `15-security-review.md`
