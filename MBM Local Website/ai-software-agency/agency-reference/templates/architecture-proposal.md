# Technical Architecture — [Project Name]

> **Version:** 1.0
> **Status:** DRAFT | APPROVED
> **Date:** YYYY-MM-DD
> **Approved by Founder:** [ ] Pending | [x] GATE-03 Approved

---

## 1. Architecture Overview

### System Summary
[One paragraph describing the system architecture at a high level]

### Architecture Diagram
```
[Component diagram described in ASCII or text]
```

### Architecture Pattern
[Monolith / Modular Monolith / Microservices / Serverless — and WHY]

---

## 2. Frontend Architecture

### ✅ Recommended: [Framework]
**Rationale:** [Project-specific reasons]
**Tradeoffs:** [Known weaknesses]

### Alternatives Evaluated
| Alternative | Verdict |
|---|---|
| [Alt 1] | Rejected: [reason] |

### Application Type
[SPA / SSR / SSG / MPA / Mobile Native / PWA]

### Build Toolchain
[Build tool, bundler, linter, formatter]

### State Management
[Approach and tool]

---

## 3. Backend Architecture

### ✅ Recommended: [Framework + Language]
**Rationale:** [Project-specific reasons]
**Tradeoffs:** [Known weaknesses]

### Architecture Pattern
[REST API / GraphQL / BFF / Serverless functions / etc.]

### Monolith vs. Microservices Decision
**Decision:** [Monolith / Microservices]
**Rationale:** [Specific reasoning for this project's scale and team]

---

## 4. Database Architecture

### ✅ Recommended: [Database]
**Rationale:** [Project-specific reasons]
**Tradeoffs:** [Known weaknesses]

### Schema Approach
[How data will be modeled]

### Migration Strategy
[Tool and approach for schema migrations]

### Caching Strategy
[Cache layer: what is cached and how]

### ❌ Do Not Use: [Database(s)] (if applicable)
**Reason:** [Why specifically wrong for this project]

---

## 5. Authentication & Authorization

### Authentication: ✅ [Chosen Approach]
**Mechanism:** [JWT / Session / OAuth2 / etc.]
**Provider:** [Auth0 / Clerk / Supabase / Custom / etc.]
**Rationale:** [Why for this project]

### Authorization Model
[RBAC / ABAC / Policy-based — and how it's implemented]

### Roles
| Role | Description | Key Permissions |
|---|---|---|
| [Role] | [Description] | [Permissions] |

---

## 6. API Design

### ✅ Recommended: [REST / GraphQL / tRPC]
**Rationale:** [Why for this project]

### Versioning Strategy
[URL versioning / header versioning / etc.]

### Rate Limiting
[Approach and limits]

---

## 7. File & Media Storage

### ✅ Recommended: [Solution]
**Rationale:** [Why for this project]

### CDN Strategy
[CDN approach if applicable]

---

## 8. AI / LLM Integration (if applicable)

### Provider: ✅ [Provider]
**Model(s):** [Model names]
**Rationale:** [Why for this project]
**Integration Pattern:** [Direct API / LangChain / etc.]
**Cost Management:** [Token limits, caching strategy]

---

## 9. Infrastructure & Hosting

### Cloud Provider: ✅ [Provider]
**Rationale:** [Why for this project]

### Compute Strategy
[PaaS / Containers / Serverless / VMs — and why]

### Environments
| Environment | Provider/Config | Purpose |
|---|---|---|
| Development | Local | Developer workstations |
| Staging | [Provider] | Pre-release testing |
| Production | [Provider] | Live users |

### CI/CD Pipeline
[Tool and pipeline description]

### ❌ Do Not Use: [Provider/service] (if applicable)
**Reason:** [Why]

---

## 10. Monitoring & Observability

| Concern | Solution | Rationale |
|---|---|---|
| Error tracking | [Tool] | [Why] |
| Performance monitoring | [Tool] | [Why] |
| Logging | [Tool/approach] | [Why] |
| Alerting | [Tool] | [Why] |

---

## 11. Security Architecture

| Concern | Solution |
|---|---|
| Secrets management | [Approach] |
| Encryption at rest | [Approach] |
| Encryption in transit | TLS 1.2+ enforced |
| Dependency scanning | [Tool] |
| CORS | [Config approach] |
| CSP | [Config approach] |

---

## 12. Testing Architecture

| Type | Framework | Coverage Target |
|---|---|---|
| Unit | [Tool] | ≥80% business logic |
| Integration | [Tool] | Key API endpoints |
| E2E | [Tool] | Core user journeys |
| Performance | [Tool if applicable] | [Targets] |

---

## 13. Architecture Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| [Risk] | Low/Med/High | Low/Med/High | [Mitigation] |

---

## 14. Technology Decisions Summary

| Layer | Technology | Version | Status |
|---|---|---|---|
| Frontend | [Tech] | [v] | ✅ Approved |
| Backend | [Tech] | [v] | ✅ Approved |
| Database | [Tech] | [v] | ✅ Approved |
| Auth | [Tech] | [v] | ✅ Approved |
| Hosting | [Tech] | [N/A] | ✅ Approved |
