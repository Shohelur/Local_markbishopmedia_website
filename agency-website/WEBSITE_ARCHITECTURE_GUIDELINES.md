# Mark Bishop Media — Master Website Architecture & Development Guidelines

> **Purpose:** This document is the single source of truth for developing, maintaining, and scaling the Mark Bishop Media 3D interactive website. Any developer or AI working on this project MUST strictly follow these principles to avoid regressions and ensure world-class quality.

---

## 1. Core Architecture Philosophy: "Single Adaptive Codebase"

- **No Duplicated Codebases:** We NEVER create separate HTML files for Mobile and Desktop websites. Instead, we use **1 Unified Responsive Architecture**.
- **Single DOM & Semantic Markup:** One clean semantic DOM tree that gracefully adapts between Desktop, Tablet, and Mobile.
- **Adaptive Three.js Engine:** A single persistent WebGL Canvas (`#master-3d-canvas`, `z-index: 2`). On viewport resize, camera FOV, distance, and 3D object targets dynamically adjust (e.g. 3D Pin glides to right on Desktop and stays centered/compact on Mobile).
- **Fluid CSS Layouts:** Fluid typography and spacing using `clamp()`, CSS Grid, and Flexbox.

---

## 2. Strict Modular Folder Pipeline (Lego-Brick System)

```text
agency-website/
├── assets/                          # Static Media (easily replaceable)
│   ├── logos/                       # mbm-logo.svg, mbm-icon.svg
│   ├── images/                      # Future photography & textures
│   └── icons/                       # 3D glyphs & vector badges
│
├── mockup-studio/                   # Visual Whiteboard & Live Hardware Simulators
│   ├── 00-intro-studio.html         # 3D Intro Splash Customizer Studio
│   └── 01-hero-studio.html          # Hero & Motion Visual Arranger
│
├── sections/                        # Standalone, Modular Section Blocks (For easy editing)
│   ├── 01-intro-splash.html         # Isolated Intro Component
│   ├── 02-hero-section.html         # Isolated Hero Viewport & Storefront Pin
│   ├── 03-what-we-do.html           # Isolated Editorial Manifesto
│   └── 09-navigation-master.html    # Isolated Master Navigation & Mobile Drawer
│
├── approved/                        # LOCKED PRODUCTION MILESTONES (Source of Truth)
│   ├── 01-approved-splash-intro.html
│   ├── 02-approved-hero-section.html
│   ├── 09-approved-navigation-master.html
│   └── final-website-master.html
│
└── final-website-master.html        # Unified Live Production Bundle
```

---

## 3. Anti-Breakage & Regression-Prevention Rules

When adding a new phase/section (e.g., Phase 3 Geo-Grid Radar), follow these strict rules:

### Rule 1: Scoped Namespacing (Zero CSS/JS Leakage)
- Every new section MUST use a dedicated class/ID prefix (e.g. `#phase3-radar`, `.geo-radar-container`, `initRadar3D()`).
- Never define broad global CSS tags (like `h1`, `p`, `button`, `.card`) without scoping them to that section.

### Rule 2: Strict Mobile Navigation & Logo Protocol
- **Mobile (`<= 860px`):**
  - Full text logo (`.brand-logo-full` / "MARK BISHOP MEDIA") MUST be **completely hidden** (`display: none !important;`).
  - ONLY the glowing monogram icon (`.brand-logo-mobile-icon` / `mbm-icon.svg`) is displayed.
  - Desktop nav links (`.nav-menu-list`) and contact link are **hidden** (`display: none !important;`).
  - ONLY `⚡ FREE AUDIT` button and `☰` 3D Cyber Hamburger menu trigger are displayed in the capsule.
- **Desktop (`> 860px`):**
  - Full luxury brand logo with typography is shown.
  - 3D Dual-Deck mega-dropdowns are fully active.

### Rule 3: 3D Preloader Splash Transparency
- `#preloader-layer` MUST ALWAYS have `background: transparent !important;` with `z-index: 500`.
- The Three.js WebGL canvas (`#master-3d-canvas`) at `z-index: 2` MUST be 100% visible from frame 0 so the 3D Pin and 5 Golden Orbiting Stars are seen immediately upon page load.

### Rule 4: Append-Only Stacking on Master Bundle
- When merging a new approved section into `final-website-master.html`, **NEVER modify or rewrite previous approved sections**.
- Append the new HTML block, CSS block, and JS module directly below the previous section in the pipeline.

### Rule 5: Touchscreen & Gesture Compatibility
- User operates on a Touchscreen Laptop. All interactive controls, sliders, and buttons must support `touch-action: manipulation` or `PointerEvents`.

---

## 4. Master 12-Phase Roadmap Snapshot

1. **Phase 1 (APPROVED):** 3D Intro Splash Preloader & 5-Star Orbits.
2. **Phase 2 (APPROVED):** Hero Viewport, 3D Storefront Pin & Live Customer Stream.
3. **Phase 9 (APPROVED):** Master 3D Navigation with Dual-Deck Split Engine & Mobile Drawer.
4. **Phase 3 (NEXT):** Interactive 3D Geo-Grid Radar Instant Scan Section.
5. **Phase 4:** Before/After Interactive Map Overhaul Engine.
6. **Phase 5:** 3D Citation Constellation Synchronizer.
7. **Phase 6:** ROI Multiplier Revenue Simulator.
8. **Phase 7:** Industry Domination Playbooks.
9. **Phase 8:** 3D Holographic Proof Cards & Case Studies.
10. **Phase 10:** Multi-Step 3D Instant Audit Terminal.
11. **Phase 11:** Interactive FAQ Matrix & AI Voice Assistant.
12. **Phase 12:** High-Conversion Closing Funnel & Footer.
