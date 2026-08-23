# Phase 10-11 — Technical Architecture & Technology Evaluation

## Purpose
Design the complete technical architecture for the production system.
Evaluate and recommend technologies with CTO-level rigor.
This is the most critical technical decision point — mistakes here are expensive.

## Role
Senior Software Architect · CTO Advisor

## Skill
Load and follow: `.agents/skills/technical-architecture/SKILL.md`
Load and follow: `.agents/skills/technology-evaluation/SKILL.md`

## Inputs Required
- Phase 5: Requirements (functional + non-functional)
- Phase 6: Approved Product Blueprint (GATE-01)
- Phase 8: Approved Prototype (GATE-02)
- Scale, performance, security, and compliance requirements

## AI Actions

### Step 1: Requirements Analysis for Architecture
Before designing anything, analyze:
- Expected user scale at launch, 6 months, 12 months
- Data volume and growth expectations
- Performance requirements (latency, throughput)
- Security and compliance requirements (GDPR, HIPAA, etc.)
- Geographic distribution requirements
- AI/LLM integration requirements (if applicable)
- Team size and technical skills available
- Budget constraints (hosting, services)

### Step 2: Architecture Design
Design the architecture for EACH layer:

#### Frontend Architecture
- Application type (SPA, MPA, SSR, SSG, mobile, etc.)
- Component architecture
- State management approach
- Routing strategy
- Build and bundling

#### Backend Architecture
- Application type (REST API, GraphQL, BFF, serverless, etc.)
- Service architecture (monolith vs. microservices recommendation with rationale)
- Authentication and authorization architecture
- Background job processing
- Caching strategy

#### Database Architecture
- Database type(s) (relational, document, key-value, graph, etc.)
- Schema design approach
- Migration strategy
- Backup and recovery

#### Authentication & Authorization
- Authentication mechanism (session, JWT, OAuth, etc.)
- Authorization model (RBAC, ABAC, etc.)
- Third-party auth providers (if applicable)

#### API Design
- API style (REST, GraphQL, tRPC, etc.)
- Versioning strategy
- Rate limiting
- API documentation approach

#### Storage
- File/media storage strategy
- CDN requirements

#### AI / LLM Integration (if applicable)
- AI provider and model selection
- Prompt architecture
- RAG or fine-tuning considerations
- Cost management

#### Hosting & Infrastructure
- Cloud provider recommendation
- Containerization strategy (Docker, Kubernetes, serverless, PaaS, etc.)
- Environments (dev, staging, production)
- CI/CD pipeline

#### Monitoring & Observability
- Error tracking
- Performance monitoring
- Logging
- Alerting

#### Security Architecture
- Data encryption (at rest, in transit)
- Secrets management
- Vulnerability scanning
- Dependency security

#### Testing Architecture
- Test types and tools
- Coverage targets
- CI integration

### Step 3: Technology Evaluation (Per Layer)
For each major technology category, evaluate using this framework:

```markdown
## [Category] — Technology Evaluation

### ✅ Recommended: [Technology]
**Why:** [Clear rationale based on project requirements]
**Strengths:** [Key strengths relevant to this project]
**Tradeoffs:** [Known weaknesses or costs]

### Alternatives Considered

| Alternative | Strength | Weakness | Verdict |
|---|---|---|---|
| [Alt 1] | ... | ... | Rejected because... |
| [Alt 2] | ... | ... | Rejected because... |

### ❌ Do Not Use: [Technology if applicable]
**Why not:** [Clear reasons this specific technology should be avoided]
```

### Step 4: Architecture Decision Records (ADRs)
For each major architecture decision, create an ADR entry in `docs/DECISIONS.md`:
- Decision made
- Context
- Options considered
- Chosen option and rationale
- Consequences

### Step 5: Produce Architecture Document
Create `docs/ARCHITECTURE.md` covering all of the above.
Use template: `.agents/plugins/ai-software-agency/agency-reference/templates/architecture-proposal.md`

## Artifacts Produced
- `docs/ARCHITECTURE.md` — Complete architecture document
- Additions to `docs/DECISIONS.md` — ADR entries for major decisions

## Completion Criteria
- [ ] All architecture layers addressed
- [ ] Technology evaluated for every major decision
- [ ] Alternatives compared for every major decision
- [ ] "Do Not Use" technologies explicitly listed
- [ ] Performance, security, scalability addressed
- [ ] Cost implications documented
- [ ] ADRs recorded in DECISIONS.md
- [ ] Architecture document is implementable (clear enough to build from)
- [ ] Committed to Git

## ⚠️ Approval Gate: GATE-03

```
╔══════════════════════════════════════════════════════════╗
║  🔒 APPROVAL GATE: GATE-03 — Architecture Approval      ║
║                                                          ║
║  Phases Completed: Architecture + Tech Evaluation        ║
║                    (Phases 10-11)                        ║
║  Artifact: docs/ARCHITECTURE.md                          ║
║                                                          ║
║  Please review the architecture document carefully.      ║
║  Technology choices made here shape the entire product.  ║
║                                                          ║
║  Reply APPROVED to proceed to Implementation Plan.       ║
║  Reply with feedback to request changes or alternatives. ║
╚══════════════════════════════════════════════════════════╝
```

**Upon approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/arch-v1`

## Next Phase
→ `12-implementation-plan.md` (GATE-04 follows)
