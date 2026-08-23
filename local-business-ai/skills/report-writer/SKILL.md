---
name: report-writer
description: "A communication layer that translates validated Priority Engine intelligence into a concise, professional, business-owner-friendly local business visibility report. Produces report_content.json with visual data contracts for both the web report renderer and PDF generator."
---

# Report Writer Skill

## 1. Purpose
The `report-writer` is a pure communication module. It bridges the analytical intelligence of the `priority-engine` and the visual presentation of the `web-report-generator` and `pdf-generator`. It translates structured intelligence into a human-readable, business-friendly report optimized for a busy local business owner who has no interest in SEO jargon.

## 2. Scope
- **IN SCOPE:** Translating validated findings into plain English. Structuring the report format. Writing the Executive Snapshot, Business Foundation, Top Priorities (with visual data), Competitive Snapshot (with competitor_metrics), Growth Opportunities, Next Steps, and CTA (with cta_extended). Populating visual data contracts from validated source data. Omitting empty sections dynamically.
- **OUT OF SCOPE:** Performing new research. Recalculating priority scores. Overriding Priority Engine rankings. Inventing statistics, percentages, or scores. Generating a PDF. Designing the visual layout.

## 3. Inputs
- `business_context` — canonical NAP, metadata (rating, reviews_count, services_count, etc.)
- `priority_analysis` output from the `priority-engine` (includes `top_priorities`, `strengths`, `additional_opportunities`, `competitive_context`)
- `evidence_registry` — validated evidence objects with `fact` and `source_url`
- `branding_config` (optional) — Mark Bishop Media contact details for `cta_extended`

## 4. Outputs
A structured JSON object conforming to `schemas/report_content.json`, containing all content blocks the web report renderer and PDF generator need.

## 5. Report Structure & Workflow

| # | Section | Conditional? |
|---|---|---|
| 1 | Cover / Report Identity | No |
| 2 | Executive Snapshot | No |
| 3 | Business Foundation (Strengths) | No (may be neutral) |
| 4 | Top Priorities — max 5, each with visual + see_more_details | No |
| 5 | Competitive Snapshot + competitor_metrics | YES — omit if no validated competitor data |
| 6 | Growth Opportunities | YES — omit if no additional opportunities exist |
| 7 | Recommended Next Steps | No |
| 8 | CTA + cta_extended | No |

## 6. Visual Data Contract (Critical New Requirement)

For every item in `top_priorities`, the writer must produce a `visual` field:

| visual.type | When to use |
|---|---|
| `bar_comparison` | Two validated numeric values exist (e.g., your reviews vs competitor reviews) |
| `metric_comparison` | Two counts to compare, but scale difference makes bars misleading |
| `qualitative_bars` | Finding is about coverage/status across multiple named items |
| `coverage_table` | Item-by-item status breakdown (e.g., directory claimed/unclaimed table) |
| `none` | Finding is purely qualitative OR validated numeric data is insufficient |

**Absolute rule:** Never invent a value for `visual.data`. Only use values that exist in `business_context.metadata` or `evidence_registry` facts directly.

## 7. Progressive Disclosure (see_more_details)

For each priority finding, populate `see_more_details` with additional evidence that:
- Does NOT clutter the primary view
- Provides deeper research for interested readers
- Includes technical details marked `is_technical: true` (translated from jargon in the primary copy)

Examples:
- Primary: "Some important online directories are missing or incomplete."
- see_more_details technical: "Technical detail: No claimed profile was found on Healthgrades, Zocdoc, or WebMD Care."

## 8. Competitor Metrics Contract

For `competitive_snapshot.competitor_metrics`:
- `target.*` values come from `business_context.metadata` (reviews_count, rating, services_count)
- `competitor.*` values come from `evidence_registry` competitor facts (extracted from the fact text directly, not prose inference)
- All values must be null if not present in validated data

## 9. Strict Rules & Constraints

- **No Evidence Invention:** Every factual claim must trace to validated Priority Engine intelligence.
- **No Ranking Manipulation:** The Priority Engine's ranking is final.
- **Language Translation:** All technical SEO terms converted to business language in client-facing fields.
- **Numerical Score Suppression:** Internal priority scores (e.g., 4.62) never exposed.
- **CTA Placement:** Single CTA at the very end. Never repeated.
- **Human Voice:** Never use "Our AI found..." / "We queried..." / "Stage 6 detected..."

## 10. Output Contract
See `schemas/report_content.json` for the exact structured payload required.
