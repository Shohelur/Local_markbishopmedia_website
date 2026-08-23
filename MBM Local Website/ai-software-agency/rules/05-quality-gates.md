# Rule 05 — Quality Gates

## Statement

Each phase has defined completion criteria. A phase is NOT complete simply because
files were generated or content was written. Quality must be verified.

## General Completion Criteria (All Phases)

Before marking any phase complete, verify ALL of the following:

- [ ] All required artifacts for this phase have been created.
- [ ] All artifacts are internally consistent (no contradictions).
- [ ] All artifacts are complete (no placeholder sections left unfilled).
- [ ] Artifacts reference each other correctly where applicable.
- [ ] Any required decisions have been recorded in `DECISIONS.md`.
- [ ] Changes are committed to Git with an appropriate message.
- [ ] If the phase has an approval gate, Founder approval has been explicitly obtained.

## Phase-Specific Quality Criteria

### Phase 6 — Product Blueprint
- All sections of the blueprint template are completed.
- Personas are based on real target user types (not generic archetypes).
- User journeys cover the core use cases end-to-end.
- Feature map is prioritized (MVP vs. Future).
- Non-goals are explicitly stated.
- Business rules are documented.
- Success metrics are measurable.

### Phase 7 — UX / User Flows
- All major user journeys are diagrammed or written out.
- Screen map covers all screens/views referenced in the blueprint and user flows.
- Information architecture is logical and consistent.
- All flows reference the blueprint personas and use cases.

### Phase 8 — HTML Prototype
- Prototype covers ALL major user journeys from the blueprint.
- All navigation works (no dead links).
- Major states are represented: default, loading, empty, error.
- Responsive behavior works across breakpoints.
- Realistic sample data is used (no Lorem Ipsum in key places).
- Clearly labeled as PROTOTYPE (not production code).
- AI has asked Founder to test in Chrome and one other browser — Founder confirmed
  "BROWSER TEST PASSED" (the AI cannot self-certify browser testing).

### Phase 10-11 — Architecture + Technology Evaluation
- All architecture layers are addressed (frontend, backend, DB, auth, etc.).
- Technology recommendations include alternatives and tradeoff analysis.
- Performance, security, cost, and scalability considerations documented.
- Technologies explicitly NOT recommended are listed with reasons.
- Architecture diagram or description is clear enough to implement from.

### Phase 12 — Implementation Plan
- Plan is broken into milestones with clear deliverables.
- Dependencies between components are identified.
- Risks are documented with mitigations.
- Timeline estimates are reasonable (not artificially compressed).
- Plan references the approved architecture.

### Phase 14 — Testing / QA
- Test plan covers: unit, integration, end-to-end, performance.
- Critical user journeys have test coverage.
- All requirements (FR-NNN in REQUIREMENTS.md) have at least one test case.
- Known edge cases are tested.
- All tests ACTUALLY EXECUTED — not self-certified by code inspection.
- All tests pass before release gate.

### Phase 15 — Security Review
- OWASP Top 10 is evaluated.
- Authentication and authorization are reviewed.
- Sensitive data handling is reviewed.
- Dependency vulnerabilities are checked.
- No hardcoded secrets or credentials.

### Phase 18 — Production Release
- All gates have been approved.
- All tests pass.
- Security review complete.
- UAT complete and signed off.
- Deployment is documented.
- AI-MAINTENANCE.md is complete and up to date.
- Release is tagged in Git.

## Quality Standards for Artifacts

| Artifact Type | Standard |
|---|---|
| All documents | Consistent terminology, no contradictions, no unfilled placeholders |
| Prototypes | Reviewed in browser, realistic data, all major flows work |
| Code | Passes tests, passes linting, reviewed for security |
| Documentation | Clear, complete, accurate, future-AI-readable |
