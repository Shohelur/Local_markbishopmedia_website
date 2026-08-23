# Scoring Rules & Priority Framework

This framework governs how findings are evaluated and prioritized. These scores are internal diagnostic/prioritization scores and do NOT represent Google ranking scores.

## Six Dimensions of Scoring
Every finding is evaluated across these dimensions:

1. **Business Impact** (30% weight) - How significantly does this affect the business's bottom line, visibility, or reputation?
2. **Evidence Confidence** (20% weight) - How certain are we that this issue exists and is accurate based on the data? If evidence confidence is very low, the finding should not become a high-priority client-facing finding without further verification.
3. **Competitive Gap** (20% weight) - How much of a disadvantage does this create compared to relevant competitors? Do not manufacture a competitive gap when one cannot logically be measured.
4. **Urgency** (10% weight) - How quickly must this be addressed to prevent harm or capitalize on a fleeting opportunity?
5. **Fixability** (10% weight) - How difficult, costly, or time-consuming is it to resolve?
6. **Business Relevance** (10% weight) - How relevant is this to the specific business model, industry, and location?

## Internal Score Range
- **1.00 - 5.00**

## Priority Levels
- **4.25 - 5.00** = Very High
- **3.50 - 4.24** = High
- **2.50 - 3.49** = Moderate
- **1.00 - 2.49** = Low

## Deduplication Rule
The priority engine must detect and merge duplicate or overlapping findings.
Example: "GBP service coverage weakness", "Missing important GBP services", and "Incomplete GBP services" represent one root issue.
If the same business-information inconsistency appears across Citation, GBP, and Website research, consider merging it into one broader finding instead of three separate findings. The goal is meaningful business priorities, not a large number of findings.
