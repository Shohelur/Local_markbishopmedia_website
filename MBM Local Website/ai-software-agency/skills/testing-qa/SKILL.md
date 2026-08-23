---
name: testing-qa
description: >
  Guides the creation and execution of a comprehensive testing and QA process.
  Activate during Phase 14 of the Agency lifecycle, when creating a test plan,
  writing tests, performing QA, or producing test results documentation.
---

# Skill: Testing / QA

## Overview
This skill governs the testing and quality assurance process that occurs after
production development and before security review.

---

## Forbidden Actions (M-11 Rule)

❌ **FORBIDDEN:** Marking any test as `PASS` without actual command execution
❌ **FORBIDDEN:** Self-certifying test results by code inspection alone ("the code looks correct")
❌ **FORBIDDEN:** Inventing test coverage percentages or test execution logs
❌ **FORBIDDEN:** Declaring QA complete without executing the test suite

### How Test Results MUST Be Produced
1. Run the test command in the terminal (`npm test`, `pytest`, `go test ./...`).
2. Capture the actual terminal output and exit code.
3. Record actual output in `docs/testing/test-results.md`.
4. If tests cannot be run directly by the AI, instruct the Founder to execute the command and paste the output.

---

## Requirements Traceability Anchor
Every test case in the test plan MUST map back to a numbered functional requirement (FR-NNN) from `docs/REQUIREMENTS.md`.

---

## Testing Pyramid

```
         /\
        /E2E\          ← Few, slow, high value (Playwright / Cypress)
       /------\
      /  Integ  \      ← Some, moderate speed (API + DB contracts)
     /------------\
    /    Unit       \  ← Many, fast, cover business logic (≥80% target)
   /------------------\
```

---

## Test Plan Template

```markdown
# Test Plan — [Project] v1.0.0

## Traceability Matrix (FR-NNN → Test Case)
| Requirement ID | Description | Test Case ID | Status | Execution Log Link |
|---|---|---|---|---|
| FR-001 | User authentication | TC-001 | PASS | `docs/testing/logs/unit.txt` |
| FR-002 | Checkout flow | TC-002 | PASS | `docs/testing/logs/e2e.txt` |

## Test Cases

### TC-001: User Login Validation
**Requirement:** FR-001
**Type:** Integration
**Steps:**
1. Send POST request to `/api/auth/login` with valid credentials.
2. Verify HTTP 200 and JWT cookie set.
**Actual Result:** PASS (Executed via `npm test -- auth.test.js`)
```

---

## Bug Severity Definitions
| Severity | Definition | Action |
|---|---|---|
| **Critical** | Core user journey blocked, data loss, security issue | Must fix before GATE-05 |
| **Major** | Feature broken, significant degradation | Must fix before GATE-05 |
| **Minor** | Small UX issue, rare edge case | Fix or defer to next version |
| **Enhancement** | Improvement idea | Log in backlog |

---

## QA Sign-off Criteria
Release is ready for Security Review (Phase 15) when:
- [ ] All automated tests executed and passing (0 failures with execution logs)
- [ ] All FR-NNN requirements have at least one passing test case
- [ ] No Critical or Major open bugs
- [ ] Code coverage target met (≥80% business logic)
- [ ] Test execution logs saved in `docs/testing/logs/`
- [ ] `docs/PROJECT.md` updated with Phase 14 status
