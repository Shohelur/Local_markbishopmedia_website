---
name: technical-architecture
description: >
  Guides the creation of a comprehensive technical architecture document.
  Activate when working on Phase 10-11 of the Agency lifecycle, when designing
  the system architecture, evaluating technology choices, or producing an
  ARCHITECTURE.md document for a project.
---

# Skill: Technical Architecture

## Overview
This skill governs the creation of a professional technical architecture document
that covers all layers of the system and recommends technology choices with
CTO-advisor-level rigor.

## Role When This Skill Is Active
Senior Software Architect · CTO Advisor

---

## Prerequisite Input Verification
Before beginning architecture design, verify:
- [ ] Phase 6 Approved Product Blueprint (GATE-01 cleared)
- [ ] Phase 9 Approved Prototype (GATE-02 cleared)
- [ ] Infrastructure budget range from Phase 1 discovery (e.g. $X/month)
- [ ] Development team size & technical capacity from Phase 1 discovery

If budget or team size is missing, ask the Founder before recommending technologies.

---

## Mandatory Evaluation Framework
For EVERY major technology decision, apply this framework:

### Evaluation Criteria
| Criterion | Questions to Answer |
|---|---|
| Functional fit | Does it meet the project's specific requirements? |
| Performance | Can it handle expected scale and load? |
| Security | Are there known vulnerabilities or security concerns? |
| Maintainability | How easy is it to update, debug, and extend? |
| Developer experience | How steep is the learning curve? |
| Community & support | Is it actively maintained? Is help available? |
| Cost | What are licensing, hosting, and operational costs? |
| Vendor lock-in | How hard is it to migrate away? |
| Future extensibility | Can it grow with the product? |
| AI integration | Does it support AI/LLM patterns if needed? |

### Output Format Per Technology Decision
```markdown
## [Layer/Category] — Technology Decision

### ✅ Recommended: [Technology Name] v[version]
**Why this project specifically:** [Project-specific rationale]
**Key strengths for this use case:**
- [Strength 1]
- [Strength 2]
**Known tradeoffs:**
- [Tradeoff 1]
**Risk level:** Low / Medium / High

### Alternatives Evaluated
| Alternative | Score | Reason Not Selected |
|---|---|---|
| [Alt 1] | 6/10 | [Specific reason for rejection] |
| [Alt 2] | 5/10 | [Specific reason for rejection] |

### ❌ Do Not Use: [Technology] (if applicable)
**Reason:** [Clear, specific reason this is wrong for this project]
```

---

## Architecture Layers to Cover & Phase 13 Skill Mapping

| Architecture Layer | Recommended Section | Maps to Phase 13 Skill(s) |
|---|---|---|
| 1. System Overview | §1 | `production-engineering` (Layer 1) |
| 2. Frontend | §2 | `web-frontend-dev` or `mobile-app-dev` (Layer 2) + `tech-[framework]` (Layer 3) |
| 3. Backend | §3 | `web-backend-dev` or `cli-service-dev` (Layer 2) + `tech-[framework]` (Layer 3) |
| 4. Database & Caching | §4 | `database-engineering` (Layer 1) + `tech-[db]` (Layer 3) |
| 5. Auth & Security | §5 | `web-backend-dev` (Layer 2) + `security-review` (Layer 4) + `tech-[auth]` (Layer 3) |
| 6. APIs | §6 | `api-integration` (Layer 1) |
| 7. Storage | §7 | `database-engineering` / `web-backend-dev` |
| 8. AI / LLM Integration | §8 | `ai-application-development` (Layer 2 AI) + `tech-[ai-provider]` (Layer 3) |
| 9. Infrastructure & Hosting | §9 | `tech-[cloud/docker]` (Layer 3) |
| 10. Monitoring & Security | §10–11 | `production-engineering` (Layer 1) + `security-review` (Layer 4) |
| 11. Testing Architecture | §12 | `testing-qa` (Layer 4) |

*Note: If an approved technology does not have a dedicated Layer 3 skill in `.agents/skills/tech-stack/`, Phase 13 executes using Layer 1 & 2 skills and logs the missing skill recommendation per the Missing Technology Skill Protocol.*

---

## Architecture Document Template
Use the template at: `.agents/plugins/ai-software-agency/agency-reference/templates/architecture-proposal.md`

---

## Gate Presentation (L-3 Mandate)

At the conclusion of this skill, display the GATE-03 banner **exactly** as defined in `.agents/plugins/ai-software-agency/agency-reference/approval-gates/GATES.md`:

```
╔══════════════════════════════════════════════════════════╗
║  🔒 APPROVAL GATE: GATE-03 — Technical Architecture     ║
║                                                          ║
║  Phase Completed: Architecture + Tech Eval (Phase 10-11) ║
║  Artifact: docs/ARCHITECTURE.md                          ║
║                                                          ║
║  Please review the architecture document above.          ║
║  Reply APPROVED to proceed to Implementation Plan.       ║
║  Reply with feedback to request changes.                 ║
╚══════════════════════════════════════════════════════════╝
```

Do NOT proceed to Phase 12 until GATE-03 has been explicitly APPROVED by the Founder.
