---
name: mbm-memory-bridge
description: >-
  Cross-session memory retrieval for Mark Bishop Media's Agentic OS. Activate 
  when the user asks about past decisions, previous work, client history, or 
  anything that happened in a previous session. Triggers on: "what did we decide",
  "last time", "remember when", "what was the plan for", "previous session", 
  "do you remember", "what client", "past audit", "earlier conversation".
---

# MBM Memory Bridge

This skill is the **memory recall system** for Antigravity IDE — inspired by Hermes Agent's
cross-session FTS5 search. It bridges Antigravity's per-session context with the persistent
memory stored in the Agentic OS file system.

---

## Memory Tiers (Search Order)

### Tier 0 — Current Session Context
Already loaded in this conversation. No action needed.

### Tier 1 — Working Memory File
Read: `d:\Agentic OS\agentic-os\context\MEMORY.md`

Contains active tasks, strict rules, and environment notes.
**Read this first** for anything related to current active projects.

### Tier 2 — User Profile
Read: `d:\Agentic OS\agentic-os\context\USER.md`

Contains Mark's preferences, working style, active projects, and tool setup.
Use when the question is about preferences, contact info, or project context.

### Tier 3 — Long-Term Learnings
Read: `d:\Agentic OS\agentic-os\context\learnings.md`

Contains accumulated knowledge from all past sessions, organized by skill area.
Search this for: past audit learnings, what worked/didn't work, past decisions.

### Tier 4 — GEMINI.md Rulebook
Read: `d:\Agentic OS\GEMINI.md`

Contains website project rules, approved milestones, and architecture decisions.
Use for anything related to the agency website project history.

---

## How to Use This Skill

1. Read the question/request carefully
2. Determine which tier is most likely to have the answer
3. Read that file and search for the relevant section
4. If not found, go to next tier
5. Always cite your source: "From MEMORY.md:", "From learnings.md:"
6. If nothing is found anywhere, say so clearly — never invent past context

---

## Writing New Memories (Hermes Learning Loop)

After any significant session, write key decisions/learnings to the appropriate file:

| What to save | Where |
|-------------|-------|
| Active task or rule | `agentic-os\context\MEMORY.md` (2,500 char cap — consolidate first) |
| Skill-specific learning | `agentic-os\context\learnings.md` under the right skill section |
| User preference change | `agentic-os\context\USER.md` — add under Notes |
| Website milestone | `GEMINI.md` — add under Milestones Completed |

**Always tell the user:** "Memory saved — will be active from next session."

---

## Memory Hygiene Rules

- MEMORY.md has a **2,500 character cap** — check before writing, consolidate if needed
- Never write secrets or API keys to memory files
- Always check for duplicates before appending
- Use date format: `YYYY-MM-DD` for all entries
- learnings.md entries are permanent — never delete, only add
