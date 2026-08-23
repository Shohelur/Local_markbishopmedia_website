# Approval State Model — Canonical Reference

> **File:** `.agents/plugins/ai-software-agency/agency-reference/approval-gates/APPROVAL-STATES.md`
> **Authority:** This is the single canonical definition of all approval states
> used by gates, phases, and workflows across the Agency.
> All gate and workflow files defer to this definition.

---

## State Definitions

| State | Meaning | Who Sets It |
|---|---|---|
| `LOCKED` | Prerequisites not met; work on this phase/gate may not begin | System (automatic when prior gate is not APPROVED) |
| `IN_PROGRESS` | Phase is actively being worked | AI (on phase entry) |
| `READY_FOR_REVIEW` | Artifacts complete; presented to Founder for review | AI (when phase completion criteria met) |
| `CHANGES_REQUESTED` | Founder provided feedback; AI must revise | Founder (via explicit feedback) |
| `APPROVED` | Founder gave explicit approval; gate cleared | Founder (via explicit confirmation) |
| `INVALIDATED` | A prior approval has been formally revoked; downstream work suspended | Founder (via explicit revocation) |
| `BLOCKED` | Required information is missing; AI cannot proceed | AI (when unable to complete phase after 2 rounds of clarification) |
| `SUPERSEDED` | A newer version of this artifact replaces this one | AI (when re-entering a phase to revise after revocation) |

---

## Gate Lifecycle Diagram

```
[LOCKED]
   │ (prerequisites met)
   ▼
[IN_PROGRESS]
   │ (artifacts complete, phase criteria met)
   ▼
[READY_FOR_REVIEW]  ◄─────────────────────────────────┐
   │                                                    │
   ├── Founder provides feedback ──► [CHANGES_REQUESTED]
   │                                         │
   │                                    (AI revises)
   │                                         │
   │                                         └──────────┘ (loop)
   │
   └── Founder approves ──► [APPROVED]
                                │
                           (later, if major change)
                                │
                           Founder revokes ──► [INVALIDATED]
                                                    │
                                         downstream gates → [LOCKED or INVALIDATED]
                                                    │
                                           re-enter phase → [IN_PROGRESS]
```

---

## Approval Rules

### What Constitutes Approval (APPROVED state)
Explicit, unambiguous Founder confirmation referencing the gate or artifact.
Examples that DO count as approval:
- "APPROVED"
- "Approved — proceed to Phase 7"
- "Gate-01 approved, move forward"
- "Yes, I approve the blueprint"

### What Does NOT Constitute Approval
The following responses are **ambiguous** and must NOT set state to APPROVED.
The AI must ask for clarification before proceeding:
- "Okay" / "Ok" / "K"
- "Sure" / "Sure thing" / "Sounds good"
- "Looks fine" / "Looks good" / "Looks right"
- "I guess" / "I suppose"
- "Whatever you think" / "Up to you"
- "Yeah" / "Yep" / "Mm-hmm"
- Any non-verbal or unclear response

When an ambiguous response is received at a gate:
> "To confirm — are you explicitly APPROVING [GATE-0X] and authorizing
> me to proceed to [next phase]? Reply APPROVED to confirm."

---

## BLOCKED State Entry Procedure

When any phase or skill enters BLOCKED state, the AI MUST:

1. Display this banner:
```
╔══════════════════════════════════════════════════════════╗
║  ⛔ BLOCKED — [Phase Name / Skill Name]                 ║
║                                                          ║
║  Cannot proceed. Missing required information:           ║
║  • [Specific item 1]                                     ║
║  • [Specific item 2]                                     ║
║                                                          ║
║  Options:                                                ║
║  A) Provide the missing information                      ║
║  B) Defer with explicit out-of-scope rationale           ║
║     (item marked TBD — must resolve before gate)        ║
║  C) Return to Phase [N] to gather this information       ║
╚══════════════════════════════════════════════════════════╝
```

2. List precisely which section/item is blocked and exactly what is needed
3. STOP — take no further action until Founder responds
4. Record the BLOCKED state in `docs/DECISIONS.md`

### Forbidden in BLOCKED State
- ❌ Do NOT invent information to fill gaps
- ❌ Do NOT mark sections complete with placeholder content
- ❌ Do NOT present a gate while any section is BLOCKED or TBD
- ❌ Do NOT proceed to the next phase

---

## Soft Phase Checkpoint (Non-Gated Phases)

For phases 1, 2, 3, 4, 5, 7, and 9, the AI ends each phase with:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PHASE [N] — COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Artifacts produced:
  • [file path 1]
  • [file path 2]

Key decisions made:
  • [Decision 1]
  • [Decision 2]

Ready to advance to Phase [N+1]: [Phase Name]?
Reply PROCEED to continue, or provide feedback to revise.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**"PROCEED"** or an equivalent explicit advancement instruction is required.
"Okay," "Sure," or silence does NOT constitute advancement authorization.

---

## DECISIONS.md Entry Formats

### Gate Approval Entry
```markdown
## YYYY-MM-DD — [Gate Name] Approved
**Gate:** GATE-0X
**State:** APPROVED
**Artifact reviewed:** [file path]
**Approved by:** Founder
**Notes:** [any conditions or deferred items]
```

### Gate Invalidation Entry
```markdown
## YYYY-MM-DD — [Gate Name] Invalidated
**Gate:** GATE-0X
**Previous state:** APPROVED
**New state:** INVALIDATED
**Reason:** [Founder's stated reason]
**Downstream impact:**
  - GATE-0Y → INVALIDATED
  - GATE-0Z → LOCKED
  - Phase [N] → re-entered (IN_PROGRESS)
**Authorized by:** Founder
```

### Phase Blocked Entry
```markdown
## YYYY-MM-DD — Phase [N] BLOCKED
**Phase:** [Phase Name]
**State:** BLOCKED
**Missing information:**
  - [Item 1]
  - [Item 2]
**Options presented to Founder:** A / B / C
**Founder response:** [pending / response recorded here]
```
