# Mark Bishop Media — Master Project & Agent Guidelines

> **Agent Skills Available:** `mbm-local-seo` | `mbm-memory-bridge` | `mbm-copywriting` | `mbm-project-memory`
> **Rules Always Active:** `mbm-agent-soul.md` | `mbm-brand-context.md`

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
7. **Absolute Git Safety Rule:** NEVER execute destructive git commands (like `git reset --hard`, `git checkout .`, `git clean -fd`) without explicit user permission and a verified backup. Doing so deletes uncommitted user work. Always `git commit` and `git push` immediately after successfully completing a task to prevent data loss.
8. **Explicit Constraint Adherence:** When the user repeatedly gives a specific instruction (e.g., "Fix transparency at the IMAGE ASSET level, NOT with CSS"), DO NOT repeatedly attempt to solve it using the forbidden method. Respect constraints unconditionally on the very first attempt.

---

## 4. Active Project Context & Roadmap

- **Brand:** Mark Bishop Media — Local Visibility Operating System.
- **Milestones Completed & Locked:**
  - Phase 1 (Approved): 3D Intro Splash Preloader & 5-Star Orbits.
  - Phase 2 (Approved): Hero Viewport, 3D Storefront Pin & Live Customer Stream.
  - Phase 9 (Approved): Master 3D Navigation with Dual-Deck Split Engine & Mobile Drawer.
  - Phase 3 (Approved): Interactive 3D Geo-Grid Radar Instant Scan Section.
  - Phase 4 (Approved): Core Services Grid & Detail Sections with 3D Transparent Assets.
  - Phase 5 (Approved): 5-Step Process Pipeline with Claymorphic Scrolling Timeline.
- **Immediate Task:**
  1. Design and implement Phase 6: Social Proof / Case Studies or Final CTA.

---

## 5. Git Configuration

- **Repo:** `https://github.com/Shohelur/Local_markbishopmedia_website.git`
- **Branch:** `main`

---

## 6. Accumulated Technical Learnings

> These are hard-won lessons from real bugs and build sessions. Read before touching any section.

### 3D Animation Rules
- `clock.getDelta()` inside `animate()` returns ~0 after the first call because `getElapsedTime()` was already called. **Always use `t = clock.getElapsedTime()` and set `sweepAngle = t * speed`** — never accumulate with getDelta.
- Scan beam lengths: use `Math.hypot(W, H)` (screen diagonal) not `Math.max(W, H)`. Ensures beam reaches every corner at all angles.
- `heroElementsOpacity` must be declared BEFORE the `animate()` function block, not inside it.
- Three.js `MeshBasicMaterial` does not respond to lights — only `MeshStandardMaterial` / `MeshPhongMaterial` do.

### File Injection Safety Rules
- **Never** use regex injection on large HTML files — it causes `SyntaxError` if the pattern matches inside a string literal.
- Always use exact literal string replacement with `String.prototype.replace()` via Node.js scripts.
- After any Node.js script injection, verify with `new Function(extractedScript)` to catch syntax errors before opening in browser.
- Duplicate `const` declarations crash the entire script — always check for existing declarations before injecting variables.

### Localhost Server
- Server runs from `d:\Agentic OS` root: `python -m http.server 8080`
- Server must be restarted after each system sleep/restart — it does not persist.
- Files served at: `http://localhost:8080/agency-website/...`

### Studio → Master Transfer Rule
- **Zero-discrepancy policy:** Exact numbers from studio (scale, position, Y-offset) must be copied verbatim to master.
- Never approximate or "eyeball" values during transfer.
- Always cross-check 3 variables: `pinScale`, Y-position, and camera position for each breakpoint.

- 2026-09-01 [Phase 4 Service Matrix]: Used Three.js AdditiveBlending and 2D Canvas Sprites for a fake bloom/glow effect. This creates an extremely premium neon holographic aesthetic without the massive performance cost of full post-processing bloom pipelines.

### Transparency & Stacking Context
- **mix-blend-mode isolation:** Setting `perspective` on a parent container creates an isolated stacking context. If a child inside uses `mix-blend-mode: screen`, it will blend with the parent's *transparent* background (resulting in a black box) rather than the page background. Remove `perspective` or move the blend mode to the parent.
- **JPG Artifacts in Alpha Masking:** When using math to convert a black-background JPG into a transparent PNG (`alpha = max(R,G,B)`), JPG compression noise causes faint dark grey pixels that become semi-transparent artifacts (bounding boxes). ALWAYS apply a strict alpha threshold (e.g., `black_level = 25/255`) and linearly remap the remaining alpha values to completely crush the noise floor before exporting the PNG.
- **3D Transform & Overflow Clipping Conflict:** Using `transform-style: preserve-3d` on a container often breaks `overflow: hidden` in WebKit/Blink browsers, causing child elements to spill out of rounded borders. If you need border-radius clipping on children inside a 3D-rotated card, apply the `border-radius` directly to the child/wrapper and remove `preserve-3d` from the parent (unless children need independent Z-depth).
### UI & Layout Learnings
- **Scroll Triggers:** `element.offsetTop` fails when elements are nested in `position: relative` flex wrappers. Always use `element.getBoundingClientRect().top` to reliably trigger scroll animations when an element hits a specific viewport height (e.g., `< window.innerHeight * 0.7`).
- **Transparency & Artifacts:** Never use JPGs with `mix-blend-mode: screen` for 3D elements on dark gradient backgrounds. JPG compression noise creates faint dark grey bounding boxes. Always swap to transparent PNGs for seamless blending in premium UI.
