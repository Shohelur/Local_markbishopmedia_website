# Local Business AI - System Architecture

## Core Philosophy
This system is an AI-powered local business audit and growth intelligence system. It is designed to evaluate a local business, identify critical weaknesses and opportunities, benchmark against relevant competitors, and produce a visually impressive, evidence-based report. 

The architecture is built on the principle of **Output Separation**:
- Research skills perform research.
- Analysis skills analyze data.
- The report writer writes the narrative.
- The PDF generator creates the final deliverable.

## The Master Data Architecture
The system uses a structured **Master Audit Object** as its central source of truth. All components read from and write to this structured data model. Research data does not directly become a report; it goes through a pipeline:

`Research -> Evidence -> Validation -> Analysis -> Priority -> Master Data -> Report -> PDF/Interactive Report`

### Conceptual Data Entities
- **business**: Core identity, NAP, and service info.
- **audit**: Meta-information about the audit session.
- **evidence**: Raw, factual data collected during research.
- **citations**: Discovered listings, completeness, and consistency data.
- **gbp**: Google Business Profile data and health metrics.
- **reviews**: Review volume, sentiment, themes, and response patterns.
- **competitors**: Lightweight profiles of 1-2 relevant competitors.
- **website**: (Conditional) Technical, UX, and content analysis.
- **findings**: Actionable insights derived from evidence.
- **strengths**: Genuine positives about the business.
- **health**: Overall diagnostic scores.
- **priorities**: The top critical issues to address (Top 5 rule).
- **growth_opportunities**: Recommended areas for expansion.
- **service_recommendations**: Mapped services tied to priorities (e.g., Citation Building, GBP Optimization).
- **action_plan**: Step-by-step resolution path.
- **report**: Final client-facing narrative data.

## Module Execution Flow
Every audit starts with these mandatory core modules:
1. Citation Audit
2. GBP Audit
3. Review Audit
4. Google Maps Competitor Analysis

**Website Audit**: This is conditional. It is only triggered if the first-layer audit reveals limited findings or if the website presents significant opportunities.

## Logical Components (Skills)

### Core Research / Analysis
- `business-intake`
- `citation-research`
- `citation-analysis`
- `gbp-audit`
- `review-analysis`
- `competitor-analysis`
- `website-audit`

### Quality / Intelligence
- `evidence-validator`: Ensures claims follow the Fact -> Interpretation -> Recommendation framework.
- `priority-engine`: Scores findings based on Business Impact, Evidence Confidence, Competitive Gap, Urgency, Fixability, and Business Relevance. Detects and merges duplicates.

### Output
- `report-writer`: Crafts the concise, business-owner-friendly narrative.
- `report-designer`: Applies visual hierarchy, clean cards, and layout standards.
- `pdf-generator`: Compiles the final static output.

### Orchestration
- `audit-orchestrator`: Manages the flow between skills and triggers the conditional website audit.

## Separation of Concerns
- **Skills**: Individual, reusable execution blocks (`/skills`).
- **Rules**: Global system standards, scoring frameworks, compliance constraints (`/rules`).
- **Schemas**: Data models for the Master Audit Object (`/schemas`).
- **Prompts**: Model-agnostic LLM instructions (`/prompts`).
- **Shared**: Utilities and common helpers (`/shared`).
- **Audit Data**: Raw and processed outputs (`/audit-data`).
- **Reports**: Final deliverables (`/reports`).
- **Docs**: System architecture and developer notes (`/docs`).
