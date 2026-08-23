# Evidence Validator Rules & Constraints

This document defines the strict global constraints for the Evidence Validator. It acts as the final quality-control gate between analytical skills and the Priority Engine.

## 1. NO NEW RESEARCH
- The validator is a QUALITY GATE, not a research engine.
- **DO NOT** re-research findings by crawling new websites, scanning competitors, or re-running citation queries. 
- You must evaluate claims based **ONLY** on the `evidence_ids` attached to the finding. If the attached evidence is insufficient, reject or flag the finding. Do not invent supporting evidence.

## 2. Preservation of Original Traceability
- **NEVER** silently rewrite an original finding payload.
- You must preserve the `original_finding` object entirely. Any corrections you make must be output to the separate `validated_finding` object.

## 3. Causal Claim Safety Rule (Strict Prohibition)
- **DO NOT** allow unsupported causal ranking claims to pass to the Priority Engine.
- **PROHIBITED:** "This missing citation is why you don't rank #1."
- **PROHIBITED:** "Your slow website is costing you thousands in revenue."
- **ALLOWED REWRITE:** "This citation represents a local visibility opportunity."
- If a finding contains an unsafe causal claim but valid underlying facts, set `causal_claim_status = needs_rewrite` and provide the sanitized version in `validated_finding`.

## 4. The "No Empty Claims" Rule
- Factual claims without `evidence_ids` must be rejected (`status = rejected`), unless the finding is explicitly a non-factual logical recommendation derived from context.

## 5. Business Identity Rule
- Verify that the evidence actually belongs to the audited business (using Name, Phone, Address, Website).
- If `identity_status = not_a_match`, the finding MUST be rejected. Evidence belonging to the wrong business cannot support a claim.

## 6. Duplicate Merging
- Identify findings from different sources that represent the exact same root issue (e.g., three findings about a missing Yelp listing).
- Do not delete them. Instead, flag them as `duplicate_or_merge_candidate` to maintain a clean evidence graph.

## 7. No Final Priority Scoring
- Do NOT calculate final global priority scores. You may provide `evidence_confidence` (1-5) and assess `client_facing_status`, but the ultimate impact scoring belongs to the downstream Priority Engine.
