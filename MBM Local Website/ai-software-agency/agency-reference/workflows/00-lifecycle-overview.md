# Lifecycle Overview — All 21 Phases

## Purpose

This document provides a quick-reference map of the complete Agency lifecycle.
Detailed instructions for each phase are in individual workflow files.

---

## The Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│               DISCOVERY & STRATEGY                      │
│  Phase 1: Problem Discovery                             │
│  Phase 2: Research                                      │
│  Phase 3: Business Strategy                             │
│  Phase 4: Product Strategy                              │
│  Phase 5: Requirements                                  │
├─────────────────────────────────────────────────────────┤
│               PRODUCT DESIGN                            │
│  Phase 6: Product Blueprint          ← 🔒 GATE-01      │
│  Phase 7: UX / User Flows                               │
│  Phase 8: HTML Prototype                                │
│  Phase 9: Founder Review & GATE-02   ← 🔒 GATE-02      │
├─────────────────────────────────────────────────────────┤
│               TECHNICAL PLANNING                        │
│  Phase 10-11: Tech Architecture &    ← 🔒 GATE-03      │
│               Technology Evaluation                     │
│  Phase 12: Implementation Plan       ← 🔒 GATE-04      │
├─────────────────────────────────────────────────────────┤
│               PRODUCTION DEVELOPMENT                    │
│  Phase 13: Production Development                       │
│  Phase 14: Testing / QA                                 │
│  Phase 15: Security Review                              │
│  Phase 16: Staging / UAT                                │
│  Phase 17: Release Approval          ← 🔒 GATE-05      │
│  Phase 18: Production Release                           │
├─────────────────────────────────────────────────────────┤
│               POST-LAUNCH                               │
│  Phase 19: Documentation                                │
│  Phase 20: AI-Assisted Maintenance                      │
│  Phase 21: Future Versions / Iterations                 │
└─────────────────────────────────────────────────────────┘
```

---

## Phase Quick Reference

| # | Phase | Artifact(s) | Gate |
|---|---|---|---|
| 1 | Problem Discovery | `docs/PROJECT.md` & `docs/DECISIONS.md` initialized | — |
| 2 | Research | `docs/research.md` | — |
| 3 | Business Strategy | `docs/business-strategy.md` | — |
| 4 | Product Strategy | `docs/product-strategy.md` | — |
| 5 | Requirements | `docs/REQUIREMENTS.md` (FR-NNN traceability anchor) | — |
| 6 | Product Blueprint | `docs/PRODUCT-BLUEPRINT.md` | 🔒 GATE-01 |
| 7 | UX / User Flows | `docs/ux/user-flows.md`, `docs/ux/screen-map.md` | — |
| 8 | HTML Prototype | `prototype/` directory (branch `prototype/v1`) | — |
| 9 | Founder Review | Updated prototype & GATE-02 approval | 🔒 GATE-02 |
| 10-11 | Tech Architecture + Tech Eval | `docs/ARCHITECTURE.md` (combined phase) | 🔒 GATE-03 |
| 12 | Implementation Plan | `docs/IMPLEMENTATION-PLAN.md` | 🔒 GATE-04 |
| 13 | Production Development | `src/` (production code on `develop` branch) | — |
| 14 | Testing / QA | `docs/testing/test-plan.md`, test execution logs | — |
| 15 | Security Review | `docs/security/security-review.md` | — |
| 16 | Staging / UAT | UAT sign-off in `DECISIONS.md` | — |
| 17 | Release Approval | `docs/release-notes/v1.0.0.md`, draft `AI-MAINTENANCE.md` | 🔒 GATE-05 |
| 18 | Production Release | Deployed product, Git tag `<project>/v1.0.0` | — |
| 19 | Documentation | All docs finalized, `docs/AI-MAINTENANCE.md` verified | — |
| 20 | AI Maintenance | `docs/AI-MAINTENANCE.md` complete | — |
| 21 | Future Iterations | New version discovery begins | — |

*Note: Phases 10 and 11 are executed together as a single combined phase yielding GATE-03.*

---

## Starting a New Project

1. Founder introduces the project idea.
2. AI does NOT write code.
3. AI loads: `01-problem-discovery.md`
4. AI asks structured discovery questions.
5. AI proposes project directory OUTSIDE Agency repo (confirmed by Founder before writing files).
6. AI progresses phase by phase.

---

## Workflow File Naming

```
.agents/plugins/ai-software-agency/agency-reference/workflows/
├── 00-lifecycle-overview.md    ← This file
├── 01-problem-discovery.md
├── 02-research.md
├── 03-business-strategy.md
├── 04-product-strategy.md
├── 05-requirements.md
├── 06-product-blueprint.md
├── 07-ux-user-flows.md
├── 08-prototype.md
├── 09-founder-review.md
├── 10-technical-architecture.md
├── 11-technology-evaluation.md  ← (Stub referencing Phase 10)
├── 12-implementation-plan.md
├── 13-production-development.md
├── 14-testing-qa.md
├── 15-security-review.md
├── 16-staging-uat.md
├── 17-release-approval.md
├── 18-production-release.md
├── 19-documentation.md
├── 20-ai-maintenance.md
└── 21-future-iterations.md
```
