---
name: tech-react
description: >
  React library micro-skill (Hooks, JSX idioms, component patterns).
  Activate ONLY when React is selected in GATE-03 docs/ARCHITECTURE.md during Phase 13.
---

# Skill: React (Layer 3 Tech Skill)

> ⚡ **On-Demand Micro-Skill:** Activated only when `React` is selected in `docs/ARCHITECTURE.md`. Focuses strictly on React hooks, rendering optimizations, and component patterns.

## React Hook Patterns & Rules
- **Rules of Hooks:** Call hooks at the top level of function components only. Never inside loops, conditions, or nested functions.
- **Custom Hooks:** Extract reusable component logic into custom hooks (`useAuth`, `useLocalStorage`, `useDebounce`).
- **Effect Dependencies:** Keep `useEffect` dependency arrays honest. Include all referenced reactive values or refactor logic into event handlers.
- **Memoization:** Use `useMemo` and `useCallback` deliberately for expensive computations or pass-through reference stability in large lists.

## Anti-Patterns to Avoid
- ❌ Do NOT mutate state objects directly. Always produce new state objects (`setItems([...items, newItem])`).
- ❌ Do NOT use `useEffect` for data transformation that can be computed during render (`const fullName = firstName + ' ' + lastName`).
- ❌ Do NOT use index as a key for dynamic, re-orderable lists (`key={item.id}`).
