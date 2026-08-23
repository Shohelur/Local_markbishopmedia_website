# Phase 5 — Requirements

## Purpose
Translate product strategy into detailed functional and non-functional requirements
that will drive the blueprint, architecture, implementation, and testing traceability.

## Role
Business Analyst · Product Manager

## Inputs Required
- Phase 4: Product Strategy Document
- Phase 1: Problem Discovery (for constraints, budget, team size)

## AI Actions

### Step 1: Functional Requirements
Document what the system MUST DO.
For each feature in the MVP scope:
- Write user stories: "As a [persona], I want to [action], so that [outcome]."
- Define acceptance criteria for each story.
- Number each requirement (FR-001, FR-002, etc.) for traceability.

### Step 2: Non-Functional Requirements
Document how the system must perform and behave:

| Category | Requirements |
|---|---|
| Performance | Load time targets, throughput, latency |
| Scalability | Concurrent users, data volume, growth |
| Availability | Uptime target (99.9%, etc.) |
| Security | Authentication, authorization, data protection |
| Compliance | GDPR, HIPAA, accessibility (WCAG), etc. |
| Usability | Accessibility level, device support |
| Compatibility | Browser/OS support matrix |
| Maintainability | Code standards, documentation |
| Localization | Languages, time zones, currencies |

### Step 3: Constraints
Document hard constraints:
- Budget constraints (from Phase 1 discovery)
- Timeline constraints
- Development team capacity (from Phase 1 discovery)
- Technology constraints
- Regulatory constraints
- Integration constraints

### Step 4: Assumptions & Dependencies
Document assumptions (what is believed true) and external dependencies (APIs, third-party services, data sources).

### Step 5: Produce Requirements Document
Create `docs/REQUIREMENTS.md` using the template at:
`.agents/plugins/ai-software-agency/agency-reference/templates/requirements-template.md`

Every FR-NNN requirement in this file serves as the anchor for the project traceability chain:
`Problem → FR-NNN → Blueprint Feature → Prototype Screen → Arch Component → Impl Task → Code → Test Case`

---

## Artifacts Produced
- `docs/REQUIREMENTS.md` (REQUIRED memory file)

---

## Completion Criteria
- [ ] All MVP features have user stories with FR-NNN numbering
- [ ] Acceptance criteria defined for each user story
- [ ] Non-functional requirements documented
- [ ] Constraints (budget, team size, timeline) listed
- [ ] Assumptions and dependencies documented
- [ ] Traceability matrix stub included
- [ ] `docs/PROJECT.md` updated with Phase 5 completion
- [ ] Document committed to Git

---

## Soft Phase Checkpoint
End Phase 5 with the Soft Checkpoint format defined in `.agents/plugins/ai-software-agency/agency-reference/approval-gates/APPROVAL-STATES.md`:
> "Ready to advance to Phase 6: Product Blueprint? Reply PROCEED to continue, or provide feedback."

If the Founder disagrees with requirements, follow the Disagreement Protocol in `03-phase-discipline.md`: revise requirements, re-present, and record resolution in `docs/DECISIONS.md`.

---

## Next Phase
→ `06-product-blueprint.md` (GATE-01 follows Phase 6)
