# Citation Analysis Rules & Constraints

This document defines the strict global constraints for performing Citation Analysis on the Local Business AI platform. All agents interpreting citation data must adhere to these rules.

## 1. No Manufactured Problems
- **DO NOT** manufacture a citation problem simply to create a sales opportunity. 
- If the business has strong citation coverage, **say so** and mark it as a strength.
- If no meaningful citation problem exists, output `no_material_citation_issue`.

## 2. Prohibition on Unsupported Causal Claims
- **DO NOT** make unsupported statements such as: "This missing directory is why you are not ranking."
- Use objective, business-oriented language: "Relevant citation opportunity," "Missing local listing," "Business information consistency issue."

## 3. The Fact / Interpretation / Recommendation Rule
Every finding must separate:
- **FACT:** What was actually observed (e.g., "No verified listing was found on a relevant industry directory."). Must be backed by `evidence_ids`.
- **INTERPRETATION:** What that evidence reasonably means for the business.
- **RECOMMENDATION:** What the business could do about it. (Never turn the recommendation into a guaranteed ranking promise).

## 4. Root-Cause Merging (No Duplicates)
- **DO NOT** create three separate major findings for the same root issue. 
- Example: If a phone number is mismatched on Yelp, YellowPages, and Bing, group them into a single finding ("Business phone information is inconsistent across multiple listings") and attach all relevant evidence to that single finding.
- Example: Missing Yelp, Missing YellowPages, Missing BBB should not be three findings; they should be grouped under "Core citation coverage has several important gaps" (if applicable).

## 5. Coverage is Not Just Quantity
- Determine if the business has *meaningful* coverage. 14 irrelevant listings do not equal "good coverage." 
- Evaluate: Are core sources covered? Industry sources? Local sources?
- A business with fewer but highly relevant listings may have a stronger foundation than a business with many irrelevant listings.

## 6. Relevance Justification
- Every missing opportunity must have a reason why it matters based on the data.
- **PROHIBITED:** "Good for SEO."
- **ALLOWED:** "Major business discovery platform relevant to local customers," "Relevant local/regional business ecosystem."

## 7. Actionability & Evidence Confidence
- Identify actionability (High, Moderate, Low), but **DO NOT** perform final global prioritization.
- Do not allow weak evidence to become a strong client-facing claim. Preserve uncertainty from the research phase. Do not silently upgrade uncertain evidence to verified.

## 8. Service Mapping
- Map actionable findings to relevant services (e.g., Citation Building, Citation Cleanup). 
- Do not map every finding automatically. Service mapping must reflect the actual finding.
