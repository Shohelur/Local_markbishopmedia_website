# 🏢 Local Business AI

> **Production-ready AI platform for generating comprehensive Local Business Reports.**
> Designed to be model-agnostic — supporting Google Antigravity and other AI engines.

---

## 🎯 Platform Purpose

Local Business AI automates the analysis and reporting of a local business's digital presence. The system analyzes a business, identifies the most important weaknesses and opportunities affecting its local online presence, compares the business with 1-2 relevant local competitors, and produces a concise, visually impressive, evidence-based report.

It evaluates businesses across the following core modules:
1. Citation Audit
2. GBP Audit
3. Review Audit
4. Google Maps Competitor Analysis
5. Website Audit (Conditional based on findings)

---

## 📁 Project Structure

The project is logically organized into the following areas:

```
local-business-ai/
├── skills/          # Reusable, atomic AI skill modules for research, analysis, and output
├── rules/           # Global business rules, scoring frameworks, compliance constraints
├── shared/          # Platform-wide utilities and helpers
├── schemas/         # Data models for the Master Audit Object
├── prompts/         # Model-agnostic LLM instruction templates
├── audit-data/      # Raw and processed outputs from audits
├── reports/         # Finalized, client-facing PDF/interactive deliverables
└── docs/            # Developer documentation and system architecture notes
```

---

## 🏗️ Master Data Architecture

The system uses a structured **Master Audit Object** as the central source of truth. Data flows sequentially through isolated components:
`Research → Evidence → Validation → Analysis → Priority → Master Data → Report → PDF`

Components of the Master Object include:
- `business`, `audit`, `evidence`, `citations`, `gbp`, `reviews`, `competitors`, `website`
- `findings`, `strengths`, `health`, `priorities`, `growth_opportunities`, `service_recommendations`, `action_plan`, `report`

---

## ⚙️ Planned Skill Architecture

### Core Research / Analysis
- `business-intake`
- `citation-research`
- `citation-analysis`
- `gbp-audit`
- `review-analysis`
- `competitor-analysis`
- `website-audit`

### Quality / Intelligence
- `evidence-validator` (Enforces FACT → INTERPRETATION → RECOMMENDATION)
- `priority-engine` (Scores findings on Impact, Confidence, Gap, Urgency, Fixability, Relevance)

### Output
- `report-writer`
- `report-designer`
- `pdf-generator`

### Orchestration
- `audit-orchestrator`

---

## 🛡️ Core Principles

1. **Output Separation**: Research skills research. Analysis skills analyze. Report writer writes. PDF generator generates.
2. **Top 5 Rule**: Reports focus on a maximum of 5 overall top priorities.
3. **No Fake Problems**: We never manufacture a problem to sell a service. Strengths are acknowledged.
4. **Efficiency**: Max 1-2 competitors, reuse verified evidence, conditional website audits.

For full architectural details, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).
