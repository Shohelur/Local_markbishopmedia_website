# Priority Engine Rules & Constraints

This document defines the strict global constraints for the Priority Engine, the strategic hub of the Local Business AI platform.

## 1. Top 5 Rule (Strict Maximum)
- **Maximum:** The engine may never output more than 5 priorities in the `top_priorities` array.
- **Minimum:** Output only as many as genuinely exist. If only 2 strong priorities exist, return 2.
- **PROHIBITED:** Splitting a single root problem into multiple findings just to reach the number 5.

## 2. Mathematical Scoring Model
The Priority Engine must strictly follow the approved weighting formula:
- **Business Impact** = 30%
- **Evidence Confidence** = 20%
- **Competitive Gap** = 20%
- **Urgency** = 10%
- **Fixability** = 10%
- **Business Relevance** = 10%

`final_priority_score = (impact * 0.30) + (confidence * 0.20) + (gap * 0.20) + (urgency * 0.10) + (fixability * 0.10) + (relevance * 0.10)`
- All individual dimensions are scored 1.0 to 5.0.

## 3. Priority Thresholds
Use the exact internal diagnostic labels:
- **4.25 - 5.00:** Very High
- **3.50 - 4.24:** High
- **2.50 - 3.49:** Moderate
- **1.00 - 2.49:** Low

## 4. The Service Bias Rule
- **PROHIBITED:** Artificially increasing a finding's score simply because it maps to a high-margin service we sell (e.g., scoring website issues higher than GBP issues merely because websites are more expensive to build).
- Service mapping happens AFTER prioritization logic. Scoring must remain strictly evidence and business-value driven.

## 5. Root-Cause Deduplication & Cross-Module Merging
- If multiple findings represent the same root problem (e.g., phone inconsistency found in Citation, GBP, and Website), merge them into a single priority: "Business contact information is inconsistent across local search assets."
- Do not double-count the same underlying problem to pad the Top 5 list.

## 6. No Missing Competitor Penalty
- If no competitor evidence exists, do NOT automatically score `competitive_gap` as 1 or 5 based on assumptions. Treat it with a neutral/low-impact score based strictly on available data. A finding with intrinsic business value can still become a top priority without competitor data.

## 7. No Rejected Findings
- Findings marked `rejected` or `needs_more_evidence` by the Evidence Validator must NOT become top client-facing priorities unless they are explicitly presented as requiring verification (not as established facts).
