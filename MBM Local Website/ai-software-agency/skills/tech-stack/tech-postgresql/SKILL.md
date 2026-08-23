---
name: tech-postgresql
description: >
  PostgreSQL database micro-skill (JSONB, pgvector, custom types, performance tuning).
  Activate ONLY when PostgreSQL is selected in GATE-03 docs/ARCHITECTURE.md during Phase 13.
---

# Skill: PostgreSQL (Layer 3 Tech Skill)

> ⚡ **On-Demand Micro-Skill:** Activated only when `PostgreSQL` is selected in `docs/ARCHITECTURE.md`. Focuses strictly on Postgres-specific features, data types, and index optimizations.

## PostgreSQL Features & Types
- **Data Types:** Use `TIMESTAMPTZ` for timestamps, `UUID` for identifiers, `JSONB` for semi-structured data, `TEXT` over `VARCHAR(N)` unless constraint enforced.
- **JSONB Querying:** Use GIN indexes on `JSONB` columns (`CREATE INDEX idx_data_gin ON table USING GIN (data)`). Use containment operator `@>` for queries.
- **Vector Search (pgvector):** Use `vector(N)` extension column type for AI embeddings. Create `HNSW` or `IVFFlat` indexes with cosine distance (`vector_cosine_ops`).
- **Upsert Patterns:** Use `INSERT INTO ... ON CONFLICT (id) DO UPDATE SET ...` for atomic upsert operations.

## Anti-Patterns to Avoid
- ❌ Do NOT use `TIMESTAMP` (without time zone); always use `TIMESTAMPTZ`.
- ❌ Do NOT use `COUNT(*)` without index or WHERE clause on multi-million row tables in latency-critical web requests.
