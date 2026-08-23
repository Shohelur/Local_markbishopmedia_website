# PDF Generator Rules & Constraints

## 1. Rendering-Only Principle
The PDF Generator is a pure rendering engine. It must not:
- Generate new content, findings, or recommendations.
- Recalculate or reorder priority scores.
- Rewrite any text from `report_content.json`.
- Invent branding, URLs, logos, or statistics.

`report_content.json` is the authoritative **content** source.
`report_design.json` is the authoritative **presentation** source.

## 2. No Content Invention
If a required element is missing from the input:
- **Optional elements** (logo, booking URL): Omit or use placeholder. Log a warning.
- **Required elements** (business_name, top_priorities): Return `validation_failed` status.
- **Never** substitute invented values.

## 3. Single Design System
All colors, typography, and spacing must come from `report_design.json` design tokens. The renderer must NOT define new colors inline. CSS custom properties must be derived from `design_tokens` in the design spec.

## 4. Priority Integrity
- Render priorities in the **exact order** supplied. Never reorder.
- Maximum 5 priorities (inherited from upstream contracts).
- Never add priority items not present in the content.

## 5. Conditional Rendering
- `competitive_snapshot`: Only render if non-empty in content.
- `growth_opportunities`: Only render if non-empty in content.
- `business_foundation.strengths`: Only render if array is non-empty.
- Empty optional pages must be entirely omitted.

## 6. Page Break Safety
- All PriorityCard, SectionHeader, and CTASection components must use CSS `page-break-inside: avoid`.
- Never shrink body text below 10px to fit a page.
- If a component overflows, let it continue to the next page naturally.

## 7. Booking URL
- Booking URL must come from `branding_config.booking_url` only.
- If no URL is configured, CTA renders as plain text without a hyperlink.
- Never invent a URL.

## 8. Font Handling
- Use Google Fonts (Inter) via `@import` where network is available.
- If unavailable, fall back to `system-ui, sans-serif`. Log a warning.
- Never fail the entire PDF due to a missing font.

## 9. Validation Before Render
Before invoking Puppeteer, validate:
1. `report_content.json` is parseable JSON.
2. Required fields (`business_name`, `top_priorities`) are present.
3. `report_design.json` is parseable JSON.
4. Priority count does not exceed 5.
Return `validation_failed` immediately if these checks fail.

## 10. Error Surfacing
All warnings and non-fatal issues must be logged to `render_metadata.warnings`. Never suppress errors silently.
