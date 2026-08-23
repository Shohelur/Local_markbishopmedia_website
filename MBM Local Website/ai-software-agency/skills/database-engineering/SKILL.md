---
name: database-engineering
description: >
  Core database architecture, schema design, migration management, transaction safety,
  and query optimization. Activate when implementing relational SQL or NoSQL database storage
  during Phase 13.
---

# Skill: Database Engineering (Layer 1 Core)

## Purpose
Governs database schema design, migration management, data integrity, and performance optimization for production database systems during Phase 13.

---

## Core Database Engineering Principles

### 1. Migration-First Schema Changes
- ALL database schema changes MUST be executed via version-controlled migration files.
- Never modify production database schemas directly or out-of-band.
- Every migration must include a verified roll-forward script and an explicit roll-back path.
- Keep migrations atomic: one logical change per migration file.

### 2. Relational Schema Normalization & Primary Keys
- Normalize schemas to 3NF unless explicit denormalization is justified for read-heavy performance.
- Use `UUIDv4` or `auto-increment BigInt` for primary keys.
- Always define foreign keys with appropriate cascading rules (`ON DELETE CASCADE`, `ON DELETE RESTRICT`, `ON DELETE SET NULL`).
- Always define `created_at` and `updated_at` timestamps on every primary data table (`TIMESTAMPTZ` preferred).

### 3. Indexing Strategy & Query Efficiency
- Create B-tree indexes for all foreign key columns, foreign lookups, and `WHERE` filter conditions used in critical queries.
- Create composite indexes matching query predicate order (`WHERE tenant_id = ? AND status = ?`).
- Avoid `SELECT *` in application queries; request only required columns.
- Prevent N+1 query problems by using eager loading, joins, or batch dataloaders.

### 4. Transaction Safety & Isolation
- Wrap multi-step database writes (e.g. create order + deduct inventory) in explicit database transactions (`BEGIN` ... `COMMIT` / `ROLLBACK`).
- Handle deadlock retries gracefully in application logic.
- Set query timeouts to prevent runaway queries from locking database connections.

### 5. Connection Pooling
- Use connection pools (pgBouncer, HikariCP, Prisma connection pool) in server environments.
- Configure min/max connection pool sizes based on hosting environment limits and concurrency expectations.
