---
name: pdf-generator
description: "Executable rendering layer that converts report_content.json + report_design.json into a professional PDF file using Puppeteer."
---

# PDF Generator Skill

## 1. Purpose
The `pdf-generator` is the terminal rendering layer of the platform. It receives the structured output from `report-writer` (content) and `report-designer` (design specification), assembles an HTML document using the component library, and renders it to PDF via headless Chromium (Puppeteer).

## 2. Scope
- **IN SCOPE:** Validating inputs, assembling HTML from content + design tokens, rendering PDF via Puppeteer, returning structured generation metadata.
- **OUT OF SCOPE:** Creating findings, modifying content, recalculating scores, generating branding assets, or performing any audit research.

## 3. Technology Stack
- **Runtime:** Node.js
- **PDF Engine:** Puppeteer (headless Chromium)
- **Rationale:** Design tokens from `report_design.json` map directly to CSS custom properties. Components map 1:1 to HTML elements. No secondary design system needed.

## 4. Executable Entry Points
| Script | Purpose |
|---|---|
| `generate.js` | Main CLI entry point |
| `renderer/html-builder.js` | Assembles full HTML from content + design |
| `renderer/components.js` | HTML component library (PriorityCard, Cover, etc.) |
| `renderer/tokens.js` | CSS custom property injection from design tokens |
| `sample/generate_sample.js` | Standalone sample PDF runner |

## 5. Installation
```bash
cd skills/pdf-generator
npm install
```

## 6. Usage
```bash
node generate.js \
  --content ../../path/to/report_content.json \
  --design ../../path/to/report_design.json \
  --output ../../reports/sample/report.pdf \
  --branding '{"booking_url":"https://example.com/book","brand_name":"LocalRank AI"}'
```

## 7. Sample Generation
```bash
cd skills/pdf-generator
node sample/generate_sample.js
# Outputs: sample/output/sample_report.pdf
```

## 8. Output
Returns `pdf_generation.json` metadata to stdout. See `schemas/pdf_generation.json` for the exact contract.
