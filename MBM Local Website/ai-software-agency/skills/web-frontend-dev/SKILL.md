---
name: web-frontend-dev
description: >
  Production web frontend development for websites and web applications.
  Activate when implementing frontend user interfaces, state management, routing,
  component systems, styling, and web accessibility during Phase 13.
---

# Skill: Web Frontend Development (Layer 2 Platform)

## Purpose
Governs the implementation of production web user interfaces for both websites and complex web applications.

## Website vs. Web Application Rule
This single skill handles frontend development for both websites (marketing, docs, blogs) and web applications (SaaS, dashboards, internal tools).
- **Websites:** Focus on SEO, fast initial load, responsive typography, static page rendering / SSG, semantic HTML.
- **Web Applications:** Focus on dynamic state management, interactive components, client-side routing, optimistic UI updates, complex form handling.

---

## Engineering Standards

### 1. Component Architecture & Reusability
- Organize components by scope: `ui/` (primitives: Button, Input, Modal), `components/` (feature components: UserHeader, OrderCard), `pages/` or `app/` (routes).
- Keep components small, focused, and single-purpose.
- Prefer composition over deep prop drilling.
- Use explicit prop types / TypeScript interfaces for all components.

### 2. State Management Strategy
- **Local UI State:** Use component local state for toggles, dropdowns, modal open/close states.
- **Server Data State:** Use data-fetching libraries with caching (React Query / TanStack Query, SWR, RTK Query) rather than global state stores for API data.
- **Global App State:** Reserve global state (Zustand, Redux, Context) strictly for true app-wide state (authenticated user, theme, cart state).

### 3. Responsive Styling & Design System Integration
- Build responsive layouts using CSS Grid, Flexbox, and fluid typography.
- Implement dark mode / light mode via CSS custom properties or design token systems.
- Ensure touch targets are at least 44x44px on touch viewports.
- Prevent horizontal scroll overflow on small viewports (`375px`).

### 4. Web Accessibility (WCAG 2.1 AA)
- Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
- Provide accessible names for interactive elements (`aria-label`, `alt` tags on images).
- Ensure full keyboard navigability (`Tab`, `Enter`, `Escape` for modals).
- Maintain WCAG AA color contrast ratio (at least 4.5:1 for normal text).

### 5. Performance Optimization
- Implement code-splitting and dynamic imports for heavy route components.
- Optimize images (WebP/AVIF format, responsive `srcset`, explicit `width`/`height` attributes to prevent layout shift).
- Minimize layout shifts (CLS < 0.1) and initial load time (LCP < 2.5s).
