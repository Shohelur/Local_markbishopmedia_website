---
name: report-designer
description: "A presentation-only layer that transforms report_content.json into a structured visual design specification for both the Web Report Generator and PDF Generator. Owns the visual intelligence decisions: which chart type fits each finding, how sections flow, what becomes expandable, and how to balance strengths and opportunities."
---

# Report Designer Skill

## 1. Purpose
The `report-designer` is a **presentation-only** module. It bridges the structured content of `report-writer` and the physical rendering work of `web-report-generator` and `pdf-generator`. It owns the complete design system: typography scale, color tokens, spacing, component library, and visual intelligence decisions.

## 2. Scope
- **IN SCOPE:** Consuming `report_content.json`. Defining centralized design tokens. Evaluating `visual.type` for each finding and confirming or adjusting the chart type. Mapping content blocks to rich visual components. Building the ordered section/page array. Applying conditional section logic. Enforcing readability over density. Deciding what is visible vs expandable.
- **OUT OF SCOPE:** Creating new content, altering findings, recalculating scores, generating the HTML or PDF file itself, performing research.

## 3. Inputs
- `report_content.json` from `report-writer`
- Optional `branding_config` (primary color, logo, booking URL, Mark Bishop Media contact details). Falls back to professional defaults if absent.

## 4. Outputs
A `report_design.json` specification object consumed by both the Web Report Generator and PDF Generator.

## 5. Visual Intelligence Architecture

The designer's first task for each finding is to evaluate `visual.type` from `report_content.json` and confirm the right chart layout:

| visual.type | Layout Decision |
|---|---|
| `bar_comparison` | Horizontal bars with labeled actual values |
| `metric_comparison` | Large side-by-side metric blocks |
| `qualitative_bars` | Status segment bar with named items |
| `coverage_table` | Table with claimed/unclaimed/partial status icons |
| `none` | Editorial layout — no chart element |

The designer may change the `visual.type` selected by the writer only if the available data better fits a different format. The designer must NEVER add a chart where `visual.type = "none"`.

## 6. Section Layout Architecture (8 Sections)

| # | Section | Layout Composition |
|---|---|---|
| 1 | Cover | Dark hero gradient + business name prominent + metadata panel |
| 2 | Local Visibility at a Glance | 4-Pillar qualitative status map + biggest opportunity callout |
| 3 | What's Working | Large metric stat anchors + strength cards |
| 4–N | Priority Finding Deep Dives (one per finding) | Visual first → What Found → Why Matters → Recommended → See More |
| N+1 | Competitive Snapshot (conditional) | Side-by-side profile cards + metric gap bars from competitor_metrics |
| N+2 | Additional Opportunities (conditional) | Opportunity items in varied layout |
| N+3 | Action Roadmap | Numbered sequential timeline |
| N+4 | CTA | Full-width dark card with gold CTA — single instance at end |

## 7. Design System Tokens

| Role | Token | Default |
|---|---|---|
| Primary | `primary` | `#0B192C` (Deep Slate / Navy) |
| Accent | `secondary` | `#D97706` (Warm Gold / Amber) |
| Very High Priority | `priority_very_high` | `#991B1B` (Restrained Crimson) |
| High Priority | `priority_high` | `#B45309` (Warm Amber) |
| Moderate Priority | `priority_moderate` | `#1D4ED8` (Royal Blue) |
| Strengths | `strength` | `#047857` (Emerald Green) |
| Opportunity | `opportunity` | `#0369A1` (Steel Blue) |
| Fonts | `font_display`, `font_primary` | Plus Jakarta Sans / Inter |
| Body Text | `font_size_body` | `13.5px` (web) / `13px` (PDF) |

## 8. Key Design Constraints
- Visual first for every finding with data support
- Strengths appear before weaknesses
- No fake percentages or invented scores
- No repeated card layout pattern — use varied layouts
- No large empty decorative space in the cover
- CTA appears once, at the very end
- Progressive disclosure on every finding (See More Details)

## 9. Output Contract
See `schemas/report_design.json` for the exact specification structure required.
