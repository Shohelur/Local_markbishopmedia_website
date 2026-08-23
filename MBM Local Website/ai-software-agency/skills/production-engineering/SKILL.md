---
name: production-engineering
description: >
  Mandatory core engineering standards for production application code (Phase 13).
  Governs clean code practices, environment variable management, logging/observability,
  error handling strategies, defensive programming, and structured refactoring.
---

# Skill: Production Engineering (Layer 1 Core)

## Purpose
Establishes mandatory production engineering standards and implementation orchestration guidelines across all target platforms during Phase 13 (Production Development).

## ⚠️ Gate Lock Requirement
This skill is **LOCKED** until GATE-01, GATE-02, GATE-03, and GATE-04 are ALL `APPROVED`.
Do NOT write or modify production application code (`src/`) unless all gates are cleared.

---

## Core Engineering Mandates

### 1. Environment & Configuration Management
- Store all configuration in environment variables (`.env`).
- Never commit secrets, credentials, API keys, or private URIs to Git.
- Provide a clear `.env.example` with template variable names and non-secret defaults.
- Validate configuration schema on application startup (crash early if required `.env` keys are missing).

### 2. Defensive Programming & Error Handling
- Never swallow exceptions silently. Log every caught error with context and stack trace.
- Distinguish between expected operational errors (e.g. invalid user input -> HTTP 400) and unexpected programmer errors (e.g. null pointer -> HTTP 500).
- Return standard, structured error objects across APIs (`{ "error": { "code": "INVALID_INPUT", "message": "..." } }`).
- Implement boundary validation for all external inputs (request bodies, query params, third-party webhook payloads).

### 3. Structured Logging & Observability
- Use structured JSON logging in production environments (`level`, `timestamp`, `message`, `context`, `traceId`).
- Use appropriate log levels: `DEBUG` (dev only), `INFO` (key state transitions), `WARN` (handled anomalies), `ERROR` (failures requiring attention).
- Include request tracing IDs across microservice / client-server boundaries.

### 4. Code Hygiene & Refactoring Standards
- Follow single-responsibility principle: small, focused modules (<200 lines per file where practical).
- Maintain clear layer boundaries (Presentation -> Business Logic -> Data Access).
- Never duplicate business logic. Extract reusable utility functions.
- Preserve backward compatibility when refactoring internal APIs.

### 5. Systematic Debugging & Diagnostics Protocol
When a build or runtime failure occurs during Phase 13:
1. **Log First:** Read the exact, un-truncated error log before forming hypotheses.
2. **Root Cause Analysis:** Trace the failure back to the specific line and variable state.
3. **No Symptoms Patches:** Never mask errors by suppressing exceptions, returning dummy zero-byte data, or commenting out broken tests.
4. **Checkpoint Commit:** Create a recovery commit before attempting risky structural refactors:
   ```bash
   git add -A
   git commit -m "checkpoint(<scope>): stable state before refactoring <component>"
   ```

---

## Relationship with Specialized Skills
- This skill provides **orchestration standards, logging, configuration, and debugging rules**.
- It does **NOT** contain frontend component syntax, SQL schemas, API routes, or framework code.
- Specialized skills (`web-frontend-dev`, `web-backend-dev`, `database-engineering`, `tech-*`) own their domain implementation details.
