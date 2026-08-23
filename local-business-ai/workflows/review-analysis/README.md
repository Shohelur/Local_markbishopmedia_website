# Workflow: Review Analysis

## Purpose

This workflow orchestrates the collection, processing, and analysis of a client business's Google Reviews and reviews from other platforms.

It coordinates skills to retrieve raw review data, perform sentiment and theme analysis, assess the business's response behaviour, and produce a structured reputation intelligence report.

## Audit Scope

- Total review count and rating distribution
- Review velocity (volume over time)
- Sentiment analysis: positive, neutral, and negative themes
- Recurring complaint patterns
- Recurring praise patterns
- Owner response rate and response quality
- Review recency and freshness signals
- Comparison against competitor review profiles

## Workflow Stages

1. **Collect** — invoke `collect-data` skill to fetch reviews from GBP and other configured platforms
2. **Analyse** — invoke `review-analysis` skill for sentiment, theme, and response quality analysis
3. **Score** — invoke `scoring` skill using the Reviews scoring rubric
4. **Recommend** — invoke `recommendation-engine` skill for response strategy and reputation actions
5. **Store** — write findings and extracted themes to `audit-memory`
6. **Report** — pass structured output to `report-generation` workflow

## Inputs

- Client GBP ID and any additional review platform identifiers from Business Memory
- Raw review dataset (collected or previously cached)
- Prior review analysis results from `audit-memory`

## Outputs

- Structured review analysis findings
- Sentiment breakdown and theme clusters
- Response quality assessment
- Review score with category breakdowns
- Prioritised reputation recommendation list

## Design Principles

- Model-agnostic: sentiment and theme extraction are prompt-driven and work across AI models
- Volume-aware: designed to handle businesses with very few or very many reviews without breaking
- Privacy-conscious: reviewer PII is never stored in memory beyond what is publicly available
