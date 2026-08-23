---
name: tech-supabase
description: >
  Supabase Backend-as-a-Service micro-skill (Auth, RLS policies, Realtime, Storage).
  Activate ONLY when Supabase is selected in GATE-03 docs/ARCHITECTURE.md during Phase 13.
---

# Skill: Supabase (Layer 3 Tech Skill)

> ⚡ **On-Demand Micro-Skill:** Activated only when `Supabase` is selected in `docs/ARCHITECTURE.md`. Focuses strictly on Supabase client initialization, Row Level Security (RLS), and database triggers.

## Supabase Idioms & Security
- **Row Level Security (RLS):** ALWAYS enable RLS on every table (`ALTER TABLE name ENABLE ROW LEVEL SECURITY;`).
- **RLS Policies:** Define explicit select, insert, update, and delete policies checking `auth.uid() = user_id`.
- **Client Instantiation:** Create browser client (`createBrowserClient`) for client components and server client (`createServerClient`) for server rendering/cookies.
- **Type-Safe Queries:** Generate TypeScript database types (`supabase gen types typescript`) and pass to Supabase client (`createClient<Database>()`).

## Anti-Patterns to Avoid
- ❌ NEVER expose the `SUPABASE_SERVICE_ROLE_KEY` in client-side code. Use only `SUPABASE_ANON_KEY` on client boundaries.
- ❌ Do NOT create database tables without defining RLS policies. Unprotected tables expose data to unauthorized client requests.
