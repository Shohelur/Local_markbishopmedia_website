# Phase 13 — Production Development

## Purpose
Implement the production application according to the approved architecture
and implementation plan. This is where real application code is written.

## ⚠️ PREREQUISITE: ALL 4 GATES MUST BE CLEARED

Before writing a single line of production application code, verify:
- [ ] GATE-01: Product Blueprint — APPROVED ✅
- [ ] GATE-02: Prototype — APPROVED ✅
- [ ] GATE-03: Architecture — APPROVED ✅
- [ ] GATE-04: Implementation Plan — APPROVED ✅

If ANY gate is not cleared, DO NOT write production code.

## Role
Senior Software Engineer

## Inputs Required
- All prior approved documents (`docs/REQUIREMENTS.md`, `docs/PRODUCT-BLUEPRINT.md`, `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION-PLAN.md`)
- GATE-04 cleared

---

## 4-Layer Engineering Skill Resolution Engine

Upon entering Phase 13, the AI resolves active production skills using this 4-layer resolution engine:

```
1. LAYER 1 (Core Engineering): Always active
   • production-engineering (orchestration, logging, config, debugging)
   • api-integration (active if product has API / backend contracts)
   • database-engineering (active if product has SQL / NoSQL database)

2. LAYER 2 (Platform Capability): Active based on project type & architecture
   • web-frontend-dev (active for websites & web applications)
   • web-backend-dev (active ONLY if backend server logic is required)
   • mobile-app-dev (active for iOS / Android mobile applications)
   • cli-service-dev (active for CLI tools, daemons, background workers)
   • ai-application-development (active if architecture includes LLMs, RAG, agentic loops, AI APIs)

3. LAYER 3 (Tech Stack Skills): Active ONLY for technologies selected in GATE-03 (docs/ARCHITECTURE.md)
   • tech-nextjs, tech-react, tech-python-fastapi, tech-postgresql, tech-react-native, tech-supabase, etc.
   • Unselected technology skills remain INACTIVE to minimize token overhead.

4. LAYER 4 (Quality & Delivery Integration): Active across milestones
   • testing-qa (unit, integration, and E2E test execution)
   • security-review (auth validation, secret checks, input sanitization)
   • git-workflow (feature branches, milestone commits, recovery checkpoints)
```

---

## Missing Technology Skill Protocol

If `docs/ARCHITECTURE.md` selects a technology for which no dedicated `.agents/skills/tech-stack/tech-<name>` skill currently exists:

1. **DO NOT invent a fake skill.**
2. **DO NOT silently substitute a different technology.**
3. **DO NOT block the project unnecessarily.**
4. **Action:** Proceed using Layer 1 (`production-engineering`) and Layer 2 platform skills (`web-frontend-dev`, `web-backend-dev`, etc.), referencing standard official documentation for the technology.
5. **Log Limitation:** Record in `docs/DECISIONS.md`:
   ```markdown
   ## YYYY-MM-DD — Missing Technology Skill Identified
   Technology: [Technology Name]
   Status: No dedicated tech skill in Agency library.
   Action: Implemented using Layer 1 & Layer 2 skills + official documentation.
   Recommendation: Consider creating `.agents/skills/tech-stack/tech-[name]` for future projects.
   ```

---

## AI Actions

### Development Process

#### For Each Milestone (from Implementation Plan):

**1. Announce Milestone Start & Active Skills**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ MILESTONE [N] — [Milestone Name]
Active Platform Skills: [e.g. web-frontend-dev, web-backend-dev]
Active Tech Skills:     [e.g. tech-nextjs, tech-postgresql]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**2. Create Feature Branch**
```bash
git checkout -b feature/<milestone-name>
```

**3. Implement Tasks**
- Follow approved `docs/ARCHITECTURE.md` strictly
- Enforce standards from `production-engineering` and active tech skills
- Trace every feature to `FR-NNN` requirements in `docs/REQUIREMENTS.md`
- Write tests alongside code (not after)
- Commit frequently with meaningful messages (`feat(<project>): ...`)

**4. Create Recovery Checkpoint Before Risky Operations**
Before any database migration, core refactor, or dependency upgrade:
```bash
git add -A
git commit -m "checkpoint(<project>): stable state before <risky-operation>"
```
Record hash in `docs/DECISIONS.md`.

**5. Test Milestone**
- Run all unit and integration tests using actual terminal execution
- Capture execution output in `docs/testing/logs/`

**6. Complete Milestone**
- Merge feature branch to `develop`
- Commit: `feat(<project>): complete milestone N — <name>`

---

## Architecture Deviation Protocol (Mini-GATE-03)

During development, if the Founder requests a change that deviates from the approved `docs/ARCHITECTURE.md`:
1. **IDENTIFY** the deviation from approved architecture.
2. **ASSESS** impact on timeline, budget, security, and dependent components.
3. **PAUSE** — do not implement the deviation immediately.
4. **PRESENT** a mini-decision proposal to the Founder.
5. **CONFIRM** — Demand explicit Founder `CONFIRM`.
6. **RECORD** in `docs/DECISIONS.md` before writing code.
7. **UPDATE** `docs/ARCHITECTURE.md` to reflect the approved change.

---

## Code Standards During Development

All production application code must:
- Follow language/framework conventions defined in implementation plan and active tech skills
- Handle errors gracefully (no silent failures)
- Include structured logging
- Pass linting/formatting checks
- Maintain ≥80% test coverage for business logic
- **Zero hardcoded secrets, credentials, or production values**

---

## Artifacts Produced
- `src/` — Production application code (on `develop` branch)
- `tests/` — Automated test suite
- `docs/testing/logs/` — Test execution logs

---

## Completion Criteria
- [ ] All MVP milestones complete (tracing to FR-NNN requirements)
- [ ] Milestone 0 Environment Setup verified on staging
- [ ] All tests passing with execution logs
- [ ] Zero hardcoded secrets
- [ ] Missing tech skills (if any) documented in `DECISIONS.md`
- [ ] `docs/PROJECT.md` updated with Phase 13 completion
- [ ] Ready for Testing/QA phase (Phase 14)

---

## Next Phase
→ `14-testing-qa.md`
