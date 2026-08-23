---
name: ux-design
description: >
  Guides UX design work including user flow mapping, information architecture,
  screen mapping, and responsive strategy decisions. Activate when working on
  Phase 7 of the Agency lifecycle, or when creating user flows, screen maps,
  navigation structures, or UX annotations for a project.
---

# Skill: UX Design

## Overview
This skill governs UX design work that occurs after the Product Blueprint is approved
and before the HTML prototype is built. Its outputs feed directly into the prototype.

## When to Use
- Phase 7 (UX / User Flows) of the Agency lifecycle
- Creating user flow diagrams or written user flows
- Defining information architecture or navigation structure
- Building screen maps
- Deciding the responsive strategy

---

## Process

### 1. Start From the Blueprint
Read the approved Product Blueprint (`docs/PRODUCT-BLUEPRINT.md`) before any UX work.
Extract: Core use cases, user personas, user journeys, MVP feature map, roles/permissions, business rules.

### 2. Information Architecture
Define the structural hierarchy of public, authenticated, and admin areas.

### 3. Screen Map
List EVERY screen in the MVP (primary screens, modals, empty states, error states, confirmation dialogs).

### 4. User Flows
For each core use case, document the flow as numbered steps with happy path AND error/exception branches.

### 5. Responsive Strategy Decision
Recommend one of: Mobile-First | Desktop-First | Tablet-First | Adaptive based on target device, context, input method, and data density. Confirm recommendation with Founder.

### 6. UX Annotations
Document key navigation patterns, progressive disclosure choices, and accessibility notes.

---

## Exit Checklist (Before Advancing to Phase 8)

Verify ALL of the following before declaring Phase 7 complete:

**Artifacts:**
- [ ] `docs/ux/user-flows.md` exists and covers ALL core use cases
- [ ] `docs/ux/screen-map.md` exists and lists ALL screens (including modals, empty states, error states)
- [ ] `docs/ux/ux-notes.md` exists with key UX decisions and accessibility notes
- [ ] `docs/PROJECT.md` updated with Phase 7 status
- [ ] All files committed to Git

**Founder Confirmations:**
- [ ] Responsive strategy agreed with Founder
- [ ] Screen map reviewed with Founder — no missing screens
- [ ] User flows reviewed with Founder — happy paths AND error paths covered

**Phase 8 Readiness:**
- [ ] Prototype builder can construct ALL screens from `screen-map.md` without discovering new screens
- [ ] All user journey steps in `user-flows.md` are prototypeable (no ambiguous steps)

If any item is unchecked, Phase 7 is NOT complete. End Phase 7 with the Soft Checkpoint format defined in `.agents/plugins/ai-software-agency/agency-reference/approval-gates/APPROVAL-STATES.md`.
