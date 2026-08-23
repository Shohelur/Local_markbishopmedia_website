---
name: html-prototype
description: >
  Guides creation of near-production-quality, interactive HTML/CSS/JavaScript
  prototypes. Activate when working on Phase 8 of the Agency lifecycle, or when
  the Founder asks to build a clickable prototype, UI mockup, or interactive
  demo using HTML, CSS, and JavaScript.
---

# Skill: HTML Prototype

## Overview
This skill governs the creation of polished, interactive, browser-clickable
HTML/CSS/JS prototypes. Prototypes are pre-production design artifacts — NOT
production code — but they look and feel near-production quality visually and UX-wise.

---

## Absolute Boundary: Prototype vs. Production Code (Rule 02)

**"Near-production quality"** refers EXCLUSIVELY to visual and UX polish.
It NEVER refers to technical stack, database, or backend integration.

### A PROTOTYPE IS:
- ✅ Pure HTML files (`.html`) — markup only with static data
- ✅ Pure CSS files (`.css`) — design system and components
- ✅ Vanilla JavaScript (`.js`) — UI interaction simulation
- ✅ Static image/icon assets
- ✅ Self-contained — opens directly from the filesystem

### A PROTOTYPE EXPLICITLY IS NOT:
- ❌ Any production framework (React, Vue, Angular, Next.js, Svelte, etc.)
- ❌ Any real database connection or ORM
- ❌ Any real HTTP API calls to live/production services
- ❌ Real authentication or session management
- ❌ Production environment variables or real secrets
- ❌ Code intended to serve as the foundation for production code

---

## Design System First
Before building screens, establish a design system in CSS:

```css
:root {
  /* Color Palette */
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #93c5fd;
  --color-secondary: #64748b;
  --color-surface: #ffffff;
  --color-background: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
  --color-border: #e2e8f0;
  --color-error: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;

  /* Typography */
  --font-family-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radius & Shadows */
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

---

## Google Fonts Integration
Always use Google Fonts (Inter, Plus Jakarta Sans, DM Sans, Outfit, Sora).

---

## Required States Per Feature
Every significant feature must show:
1. **Default/Loaded state** — Normal state with data
2. **Loading/Skeleton state** — While data loads
3. **Empty state** — When there is no data
4. **Error state** — When something goes wrong
5. **Success state** — After a successful action

---

## JavaScript Interaction Patterns

```javascript
function navigate(href) { window.location.href = href; }
function openModal(modalId) { document.getElementById(modalId).classList.add('active'); }
function closeModal(modalId) { document.getElementById(modalId).classList.remove('active'); }
function toggleSidebar() { document.querySelector('.sidebar').classList.toggle('open'); }
```

---

## Prototype Banner (REQUIRED on every page)
```html
<div class="prototype-banner">
  ⚡ PROTOTYPE — This is a design prototype, not production software.
</div>
```

---

## File Structure
```
prototype/
├── index.html            ← Entry / Landing / Login
├── [screen-name].html    ← One file per major screen
├── css/
│   ├── design-system.css ← Tokens + base styles
│   └── components.css    ← Reusable component styles
├── js/
│   └── prototype.js      ← All interactions
└── assets/
    └── images/           ← Sample images
```

---

## Browser Testing Verification Rule (M-6)
The AI cannot self-certify browser testing. The AI MUST ask the Founder to test:
> "Please open `prototype/index.html` in Chrome and Firefox. Confirm all navigation works and there are no console errors. Reply 'BROWSER TEST PASSED' when verified."

---

## Prototype Archival Rule
After GATE-02 approval, tag the prototype branch:
```bash
git tag -a <project>/prototype-v1 -m "Approved prototype — GATE-02 cleared"
```
Do NOT merge into `develop` or `main`.

*For production engineering during Phase 13 (after GATE-01 through GATE-04 are approved), see Layer 1 core skills (`production-engineering`, `api-integration`, `database-engineering`) and Layer 2 platform skills (`web-frontend-dev`, `web-backend-dev`, `mobile-app-dev`).*
