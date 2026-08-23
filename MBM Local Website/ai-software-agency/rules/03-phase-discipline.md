# Rule 03 — Phase Discipline

## Statement

The Agency lifecycle has 21 defined phases that must be completed in order.
Phases must not be casually skipped, merged, or reordered without deliberate
Founder instruction.

## Completion Criteria

A phase is only complete when ALL of the following are true:

1. All required artifacts for the phase are produced.
2. All artifacts are reviewed and meet quality standards.
3. Any required Founder approval has been explicitly given.
4. The completion is committed to Git with an appropriate commit message.
5. The project's `DECISIONS.md` is updated with the phase outcome.

Creating files ≠ completing a phase.

## Phase Sequencing Rules

### Forward Progression
- Phases progress forward in the defined order.
- The AI must explicitly announce when moving from one phase to the next.
- The announcement must reference the phase number and name.

### Phase Scope
All phases run at full depth by default.

Phase scope may **only** be reduced if:
1. The Founder **explicitly** requests it (e.g., "Can we move through Research quickly?")
2. The AI confirms which specific items will be abbreviated and why
3. The Founder **explicitly** confirms the abbreviated approach
4. The abbreviation is recorded in `DECISIONS.md`

The AI may **NEVER** unilaterally decide a domain is "well-understood" and reduce
phase scope without explicit Founder direction.

Skipping or merging phases entirely requires explicit Founder instruction and
must be logged in `DECISIONS.md`.

### Returning to Previous Phases
If new information requires revisiting a previous phase:
- Announce that a phase is being revisited and why.
- Update the relevant artifacts.
- Commit the changes with a clear message.
- If the revisited phase had a gate, the gate must be re-approved if the
  changes are significant.

## Missing Information

If a phase cannot proceed because required information is missing:
- STOP
- List exactly what information is needed
- Ask the Founder for it
- DO NOT invent the missing information
- DO NOT proceed with assumptions that could invalidate future work

## Phase Announcements

At the start of each phase, display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ PHASE [N] — [PHASE NAME]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

At the completion of each phase, display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PHASE [N] COMPLETE — [PHASE NAME]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Soft Phase Checkpoint Protocol (Non-Gated Phases)

For phases **without** a hard gate (Phases 1, 2, 3, 4, 5, 7, 9), the AI MUST
end each phase with a Soft Checkpoint before advancing:

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
Reply PROCEED to continue, or provide feedback to revise this phase.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**"PROCEED"** or an equivalent explicit advancement instruction is required.
Ambiguous responses ("okay", "sure", "fine") do NOT authorize advancement.
Record the Founder's PROCEED in `DECISIONS.md`.

## Disagreement Protocol (Non-Gated Phases)

If the Founder disagrees with the findings or artifacts of a non-gated phase:
1. Re-enter the current phase
2. Address the concern specifically
3. Re-present the updated artifacts
4. Record the disagreement and resolution in `DECISIONS.md`
5. Repeat until the Founder issues a PROCEED

Do NOT advance to the next phase while disagreement is unresolved.
