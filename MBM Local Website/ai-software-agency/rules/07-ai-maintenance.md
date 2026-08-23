# Rule 07 — AI Maintenance

## Statement

Every production project released by this Agency must ship an `AI-MAINTENANCE.md`
document that allows a future AI assistant to understand and safely maintain
the system without relying on the original conversation or the original AI instance.

## Purpose

Software needs to be maintained long after initial development. The original
conversation context will be lost. A future AI assistant (possibly a different
model or in a different environment) must be able to:

- Understand what the product does and why it exists.
- Understand the technical architecture.
- Set up a local development environment.
- Make safe changes to the codebase.
- Deploy the application.
- Roll back a bad release.
- Understand what MUST NOT be changed carelessly.

## Required Sections in AI-MAINTENANCE.md

The AI-MAINTENANCE.md must contain all of the following sections:

### 1. Product Overview
- What the product is.
- Who uses it and why.
- Core user workflows in plain language.

### 2. Architecture Overview
- High-level diagram or description.
- How the main components interact.
- Data flow through the system.

### 3. Technology Stack
- Every technology used with its version.
- Why it was chosen (brief).
- Known limitations or gotchas.

### 4. Repository Structure
- Annotated directory tree showing what lives where and why.

### 5. Setup Instructions
- Step-by-step instructions to set up a local development environment.
- All prerequisites listed.
- Common setup problems and solutions.

### 6. Environment Configuration
- All environment variables listed.
- What each variable controls.
- Where secrets are stored (NOT the secret values themselves).
- Links to secret management system.

### 7. Database
- Schema overview.
- Migration strategy (how to run and create migrations).
- Backup and restore procedures.

### 8. API Reference
- Key endpoints, their purpose, and authentication requirements.
- Link to full API documentation if applicable.

### 9. Deployment
- How to deploy (step-by-step).
- CI/CD pipeline description.
- Environments (dev, staging, production) and their differences.

### 10. Testing
- How to run all tests.
- Expected coverage thresholds.
- How to add new tests.

### 11. Security
- Authentication and authorization model.
- Known security considerations.
- How to rotate secrets or credentials.

### 12. Known Issues
- Current bugs or limitations.
- Workarounds if applicable.
- Priority/severity of each issue.

### 13. Technical Debt
- What shortcuts were taken and why.
- What should be improved in future versions.
- Risk level of each item.

### 14. Architectural Decisions
- Key decisions that are NOT obvious from the code.
- Why certain approaches were chosen over alternatives.
- What would break if these decisions were reversed.

### 15. Do Not Touch (DNT)
- Specific files, functions, or systems that must NOT be changed without
  deep understanding and explicit Founder approval.
- What would break and why.

### 16. Safe Modifications
- Areas of the codebase that are low-risk to modify.
- How to safely add new features.
- How to safely modify existing features.

### 17. Rollback Procedures
- How to roll back a bad production deployment.
- Which Git tag or commit to revert to.
- How to verify the rollback was successful.

## Maintenance Standard

The AI-MAINTENANCE.md must be:
- Written in plain, clear language (no jargon without explanation).
- Accurate (out-of-sync docs are worse than no docs).
- Updated whenever significant architectural or product changes are made.
- Reviewed as part of every release process.

## Template

The template for AI-MAINTENANCE.md is at:
`.agents/plugins/ai-software-agency/agency-reference/templates/ai-maintenance-guide.md`
