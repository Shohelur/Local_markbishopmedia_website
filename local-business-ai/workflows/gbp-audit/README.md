# Workflow: GBP Audit

## Purpose

This workflow orchestrates the end-to-end audit of a business's Google Business Profile (GBP).

It coordinates the sequential and parallel execution of skills needed to collect, analyse, score, and document the current state of a GBP listing. The workflow acts as the conductor — it does not perform analysis itself, but it decides which skills to invoke, in what order, and what to do with their outputs.

## Audit Scope

- GBP listing completeness (name, address, phone, hours, category, description, photos, attributes)
- NAP accuracy against the canonical Business Memory record
- Photo count, quality signals, and recency
- Q&A section presence and quality
- Posts activity and recency
- Review volume, rating, and response rate
- Profile verification status

## Workflow Stages

1. **Collect** — invoke `collect-data` skill to fetch live GBP data
2. **Screenshot** — invoke `screenshot` skill to capture visual evidence
3. **Analyse** — invoke relevant analysis skills against collected data
4. **Score** — invoke `scoring` skill using the GBP scoring rubric from `/shared/SCORING.md`
5. **Recommend** — invoke `recommendation-engine` skill to generate prioritised actions
6. **Store** — write findings to `audit-memory` and update `decision-memory`
7. **Report** — pass structured output to `report-generation` workflow

## Inputs

- Client Business Memory record
- GBP API data or scraped GBP data
- Prior GBP audit results from `audit-memory` (for delta comparison)

## Outputs

- Structured GBP audit findings (JSON/Markdown)
- GBP score with category breakdowns
- Prioritised recommendation list
- Screenshot evidence set

## Design Principles

- Model-agnostic: any configured AI model can execute this workflow
- Stateless per run: all state is written to memory, not held in the workflow
- Resumable: each stage can be re-run independently if a step fails
