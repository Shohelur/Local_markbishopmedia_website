---
name: tech-nextjs
description: >
  Next.js framework micro-skill (App Router, Server Components, Route Handlers).
  Activate ONLY when Next.js is selected in GATE-03 docs/ARCHITECTURE.md during Phase 13.
---

# Skill: Next.js (Layer 3 Tech Skill)

> ⚡ **On-Demand Micro-Skill:** Activated only when `Next.js` is selected in `docs/ARCHITECTURE.md`. Focuses strictly on Next.js App Router idioms, conventions, and anti-patterns.

## App Router Conventions (Next.js 14+)
- **Server Components by Default:** Keep components in `app/` as Server Components. Add `'use client'` directive ONLY when requiring state (`useState`), effects (`useEffect`), or browser event listeners.
- **Data Fetching:** Fetch data directly in Server Components using async/await. Rely on Next.js native `fetch` caching and revalidation options (`{ next: { revalidate: 3600 } }`).
- **Server Actions:** Use Server Actions for form submissions and data mutations. Wrap with `useFormStatus` or `useActionState` for pending states.
- **Route Handlers:** Place API endpoints in `app/api/[route]/route.ts`. Use explicit HTTP verb exports (`GET`, `POST`, `PUT`, `DELETE`).
- **Metadata:** Export dynamic `generateMetadata()` for SEO-critical pages.

## Anti-Patterns to Avoid
- ❌ Do NOT place `'use client'` at top of page files unless the entire page requires client-side state.
- ❌ Do NOT fetch data via client-side `useEffect` when it can be fetched in a Server Component.
- ❌ Do NOT import server-only modules (database clients, secret keys) into Client Components. Use `import 'server-only'`.
