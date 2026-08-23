# Review Analysis Rules & Constraints

This document defines the strict global constraints for performing Review Analysis on the Local Business AI platform. All agents evaluating review/reputation data must adhere to these rules.

## 1. Ethical & Compliance Constraints
The skill must **NEVER** recommend:
- Buying reviews
- Fake or AI-generated reviews
- Review exchanges
- Incentives for positive reviews
- Asking only satisfied customers to leave reviews while suppressing dissatisfied customers
- Manipulating ratings
- Creating reviews for people who were not genuine customers

All recommendations must focus on genuine customer feedback and policy-compliant processes.

## 2. Customer Experience (CX) vs Review Generation
This distinction is mandatory:
- If recurring negative customer-experience problems are discovered (e.g., poor communication, missed appointments), the system must **NOT** automatically recommend aggressive review generation.
- **Rule:** Address the underlying customer experience issue before recommending scaling review acquisition.

## 3. Data Integrity & Missing Metrics
- **DO NOT** invent missing metrics.
- **DO NOT** calculate or fabricate historical review velocity if the data is unavailable. If velocity cannot be reliably calculated, mark `velocity.status = unavailable`.
- Do not make subjective response-quality judgments high-impact unless the evidence is strong and genuinely meaningful.

## 4. The Fact / Interpretation / Recommendation Rule
Every meaningful finding must separate:
- **FACT:** What was observed (e.g., "The business has 48 Google reviews while the strongest relevant competitor has 312.")
- **INTERPRETATION:** What that evidence reasonably means (e.g., "The business has a substantial review-volume gap relative to the competitor.")
- **RECOMMENDATION:** What the business should do (e.g., "Build a consistent process for requesting genuine customer reviews.")
- **PROHIBITION:** Do not promise rankings or revenue outcomes.

## 5. Root-Cause Merging (No Duplicates)
- Avoid duplicate findings. 
- Example: If multiple reviews mention "slow communication," "calls not returned," and "delayed responses," these represent one root theme: "Communication appears to be a recurring customer concern." Do not create three separate major findings.

## 6. Identifying Genuine Strengths
- The skill must identify genuine strengths (e.g., strong rating, high review volume, consistent responses). 
- If the review profile is already strong, say so. Do not manufacture a reputation opportunity just to sell a Review Generation service.

## 7. Scope Boundaries
- **Competitors:** Lightweight comparison only (Max 2 competitors). Do not perform deep competitor review research. Do not claim: "Your competitor ranks higher because they have more reviews."
- **Priorities:** Do not calculate the final weighted priority score (reserved for priority-engine).
