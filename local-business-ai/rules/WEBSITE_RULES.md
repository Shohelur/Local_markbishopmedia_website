# Website Audit Rules & Constraints

This document defines the strict global constraints for performing Website Audits on the Local Business AI platform.

## 1. Conditional Execution (Trigger Gate)
The website audit is **NOT** automatically required. It must only run if the trigger gate dictates.
- **Trigger Conditions:** e.g., Website appears materially weak, significant competitor website advantage, missing crucial local info, or prior audits did not reveal enough actionable insights.
- **Skip Conditions:** e.g., Prior audit layers already generated a full slate of critical findings, website is entirely inaccessible, or the business does not have a website.

## 2. No Website Edge Case
If the business does not have a website:
- **DO NOT** attempt to run standard technical/content audits.
- Output a single structured finding indicating the lack of a website, focusing the interpretation on customer discovery limitations (e.g., "Customers cannot easily find full service lists").
- **DO NOT** claim: "Not having a website is why you do not rank."

## 3. Scope Restraints (Local Priority)
- This is **NOT** a generic enterprise technical SEO audit.
- Prioritize: Service clarity, location relevance, NAP consistency, mobile usability, contact accessibility, and LocalBusiness schema.
- **DO NOT** recommend creating dozens of thin location pages or doorway pages.
- **DO NOT** recommend keyword stuffing.

## 4. Strict Evidence for Performance & Schema
- **Performance:** Do NOT invent PageSpeed scores, Core Web Vitals, or load times. If reliable data isn't fetched from an actual performance tool, set `performance.status = unavailable`.
- **Schema:** Do NOT manufacture schema errors when the source cannot be inspected. If you inspect schema, preserve the exact `schema_type` and `source_url`.

## 5. The Fact / Interpretation / Recommendation Rule
Every meaningful finding must separate:
- **FACT:** What was observed (e.g., "The homepage does not clearly identify the primary service area.")
- **INTERPRETATION:** Why it may matter (e.g., "Local customers may have less immediate clarity about where the business operates.")
- **RECOMMENDATION:** What should be considered (e.g., "Strengthen the website's service-area messaging.")
- **PROHIBITION:** Do not promise rankings or revenue outcomes.

## 6. NAP Consistency
- Compare website business information against the canonical business context.
- Minor formatting differences (e.g., "St." vs "Street") are NOT automatically meaningful inconsistencies. Different phone numbers or entirely different street addresses ARE significant.

## 7. Competitor Website Comparison
- Use existing competitor data whenever possible (Max 2 competitors).
- **DO NOT** perform a full technical audit of competitor websites. Compare only high-level UX/clarity/schema signals if it adds value.
