---
name: website-audit
description: "A conditional module that evaluates a local business website's UX, service clarity, structured data, and local SEO performance."
---

# Website Audit Skill

## 1. Purpose
The `website-audit` skill is a **conditional** intelligence module. Unlike the foundational audit layers (Citation, GBP, Reviews, Competitor), the website audit only runs when the audit orchestrator triggers it. Its goal is to determine if the business's website helps or hinders local customer acquisition, focusing on service clarity, NAP consistency, usability, and schema.

## 2. Scope
- **IN SCOPE:** Evaluating the Trigger Gate. Assessing Homepage, Main Service Page, and Contact Page. Verifying NAP consistency, LocalBusiness/Organization Schema, mobile usability, and service/location clarity. Extracting genuine strengths. Mapping to local SEO and web dev services.
- **OUT OF SCOPE:** Generic enterprise technical SEO crawling. Fabricating PageSpeed or Core Web Vitals metrics. Deep technical competitor website audits. Recommending keyword stuffing or doorway pages. Writing the final client report.

## 3. Inputs
- `business_context`: Verified canonical Name, Phone, Address, Website URL.
- Prior audit data from Citation, GBP, Review, and Competitor analysis.
- Evaluator Trigger Rule context.
- Tool Access: Ability to inspect HTML/DOM of high-priority pages.

## 4. Outputs
- A structured JSON object conforming to `schemas/website_audit.json`.

## 5. Workflow
1. **The Trigger Gate:** Evaluate if the audit is necessary. If skipped (e.g., prior audits found enough critical issues, or website is inaccessible), set `audit_trigger.status = skipped`, detail the reason, and exit early.
2. **"No Website" Edge Case:** If the business lacks a website, output a specific finding noting customer discovery limitations, map to "Website Development", set `audit_trigger.status = not_applicable`, and exit early.
3. **Local Priority Inspection:** Inspect high-priority pages (Homepage, Contact, Main Service).
4. **Information Consistency Check:** Compare on-site NAP with canonical `business_context`.
5. **Schema & Performance Verification:** Check for LocalBusiness schema. Record performance metrics *only* if an actual tool provides them. (Set to `unavailable` if missing).
6. **UX & Clarity Assessment:** Evaluate mobile readability, contact accessibility, and clear service area communication.
7. **Identify Strengths:** Document areas where the website performs well.
8. **Formulate Findings (Fact/Interpretation/Recommendation):** Create structured findings backed by `evidence_ids`.
9. **Output Generation:** Validate against `website_audit.json`.

## 6. Strict Rules & Constraints
- **Token Efficiency:** Do not crawl the entire website. Prioritize a maximum of 3-5 critical pages. Do not send massive raw HTML dumps to the model context.
- **No Fabricated Evidence:** If schema or performance data is unobservable, the skill must preserve that uncertainty rather than inventing a failure finding.
- **No Causal SEO Claims:** Do not claim that "fixing schema will guarantee #1 rankings."

## 7. Failure States
- `success`: Website analyzed normally.
- `partial`: Homepage accessible, but specific technical/performance data unavailable.
- `insufficient_data`: Website domain known but inaccessible (e.g., 404/500).
- `failed`: System error.

## 8. Output Contract
See `schemas/website_audit.json` for the exact payload required.
