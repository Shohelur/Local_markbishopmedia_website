---
name: product-blueprint
description: >
  Guides the creation of a comprehensive Product Blueprint document.
  Activate when working on Phase 6 of the Agency lifecycle, when the user
  asks to create a product blueprint, feature map, user personas, user journeys,
  or any pre-architecture product definition artifact.
---

# Skill: Product Blueprint

## Overview
This skill guides the creation of a complete Product Blueprint — the foundational
product definition document that precedes all design, architecture, and implementation.

## When to Use
- Phase 6 of the Agency lifecycle
- Founder asks for a "product blueprint", "feature map", "personas", or "user journeys"
- Before any prototype or architecture work begins

---

## Process

### 1. Confirm All Inputs Are Available
Before writing the blueprint, verify:
- Problem Discovery (Phase 1) is complete
- Research (Phase 2) is complete
- Business Strategy (Phase 3) is complete
- Product Strategy (Phase 4) is complete
- Requirements (`docs/REQUIREMENTS.md` — Phase 5) are drafted

If any inputs are missing after 2 rounds of questions, enter BLOCKED state (see below).

### 2. Use the Blueprint Template
Use the template at: `.agents/plugins/ai-software-agency/agency-reference/templates/requirements-template.md` and `.agents/plugins/ai-software-agency/agency-reference/templates/product-blueprint.md`
Fill in every section. Section 16 MUST include summary-level user flows for all core use cases.
Do NOT leave placeholder text.

### 3. Persona Guidelines
Each persona must be:
- Based on real target user types (from discovery research)
- Named (fictional but realistic)
- Have: role, age range, goals, frustrations, tech proficiency, key scenarios
- 2-4 personas is typical; more than 5 is usually too many

### 4. User Journey Guidelines
Each user journey must:
- Map to a specific core use case and trace to FR-NNN requirements
- Have a clear start and end point
- Show step-by-step actions
- Cover the happy path AND common error/edge cases

### 5. Feature Map Guidelines
- Organize features by functional category
- Label each feature: MVP | v1.1 | v2.0 | Future | Out of Scope
- Be specific enough to design from
- Estimate relative complexity: S / M / L / XL

### 6. Internal Consistency Check
Verify personas match problem statement, use cases match personas, features support user journeys, and non-goals are explicit.

---

## Blocked State Protocol

### When This Skill Enters BLOCKED State
This skill enters BLOCKED state if, after 2 rounds of clarification questions,
a required section of the blueprint cannot be completed due to missing Founder input.

### BLOCKED State Procedure
1. STOP all blueprint work immediately.
2. Do NOT invent information to fill gaps.
3. Display the BLOCKED banner defined in `.agents/plugins/ai-software-agency/agency-reference/approval-gates/APPROVAL-STATES.md`.
4. List precisely which sections are blocked and what specific information is needed.
5. Present three options to the Founder:
   A) Provide the missing information (continue blueprint)
   B) Explicitly mark section "TBD — Deferred" with Founder rationale (must resolve before GATE-01)
   C) Return to Phase 1 (Problem Discovery) to gather missing information
6. Record BLOCKED state in `docs/DECISIONS.md`.

---

## Gate Presentation
At the conclusion of this skill, display the GATE-01 banner exactly as defined in `.agents/plugins/ai-software-agency/agency-reference/approval-gates/GATES.md`. Do not proceed to Phase 7 until GATE-01 has been explicitly APPROVED by the Founder.
