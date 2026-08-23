---
name: audit-orchestrator
description: "Central orchestration engine that coordinates the 13-stage local business audit pipeline from intake to final web report and PDF. The web report is the primary client deliverable; PDF is secondary."
---

# Audit Orchestrator Skill

## 1. Purpose
The `audit-orchestrator` is the central operational conductor of the Local Business AI platform. It connects specialized research, analysis, validation, prioritization, narrative, and rendering skills into a unified, reliable, traceable, and token-efficient execution pipeline. The conductor does not perform research — it coordinates, enforces order, and manages state.

## 2. Scope
- **IN SCOPE:** Canonical business context establishment. Enforcing the mandatory 13-step execution order. Evaluating the conditional Website Audit Trigger Gate. Enforcing the 2-competitor maximum limit. Managing the central Master Audit Object. Preserving the end-to-end evidence graph (`evidence_ids`). Handling fail-soft error boundaries. Supporting stage-level caching and resume capabilities. Invoking the Web Report Generator (primary) and PDF Generator (secondary).
- **OUT OF SCOPE:** Direct SEO research or citation analysis. Calculating mathematical priority scores. Writing client narrative text. Designing visual layout components. Fabricating placeholder data.

## 3. Mandatory 13-Stage Execution Sequence

| Step | Stage Name | Output Schema / Entity | Role |
|---|---|---|---|
| 1 | `business_context` | `business_context` | Establishes canonical NAP and profile identity |
| 2 | `citation_research` | `schemas/citation_research.json` | Discovers foundational, industry, and local listings |
| 3 | `citation_analysis` | `schemas/citation_analysis.json` | Analyzes coverage, consistency, and completeness |
| 4 | `gbp_audit` | `schemas/gbp_audit.json` | Audits GBP completeness, services, and categories |
| 5 | `review_analysis` | `schemas/review_analysis.json` | Evaluates volume, rating, themes, and CX sentiment |
| 6 | `competitor_analysis`| `schemas/competitor_analysis.json` | Benchmarks 1–2 local competitors for key gaps |
| 7 | `website_gate` / `website_audit` | `schemas/website_audit.json` | Conditional gate: audits website if recommended |
| 8 | `evidence_validation`| `schemas/evidence_validation.json` | Quality control gate: validates facts & claim safety |
| 9 | `priority_engine` | `schemas/priority_analysis.json` | 6D scoring model, deduplication, Top 5 cap |
| 10 | `report_writer` | `schemas/report_content.json` | Business-owner-friendly narrative + visual data contract |
| 11 | `report_designer` | `schemas/report_design.json` | Visual hierarchy & presentation specification |
| 12 | `web_report_generator` | `schemas/web_report_generation.json` | **PRIMARY** — Self-contained interactive HTML report |
| 13 | `pdf_generator` | `schemas/pdf_generation.json` | **SECONDARY** — Static PDF via Puppeteer |

**Execution note for Steps 12–13:** The Web Report Generator (Step 12) consumes `report_content.json` directly. It must run before the PDF Generator (Step 13). If the Web Report Generator fails, the PDF Generator may still proceed. Both receive the same `branding_config`.

## 4. Lifecycle State Machine
```
[INITIALIZED]
     ↓
[BUSINESS_CONTEXT_READY]
     ↓
[CITATION_RESEARCH_COMPLETE]
     ↓
[CITATION_ANALYSIS_COMPLETE]
     ↓
[GBP_AUDIT_COMPLETE]
     ↓
[REVIEW_ANALYSIS_COMPLETE]
     ↓
[COMPETITOR_ANALYSIS_COMPLETE]
     ↓
[WEBSITE_GATE_EVALUATED] ➔ (Skipped / Running ➔ COMPLETE)
     ↓
[EVIDENCE_VALIDATION_COMPLETE]
     ↓
[PRIORITY_ENGINE_COMPLETE]
     ↓
[REPORT_WRITER_COMPLETE]
     ↓
[REPORT_DESIGNER_COMPLETE]
     ↓
[WEB_REPORT_COMPLETE]       ← Primary deliverable
     ↓
[PDF_GENERATOR_COMPLETE]    ← Secondary deliverable
     ↓
[COMPLETED]
```

## 5. Key Architecture Constraints
1. **Conditional Website Gate:** The website audit never runs blindly. Foundational research must finish before the gate evaluates whether a website audit is `recommended`, `skipped`, or `not_applicable`.
2. **Competitor Capping:** Max 2 competitors; 1 strong competitor preferred.
3. **Evidence Graph:** Every factual claim retains its originating `evidence_id` through validation, priority engine, report generation, and both renderers.
4. **Idempotent Resume:** An audit stopped at any stage can be resumed using its Master Audit Object state without re-running completed research.
5. **No Fake Data:** If an external data source or tool fails, record `unavailable` or `insufficient_data` honestly.
6. **Web Report is Primary:** `web_report_path` in the outputs section is the primary client deliverable. `pdf_path` is secondary.
7. **Branding Config:** The `branding_config` object (with Mark Bishop Media brand, email, phone) is passed to both renderers. Never hardcode contact details in renderer logic.

## 6. Output Contract
Produces a Master Audit Object validated against `schemas/audit_orchestration.json`.

Both `web_report_path` and `pdf_path` must be populated in the `outputs` section upon successful completion.
