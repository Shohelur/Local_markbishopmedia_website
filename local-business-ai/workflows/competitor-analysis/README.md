# Workflow: Competitor Analysis

## Purpose

This workflow orchestrates the identification, profiling, and comparative analysis of a client business's local competitors.

It produces a structured competitive intelligence report that reveals where the client business stands relative to its market, what competitors are doing better, and where strategic opportunities exist. Competitor data is always analysed in the context of the client's own audit results.

## Audit Scope

- Identification of top local competitors (by category, location, and keyword presence)
- GBP comparison: rating, review count, completeness, photo count
- Website comparison: speed, content depth, local SEO signals
- Review sentiment comparison: themes, response rates
- Citation footprint comparison
- Keyword and visibility gap analysis

## Workflow Stages

1. **Collect** — invoke `collect-data` skill to gather competitor GBP and website data
2. **Screenshot** — invoke `screenshot` skill to capture competitor GBP listings and key website pages
3. **Analyse** — invoke `competitor-analysis` skill to profile and compare each competitor
4. **Score** — invoke `scoring` skill to produce a relative competitive benchmark score
5. **Recommend** — invoke `recommendation-engine` skill to identify priority gaps and opportunities
6. **Store** — write competitor profiles and comparison data to `audit-memory`
7. **Report** — pass structured output to `report-generation` workflow

## Inputs

- Client business profile from Business Memory
- Competitor identifiers (GBP IDs, website URLs) from `clients/{client}/competitors/`
- Client's own audit results from `audit-memory` (for direct comparison)

## Outputs

- Structured competitor profiles
- Side-by-side comparison matrix (client vs. each competitor)
- Competitive gap analysis
- Competitor score benchmarks
- Prioritised competitive opportunity list

## Design Principles

- Model-agnostic: competitive scoring and comparison logic is model-independent
- Client-centred: all competitor analysis is framed relative to the client's position, not as standalone competitor reports
- Respectful: only publicly available data is collected and stored
