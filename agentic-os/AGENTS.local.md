# AGENTS.local.md — Mark Bishop Media & User Workflow Instructions

This file contains the live conversation memory, user preferences, and project governance rules established during pair-programming sessions. All AI CLI assistants (Claude Code, Antigravity CLI, Agentic OS) must strictly follow these instructions.

---

## 1. User Profile & Working Style

- **Language:** Bengali (বাংলা) for discussions, explanations, and planning; English for code and client deliverables.
- **Hardware:** Touchscreen Laptop. All interactive tools and UI mockups must fully support touch interactions (`pointerdown`, `pointermove`, `pointerup`, `setPointerCapture`, `touch-action: none`).
- **Co-Pilot Mindset:** The user expects proactive, high-value recommendations and best architectural practices rather than passive agreement. Always suggest the best possible solution.
- **Visual Design First:** The user does not design in Figma. We built a dedicated visual mockup studio (`agency-website/mockup-studio/01-hero-studio.html`) where the user can visually arrange, resize, draw, and export layout blueprints before code implementation.

---

## 2. Strict Project Workflow & Folder Governance

```
d:\Agentic OS\agency-website/
├── mockup-studio/           ← 1. Interactive visual layout builder & whiteboard (USER TESTS HERE)
├── prototypes/              ← 2. Draft code & device variations (Desktop, Tablet, Mobile)
├── approved/                ← 3. LOCKED PRODUCTION FOLDER (NEVER MODIFY WITHOUT EXPLICIT USER "APPROVED")
└── final-website-master.html ← 4. Unified master production website
```

### The 4-Step Pipeline Rule:
1. **Step 1 (Mockup Studio):** When the user requests a new feature (e.g. Navigation Menu, 3D Motion tweak, or Phase 3 Radar Scanner), prepare or update the interactive studio in `mockup-studio/`.
2. **Step 2 (User Feedback):** Wait for user feedback / exported blueprint specs from the studio.
3. **Step 3 (Draft Prototype):** Build or refine the code inside `prototypes/`.
4. **Step 4 (User Approval):** ONLY when the user explicitly says **"Approved"** or **"Final Approve"**, copy the code into `approved/` and `final-website-master.html`.

> [!CAUTION]
> **CRITICAL RULE:** Never directly edit files in `agency-website/approved/` without the user explicitly approving the draft prototype first.

---

## 3. Current Project State & Immediate Next Tasks

### Active Roadmap:
- **Current Task (Hero Section Navigation Menu & 3D Motion):**
  - Refine Header Navigation Menu (`What We Do`, `3D System`, `Results`, `⚡ FREE AUDIT`).
  - Polish 3D Google Map Pin, orbiting rating stars, and verified storefront hover badge (`🏪 SMALL BUSINESS ● VERIFIED LOCAL STOREFRONT`).
  - Tweak 3D motion dynamics as requested by the user.
- **Client 3D Rule:** The 3D animation must remain LIVE and continuous on client view (do not pause or freeze 3D visuals).
- **Phase 3 (Queued):** Interactive 3D Geo-Grid Radar Instant Scan Section.

---

## 4. Git & GitHub Repository Configuration

- **Repository URL:** `https://github.com/Shohelur/Local_markbishopmedia_website.git`
- **Main Branch:** `main`
- **Git Push Pattern:** Always use the authenticated remote URL or saved token when pushing commits.

---

## 5. Mockup Studio Features Reference (`01-hero-studio.html`)

- **Floating Toolbar:** Draggable via `⋮⋮` grip handle; contains Undo (`Ctrl+Z`), Redo (`Ctrl+Y`), Selection mode, Canva-style Lock/Unlock (`🔒`), and Collapsible `[ ✏️ TOOLS ❯ ]` tray.
- **Canva-Style 4-Corner Resizing:** Every component/text box has interactive corner handles (`◽`) that dynamically resize boxes and proportionally scale font size.
- **YouTube-Style Fullscreen (`⤢` / `Esc` / `F`):** Enters native full monitor display without distorting device frames (keeps iPhone/iPad frames centered cleanly).
- **1-Click Export:** `📸 Download PNG` and `📋 Copy Specs` blueprints.
