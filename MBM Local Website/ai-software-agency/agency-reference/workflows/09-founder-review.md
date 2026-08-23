# Phase 9 — Founder Review & GATE-02 Approval

## Purpose
Facilitate Founder review of the prototype, collect and implement feedback, re-verify in browser, and obtain formal GATE-02 approval.

## Role
Product Manager (facilitating review) · Prototype Developer (revising)

## Inputs Required
- Phase 8: Completed HTML Prototype (`prototype/`)

---

## Prototype Review State Machine

```
[Phase 8 Entry: READY_FOR_REVIEW]
         │
         ▼
  (Founder Reviews)
         │
         ├── Feedback given ──► [CHANGES_REQUESTED]
         │                              │
         │                         (AI implements fixes)
         │                              │
         │                              ▼
         │                     [READY_FOR_REVIEW] ──┐ (loop)
         │                                         │
         └── No changes needed / All fixes done ───┘
                         │
                         ▼
             [Founder Browser Re-Test]
                         │
                         ▼
                [Present GATE-02] ──► [APPROVED]
```

---

## AI Actions

### Step 1: Facilitate Structured Review
Present the review walkthrough questions to the Founder:
1. Walk through [Primary User Journey]. Does this match your vision?
2. Does the navigation structure feel logical?
3. Are any screens or states missing?
4. Does the visual design direction feel right for the target audience?
5. Is anything preventing a real user from succeeding?
6. Are any flows confusing or unintuitive?
7. Is the sample data realistic enough to evaluate the design?

### Step 2: Collect and Categorize Feedback
Categorize all received feedback in `docs/DECISIONS.md`:
- **Must Fix Before Approval**: Critical flow errors or missing screens
- **Should Fix Before Approval**: Confusing UX or missing key states
- **Nice to Have**: Minor visual polish
- **Future Scope**: Ideas for post-v1 versions

### Step 3: Implement Required Changes
For all "Must Fix" and "Should Fix" items:
1. Revise prototype HTML/CSS/JS files on branch `prototype/v1`
2. Commit: `fix(prototype): address Founder review feedback - [summary]`
3. Request Founder browser re-test:
   > "Fixes applied! Please open `prototype/index.html` in your browser to verify changes. Reply 'BROWSER TEST PASSED' when verified."

### Step 4: Present GATE-02 (ONLY after all fixes done & re-tested)
ONLY when all Must-Fix and Should-Fix items are resolved AND Founder has confirmed browser re-test:

```
╔══════════════════════════════════════════════════════════╗
║  🔒 APPROVAL GATE: GATE-02 — Prototype Approval         ║
║                                                          ║
║  Phase Completed: Founder Review (Phase 9)               ║
║  Artifact: prototype/index.html                          ║
║                                                          ║
║  All review feedback has been incorporated and verified.║
║  Reply APPROVED to clear GATE-02 and unlock Architecture.║
║  Reply with feedback if additional changes are needed.   ║
╚══════════════════════════════════════════════════════════╝
```

---

## Prototype Archival (Upon GATE-02 Approval)

DO NOT merge `prototype/v1` into `develop` or `main`.

Tag the prototype branch for archival:
```bash
git tag -a <project>/prototype-v1 -m "Approved prototype — GATE-02 cleared"
```

The prototype lives exclusively in its dedicated branch as a design reference.
Production development begins fresh on `develop` in Phase 13.

---

## Artifacts Produced
- Revised `prototype/` files (on `prototype/v1`)
- Categorized review notes in `docs/DECISIONS.md`
- Git tag `<project>/prototype-v1`

---

## Completion Criteria
- [ ] Founder walked through major user journeys
- [ ] Feedback collected and categorized in `DECISIONS.md`
- [ ] All Must-Fix and Should-Fix items implemented and verified
- [ ] Founder confirmed browser re-test ("BROWSER TEST PASSED")
- [ ] GATE-02 explicitly APPROVED by Founder
- [ ] Git tagged `<project>/prototype-v1` (prototype branch NOT merged)
- [ ] `docs/PROJECT.md` updated with GATE-02 approval

---

## Next Phase
→ `10-technical-architecture.md` (GATE-03 follows)
