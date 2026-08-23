# Workflow: Report Generation

## Purpose

This workflow orchestrates the assembly, formatting, and export of a complete Local Business Report from structured audit findings.

It is the final stage of the audit pipeline. It does not perform analysis — it receives scored, structured output from all upstream audit workflows and transforms it into a polished, client-ready report document. Report generation is modular: individual audit sections can be generated independently or assembled into a full combined report.

## Report Modules

- Executive Summary
- Google Business Profile Audit Section
- Google Reviews Analysis Section
- Website Audit Section
- Local SEO Audit Section
- Citation Audit Section
- Competitor Analysis Section
- Priority Action Plan (consolidated from all recommendation lists)

## Workflow Stages

1. **Load** — retrieve structured findings from `audit-memory` for all requested modules
2. **Compose** — invoke `report-writer` skill to generate narrative content from structured data using the active template
3. **Assemble** — combine all sections using the selected report template from `/templates`
4. **Style** — apply brand and formatting rules from `/shared/BRAND.md` and `/shared/STYLE_GUIDE.md`
5. **Export** — invoke `pdf-export` skill to produce the final deliverable
6. **Store** — save the completed report to `clients/{client}/reports/`

## Inputs

- Structured audit findings from `audit-memory` (one or more audit modules)
- Client brand data from `clients/{client}/brand/`
- Report template from `/templates`
- Platform style rules from `/shared`

## Outputs

- Draft report in Markdown
- Final formatted report (HTML or PDF via `pdf-export`)
- Report metadata record (date, modules included, AI model used, version)

## Design Principles

- Model-agnostic: narrative generation is prompt-driven and works across AI models
- Template-driven: report structure is defined by templates, not hardcoded in the workflow
- Modular: any subset of audit sections can be included without breaking the assembly process
- Versioned output: every generated report is stored with a unique version identifier
