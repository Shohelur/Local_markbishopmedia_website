---
name: api-integration
description: >
  Core API design, client integration, and contract enforcement patterns.
  Activate when implementing REST, GraphQL, gRPC APIs, third-party webhooks,
  or client-server communication contracts during Phase 13.
---

# Skill: API & Integration Engineering (Layer 1 Core)

## Purpose
Governs the design, implementation, and consumption of APIs and integration contracts across web, mobile, and server applications during production development.

---

## Core API Design Rules

### 1. Resource Nouns & HTTP Verbs (REST)
- Use plural nouns for resource paths (`/api/v1/users`, `/api/v1/orders`).
- Use standard HTTP verbs: `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove).
- Return standard HTTP status codes: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Rate Limited`, `500 Internal Error`.

### 2. Versioning & Contract Stability
- Version all public/client APIs (`/api/v1/`).
- Enforce strict request and response schemas (Zod, Pydantic, TypeScript interfaces).
- Maintain backward compatibility. Never remove or rename response fields in a live API version.

### 3. Pagination, Filtering & Sorting
- Implement cursor-based or limit/offset pagination for collection endpoints (`?limit=20&offset=0` or `?cursor=xyz`).
- Return pagination metadata in responses:
  ```json
  {
    "data": [...],
    "pagination": { "total": 150, "limit": 20, "offset": 0, "hasMore": true }
  }
  ```

### 4. Webhook Security & Idempotency
- Validate cryptographic signatures on incoming webhooks (Stripe, GitHub, etc.) before processing.
- Process webhooks idempotently using a processed-event ID store to prevent duplicate processing.
- Acknowledge webhooks quickly (`200 OK`) and delegate heavy processing to background workers.

### 5. Client Generation & Type Safety
- Share API type definitions between frontend and backend (OpenAPI/Swagger, tRPC, shared TypeScript packages, Pydantic/Zod schemas).
- Implement retry logic with exponential backoff for transient network errors.
