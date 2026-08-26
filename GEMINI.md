# Mark Bishop Media — Master Project & Agent Guidelines

This file is automatically loaded by Antigravity IDE & Antigravity CLI (`agy`) as the master rulebook for `d:\Agentic OS`.

---

## 1. User Mindset & Interaction Style

- **Language:** Bengali (বাংলা) for communication, explanations, and planning; English for code and deliverables.
- **Proactive Co-Pilot:** Do not passively agree. Actively suggest top-tier architectural decisions and creative recommendations.
- **Hardware:** Touchscreen Laptop. Ensure touch gestures and pointer events (`PointerEvents` with `touch-action: manipulation` / `touch-action: none`) work across all web tools.
- **Visual Mockup Workflow:** User prefers visual arrangement using our custom studio (`agency-website/mockup-studio/00-intro-studio.html`, `01-hero-studio.html`) before code implementation.

---

## 2. Core Architecture Philosophy & Modular Folder Pipeline

- **Single Adaptive Codebase:** NEVER create separate HTML files for Mobile and Desktop websites. Use 1 unified responsive architecture with fluid typography (`clamp()`), flex/grid, and adaptive Three.js camera/position adjustments.
- **Lego-Brick Modularity:** Every section is a standalone modular block for easy individual editing.

### Directory Structure:
1. **`agency-website/assets/`** — Static media (`logos/`, `images/`, `icons/`) for easy future replacements.
2. **`agency-website/mockup-studio/`** — Visual layout builder and hardware frame whiteboard (`00-intro-studio.html`, `01-hero-studio.html`).
3. **`agency-website/sections/`** — Standalone, modular section files (`01-intro-splash.html`, `02-hero-section.html`, `03-what-we-do.html`, `09-navigation-master.html`).
4. **`agency-website/approved/`** — LOCKED PRODUCTION DIRECTORY (Source of Truth). **NEVER** edit files in this folder directly unless the user explicitly gives approval ("Approved").
5. **`agency-website/final-website-master.html`** — Unified production bundle.

---

## 3. Strict Anti-Breakage & Regression Prevention Rules

1. **Scoped Namespacing:** Every new section MUST use unique class and JS namespaces (e.g. `#phase3-radar`, `.geo-radar-container`, `initRadar3D()`) so no CSS/JS can leak or conflict with previous sections.
2. **Mobile Navigation & Logo Protocol:**
   - On Mobile (`<= 860px`): Full text logo (`.brand-logo-full`) MUST be hidden (`display: none !important;`). ONLY the glowing monogram icon (`.brand-logo-mobile-icon` / `mbm-icon.svg`) is displayed. All desktop nav links are hidden; only `⚡ FREE AUDIT` and `☰` 3D Cyber Hamburger menu trigger are shown.
   - On Desktop (`> 860px`): Full luxury brand logo with typography is shown.
3. **Preloader Layer Transparency:** `#preloader-layer` MUST ALWAYS have `background: transparent !important;` with `z-index: 500` so that `#master-3d-canvas` (`z-index: 2`) is 100% visible from frame 0 upon page load.
4. **Append-Only Stacking on Master:** When adding a new section, NEVER modify previous approved sections. Append the new section cleanly below the existing stack.
5. **3D Animation Rule:** Keep 3D animations live and smooth on client view (no auto-pausing).
6. **Zero-Discrepancy Studio-to-Master Sync Rule:** When the user customizes any section in a mockup studio (`00-intro-studio.html`, `01-hero-studio.html`, etc.) and approves it, the AI MUST faithfully and strictly transfer the EXACT numbers, dimensions, font sizes, line wraps (e.g. 2-line title on mobile), 3D scales (`pinScale`), and Y-positions for each device breakpoint (`mobile` and `desktop`). NEVER guess, approximate, or leave legacy hardcoded variables (such as old `0.34x` scales) in the master code. Always perform a line-by-line cross-check.

---

## 4. Active Project Context & Roadmap

- **Brand:** Mark Bishop Media — Local Visibility Operating System.
- **Milestones Completed & Locked:**
  - Phase 1 (Approved): 3D Intro Splash Preloader & 5-Star Orbits.
  - Phase 2 (Approved): Hero Viewport, 3D Storefront Pin & Live Customer Stream.
  - Phase 9 (Approved): Master 3D Navigation with Dual-Deck Split Engine & Mobile Drawer.
- **Immediate Task:**
  1. Fine-tune 3D Intro Splash via `00-intro-studio.html` to user's exact preferences.
  2. Phase 3 (Next): Interactive 3D Geo-Grid Radar Instant Scan Section.

---

## 5. Git Configuration

- **Repo:** `https://github.com/Shohelur/Local_markbishopmedia_website.git`
- **Branch:** `main`

