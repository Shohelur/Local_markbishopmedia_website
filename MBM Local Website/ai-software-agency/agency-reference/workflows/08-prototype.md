# Phase 8 — HTML / CSS / JS Prototype

## Purpose
Build a polished, interactive, browser-clickable prototype that brings the
approved blueprint and user flows to life. The prototype is the final opportunity
to validate UX, visual design, and user flows BEFORE production development.

## Role
UX Designer · Frontend Developer (Prototype Specialist)

## Skill
Load and follow: `.agents/skills/html-prototype/SKILL.md`

## Inputs Required
- Phase 6: Approved Product Blueprint (GATE-01 cleared)
- Phase 7: User flows, screen map, UX notes, responsive strategy decision

---

## Prototype Boundary & Standards (MANDATORY)

### PROTOTYPE BOUNDARY (Rule 02)
- **Near-production quality** refers EXCLUSIVELY to visual and UX polish.
- Pure HTML, CSS, and vanilla JavaScript only.
- Self-contained: opens directly in a browser from the filesystem.
- ❌ NO production frameworks (React, Vue, Next.js, etc.)
- ❌ NO real database connection
- ❌ NO real API calls to live/production services
- ❌ NO real auth or session management
- ❌ NEVER merge into develop/main branch or use as production code foundation

### Visual Quality
- Professional typography (Google Fonts or equivalent)
- Consistent, curated color palette (no browser default colors)
- Modern design appropriate for the product type
- Smooth micro-animations and transitions

### Functionality & Content
- All major user journeys clickable end-to-end
- Navigation works completely (no dead links in core flows)
- Interactive forms with validation feedback
- Modals open and close correctly
- States represented: Default, Loading, Empty, Error, Success
- Realistic sample data (no Lorem Ipsum in key places)

---

## AI Actions

### Step 1: Plan Prototype Structure
List screens to prototype, identify core flows, define file structure in `prototype/`.

### Step 2: Create Design System
In CSS, define custom properties (design tokens), component styles, and responsive layout.

### Step 3: Build Screens & Interactions
Build HTML views and wire up navigation, forms, and states using vanilla JS.

### Step 4: Request Founder Browser Review
Present prototype files to Founder and explicitly request browser validation:
> "Prototype build complete! Please open `prototype/index.html` in Chrome and Firefox (or Edge/Safari).
> Confirm that all navigation works and there are no console errors (F12 → Console).
> Reply 'BROWSER TEST PASSED' when verified, or report any issues."

*Note: The AI cannot self-certify browser testing.*

---

## Prototype Label Requirement
Every prototype page must include a visible banner:
```html
<div class="prototype-banner">
  ⚡ PROTOTYPE — Not production software
</div>
```

---

## Artifacts Produced
- `prototype/` directory (on branch `prototype/v1`)

---

## Completion Criteria
- [ ] All core user journeys navigable
- [ ] All major states represented
- [ ] Responsive at mobile / tablet / desktop
- [ ] Realistic sample data used
- [ ] Prototype banner shown on all pages
- [ ] Founder confirmed browser test ("BROWSER TEST PASSED")
- [ ] Committed to Git branch `prototype/v1`
- [ ] `docs/PROJECT.md` updated with Phase 8 status

---

## ⚠️ Important Lifecycle Notice
**DO NOT present GATE-02 here.**
GATE-02 is presented in Phase 9 (Founder Review) AFTER the Founder reviews the prototype
and ALL requested review changes (Must-Fix and Should-Fix) are implemented and re-tested.

---

## Next Phase
→ `09-founder-review.md` (Review session and GATE-02 approval)
