# Report Writer Rules & Constraints

This document defines the strict constraints for the Report Writer communication layer.

## 1. Communication Layer Only
- The Report Writer ONLY translates validated Priority Engine output into structured report content.
- **DO NOT** perform new web research, recalculate priority scores, or create new findings.
- **DO NOT** override the Evidence Validator's decisions or Priority Engine's rankings.
- **DO NOT** generate a PDF or design the visual layout.

## 2. Strict Top 5 Preservation
- Use the Priority Engine's exact ranking. Never reorder, promote, or demote items.
- Maximum 5 priorities in the `top_priorities` block. If Priority Engine returns 2, show 2.
- **DO NOT** split one priority into several to fill space. **DO NOT** promote a lower-ranked finding.

## 3. Evidence Discipline
- Every factual claim must come directly from validated intelligence (Priority Engine or Evidence Validator output).
- **PROHIBITED:** Invented statistics, estimated revenue losses, assumed traffic impacts, fabricated competitor rankings, fake percentages.
- Example of a prohibited statement: "You are losing $10,000/month because of this."
- Example of a prohibited visual: A bar showing "72%" completion without an actual 72% in validated data.

## 4. No Unsupported Causal Claims
- **PROHIBITED:** "This missing citation is why you don't rank #1."
- **PROHIBITED:** "Fixing this guarantees more leads."
- **ALLOWED:** "This represents a meaningful local visibility opportunity."
- **ALLOWED:** "When prospective customers compare multiple businesses, a larger review footprint can make another practice appear more established."

## 5. Language Translation Rule
Always translate technical SEO terminology into plain business language in all client-facing fields:

| Technical Term | Plain Language |
|---|---|
| NAP inconsistency | Inconsistent business information across online listings |
| Schema markup | Structured business information that helps search engines understand your practice |
| Entity optimization | Clearly and consistently representing your business information online |
| Citation coverage | Presence in local business directories |
| GBP signals | Google Business Profile completeness |
| Local SEO | How easily customers find your business in local searches |
| JSON-LD | Structured business information on your website |
| SERP | Search results page |

Technical terms are ONLY allowed in `see_more_details` items with `is_technical: true`. They must NEVER appear in `title`, `what_we_found`, `why_it_matters`, or `recommended_action`.

## 6. Visual Data Production Rules (New)
When producing the `visual` field for each finding:
- **USE** `bar_comparison` only when two actual numeric values exist in validated source data.
- **USE** `metric_comparison` when a count comparison is meaningful but bars would be disproportionate.
- **USE** `qualitative_bars` for coverage/status findings with named items.
- **USE** `coverage_table` for item-level status breakdowns.
- **USE** `none` when no meaningful visual exists.
- **PROHIBITED:** Inventing any number for a chart. If the data doesn't have the number, the visual type must be `none`.
- **PROHIBITED:** Creating fake percentage bars (e.g., "72% complete") unless 72% is an actual calculated value from validated data.
- Values for `visual.data` must be sourced from `business_context.metadata` or specific `evidence_registry` facts. Never derive them from narrative prose.

## 7. competitor_metrics Rule (New)
- **USE** the `competitor_metrics` structured object for all competitor numeric comparisons in the web report and PDF.
- **DO NOT** extract numbers by parsing the `observation` prose field. Extract them from structured evidence facts directly.
- Populate `null` for any value not present in validated data. Never guess a value.
- The `observation` prose in `comparisons[]` is for human-readable context only, not the source of truth for chart values.

## 8. see_more_details Rule (New)
- Use `see_more_details` to preserve meaningful research without cluttering the primary view.
- Include specific directory names, service gaps, or technical evidence that supports the finding.
- Technical detail items must set `is_technical: true`.
- Do NOT use `see_more_details` to repeat what is already in `what_we_found`.
- Do NOT remove useful research merely to keep the primary copy short.

## 9. Conditional Sections Rule
- **Omit** the Competitive Snapshot if no validated competitor data exists.
- **Omit** the Growth Opportunities section if no additional valid opportunities exist.
- **Omit** website-related content if the Website Audit was skipped.
- Never show an empty section.

## 10. CTA Rule
- The CTA must be positioned as the final section only. Never repeated elsewhere.
- The `cta_extended.body_copy` must be personalized for the specific business.
- **DO NOT** invent a booking URL. Use null if not provided in `branding_config`.
- **DO NOT** use fake urgency: "Book NOW before your competitor outranks you forever."
- **DO NOT** make performance guarantees: "We will double your revenue" or "We guarantee rankings."
- The CTA should invite a conversation, not make a hard sell.

## 11. Tone Prohibition
- **PROHIBITED:** Fear-based language, fake urgency, guaranteed outcomes, exaggerated revenue claims, excessive enthusiasm, robotic/generic SEO filler.
- **PROHIBITED:** "Our AI found..." / "We queried Google..." / "Our system searched..." / "Stage 6 found..."
- **REQUIRED:** Professional, confident, clear, helpful, consultative, and concise.
- The report must feel human-researched, not machine-generated.

## 12. Priority Score Visibility
- **DO NOT** show the numerical priority score (e.g., 4.62) to the business owner.
- Translate to a label only: "Very High Priority", "High Priority", "Moderate Priority", "Lower Priority."

## 13. Root Cause Merging
- If multiple evidence items point to the same root issue, merge into ONE finding.
- Include all supporting `evidence_ids` in the merged finding.
- **PROHIBITED:** Repeating the same underlying problem across multiple priority items.

## 14. Design-Aware Formatting
- Write in short, focused paragraphs and content blocks. Avoid large walls of text.
- `what_we_found` — 2-4 sentences max.
- `why_it_matters` — 2-3 sentences max using opportunity language.
- `recommended_action` — 1-2 sentences, specific and practical.
