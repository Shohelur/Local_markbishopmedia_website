---
name: web-report-generator
description: "Generates a self-contained interactive HTML report from report_content.json. The primary client-facing deliverable. Produces a standalone HTML file suitable for delivery via email, download, or hosting at local.markbishopmedia.com/reports/<report-id>. Uses inline SVG for charts and vanilla JS for interactivity. No CDN dependencies."
---

# Web Report Generator Skill

## 1. Purpose
The `web-report-generator` is the primary client-facing output layer of the LOCAL BUSINESS AI platform. It transforms structured `report_content.json` output into a premium interactive HTML report that a non-technical local business owner can open in any browser.

The report must feel like a premium consulting deliverable — human-researched, business-focused, and visually compelling — not an AI-generated SEO audit.

## 2. Scope
- **IN SCOPE:** Consuming `report_content.json`. Rendering interactive HTML with embedded CSS and JS. Generating inline SVG charts from structured data. Progressive disclosure ("See More Details"). Sticky navigation. Responsive layout. Self-contained HTML output.
- **OUT OF SCOPE:** Research, analysis, scoring, content creation, PDF generation, server-side routing.

## 3. Inputs
- `report_content.json` output from `report-writer`
- Optional `branding_config` with Mark Bishop Media contact details. Falls back to defaults.

## 4. Outputs
A single self-contained `.html` file with all CSS, JS, and SVG embedded. No external dependencies. Suitable for email delivery or hosting at `local.markbishopmedia.com/reports/<report-id>`.

## 5. Report Structure
1. **Cover / Hero** — Business name prominent. Mark Bishop Media brand. Premium dark aesthetic.
2. **Local Visibility at a Glance** — 4-pillar qualitative status map. Biggest opportunity + strongest asset callouts.
3. **What's Working** — Strengths with emerald indicators. Always before weaknesses.
4. **Priority Finding Deep Dives** — One section per finding: visual → what found → why matters → recommendation → see more.
5. **Competitive Snapshot** (conditional) — Side-by-side metrics with SVG comparison bars.
6. **Additional Opportunities** (conditional) — Secondary opportunities.
7. **Action Roadmap** — Numbered sequential steps.
8. **CTA** — Mark Bishop Media branded. Single instance. End of report only.

## 6. Visual-First Rules
- Every finding section: visual comes before text.
- Charts use only validated structured data from `visual.data` or `competitor_metrics`.
- If no meaningful visual is possible, use editorial layout — never invent a chart.
- Use inline SVG for all charts. No CDN dependencies.

## 7. Interactive Features
- Sticky navigation with active-section scroll highlighting
- "See More Details" / "See Less" toggle on every finding
- Smooth scroll to sections from navigation
- Responsive layout (desktop / tablet / mobile)
- Print stylesheet for PDF-via-browser fallback

## 8. CLI Usage
```bash
cd skills/web-report
node generate.js \
  --content ../../audit-output/dentist-monsoon-dental-audit-001.json \
  --output ../../reports/monsoon-dental/report.html \
  --branding '{"brand_name":"Mark Bishop Media","email":"mark@markbishopmedia.com","phone":"+1 (520) 349-6378"}'
```

## 9. Absolute Prohibitions
- Never hardcode any business name, competitor name, metric, or contact detail
- Never invent percentages, scores, or rankings not present in validated data
- Never expose: evidence IDs, stage names, AI/LLM references, API names, "scraped", "queried"
- Never place the CTA anywhere except the final section
- Never use CDN JavaScript libraries

## 10. Output Contract
The renderer writes a single UTF-8 encoded `.html` file and outputs a JSON metadata object to stdout conforming to the web report generation schema.
