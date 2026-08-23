---
name: ai-maintenance
description: >
  Guides the creation of an AI-MAINTENANCE.md document that allows a future
  AI assistant to understand and safely maintain a production project.
  Activate during Phase 19-20 of the Agency lifecycle, when finalizing
  documentation for a released product, or when updating maintenance documentation
  after significant changes.
---

# Skill: AI Maintenance

## Overview
This skill governs the creation and maintenance of the AI-MAINTENANCE.md document
that ships with every production release. This document is the primary handoff
artifact for future AI-assisted maintenance.

## Core Principle
Write as if you are handing the project to an AI assistant that:
- Has never seen this project before
- Cannot access the original conversation
- Must make safe changes without breaking production
- Needs to understand WHAT the system does AND WHY it was built this way

## AI-MAINTENANCE.md Structure

Use the template: `.agents/plugins/ai-software-agency/agency-reference/templates/ai-maintenance-guide.md`

### Writing Quality Standards
- **Plain language first**: Explain concepts before using jargon.
- **Be specific**: "The authentication uses JWT with 15-minute access tokens and 7-day refresh tokens stored in HttpOnly cookies" is better than "We use JWT."
- **Explain the WHY**: Not just what exists, but why it was built that way.
- **Warn about dangers**: "Do not change the token expiry without also updating the client refresh logic or users will be logged out."
- **Verify accuracy**: Every section must match the actual production code.

## Section-by-Section Guidance

### Section 1: Product Overview
Answer these questions in paragraph form:
- What does this product do in one sentence?
- Who uses it and in what context?
- What are the 3 most important things a user does in the system?
- What problem does it solve that wouldn't be solved without it?

### Section 2: Architecture Overview
- Draw a simple ASCII diagram if no image is available:
```
Browser → [Nginx] → [Next.js App] → [FastAPI] → [PostgreSQL]
                                ↘ [Redis Cache]
                                ↘ [S3 Storage]
```
- Describe how each component communicates.
- Describe what happens for the most common request.

### Section 3: Technology Stack
List in this format:
```markdown
| Layer | Technology | Version | Why |
|---|---|---|---|
| Frontend | Next.js | 14.x | SSR + great DX |
| Backend | FastAPI | 0.110 | Async, auto-docs, AI team familiarity |
| Database | PostgreSQL | 16 | Reliability, JSONB support |
| Cache | Redis | 7.x | Session management, rate limiting |
| Auth | Auth0 | N/A | Managed auth, reduces security burden |
| Storage | AWS S3 | N/A | Scalable file storage |
| Hosting | Railway | N/A | Simple deployment, auto-scaling |
```

### Section 14: Do Not Touch (DNT)
Format each entry as:
```markdown
### DNT: [What not to touch]
**Location**: `src/auth/middleware.ts`
**Why**: This middleware validates JWT tokens on every protected route.
  Changing the token validation logic or secret key will immediately log
  out all users and potentially allow unauthorized access.
**If you need to change this**: Create a new auth version, deploy in
  parallel, migrate users, then deprecate the old version.
**Approved by**: Founder, 2026-08-11
```

### Section 15: Safe Modifications
Format each entry as:
```markdown
### SAFE: [What is safe to modify]
**Location**: `src/components/ui/`
**Why it's safe**: These are pure presentational components with no
  business logic. Changes here affect only visual appearance.
**How to modify safely**:
1. Make change in isolated component
2. Run `npm test` to verify no snapshots broke
3. Visually review in browser
4. Commit and deploy
```

## Maintenance Currency Rule
After any significant change to the production system, update AI-MAINTENANCE.md
in the same commit or PR. Out-of-date maintenance documentation is a liability.

## Version History in AI-MAINTENANCE.md
Include a "Maintenance History" section at the bottom:
```markdown
## Maintenance History

### v1.0.1 — 2026-09-01
- Fixed: User session timeout issue
- Updated: Section 12 (Known Issues) — removed resolved bug

### v1.0.0 — 2026-08-20
- Initial production release
- AI-MAINTENANCE.md created
```
