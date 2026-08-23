# Approval Gates — Master Reference

## Overview

The Agency defines **5 mandatory approval gates** that lock the development
lifecycle at critical decision points. No gate may be bypassed without explicit
Founder authorization.

Production code is locked until GATE-01, GATE-02, GATE-03, and GATE-04 are ALL approved.

Detailed approval states and lifecycle definitions: `.agents/plugins/ai-software-agency/agency-reference/approval-gates/APPROVAL-STATES.md`

---

## Checklist Usage Rule (CRITICAL)

This checklist is **NOT self-certifiable by the AI**.
For each item in a gate's checklist:
1. The AI presents the item to the Founder for confirmation.
2. Only items explicitly confirmed by the Founder (or verified by empirical run logs where applicable) can be marked complete.
3. The AI must NOT mark items complete based on its own opinion or code inspection alone.

---

## Gate Display Protocol

When the AI reaches a gate, it MUST display this banner and STOP:

```
╔══════════════════════════════════════════════════════════╗
║  🔒 APPROVAL GATE: [GATE-ID] — [GATE NAME]              ║
║                                                          ║
║  Phase Completed: [Phase Name]                           ║
║  Artifact: [Link to artifact]                            ║
║                                                          ║
║  Please review the artifact(s) above.                    ║
║  Reply with APPROVED to proceed to the next phase.       ║
║  Reply with feedback to request changes.                 ║
╚══════════════════════════════════════════════════════════╝
```

After displaying the gate, the AI must:
1. Stop all further actions.
2. Wait for explicit Founder response.
3. NOT proceed on assumption, implication, or ambiguous words like "okay" / "sure".

---

## Gate Definitions

---

### GATE-01 — Product Blueprint Approval

**Triggered after:** Phase 6 (Product Blueprint)
**Unlocks:** Phase 7 (UX / User Flows)
**Blocks:** ALL subsequent phases, especially production code

**Review Checklist (Founder Confirmation Required):**
- [ ] Product vision is clear and agreed upon.
- [ ] Target users and personas are realistic and accurate.
- [ ] User Jobs (§5) are defined for all primary personas — not placeholder text.
- [ ] Core use cases are complete and correct.
- [ ] Feature map covers MVP scope correctly.
- [ ] Non-goals are correctly identified.
- [ ] Business rules are accurate.
- [ ] Success metrics are measurable and agreed upon.

**Upon Approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/blueprint-v1`
- Set Gate State: `APPROVED`
- Proceed to Phase 7

---

### GATE-02 — Prototype Approval

**Triggered after:** Phase 9 (Founder Review) — *ONLY after all review changes are implemented*
**Unlocks:** Phase 10 (Technical Architecture)
**Blocks:** Production code

**Review Checklist (Founder Confirmation Required):**
- [ ] All major user journeys work in the browser.
- [ ] Founder confirmed browser test ("BROWSER TEST PASSED" in Chrome + Firefox/Safari/Edge).
- [ ] Navigation is complete — no dead links.
- [ ] Key states represented (default, loading, empty, error).
- [ ] Responsive behavior is correct across breakpoints.
- [ ] Realistic sample data is used.
- [ ] UX and visual design direction is approved.
- [ ] ALL Must-Fix and Should-Fix review items from Phase 9 are resolved.

**Upon Approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/prototype-v1`
- Set Gate State: `APPROVED`
- Proceed to Phase 10

---

### GATE-03 — Technical Architecture Approval

**Triggered after:** Phase 10-11 (Architecture + Technology Evaluation)
**Unlocks:** Phase 12 (Implementation Plan)
**Blocks:** Production code

**Review Checklist (Founder Confirmation Required):**
- [ ] All architecture layers addressed (frontend, backend, DB, auth, APIs, hosting, etc.).
- [ ] Technology recommendations are justified with alternatives considered.
- [ ] Non-recommended technologies are explicitly listed with reasons.
- [ ] Performance, security, scalability considerations are addressed.
- [ ] Hosting/infrastructure budget alignment confirmed.
- [ ] Development team size & capacity alignment confirmed.
- [ ] Vendor lock-in risks are addressed.
- [ ] AI/LLM integration strategy defined (if applicable).

**Upon Approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/arch-v1`
- Set Gate State: `APPROVED`
- Proceed to Phase 12

---

### GATE-04 — Implementation Plan Approval

**Triggered after:** Phase 12 (Implementation Plan)
**Unlocks:** Phase 13 (Production Development)
**Blocks:** Production code (this is the FINAL lock before code)

**Review Checklist (Founder Confirmation Required):**
- [ ] Plan covers all features in MVP scope and traces to FR-NNN requirements.
- [ ] Milestone 0: Environment Setup is included before development milestones.
- [ ] Milestones have clear deliverables and acceptance criteria.
- [ ] Dependencies are identified.
- [ ] Risks and mitigations are documented.
- [ ] Timeline is realistic.
- [ ] Plan aligns with approved architecture.

**Upon Approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/impl-plan-v1`
- Set Gate State: `APPROVED`
- **PRODUCTION CODE MAY NOW BEGIN**
- Proceed to Phase 13

---

### GATE-05 — Release Approval

**Triggered after:** Phase 17 (Release Approval) — prior to Phase 18 Production Release
**Unlocks:** Phase 18 (Production Release)

**Review Checklist (Founder Confirmation Required):**
- [ ] `docs/REQUIREMENTS.md` exists and is current (all FR-NNN requirements verified).
- [ ] All automated tests pass (verified with execution logs).
- [ ] Security review complete — no critical issues unresolved.
- [ ] UAT complete — Founder or stakeholders have signed off.
- [ ] Draft `docs/AI-MAINTENANCE.md` complete and accurate.
- [ ] Release notes are prepared.
- [ ] Deployment plan is ready.
- [ ] Rollback plan is ready.
- [ ] All documentation is up to date.

**Upon Approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/v1.0.0`
- Set Gate State: `APPROVED`
- Proceed to Phase 18 (Production Release)

---

## Canonical Gate Override Protocol

The Founder may explicitly override a gate. This procedure is **canonical** across the Agency:

1. **ACKNOWLEDGE** — Confirm the override request:
   > "You are asking to override [specific gate/rule]. I understand."
2. **RISK STATEMENT** — Present the specific risks clearly:
   - What artifact/review is being skipped
   - What problems can arise without it
   - What cannot be reverted once proceeding
3. **CONFIRM** — Ask the Founder to explicitly accept the risks:
   > "Do you confirm you accept these risks and authorize bypassing [gate]? Reply CONFIRM to proceed."
4. **RECORD** — Before proceeding, write to `docs/DECISIONS.md`:
   ```markdown
   ## YYYY-MM-DD — Gate Override Authorized
   **Gate bypassed:** GATE-0X
   **Authorized by:** Founder
   **Risks acknowledged:** [list of stated risks]
   **Date:** YYYY-MM-DD
   ```
5. **PROCEED** — Only after the DECISIONS.md entry is written.

---

## Gate Revocation & Cascade Policy

If a Founder revokes a previously approved gate due to scope/requirement changes:

1. Record revocation in `docs/DECISIONS.md`.
2. Apply the cascade rules:

| Revoked Gate | Downstream Impact |
|---|---|
| GATE-01 (Blueprint) | GATE-02, GATE-03, GATE-04 → `INVALIDATED`. Re-enter Phase 6. |
| GATE-02 (Prototype) | GATE-03, GATE-04 → `INVALIDATED`. Re-enter Phase 8-9. |
| GATE-03 (Architecture) | GATE-04 → `INVALIDATED`. Re-enter Phase 10-11. |
| GATE-04 (Impl Plan) | Production code suspended (`IN_PROGRESS` code paused). Re-enter Phase 12. |
| GATE-05 (Release) | Release suspended. Re-enter Phase 17. |
