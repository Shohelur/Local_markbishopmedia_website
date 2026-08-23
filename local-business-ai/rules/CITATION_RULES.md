# Citation Rules & Constraints

This document defines the strict global constraints for performing Citation Research on the Local Business AI platform. All agents performing citation research must adhere to these rules.

## 1. Adaptive Discovery Principle
Citation research must **NOT** be treated as a fixed checklist of directories. The AI must discover relevant citation opportunities dynamically based on:
- Business industry (e.g., Roofing vs. Restaurant)
- Business type (B2B vs B2C, Service Area vs Storefront)
- Location (City, State, Region)
- Relevant business ecosystem (Trade associations, local chambers)
- Competitor presence (Where are relevant competitors listed?)

## 2. Prohibition on Unsupported SEO Claims
- **DO NOT** claim that missing a specific directory is directly causing a Google ranking loss.
- Describe missing listings as "citation/local visibility opportunities" unless stronger evidence supports a more specific claim.

## 3. Fact vs. Research Note Distinction
- **FACT:** What was observed (e.g., "No verified Yelp listing was found for the business after targeted searches.")
- **RESEARCH NOTE:** What the researcher believes the observation means (e.g., "Yelp was identified as a relevant citation opportunity for this business.")
- **PROHIBITED CLAIM:** "Not being on Yelp is causing the business to rank lower on Google."

## 4. Identity Verification Standards
Before declaring a listing belongs to the business, you must compare available identity signals:
- Business name
- Phone
- Address / City
- Website
- Industry / Category

Assign one of the following `identity_match` states:
- `verified`: Multiple strong signals match without significant contradiction.
- `likely_match`: Partial match with strong probability, but missing a definitive signal (like phone).
- `uncertain`: Insufficient data to confidently declare a match.
- `not_a_match`: The listing clearly belongs to a different entity.

**Rule:** Do not confidently attribute a listing to a business when identity evidence is weak.

## 5. Token Efficiency & Search Limits
- **Max Competitors:** Use maximum 2 competitors (prefer 1) solely for discovering citation opportunities. Do not perform deep competitor research here.
- **Search Targeted:** Do not blindly execute huge lists of search queries. Prioritize high-value queries (e.g., `"industry" "city" directory`).
- **Stop Condition:** Stop researching a source once there is enough evidence to classify it. Do not repeatedly search the same platform.
- **Payload Limits:** Do not send large raw webpage contents into the model context unnecessarily. Store concise observations and source references instead.
- **Scope:** Do not attempt to discover every possible directory on the internet. Prioritize relevant opportunities.

## 6. Failure States & Uncertainty
- If a source cannot be verified or accessed, mark the result as `uncertain` or `insufficient_data`. 
- Do not convert uncertainty into a false `missing` status.
- **DO NOT manufacture or guess data.**
