# Product Blueprint — [Project Name]

> **Version:** 1.0
> **Status:** DRAFT | APPROVED
> **Date:** YYYY-MM-DD
> **Approved by Founder:** [ ] Pending | [x] GATE-01 Approved

---

## 1. Product Vision

_A clear, inspiring statement of what this product is and the world it creates for users._

> [One or two sentences. Be ambitious but specific. This should resonate with both
> technical and non-technical stakeholders.]

---

## 2. Problem Definition

### The Problem
_Describe the specific, real problem this product solves._

### Who Experiences This Problem
_Who suffers from this problem today?_

### How It's Currently Solved
_What do people do today to solve this? What are the pain points?_

### Cost of the Problem
_What is the cost (time, money, frustration, risk) of NOT having this product?_

---

## 3. Target Users

### Primary Users
_The main people who will use this product daily._

### Secondary Users
_People who interact with the system but are not the primary users._

### Non-Users
_People who should NOT be targeted or who the product is explicitly not for._

---

## 4. Personas

### Persona 1: [Name]
- **Role / Context:** [Job title, situation]
- **Age range:** [e.g., 28-40]
- **Technical proficiency:** [Low / Medium / High]
- **Primary device:** [Mobile / Desktop / Both]
- **Goals:** [What they want to achieve]
- **Frustrations:** [What frustrates them with current solutions]
- **Key scenario:** [A typical day-in-the-life moment where this product helps]

### Persona 2: [Name]
[Repeat structure]

---

## 5. User Jobs (Jobs-to-be-Done)

For each persona, the functional, emotional, and social jobs they hire this product to do:

### [Persona 1 Name]
| Job Type | Job Statement |
|---|---|
| Functional | When I [situation], I want to [motivation], so I can [expected outcome] |
| Emotional | I want to feel [emotion] when I [action] |
| Social | I want others to perceive me as [perception] |

---

## 6. Core Use Cases

_The most important things users do in this system. These drive the feature map
and user flows._

| # | Use Case | Primary Persona | Frequency |
|---|---|---|---|
| UC-01 | [Use case name] | [Persona] | Daily / Weekly / Occasional |
| UC-02 | ... | | |

---

## 7. User Journeys

### Journey: [Use Case Name] (UC-01)
**Actor:** [Persona Name]
**Trigger:** [What initiates this journey]
**Goal:** [What the user wants to accomplish]

| Step | User Action | System Response | Touchpoint |
|---|---|---|---|
| 1 | [User does X] | [System shows Y] | [Screen/View] |
| 2 | ... | ... | ... |

**Happy Path Outcome:** [What happens when everything works]
**Key Failure Points:** [Common errors or blockers]

---

## 8. Feature Map

### [Feature Category 1]
| Feature | Description | Priority | Complexity |
|---|---|---|---|
| [Feature name] | [What it does] | MVP | S/M/L/XL |
| [Feature name] | [What it does] | v1.1 | S/M/L/XL |

### [Feature Category 2]
[Repeat]

---

## 9. MVP Scope

The following features are included in the MVP (v1.0.0):

- [Feature 1]
- [Feature 2]
- [Feature 3]

**MVP Definition:** The smallest version of the product that delivers real value
to [primary persona] and allows us to validate [key assumption].

---

## 10. Future Scope

Features planned for future versions:

| Feature | Target Version | Rationale |
|---|---|---|
| [Feature] | v1.1 | [Why deferred] |
| [Feature] | v2.0 | [Why deferred] |

---

## 11. Non-Goals

This product explicitly does NOT:

- [Non-goal 1] — [Brief reason]
- [Non-goal 2] — [Brief reason]

---

## 12. Business Rules

Rules the system MUST enforce:

| # | Rule |
|---|---|
| BR-01 | [Business rule] |
| BR-02 | [Business rule] |

---

## 13. Roles & Permissions

| Role | Description | Key Permissions |
|---|---|---|
| [Role 1] | [Who this is] | [What they can do] |
| [Role 2] | | |

---

## 14. Information Architecture

```
[App Root]
├── [Public Area]
│   ├── Landing Page
│   └── Login / Registration
├── [Main App Area]
│   ├── [Section 1]
│   ├── [Section 2]
│   └── Settings
└── [Admin Area] (if applicable)
```

---

## 15. Screen Map

| Screen | Purpose | Access Level |
|---|---|---|
| Landing Page | Marketing / entry point | Public |
| Login | Authentication | Public |
| Dashboard | Overview of key data | Authenticated |
| [Screen N] | [Purpose] | [Role] |

---

## 16. User Flows (Summary)

> Full step-by-step flows live in: `docs/ux/user-flows.md` (Phase 7)
> This section MUST contain summary-level user flows for all core use cases to ensure the blueprint is self-contained.

### Flow Summary: [Use Case UC-01 Name]
- **Actor:** [Persona Name]
- **Entry Point:** [Screen Name]
- **Happy Path:** [Step 1] → [Step 2] → [Step 3] → [Outcome]
- **Key Failure/Error Branch:** [Main exception or blocker & recovery step]

### Flow Summary: [Use Case UC-02 Name]
- **Actor:** [Persona Name]
- **Entry Point:** [Screen Name]
- **Happy Path:** [Step 1] → [Step 2] → [Step 3] → [Outcome]
- **Key Failure/Error Branch:** [Main exception or blocker & recovery step]

*(Repeat for all core MVP use cases)*

---

## 17. Integrations

| Integration | Purpose | Priority |
|---|---|---|
| [Service/API] | [What it does for the product] | MVP / Future |

---

## 18. Success Metrics

| Metric | Target | How Measured |
|---|---|---|
| [KPI 1] | [Target value] | [Measurement method] |
| [KPI 2] | | |

---

## 19. Constraints

| Type | Constraint |
|---|---|
| Technical | [e.g., Must work offline] |
| Business | [e.g., Must launch within 3 months] |
| Regulatory | [e.g., GDPR compliance required] |

---

## 20. Assumptions

- [Assumption 1]
- [Assumption 2]

---

## 21. Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| [Risk description] | Low/Med/High | Low/Med/High | [Mitigation strategy] |
