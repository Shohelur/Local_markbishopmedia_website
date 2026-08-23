# Requirements — [Project Name]

> **Version:** 1.0
> **Status:** DRAFT | APPROVED
> **Date:** YYYY-MM-DD
> **Phase:** 5 — Requirements
> **Blueprint Reference:** `docs/PRODUCT-BLUEPRINT.md`

---

## How to Use This Document

This document is the **traceability anchor** for the entire project.
Every feature implemented in production must trace back to a numbered
requirement (FR-NNN) in this file. Every test case must reference the
requirement it verifies.

Traceability chain:
```
Problem (Phase 1)
  → FR-NNN (this document)
    → Blueprint Feature (PRODUCT-BLUEPRINT.md §8)
      → Prototype Screen (prototype/)
        → Architecture Component (ARCHITECTURE.md)
          → Implementation Task (IMPLEMENTATION-PLAN.md)
            → Production Code (src/)
              → Test Case TC-NNN (docs/testing/)
```

---

## 1. Functional Requirements

> Write each requirement as a user story with acceptance criteria.
> Number requirements sequentially: FR-001, FR-002, etc.
> Priority: **MVP** (must ship in v1.0) | **v1.1** | **v2.0** | **Out of Scope**

---

### FR-001 — [Requirement Name]

**User Story:**
> As a [persona / role], I want to [action], so that [outcome / benefit].

**Acceptance Criteria:**
- [ ] AC-001a: [Specific, testable criterion]
- [ ] AC-001b: [Specific, testable criterion]
- [ ] AC-001c: [Edge case or error condition]

**Priority:** MVP
**Blueprint Feature Reference:** §8 — [Feature name]
**Test Coverage:** TC-001 *(filled in during Phase 14)*
**Notes:** [Any clarifications or constraints specific to this requirement]

---

### FR-002 — [Requirement Name]

**User Story:**
> As a [persona / role], I want to [action], so that [outcome / benefit].

**Acceptance Criteria:**
- [ ] AC-002a: [Specific, testable criterion]
- [ ] AC-002b: [Specific, testable criterion]

**Priority:** MVP
**Blueprint Feature Reference:** §8 — [Feature name]
**Test Coverage:** TC-002 *(filled in during Phase 14)*

---

*(Add FR-003, FR-004, etc. following the same pattern)*

---

## 2. Non-Functional Requirements

> Document how the system must perform and behave, not what it must do.

| Category | Requirement | Target | Notes |
|---|---|---|---|
| **Performance** | Page load time (initial) | < 3 seconds on 4G | |
| **Performance** | API response time (p95) | < 500ms | |
| **Scalability** | Concurrent users at launch | [N] users | |
| **Scalability** | Concurrent users at 12 months | [N] users | |
| **Availability** | Uptime target | 99.9% (< 8.7 hrs downtime/year) | |
| **Security** | Authentication required | All non-public routes | |
| **Security** | Data encryption at rest | All PII and sensitive data | |
| **Security** | Data encryption in transit | TLS 1.2+ required | |
| **Compliance** | Regulatory requirements | [GDPR / HIPAA / None] | |
| **Accessibility** | WCAG compliance level | WCAG 2.1 AA | |
| **Usability** | Supported browsers | Chrome, Firefox, Safari, Edge (latest 2 versions) | |
| **Usability** | Mobile support | [Yes / No] — [screen sizes] | |
| **Maintainability** | Code coverage target | ≥ 80% for business logic | |
| **Localization** | Languages at launch | [English only / list languages] | |

---

## 3. Constraints

> Hard limits that cannot be changed — budget, timeline, technology mandates, regulations.

| Type | Constraint | Source |
|---|---|---|
| **Timeline** | [e.g., Must launch before YYYY-MM-DD] | Founder |
| **Budget** | [e.g., Max $X/month infrastructure cost] | Founder |
| **Technical** | [e.g., Must integrate with [existing system]] | Founder |
| **Technical** | [e.g., Must use [specific technology]] | Founder |
| **Regulatory** | [e.g., Must not store payment data directly] | Legal/Compliance |
| **Operational** | [e.g., Must be maintainable by a solo developer] | Founder |

---

## 4. Assumptions

> Things believed to be true that have not been explicitly verified.
> If an assumption proves false, requirements may need to change.

| # | Assumption | Impact if Wrong |
|---|---|---|
| A-001 | [Assumption statement] | [What would need to change] |
| A-002 | [Assumption statement] | [What would need to change] |

---

## 5. Dependencies

> External systems, services, or people that the product depends on.

| Dependency | Type | Criticality | Notes |
|---|---|---|---|
| [Third-party API / Service] | External API | Critical / Important / Nice-to-have | [Version, rate limits, cost] |
| [Data source] | Data | Critical | [Format, access method] |
| [Human dependency] | Human | Critical | [Who, what they provide] |

---

## 6. Traceability Matrix

> Updated during Phase 14 (Testing/QA). Pre-filled with FR-NNN → Blueprint mapping.
> Test case column (TC-NNN) filled in during Phase 14.

| Requirement | Priority | Blueprint Feature | Prototype Screen | Test Case | Status |
|---|---|---|---|---|---|
| FR-001 | MVP | §8 — [Feature] | [Screen name] | TC-001 | Not Started |
| FR-002 | MVP | §8 — [Feature] | [Screen name] | TC-002 | Not Started |
| FR-003 | v1.1 | §10 — [Future] | N/A | N/A | Deferred |

**Status values:** Not Started | In Progress | Implemented | Tested | Verified

---

## 7. Change Log

| Date | Version | Change | Author |
|---|---|---|---|
| YYYY-MM-DD | 1.0 | Initial requirements document | [AI / Founder] |
