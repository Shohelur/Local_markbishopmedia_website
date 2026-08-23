---
name: citation-research
description: "Discovers, verifies, and classifies relevant citation opportunities and existing business listings."
---

# Citation Research Skill

## 1. Purpose
The `citation-research` skill is responsible for discovering, verifying, and classifying relevant local citation opportunities and existing listings for a business. It provides structured evidence-backed findings to the Master Audit Object.

## 2. Scope
- **IN SCOPE:** Discovery of relevant directories (Core, Industry, Local, Competitor-used). Searching platforms to verify business presence. Identity verification based on NAP/website signals. Classifying citation status. Capturing verifiable evidence.
- **OUT OF SCOPE:** Priority scoring. Report writing. Deep competitor analysis beyond identifying citation overlap. Manufacturing SEO claims.

## 3. Inputs
- `business_context`: Name, Phone, Address, Website, Industry, Type (from the Master Audit Object).
- `competitors` (Optional, max 2): Name, Address, Website of local competitors.
- Tool Access: Search Engine capability (Google Search, Site Search).

## 4. Outputs
A structured JSON object conforming to `schemas/citation_research.json`.

## 5. Workflow
1. **Read Business Context:** Ingest NAP, industry, and location.
2. **Understand:** Analyze industry and location to form a strategy.
3. **Discover Core:** Identify foundational directories (e.g., Yelp, BBB).
4. **Discover Industry:** Find niche directories (e.g., Avvo for lawyers).
5. **Discover Local:** Find regional networks (e.g., local Chamber of Commerce).
6. **Discover Competitor (Optional):** Identify where provided competitors are listed.
7. **Search:** For each discovered platform, execute targeted searches.
8. **Verify Identity:** Compare listing data against the business context.
9. **Classify:** Assign a `status` (present_healthy, missing, etc.)
10. **Capture Evidence:** Record factual observations and URLs.
11. **Output:** Generate the validated JSON schema output.

## 6. Discovery Methodology
Citation discovery is adaptive, not fixed. 
- **Core Platforms:** Major data aggregators and review sites.
- **Industry-Specific:** Dependent on the business model. Use queries like `"industry" "city" association`.
- **Local / Regional:** Dependent on geography. Use queries like `"city" business directory`.
- **Competitor-Discovered:** Check where the top 1-2 competitors are listed that the target business is not.

## 7. Search Strategy
- **Identity Verification queries:** `"Business Name" "Phone Number"`, `"Business Name" "Address"`.
- **Platform Verification queries:** `"Business Name" site:platform.com`.
- **Efficiency:** Do not execute blindly. Execute targeted, high-value searches.

## 8. Identity Verification
When a listing is found, it must be assigned an `identity_match`:
- `verified`: Multiple strong signals match without significant contradiction.
- `likely_match`: Partial match with strong probability, but missing a definitive signal (like phone).
- `uncertain`: Insufficient data to confidently declare a match.
- `not_a_match`: The listing clearly belongs to a different entity.

## 9. Status Classification
Every discovered citation opportunity must be classified:
- `present_healthy`: Reasonably complete and consistent listing.
- `present_incomplete`: Meaningful business info is missing.
- `present_inconsistent`: Meaningful info differs from reliable business context.
- `missing`: Highly relevant platform, but no verified listing found.
- `uncertain`: Insufficient research to confidently classify.

## 10. Evidence Requirements
Every meaningful research observation must have evidence:
- `evidence_id`, `source_url`, `observation` (FACT).
- If a source cannot be verified, the result is marked `uncertain`. DO NOT fabricate evidence or URLs.

## 11. Token-Saving Rules
- Max 2 competitors for discovery.
- Do not repeatedly search the same platform once a classification can be made.
- Do not ingest entire DOM trees unless absolutely necessary; rely on SERP snippets and targeted extraction.

## 12. Failure Handling
The skill must handle edge cases gracefully:
- `success`: Research completed normally.
- `partial`: Research completed but some sources timed out.
- `insufficient_data`: Not enough input data (e.g., missing business name) or search access is blocked.
- `failed`: System/tool failure.

## 13. Output Contract
See `schemas/citation_research.json` for the exact payload required.

## 14. Examples
**Target Business:** "Arizona Roofing Pros", Phoenix, AZ.
**Discovery Queries:** `"roofing contractors" "Phoenix" directory`
**Found:** HomeAdvisor listing.
**Verification Query:** `"Arizona Roofing Pros" site:homeadvisor.com`
**Result:** Listing found. Phone matches.
**Classification:** `present_healthy`
**Evidence:** URL to HomeAdvisor profile, FACT observation: "Listing present with correct NAP."
