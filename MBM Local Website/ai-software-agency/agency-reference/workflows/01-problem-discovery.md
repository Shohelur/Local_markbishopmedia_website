# Phase 1 — Problem Discovery

## Purpose
Deeply understand the problem before attempting to design or build anything.
This phase prevents building the wrong product.

## Role
Business Analyst · Product Strategist

## Inputs Required
- Founder's initial project idea or problem statement

## AI Actions

### Step 0: Confirm Project Directory (BEFORE creating any files)
After receiving initial answers, propose a project directory path OUTSIDE the Agency repository:

> "I'd like to initialize the project directory. Based on our discussion, I recommend:
>   Path: [suggested path OUTSIDE Agency repo] (e.g. C:\Projects\[project-name]\)
> Please confirm this path or specify a different location.
> I will not write any files until you confirm."

IMPORTANT: The project directory must be:
- Outside the Agency repo
- Its own independent directory that will become its own Git repo
- Confirmed explicitly by the Founder before any files are written

---

### Step 1: Acknowledge Without Coding
When the Founder introduces a new project idea, respond with:
- A professional acknowledgment
- Confirmation that the lifecycle will be followed
- A structured set of discovery questions

DO NOT write code. DO NOT suggest technology. DO NOT design features yet.

---

### Step 2: Ask Discovery Questions
Cover ALL of the following topics (adapt to the specific project):

**Problem & Need**
1. What specific problem are you trying to solve?
2. Who currently experiences this problem?
3. How are they solving it today? What are the pain points of the current solution?
4. What is the cost of NOT solving this problem?

**Target Users**
5. Who is the primary user of this product?
6. Are there secondary users or stakeholders?
7. What is the user's environment? (device, location, technical proficiency)
8. Are there any users who should NOT use this product?

**Business Context**
9. Is this an internal tool or a commercial product?
10. What is the business model? (SaaS, marketplace, service, internal tool, etc.)
11. Who are the main competitors or alternatives?
12. What is the unique differentiator?

**Scale, Capacity & Constraints**
13. How many users are expected at launch? In 1 year? In 3 years?
14. Are there regulatory, compliance, or legal requirements? (GDPR, HIPAA, etc.)
15. What is the approximate target launch timeline?
15b. What is the estimated monthly infrastructure / hosting budget range?
15c. Who will do the development work? (Solo founder, small team of N, agency) What is their tech stack experience?
16. Are there technology preferences or hard constraints?

**Success**
17. How will you measure success?
18. What does the MVP look like vs. the full vision?
19. What would make this project a failure?

---

### Step 3: Synthesize Findings
After receiving answers, produce a **Problem Discovery Summary** with:
- Problem statement (1 paragraph)
- Target users (brief)
- Current alternatives and their gaps
- Opportunity statement
- Key constraints (including infrastructure budget and development capacity)
- Open questions remaining

---

### Step 4: Phase Scope Confirmation
Before proceeding, confirm phase depth with the Founder:
> "By default, all lifecycle phases run at full depth. Do you want to:
>   A) Run all phases at full depth (Recommended)
>   B) Abbreviate specific phases (specify which and why)
> Reply A or B."

*Note: The AI cannot unilaterally decide to abbreviate phases.* Record answer in `docs/DECISIONS.md`.

---

### Step 5: Initialize Project Memory
Only AFTER Founder confirms the project directory path in Step 0:
Create the confirmed project directory structure and initialize:
- `docs/DECISIONS.md` — Record confirmed directory path and phase 1 findings
- `docs/PROJECT.md` — Initial draft with current phase set to Phase 1

---

## Artifacts Produced
- `docs/DECISIONS.md` — Initialized with confirmed path and phase 1 findings
- `docs/PROJECT.md` — Initial draft (updated on every phase completion)

---

## Completion Criteria
- [ ] Project directory confirmed with Founder OUTSIDE Agency repo
- [ ] All discovery questions answered (including budget and team capacity)
- [ ] Problem statement is clear and agreed upon
- [ ] Target users identified
- [ ] Key constraints documented
- [ ] Phase scope confirmed with Founder
- [ ] `DECISIONS.md` and `PROJECT.md` created in project repo
- [ ] Initial commit made in project repo

---

## Soft Phase Checkpoint
End Phase 1 with the Soft Checkpoint format defined in `.agents/plugins/ai-software-agency/agency-reference/approval-gates/APPROVAL-STATES.md`:
> "Ready to advance to Phase 2: Research? Reply PROCEED to continue, or provide feedback."

---

## Next Phase
→ `02-research.md`
