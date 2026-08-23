---
name: citation-analysis
description: "Interprets citation research data to produce structured, evidence-backed findings and service mapping."
---

# Citation Analysis Skill

## 1. Purpose
The `citation-analysis` skill converts raw citation data (from `citation-research`) into meaningful, evidence-based intelligence. It assesses coverage, consistency, and local/industry relevance to generate actionable findings for the future Priority Engine.

## 2. Scope
- **IN SCOPE:** Grouping duplicate issues (root-cause merging). Interpreting research data. Identifying missing opportunities vs. healthy coverage. Mapping actionable findings to services.
- **OUT OF SCOPE:** Performing new research or fetching URLs. Calculating the global Top 5 priority scores. Writing the client report. Manufacturing SEO claims.

## 3. Inputs
- `citation_research` JSON object (Output from the `citation-research` skill).

## 4. Outputs
- A structured JSON object conforming to `schemas/citation_analysis.json`.

## 5. Workflow
1. **Ingest Research Data:** Read the structured `citation-research` output and `evidence` blocks.
2. **Coverage Assessment:** Evaluate the depth and relevance of existing listings (are core/industry/local present?).
3. **Consistency Assessment:** Compare discrepancies across listings.
4. **Identify Gaps:** Determine which missing citations are highly relevant (industry, local, competitor).
5. **Root-Cause Merging:** Group similar problems (e.g., "Phone incorrect across 3 directories" = 1 finding).
6. **Formulate Findings (Fact/Interpretation/Recommendation):** Create structured findings backed by `evidence_ids`.
7. **Service Mapping:** Link findings to relevant services (e.g., "Citation Cleanup") where applicable.
8. **Output Generation:** Validate against `citation_analysis.json`.

## 6. Analytical Dimensions
The skill must evaluate citations across:
- **Coverage:** Presence of meaningful ecosystem listings (quantity != quality).
- **Relevance:** Why a missing listing matters.
- **Completeness:** Are listings fully populated?
- **Consistency:** Does NAP differ materially from the business context?
- **Actionability:** Can this reasonably be fixed?
- **Evidence Confidence:** Is the underlying evidence strong? (1-5 scale).

## 7. Root-Cause Merging
To avoid overwhelming the business owner, the skill must consolidate identical issues. 
- *Example:* If Yelp, BBB, and YellowPages all have the wrong phone number, this is a single `inconsistent_listing` finding with multiple evidence references, not three separate findings.

## 8. Strengths & No Manufactured Problems
- If coverage is strong and NAP is highly consistent, this must be surfaced as a `citation_strength`.
- The system must **never** invent a problem just to map a service. If no major issues exist, the output should reflect `no_material_citation_issue`.

## 9. Failure Handling
- `success`: Analysis completed.
- `partial`: Analysis completed but research data was incomplete.
- `insufficient_data`: Input data was too sparse to draw conclusions.
- `failed`: System/processing error.

## 10. Output Contract
See `schemas/citation_analysis.json` for the exact payload required.
