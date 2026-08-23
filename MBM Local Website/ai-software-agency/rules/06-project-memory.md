# Rule 06 — Project Memory

## Statement

Chat history is ephemeral and cannot be relied upon as project knowledge.
All important project knowledge must be written to durable files in the project
repository so that a future AI assistant can understand and continue the project
without access to the original conversation.

## Required Project Memory Files

Every project created by this Agency must maintain these files:

### `docs/PROJECT.md` — Always-Current Project Summary
A single-page summary of the project, always kept up to date.
- **Updated at the end of every phase** (not just major phases).
- Covers: what the project is, current status, current phase, key decisions, next steps.
- Should be readable in 2 minutes.
- This is the first file a new AI assistant should read.

### `docs/DECISIONS.md` — Append-Only Decision Log
Every key decision and Founder approval is recorded here.
- NEVER edit or delete previous entries.
- Each entry includes: date, phase, decision, rationale, who approved.
- Includes all gate approvals with gate IDs.

Format:
```markdown
## YYYY-MM-DD — [Decision Title]
**Phase:** [Phase Name]
**Gate:** [Gate ID, if applicable]
**Decision:** [What was decided]
**Rationale:** [Why this decision was made]
**Alternatives Considered:** [What else was evaluated]
**Approved By:** Founder
```

### `docs/PRODUCT-BLUEPRINT.md` — Approved Product Blueprint
The complete, approved product blueprint (produced in Phase 6).
Updated if significant product changes occur post-approval.

### `docs/ARCHITECTURE.md` — Approved Architecture Document
The complete, approved technical architecture (produced in Phases 10-11).
Updated if significant architecture changes occur.

### `docs/REQUIREMENTS.md` — Requirements Document (REQUIRED)
The numbered functional and non-functional requirements for the product.
Produced in Phase 5 using `.agents/plugins/ai-software-agency/agency-reference/templates/requirements-template.md`.
- Every FR-NNN requirement traces to a Blueprint feature and a test case.
- Updated if requirements change during development.
- This is the traceability anchor for implementation and testing.

### `docs/AI-MAINTENANCE.md` — AI Maintenance Guide
The portable guide for a future AI assistant to maintain the project.
A DRAFT is produced in Phase 17 (for GATE-05 review). Finalized in Phase 19.
Shipped with every production release.

## Additional Recommended Files

| File | Purpose |
|---|---|
| `docs/ux/user-flows.md` | User flow documentation |
| `docs/ux/screen-map.md` | Screen map |
| `docs/api/api-reference.md` | API documentation |
| `docs/testing/test-plan.md` | Test plan |
| `docs/deployment/deployment-guide.md` | Deployment instructions |
| `docs/security/security-notes.md` | Security considerations |

## Synchronization Rule

Documentation must stay synchronized with the actual product.
When a significant change is made to the architecture, product scope, or
implementation, the relevant documentation files MUST be updated in the
same commit or pull request as the change.

Documentation that is out of sync with reality is worse than no documentation.

## Reading Order for a New AI

A future AI assistant should read files in this order:
1. `docs/PROJECT.md` (current state, current phase, next steps)
2. `docs/DECISIONS.md` (full history of decisions and gate approvals)
3. `docs/PRODUCT-BLUEPRINT.md` (authoritative product definition)
4. `docs/ARCHITECTURE.md` (authoritative technical design)
5. `docs/AI-MAINTENANCE.md` (maintenance procedures and rollback guide)
6. `docs/REQUIREMENTS.md` (requirements traceability)

Read authoritative sources (3 and 4) before the summary (5) to ensure
full context rather than relying on summarized versions.
