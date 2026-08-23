# Phase 6 — Product Blueprint

## Purpose
Produce the comprehensive Product Blueprint — the single most important pre-development
document. This artifact synthesizes all prior phases into a complete product definition
that serves as the foundation for design, architecture, and implementation.

## Role
Product Manager · Product Designer

## Skill
Load and follow: `.agents/skills/product-blueprint/SKILL.md`

## Inputs Required
- Phase 1-5: All prior documents
- Confirmed requirements from Phase 5

## AI Actions

### Step 1: Confirm Inputs
Verify all prior phases are complete. If any key information is missing, ask.
Do NOT produce the blueprint with gaps — those gaps will propagate to design and code.

### Step 2: Produce the Product Blueprint
Use the template: `.agents/plugins/ai-software-agency/agency-reference/templates/product-blueprint.md`

The blueprint must cover ALL applicable sections:

1. **Product Vision** — Clear, inspiring statement of what this product is and does.
2. **Problem Definition** — Specific problem being solved, with evidence.
3. **Target Users** — Detailed description of primary and secondary users.
4. **Personas** — 2-4 realistic user personas with names, goals, frustrations.
5. **User Jobs** — Jobs-to-be-done for each persona.
6. **Core Use Cases** — The most critical things users do in the system.
7. **User Journeys** — Step-by-step journeys for each core use case.
8. **Feature Map** — All features organized by category, with MVP vs. Future labels.
9. **MVP Scope** — Exactly what is in the MVP, no more, no less.
10. **Future Scope** — What is explicitly planned for later versions.
11. **Non-Goals** — What this product will NOT do.
12. **Business Rules** — Rules the system must enforce.
13. **Roles & Permissions** — User roles and what each can do.
14. **Information Architecture** — How content and data is organized.
15. **Screen Map** — All screens/pages in the system (high level).
16. **User Flows** — Diagrammed or written flows for key journeys.
17. **Integrations** — Third-party services and APIs required.
18. **Success Metrics** — Measurable KPIs and how they're tracked.
19. **Constraints** — Technical, business, regulatory constraints.
20. **Assumptions** — What is being assumed as true.
21. **Risks** — Known risks and initial mitigations.

### Step 3: Internal Consistency Check
Before presenting to Founder:
- Ensure all sections are complete (no placeholders).
- Ensure personas match use cases match user journeys match features.
- Ensure MVP scope matches requirements from Phase 5.
- Ensure non-goals are genuinely non-goals (not hidden requirements).

## Artifacts Produced
- `docs/PRODUCT-BLUEPRINT.md`

## Completion Criteria
- [ ] All 21 sections completed
- [ ] Internal consistency verified
- [ ] No placeholder content remaining
- [ ] Document is readable and clear to a non-technical stakeholder
- [ ] Committed to Git: `docs(blueprint): complete product blueprint v1`

## ⚠️ Approval Gate: GATE-01

After producing the blueprint:

```
╔══════════════════════════════════════════════════════════╗
║  🔒 APPROVAL GATE: GATE-01 — Product Blueprint          ║
║                                                          ║
║  Phase Completed: Product Blueprint (Phase 6)            ║
║  Artifact: docs/PRODUCT-BLUEPRINT.md                     ║
║                                                          ║
║  Please review the blueprint carefully.                  ║
║  This document drives ALL future design and development. ║
║                                                          ║
║  Reply APPROVED to proceed to UX / User Flows.           ║
║  Reply with feedback to request changes.                 ║
╚══════════════════════════════════════════════════════════╝
```

**Upon approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/blueprint-v1`

## Next Phase
→ `07-ux-user-flows.md`
