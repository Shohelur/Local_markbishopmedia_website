---
name: competitor-analysis
description: "Identifies 1-2 highly relevant competitors and extracts meaningful competitive gap intelligence."
---

# Competitor Analysis Skill

## 1. Purpose
The `competitor-analysis` skill researches a maximum of two highly relevant local competitors to determine competitive gaps across Reputation, GBP, Citations, and Website visibility. It outputs a structured JSON object outlining genuine strengths and realistic opportunities without relying on technical SEO jargon.

## 2. Scope
- **IN SCOPE:** Identifying 1-2 relevant competitors based on service, market, and intent. Collecting high-value signals (GBP, basic citations, review volume/rating, high-level website presence). Grouping findings into Fact/Interpretation/Opportunity structures. Acknowledging genuine business strengths.
- **OUT OF SCOPE:** Deep technical SEO audits. Full citation or review sentiment analysis on competitors. Creating fake causal ranking narratives ("They outrank you *because* of X"). Recommending actions outside the business's realistic control.

## 3. Inputs
- `business_context`: Name, Phone, Address, Website, Industry, Type, Service Area.
- Data from prior audits (Citation, GBP, Reviews) to prevent redundant data gathering.
- Tool Access: Search Engine and Maps tools to locate competitors.

## 4. Outputs
- A structured JSON object conforming to `schemas/competitor_analysis.json`.

## 5. Workflow
1. **Competitor Discovery:** Locate local competitors via Search/Maps based strictly on same service, same intent, and same geographic market. Avoid national brands.
2. **Limit Enforcement:** Select the top 1-2 best matches. Record the exact `selection_reason` and confidence score. Stop searching immediately.
3. **Signal Collection (Token Efficiency):** Gather only top-level signals (e.g., Review count/rating, GBP primary category, basic service/website presence). Do not crawl entire sites.
4. **Dimension Analysis:** Compare the audited business against the competitor across Reputation, GBP, Citation, and Website dimensions.
5. **Identify Strengths:** Document areas where the audited business outperforms the competitor.
6. **Formulate Gaps (Fact/Interpretation/Opportunity):** Create structured findings representing meaningful competitive differences. Avoid duplicate findings (use root-cause merging).
7. **Actionability & Evidence:** Assign actionability scores. Attach verified `evidence_ids`.
8. **Output Generation:** Validate against `competitor_analysis.json`.

## 6. Strict Rules & Constraints
- **No Causal Claims:** Do not promise that fixing a competitive gap will guarantee a ranking increase. Present it as a "competitive opportunity," not a "ranking cure."
- **Token Efficiency First:** Do not perform full, deep-dive audits on competitors. Use only the most obvious and impactful surface-level signals.

## 7. Failure Handling
- `success`: 1-2 competitors successfully analyzed.
- `partial`: Competitor found, but some dimensions (e.g., website) could not be inspected.
- `insufficient_data`: No relevant local competitor could be reliably identified matching the exact customer intent. (Do not force an irrelevant competitor).
- `failed`: System/tool failure.

## 8. Output Contract
See `schemas/competitor_analysis.json` for the exact payload required.
