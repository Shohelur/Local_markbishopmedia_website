---
name: review-analysis
description: "Evaluates the business's Google review profile and turns reliable data into structured reputation intelligence."
---

# Review Analysis Skill

## 1. Purpose
The `review-analysis` skill assesses a local business's review volume, rating, recency, velocity, themes, and response behavior. It outputs structured, evidence-based intelligence to the Master Audit Object, highlighting genuine strengths, customer experience (CX) gaps, and review-generation opportunities.

## 2. Scope
- **IN SCOPE:** Analyzing Review Metrics (Volume, Rating). Assessing Velocity (if data exists). Evaluating response behavior and quality. Extracting recurring Positive/Negative themes. Lightweight competitor review gap comparison. Differentiating CX issues from review generation needs.
- **OUT OF SCOPE:** Deep competitor research. GBP Optimization analysis. Writing the final client report. Calculating global Top 5 priorities. Recommending fake/manipulated reviews.

## 3. Inputs
- `business_context`: Name, Industry.
- `review_data`: Total count, average rating, recent reviews, responses.
- `competitors` (Optional, max 2): Name, Review Count, Rating.

## 4. Outputs
- A structured JSON object conforming to `schemas/review_analysis.json`.

## 5. Workflow
1. **Metric Evaluation:** Extract and verify total reviews, average rating, and recency.
2. **Velocity Calculation:** Compute review velocity ONLY if reliable historical data is available. If missing, mark `velocity.status = unavailable`.
3. **Response Analysis:** Evaluate consistency, personalization, and professionalism of business responses.
4. **Theme Extraction:** Group recurring positive and negative themes (requires multiple mentions to be "recurring").
5. **Competitor Comparison:** Evaluate the volume/rating gap against 1-2 competitors.
6. **CX vs Review Gen Rule:** Ensure any identified CX issue (e.g., poor communication) is prioritized for internal fixing before recommending aggressive review generation.
7. **Formulate Findings (Fact/Interpretation/Recommendation):** Create structured findings backed by `evidence_ids`.
8. **Service Mapping:** Link findings to relevant services (e.g., "Review Generation").
9. **Output Generation:** Validate against `review_analysis.json`.

## 6. Strict Rules & Constraints
- **Ethical Integrity:** Never recommend buying reviews, faking reviews, gating reviews, or manipulating ratings. Focus solely on genuine customer feedback.
- **No Invented Metrics:** Do not calculate velocity if you lack historical timestamps. Leave it undefined.
- **No SEO Ranking Promises:** Do not claim a 5-star rating will result in a #1 ranking on Google Maps.

## 7. Failure Handling
The skill must gracefully handle missing data:
- `success`: Review data analyzed normally.
- `partial`: Only rating/count available; themes and velocity could not be calculated.
- `insufficient_data`: No review data available for the business.
- `failed`: System/tool failure.

## 8. Output Contract
See `schemas/review_analysis.json` for the exact payload required.
