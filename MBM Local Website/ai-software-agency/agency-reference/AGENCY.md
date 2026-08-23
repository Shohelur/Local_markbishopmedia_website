# AI Software Agency — Architecture Overview

> **Version:** agency/v1.2.0  
> **Status:** Operational  
> **Repository:** `e:\AI Agent S\`  
> **Role:** Reusable AI Software Agency for building independent software products

---

## AGENCY IDENTITY

This workspace contains a **reusable AI Software Agency**. It is NOT a product itself.
It is an engine that governs how all software products are designed, built, and maintained.

The Agency supports building:
- Websites & Web Applications
- Mobile Applications (iOS / Android)
- CLI Tools, Services & Microservices
- AI-Native Applications (LLMs, RAG, Agents)

Each software product built by the Agency is an **independent project** with its own Git repository outside the Agency repo.

---

## 4-LAYER PRODUCTION ENGINEERING SKILL ARCHITECTURE

Starting in Agency v1.2.0, Phase 13 (Production Development) operates using a **4-Layer Skill Architecture**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ LAYER 4 — QUALITY & DELIVERY INTEGRATION                                │
│ testing-qa · security-review · git-workflow · ai-maintenance            │
├─────────────────────────────────────────────────────────────────────────┤
│ LAYER 3 — ON-DEMAND TECHNOLOGY STACK SKILLS (Activated via GATE-03)     │
│ tech-nextjs · tech-react · tech-python-fastapi · tech-postgresql · etc. │
├─────────────────────────────────────────────────────────────────────────┤
│ LAYER 2 — PLATFORM & AI CAPABILITY SKILLS                               │
│ web-frontend-dev · web-backend-dev · mobile-app-dev · cli-service-dev    │
│ ai-application-development (conditional)                                │
├─────────────────────────────────────────────────────────────────────────┤
│ LAYER 1 — COMMON ENGINEERING SKILLS (Mandatory core for Phase 13)       │
│ production-engineering · api-integration · database-engineering       │
└─────────────────────────────────────────────────────────────────────────┘
```

### Skill Activation Logic
The AI resolves active production skills in Phase 13 from:
`Project Type + Approved Architecture (GATE-03) + Active Milestone Task`

- **Website / Web App Consolidation:** `web-frontend-dev` governs frontend UI for both marketing websites and complex web applications. `web-backend-dev` is loaded only when backend server logic is required.
- **AI Capability:** `ai-application-development` is loaded when architecture includes LLMs, RAG, agentic loops, or model APIs.
- **Missing Tech Skill Protocol:** If an approved technology lacks a dedicated `tech-*` skill, the AI uses Layer 1 & Layer 2 skills, documents the limitation in `docs/DECISIONS.md`, and recommends creating the skill for future projects. Never invents fake skills or blocks unnecessarily.

---

## REPOSITORY STRUCTURE

```
e:\AI Agent S\
├── .agents/                   ← Auto-loaded by Antigravity
│   ├── AGENTS.md              ← Master rules (auto-loaded every session)
│   └── skills/                ← Auto-discovered skills
│       ├── production-engineering/   [Layer 1 Core]
│       ├── api-integration/          [Layer 1 Core]
│       ├── database-engineering/     [Layer 1 Core]
│       ├── web-frontend-dev/         [Layer 2 Platform]
│       ├── web-backend-dev/          [Layer 2 Platform]
│       ├── mobile-app-dev/           [Layer 2 Platform]
│       ├── cli-service-dev/          [Layer 2 Platform]
│       ├── ai-application-development/ [Layer 2 AI Capability]
│       ├── product-blueprint/
│       ├── ux-design/
│       ├── html-prototype/
│       ├── technical-architecture/
│       ├── technology-evaluation/
│       ├── git-workflow/
│       ├── security-review/
│       ├── testing-qa/
│       ├── ai-maintenance/
│       └── tech-stack/              [Layer 3 On-Demand Tech Skills]
│           ├── tech-nextjs/
│           ├── tech-react/
│           ├── tech-python-fastapi/
│           ├── tech-postgresql/
│           ├── tech-react-native/
│           └── tech-supabase/
│
├── .agency/                   ← Agency engine
│   ├── AGENCY.md              ← This file
│   ├── rules/                 ← Behavioral rules (7 rules)
│   ├── workflows/             ← Phase workflow instructions (21 phases)
│   ├── templates/             ← Reusable document templates
│   └── approval-gates/       ← Gate definitions and criteria
│
├── test-projects/             ← Agency testing only (NOT real projects)
└── README.md
```

---

## KEY PRINCIPLES

1. **Founder Authority** — Founder is always the final decision maker.
2. **No Code Before Approval** — All 4 major gates (GATE-01 through GATE-04) must be approved before production code.
3. **Phase Discipline** — Phases complete in order with defined criteria.
4. **Approval Gates** — Hard stops at GATE-01 through GATE-05.
5. **Git First** — Every milestone committed; recovery checkpoints before risky changes.
6. **Project Memory** — All decisions in durable files, not chat.
7. **AI Maintenance** — Every release ships an `AI-MAINTENANCE.md`.
8. **Project Isolation** — Agency and project knowledge never mixed.

---

## VERSIONING

- `agency/v1.0.0` — Initial operational release
- `agency/v1.1.0` — Audit remediation release (33 findings fixed)
- `agency/v1.2.0` — Production Engineering Skill Architecture release
