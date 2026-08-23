# Phase 21 — Future Versions / Iterations

## Purpose
Plan and execute future versions of the product using the same Agency lifecycle,
building on the solid foundation of the v1.0.0 release.

## Role
Product Manager · Strategist

## AI Actions

### Step 1: Post-Launch Review
After v1.0.0 has been live, conduct a retrospective:
- What features are most used?
- What user feedback has been collected?
- What technical debt was accumulated?
- What is the performance baseline?

### Step 2: Next Version Scope
Apply the same process as Phase 4 (Product Strategy):
- Review the Future Scope from the blueprint
- Prioritize features for v1.1 or v2.0
- Define the MVP scope for the next version
- Identify any breaking changes

### Step 3: Re-enter the Lifecycle
For significant new versions:
- Return to Phase 5 (Requirements) or Phase 6 (Blueprint update)
- Follow the same gates for significant new features
- Update all relevant documentation

For minor versions:
- Phase 12 (mini Implementation Plan) → Phase 13 → QA → Release
- Still requires GATE-05 for any production release

### Step 4: Version Management
- Follow semantic versioning: MAJOR.MINOR.PATCH
- Tag each release in Git
- Update CHANGELOG in the project repo
- Update AI-MAINTENANCE.md with any changes

## Lifecycle Restart Rule

A new major version (v2.0) should restart from:
- Phase 4 (Product Strategy) at minimum
- Phase 6 (Blueprint update) if scope changes significantly
- Phase 10 (Architecture) if major architectural changes planned

A minor version (v1.1) may start from:
- Phase 5 (Requirements for new features)
- Phase 12 (Implementation Plan if UX is clear)

A patch version (v1.0.1) starts from:
- Phase 13 (Development) for bug fixes
- Phase 14 (QA) for hotfixes

All versions still require GATE-05 (Release Approval) before production deployment.
