---
name: web-backend-dev
description: >
  Production web backend and server architecture development.
  Activate when implementing backend server logic, API routers, controllers,
  middleware, server-side authentication, background queues, or server caching in Phase 13.
---

# Skill: Web Backend Development (Layer 2 Platform)

## Purpose
Governs the implementation of production server-side application logic, backend controllers, middleware, and authentication systems during Phase 13. Used ONLY when product architecture requires backend functionality.

---

## Server Architecture Standards

### 1. Controller & Middleware Layering
- Separate routing (`routes/`), request validation (`validators/`), business logic (`services/`), and data access (`repositories/`).
- Use middleware for cross-cutting concerns:
  - Authentication verification middleware
  - Role-based authorization middleware
  - Request logging and correlation ID middleware
  - Rate limiting & CORS configuration middleware
  - Global error handling middleware

### 2. Server-Side Authentication & Session Security
- Implement secure token or session management:
  - HTTP-only, `SameSite=Lax`/`Strict`, `Secure` cookies for web sessions.
  - Password hashing using `argon2` or `bcrypt` (work factor ≥ 10).
  - Short-lived access tokens + securely stored refresh tokens.
  - Protect against CSRF and timing attacks.

### 3. Background Job Queues & Asynchronous Processing
- Offload long-running operations (email sending, image processing, PDF generation, AI model calls) to background worker queues (BullMQ, Celery, Redis queues).
- Implement job retry logic with backoff and dead-letter queues (DLQ).
- Track background job statuses cleanly.

### 4. Server-Side Caching Strategy
- Use Redis/in-memory caching for expensive queries and computed data.
- Enforce explicit Cache-Control headers on static and public API responses.
- Implement cache invalidation strategies (event-based invalidation or strict TTLs).

### 5. Input Validation & Sanitization
- Validate all incoming request bodies, headers, and query parameters using schema validators (Zod, Pydantic, Joi).
- Sanitize user inputs to prevent SQL injection, command injection, and stored XSS attacks.
