# Workflow: Citation Audit

## Purpose

This workflow orchestrates the discovery, verification, and scoring of a client business's local citations across online directories and data aggregators.

Citations are mentions of a business's Name, Address, and Phone number (NAP) across the web. Consistency and completeness of citations are a direct local SEO ranking factor. This workflow identifies where the business is listed, whether those listings are accurate, and where gaps exist.

## Audit Scope

- Citation presence on major directories (Google, Yelp, Bing Places, Apple Maps, Facebook, etc.)
- Citation presence on niche and industry-specific directories
- NAP consistency: exact match verification against the Business Memory canonical record
- Duplicate listing detection
- Missing citation opportunities (directories where the business is absent)
- Citation authority and domain quality signals

## Workflow Stages

1. **Collect** — invoke `collect-data` skill to discover citations across configured directory sources
2. **Analyse** — invoke `citation-analysis` skill to verify NAP consistency and detect duplicates
3. **Score** — invoke `scoring` skill using the Citation scoring rubric
4. **Recommend** — invoke `recommendation-engine` skill to prioritise citation fixes and new submissions
5. **Store** — write citation inventory and findings to `audit-memory`
6. **Report** — pass structured output to `report-generation` workflow

## Inputs

- Canonical NAP record from Business Memory
- List of directories to check (from platform config)
- Prior citation audit results from `audit-memory`

## Outputs

- Full citation inventory with consistency status per listing
- NAP error report (mismatches by field)
- Missing citation opportunity list
- Citation score with category breakdowns
- Prioritised citation action list

## Design Principles

- Model-agnostic: NAP comparison logic is deterministic; AI is used only for quality and context judgements
- Canonical-first: all comparisons use Business Memory as the authoritative reference
- Incremental: new directories can be added to the check list without redesigning the workflow
