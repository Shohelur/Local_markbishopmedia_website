---
name: gbp-audit
description: "Audits a Google Business Profile to produce structured, evidence-based GBP intelligence."
---

# Google Business Profile (GBP) Audit Skill

## 1. Purpose
The `gbp-audit` skill researches and analyzes the target business's Google Business Profile and Maps presence. It identifies inconsistencies, optimization gaps, completeness issues, and genuine strengths, producing structured findings for the Master Audit Object.

## 2. Scope
- **IN SCOPE:** Analyzing GBP Identity (NAP), Categories, Services, Description, Visuals, and Profile Completeness. Noting high-level review metrics (rating/count). Creating structured, evidence-backed findings. Mapping to GBP-related services.
- **OUT OF SCOPE:** Deep review analysis. Deep competitor analysis. Citation research. Calculating final global Top 5 priority scores. Manufacturing problems or recommending policy-violating keyword stuffing. Writing the final client report.

## 3. Inputs
- `business_context`: Name, Phone, Address, Website, Industry, Type.
- `competitors` (Optional, max 2): For lightweight benchmark comparison.
- Tool Access: Search Engine capability and web browsing to inspect SERP/Maps payloads.

## 4. Outputs
- A structured JSON object conforming to `schemas/gbp_audit.json`.

## 5. Workflow
1. **Locate Profile:** Search Google/Maps to locate the business's claimed (or unclaimed) GBP listing.
2. **Information Assessment:** Compare GBP NAP fields (Name, Address, Phone, Website, Hours) against the canonical `business_context`. Identify meaningful inconsistencies.
3. **Category Assessment:** Evaluate Primary Category relevance and Secondary Category coverage.
4. **Service Assessment:** Evaluate whether core business services are adequately represented.
5. **Description Assessment:** Evaluate the description for clarity, relevant context, and customer value. (Flag keyword stuffing).
6. **Visual Assessment:** Check photo volume, recency, and general profile maintenance.
7. **Completeness Assessment:** Identify missing fields that *meaningfully* affect customer trust or profile utility.
8. **High-Level Context:** Record review rating and count. Check max 1-2 competitors for brief contrast if useful.
9. **Formulate Findings:** Group observations into findings separating FACT, INTERPRETATION, and RECOMMENDATION.
10. **Evidence Linking:** Attach verified `evidence_ids` to every finding.
11. **Output Generation:** Validate against `gbp_audit.json`.

## 6. Strict Rules & Constraints
- **No Keyword Stuffing:** Never recommend stuffing keywords into the business name.
- **No Fake Locations:** Never recommend setting up fake addresses or service areas.
- **No Manufactured Problems:** If the profile is fully optimized, acknowledge the `gbp_strength` and output `success` without trying to sell unnecessary GBP Optimization services.
- **Unsupported Claims:** Do not claim that adding a specific category will guarantee higher rankings.

## 7. Finding Severities
When assigning an `impact_level`, consider if the issue is:
- Clearly important (e.g., wrong phone number, wrong primary category).
- Relevant optimization opportunity (e.g., missing secondary categories, weak description).
- Optional improvement (e.g., Q&A missing).

## 8. Failure Handling
The skill must handle edge cases gracefully:
- `success`: GBP located and audited normally.
- `partial`: GBP located, but some sections were unable to be reliably inspected.
- `insufficient_data`: Profile could not be definitively located, or input context was too sparse.
- `failed`: System/tool failure.

## 9. Output Contract
See `schemas/gbp_audit.json` for the exact payload required.
