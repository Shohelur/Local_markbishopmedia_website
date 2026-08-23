---
name: evidence-validator
description: "A quality-control gate that evaluates upstream audit findings, filtering out hallucinations and unsupported causal claims before they reach the Priority Engine."
---

# Evidence Validator Skill

## 1. Purpose
The `evidence-validator` is a strict quality-control module. It sits between the raw analytical skills (Citation, GBP, Review, Competitor, Website) and the final Priority Engine. Its primary job is to enforce evidence integrity—rejecting hallucinated claims, filtering wrong-business data, and sanitizing exaggerated SEO ranking claims.

## 2. Scope
- **IN SCOPE:** Evaluating findings against the 10-Point Validation Model. Rejecting findings without attached evidence. Verifying business identity. Stripping causal ranking claims. Merging duplicate findings. Preserving original finding traceability. 
- **OUT OF SCOPE:** Initiating broad new web research. Re-crawling websites or competitors. Calculating final Priority Scores. Writing the client-facing report. 

## 3. Inputs
- `business_context`: The canonical target business details (Name, Address, Phone, Website).
- An array of `findings` produced by upstream audit skills.
- An array of `evidence` objects referenced by the findings.

## 4. Outputs
- A structured JSON object conforming to `schemas/evidence_validation.json`, containing cleanly separated arrays of `validated_findings`, `rejected_findings`, `rewrite_candidates`, and `duplicate_candidates`.

## 5. Workflow (The 10-Point Validation Model)
1. **Evidence Existence:** Does the finding actually reference an evidence ID?
2. **Evidence Relevance:** Does the referenced evidence actually relate to the claim?
3. **Evidence Sufficiency:** Does the evidence fully support the scope of the claim, or is it partial?
4. **Evidence Reliability:** How trustworthy is the source? (Assign confidence 1-5).
5. **Business Identity:** Does the evidence belong to the *correct* business? (Reject if mismatch).
6. **Claim Strength:** Is the language appropriate or exaggerated?
7. **Causal Claim Safety:** Strip guarantees like "this missing citation caused your ranking drop."
8. **Temporal Relevance:** Is the evidence outdated?
9. **Duplicate Status:** Group identical root issues from different skills into merge candidates.
10. **Client Suitability:** Determine if the finding is client-ready or internal-only.

## 6. Strict Rules & Constraints
- **NO NEW RESEARCH:** The validator must evaluate based on the provided evidence, not by spinning up new web searches.
- **Traceability:** Never silently overwrite a finding. Output the corrected text to `validated_finding` while keeping the `original_finding` intact.

## 7. Failure Handling
- `success`: Findings processed successfully.
- `partial`: Some findings could not be processed due to missing referenced evidence blocks.
- `insufficient_data`: Incoming payload is empty or malformed.
- `failed`: System/execution failure.

## 8. Output Contract
See `schemas/evidence_validation.json` for the exact payload required.
