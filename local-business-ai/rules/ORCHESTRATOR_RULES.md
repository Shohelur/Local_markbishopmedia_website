# Audit Orchestrator Rules & Constraints

This document defines the strict architectural rules and operational constraints governing the **Audit Orchestrator**, the central execution engine of the Local Business AI platform.

---

## 1. The Conductor Principle (Core Boundary)
The Orchestrator is the **conductor**, not the performer. It must **NOT**:
- Perform audit research or SEO analysis itself.
- Evaluate directory coverage or profile health directly.
- Calculate or alter Priority Engine scores.
- Invent findings or write client-facing narrative text.
- Make visual styling decisions for the PDF.

**The Orchestrator coordinates execution order, manages data flow, and tracks state.**

---

## 2. Mandatory Sequential Execution Order
The pipeline must strictly execute in the following 12-stage sequence:

```
Step 1:  Business Context (Canonical NAP & Identity)
Step 2:  Citation Research (Adaptive Directory Discovery)
Step 3:  Citation Analysis (Coverage, Completeness, Consistency)
Step 4:  Google Business Profile Audit (Completeness, Verification, Services)
Step 5:  Review Analysis (Volume, Rating, Themes, CX Patterns)
Step 6:  Competitor Analysis (Max 2 Local Competitors)
Step 7:  Conditional Website Audit Gate (Run / Skip / Not Applicable)
Step 8:  Evidence Validator (Quality Control & Causal Claim Safety)
Step 9:  Priority Engine (6D Scoring Model, Top 5 Cap)
Step 10: Report Writer (Client-Friendly Narrative: report_content.json)
Step 11: Report Designer (Visual Specification: report_design.json)
Step 12: PDF Generator (Executable Puppeteer Render)
```

---

## 3. Canonical Business Context Source of Truth
- The orchestrator ingests the business input and establishes a single canonical `business_context` object.
- All downstream skills must reference this canonical context for NAP consistency checks.
- If an input field is missing (e.g. `website: null` or `phone: null`), the orchestrator preserves the `null` value honestly without fabricating replacement data.

---

## 4. Strict Competitor Limit (Token Efficiency)
- **Maximum:** 2 competitors.
- **Preferred:** 1 strong, relevant local competitor.
- Competitors must share the same service intent, local geography, and market presence.
- Broad competitor crawling or multi-competitor citation sweeps are strictly prohibited.

---

## 5. Conditional Website Audit Gate
- The Website Audit is **CONDITIONAL**, not automatically required.
- The orchestrator must allow foundational stages (Citation, GBP, Reviews, Competitor) to complete before evaluating the Trigger Gate.
- The orchestrator passes structured context to the Website Audit skill, which decides `recommended`, `skipped`, or `not_applicable`.
- If the business has no website: `status = not_applicable`, output the standard "no website" finding, and continue.
- If skipped: `status = skipped`, record the reason in the stage record, and proceed to Evidence Validation.

---

## 6. End-to-End Evidence Traceability
- Every piece of research evidence must receive a unique, stable `evidence_id` (e.g., `cit-001`, `gbp-001`, `rev-001`, `comp-001`, `web-001`).
- Every finding must link to its supporting `evidence_ids`.
- The Evidence Validator, Priority Engine, and Report Writer must preserve these IDs so that every client recommendation is traceable back to factual source data.

---

## 7. Separation of Raw Research vs Client Intelligence
- Raw research facts, findings, interpretations, and client-facing recommendations must remain structured as distinct fields.
- Raw HTML, full DOM trees, or unvetted notes must **never** be passed directly to the Report Writer or PDF Generator.

---

## 8. Fail-Soft Error Boundaries
- Non-critical stage failures (e.g., website inaccessible or photo metadata unavailable) must not abort the entire audit.
- If a non-critical stage fails:
  - Mark stage `status = failed`.
  - Record the structured error.
  - Continue to Evidence Validation with available data.
- If a foundational stage experiences a fatal error (e.g. invalid business context), mark overall status as `INCOMPLETE` or `FAILED` and halt cleanly without fabricating dummy data.

---

## 9. Idempotency, Caching & Resume Capability
- Every stage produces an explicit record with `status`, `started_at`, `completed_at`, `input_summary`, and `output_summary`.
- If downstream rendering (e.g. PDF generation) needs to be retried or restyled, completed upstream research outputs must be reused from the Master Audit Object without re-executing expensive external research.
- The orchestrator must support resuming execution from any valid completed state.

---

## 10. No Hallucination Fallback Rule
- If an external tool or data source is unavailable, record `status = unavailable` or `insufficient_data`.
- **PROHIBITED:** Generating placeholder review counts, fake star ratings, fabricated citation numbers, or imaginary page speed scores.
