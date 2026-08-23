---
name: tech-python-fastapi
description: >
  Python FastAPI framework micro-skill (Pydantic models, async routes, dependency injection).
  Activate ONLY when FastAPI is selected in GATE-03 docs/ARCHITECTURE.md during Phase 13.
---

# Skill: FastAPI (Layer 3 Tech Skill)

> ⚡ **On-Demand Micro-Skill:** Activated only when `FastAPI` is selected in `docs/ARCHITECTURE.md`. Focuses strictly on FastAPI async routing, Pydantic data schemas, and dependency injection patterns.

## FastAPI Idioms & Patterns
- **Pydantic Schemas:** Use Pydantic `BaseModel` schemas for all request validation (`CreateUserRequest`) and response contracts (`UserResponse`).
- **Async Route Handlers:** Declare route handlers with `async def` when performing non-blocking async I/O (async DB queries, async HTTP calls).
- **Dependency Injection:** Use `Depends()` for database sessions, current user authentication, and service injection.
- **Automatic OpenAPI Documentation:** Annotate endpoints with `response_model=`, `status_code=`, and docstrings to produce accurate Swagger docs (`/docs`).

## Anti-Patterns to Avoid
- ❌ Do NOT perform blocking synchronous I/O (e.g. `requests.get()`, `time.sleep()`) directly inside `async def` routes. Use `httpx.AsyncClient` or standard `def` routes for blocking operations.
- ❌ Do NOT mix database query execution directly inside route functions; delegate to repository/service layer via `Depends()`.
