---
name: mbm-local-seo
description: >-
  MBM Local SEO Audit and Geo-Grid intelligence skill. Activate when user asks 
  about local SEO, GBP audits, Google Business Profile, citation analysis, competitor 
  rankings, local visibility, or geo-grid scanning for any client business.
  Triggers on: "audit", "local seo", "gbp", "google business", "citation", 
  "competitor analysis", "local ranking", "geo-grid", "visibility scan".
---

# MBM Local SEO Intelligence

This skill runs the full local business visibility audit and provides geo-grid intelligence
for Mark Bishop Media clients. All data must come from LIVE research — zero fabrication.

## ZERO GUESSWORK HARD RULE

Every finding must trace back to verifiable evidence:
- Real review counts from live Google/Yelp/Healthgrades pages
- Actual competitor names found via local search
- True directory presence confirmed by live URL checks
- Real service catalog from the business's own website

**Never invent, estimate, or assume any data point.**

---

## Step 1: Identify Client & Load Context

Check `local-business-ai/clients/registry.json` for existing client data.

If client exists:
- Load their `clients/{slug}/memory/` files for previous audit context
- Note what was last audited and when

If new client:
- Ask: Business name, location (city + state), primary service category, website URL
- Create new entry in registry after audit

---

## Step 2: Run Full Audit Pipeline

### GBP Audit Checklist
- [ ] Business name consistency (NAP)
- [ ] Category selection (primary + secondary)
- [ ] Review count + average rating (REAL numbers only)
- [ ] Photo count and quality
- [ ] Business hours completeness
- [ ] Q&A section populated
- [ ] Posts frequency
- [ ] Response rate to reviews

### Citation Analysis by Business Type

**Dentists:** Healthgrades, Zocdoc, WebMD Care, Vitals, RateMDs, Yelp, Google
**Plumbers/HVAC:** BBB, Angi, HomeAdvisor, Yelp, Google, Thumbtack
**General:** Yelp, BBB, Facebook, Apple Maps, Bing Places, Google

Check each: listed / not listed / wrong NAP / missing info

### Competitor Analysis (MAX 2 REAL competitors)
- Find via "service + city" Google search
- Note their review count, rating, top keywords
- NEVER invent competitor data

---

## Step 3: Priority Engine (6D Scoring)

Score each finding on 6 dimensions (1-10 each):
1. **Impact** — How much revenue does this affect?
2. **Confidence** — How certain are we this is a real problem?
3. **Gap** — How far behind is the client vs competitors?
4. **Urgency** — How fast is this hurting them?
5. **Fixability** — How easy/hard to fix?
6. **Relevance** — How relevant to their specific business type?

Output: Top 5 priorities only, ranked by total score.

---

## Step 4: Geo-Grid Analysis

The geo-grid is a 9-mile radius scan around the business location.
For each grid point (conceptually), note:
- Estimated ranking position (1-3 = green, 4-10 = yellow, 11+ = red)
- Primary competitor blocking that position
- Keyword that triggers the ranking

Output: Narrative description of dominance zones, blind spots, and quick-win territories.

---

## Step 5: Save & Report

Save all findings to: `local-business-ai/audit-output/{client-slug}/`

Report format: Interactive HTML (self-contained, all CSS inline).
Master report location: `local-business-ai/reports/`

---

## Step 6: Learning Loop (Hermes-Inspired)

After each audit, append learnings to `agentic-os/context/learnings.md` under `## local-business-ai`:
- Any new directory discovered for this business type
- Any pattern noticed in competitor strategies
- Any data source that was particularly useful or unreliable
- Any correction to previous assumptions

This keeps the skill self-improving across sessions.

---

## Troubleshooting

- **Can't access live website:** Note it as a gap, use Google cache if available
- **No competitor found:** State "No strong local competitor identified" — never invent one
- **Missing review count:** Mark as "unverified" and note the date of attempt
