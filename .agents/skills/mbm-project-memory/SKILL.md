---
name: mbm-project-memory
description: >-
  Hermes-inspired self-improving project memory for the agency website. Activate 
  after completing any significant website work (new section, animation fix, layout 
  change) to log learnings and update the knowledge base. Also activates when user 
  asks "what did we learn", "save this to memory", "remember this pattern", 
  "log this decision", "update the project notes".
---

# MBM Project Memory — Self-Improving Knowledge Loop

This skill is directly inspired by Hermes Agent's **Closed Learning Loop**.
After every complex task, the agent captures what it learned, what worked, and what to avoid next time.
Over time, this makes every session smarter than the last.

---

## When to Activate This Skill

Automatically consider activating after:
- Completing a new website section (Phase 2, Phase 3, etc.)
- Fixing a complex animation or 3D bug
- Making an architecture decision that affects future sections
- Discovering a new pattern or technique that works well
- Making a mistake that should never happen again

---

## What to Capture

### 1. Technical Patterns (What Works)

Format: `[YYYY-MM-DD] [Section/Feature]: [What works and why]`

Examples:
- `2026-08-26 Hero Buying System: clock.getDelta() inside the animate() loop returns 0 after the first frame. Use clock.getElapsedTime() and derive deltas manually instead.`
- `2026-08-26 Radar Studio: Math.hypot(W,H) gives the screen diagonal — always use this for beam lengths so they reach every corner at every angle.`

### 2. Mistakes to Avoid

Format: `[YYYY-MM-DD] [Section/Feature]: [What broke and the root cause]`

Examples:
- `2026-08-27 Master File Injection: Regex-based string injection in large HTML files causes SyntaxError if the regex matches inside a JS string. Always use specific literal string markers instead.`

### 3. Architecture Decisions

Format: `[YYYY-MM-DD] DECISION: [What was decided and why. Do not reverse without discussion.]`

---

## Where to Write

| Type of learning | File to update |
|-----------------|---------------|
| Website technical pattern | `GEMINI.md` → Section 3 (Anti-Breakage Rules) or a new Section 6 |
| Bug fix / mistake to avoid | `agentic-os/context/learnings.md` → `## mbm-project-memory` |
| Architecture decision | `GEMINI.md` → Section 4 (Active Project Context) |
| General cross-project learning | `agentic-os/context/learnings.md` → `# General` |

---

## Memory Write Protocol

Before writing to `MEMORY.md`:
1. Read the file first
2. Check character count — cap is **2,500 characters**
3. If writing would exceed cap, consolidate similar entries first
4. Only then append the new entry
5. Tell the user: "Memory saved — active from next session."

---

## Session Wrap-Up Checklist (Run at end of major work sessions)

- [ ] Did we make any architecture decisions that affect future sections?
- [ ] Did we discover any techniques or patterns worth preserving?
- [ ] Did we hit any bugs or regressions? What caused them?
- [ ] Did we complete or lock any milestones? (Update GEMINI.md roadmap)
- [ ] Are there any open questions that need user input next session?

---

## Self-Improvement Rule (Hermes Core Concept)

This skill improves itself. When a new pattern is discovered that specifically relates
to how this skill should behave (e.g., a better place to store certain types of learnings),
add a note to the `## Notes` section below.

## Notes

- 2026-08-30: Initial version created. Covers agency website technical patterns, bug learnings, and architecture decisions.
- 2026-08-30: Radar prototype learnings: always test scan beam with Math.hypot for diagonal coverage before finalizing design.
