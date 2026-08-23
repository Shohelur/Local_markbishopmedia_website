---
name: priority-engine
description: "The strategic hub of the platform that scores validated findings and produces the Top 5 most critical business priorities."
---

# Priority Engine Skill

## 1. Purpose
The `priority-engine` is the strategic core of the Local Business AI platform. It ingests intelligence that has successfully passed the `evidence-validator` and converts it into a concise, business-owner-friendly set of Top Priorities. It prevents client overwhelm by enforcing a strict maximum of 5 priorities based on a rigorous mathematical model.

## 2. Scope
- **IN SCOPE:** Ingesting validated findings. Root-cause deduplication (merging similar findings). Applying the 6-Dimension Scoring Model. Enforcing the Top 5 limit. Translating technical findings into "Why it matters" and "Recommended Action" logic. Mapping priorities to services.
- **OUT OF SCOPE:** Conducting new web research. Writing the final client report (that belongs to the report-writer). Re-evaluating rejected findings. Generating PDF reports.

## 3. Inputs
- `business_context`
- Validated output from the `evidence-validator` (including `validated_findings`, `evidence_confidence` scores, and `duplicate_candidates`).

## 4. Outputs
- A structured JSON object conforming to `schemas/priority_analysis.json`, featuring `top_priorities` (Max 5), `additional_opportunities`, `strengths`, and a full traceability record (`merged_findings`, `excluded_findings`).

## 5. Workflow
1. **Ingestion:** Load findings from the evidence-validator. Discard `rejected` and `needs_more_evidence` items unless explicitly marked for verification.
2. **Deduplication:** Merge findings that share the same root cause (e.g., phone mismatches on GBP, Yelp, and Website become one priority).
3. **Scoring Execution:** Score each viable finding (1-5 scale) across six dimensions: Business Impact, Evidence Confidence, Competitive Gap, Urgency, Fixability, and Business Relevance.
4. **Math Application:** Calculate `final_priority_score` using the strict weight formula: `(Impact*0.3) + (Confidence*0.2) + (Gap*0.2) + (Urgency*0.1) + (Fixability*0.1) + (Relevance*0.1)`.
5. **Threshold Mapping:** Map the final score to Very High, High, Moderate, or Low.
6. **Limit Enforcement:** Extract ONLY the Top 5 highest-scoring items.
7. **Business Translation:** Generate the non-technical `why_it_matters` (Problem, Impact, Action) for the top priorities.
8. **Service Mapping:** Attach relevant services to the selected priorities.
9. **Traceability Wrap-up:** Organize the remaining items into `additional_opportunities`, `strengths`, and `excluded_findings`.

## 6. Strict Rules & Constraints
- **The Service Bias Rule:** Never artificially inflate a score just because it maps to an expensive service we sell. The scoring must remain purely objective and evidence-driven.
- **Competitor Independence:** If no competitor data exists, the engine must score neutrally based on available data, rather than artificially punishing a finding for lacking a competitor gap.

## 7. Failure States
- `success`: Priorities generated successfully (even if fewer than 5).
- `partial`: Priority generated but some required finding metadata was missing.
- `insufficient_data`: Incoming payload contained no valid findings.
- `failed`: System execution error.

## 8. Output Contract
See `schemas/priority_analysis.json` for the exact payload required.
