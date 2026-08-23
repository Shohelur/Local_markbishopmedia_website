# Workflow: Website Audit

## Purpose

This workflow orchestrates the end-to-end audit of a client business's website.

It coordinates skills needed to assess the website's technical health, on-page content quality, user experience signals, mobile readiness, page speed, and local relevance. The workflow produces a structured, scored report of the site's current state.

## Audit Scope

- Page speed and Core Web Vitals
- Mobile responsiveness
- HTTPS and security signals
- On-page local SEO signals (title tags, meta descriptions, heading structure, NAP on-page)
- Schema markup presence and validity
- Internal linking structure
- Contact page and location page quality
- Call-to-action clarity

## Workflow Stages

1. **Collect** — invoke `collect-data` skill to crawl the website and retrieve page-level data
2. **Screenshot** — invoke `screenshot` skill to capture key pages as visual evidence
3. **Analyse** — invoke `website-analysis` and `local-seo-analysis` skills
4. **Score** — invoke `scoring` skill using the Website scoring rubric
5. **Recommend** — invoke `recommendation-engine` skill
6. **Store** — write findings to `audit-memory`
7. **Report** — pass structured output to `report-generation` workflow

## Inputs

- Client website URL from Business Memory
- Crawl configuration (depth, page limit)
- Prior website audit results from `audit-memory`

## Outputs

- Structured website audit findings
- Website score with category breakdowns
- Prioritised recommendation list
- Screenshot evidence set

## Design Principles

- Model-agnostic: crawl and analysis steps are decoupled from AI model choice
- Stateless per run: no workflow-level state between executions
- Composable: website-analysis and local-seo-analysis skills can be invoked independently
