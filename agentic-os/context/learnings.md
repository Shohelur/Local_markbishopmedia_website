# Learnings Journal

> Auto-maintained by Agentic OS skills. Newest entries at the bottom of each section.
> Skills append here after deliverable feedback. Never delete entries.
> Section headings match skill folder names exactly. New skills add their own section when created.
> Skills read only their own section before running. Cross-skill insights go in `general`.

# General
## What works well

- 2026-08-20: 3-tier client memory (registry.json → clients/{slug}/memory/ → global MEMORY.md) keeps context across sessions and models.
- 2026-08-20: Self-contained HTML reports (all CSS/SVG inline) deploy anywhere instantly — no build step needed.
- 2026-08-20: REPORT_DESIGN_RULES.md as a hard-coded visual standard prevents every model from reinventing the report layout.
- 2026-08-20: Session-logger.js auto-populates registry and audit-log after each audit — zero manual bookkeeping.

## What doesn't work well

- 2026-08-20: Daily memory files (context/memory/{date}.md) must be created manually — no auto-capture hook active in Antigravity IDE.
- 2026-08-20: MEMORY.md 2,500 char cap fills quickly — must actively consolidate entries, not just append.
- 2026-08-20: brand_context/ nearly empty — voice-profile.md and visual-identity.md missing, causing Humanizer Gate to have nothing to work with.


# Individual Skills
## meta-skill-creator

## str-ai-seo

## viz-interface-design

## mkt-brand-voice

## mkt-positioning

## mkt-icp

## meta-wrap-up

## tool-firecrawl-scraper

## str-trending-research

## viz-image-gen

## viz-ugc-heygen

## mkt-ugc-scripts

## ops-cron

## mkt-content-repurposing

## mkt-copywriting

## tool-humanizer

## tool-youtube

## viz-excalidraw-diagram

## tool-stitch

## viz-stitch-design

## ops-new-feature

- 2026-04-14: Added quick-fix mode (`--quick`) for trivial one-file changes. Express branch lifecycle — create, commit, merge, delete in one flow.

## ops-release

- 2026-04-14: Added dev→main PR promotion step after tagging. Uses `gh pr create` and optionally `gh pr merge`. Non-blocking — user can decline.

## meta-memory-write

## local-business-ai

- 2026-08-11: Dentist audits: Healthgrades, Zocdoc, WebMD Care are critical healthcare directories. Regular business directories (YellowPages, BBB) are less important for dental.
- 2026-08-11: Plumber/HVAC audits: BBB, Angi, HomeAdvisor are critical home services directories. Healthcare directories are irrelevant.
- 2026-08-11: All report data must flow from Master Audit Object → report_content.json → PDF. Never hardcode sample data. Stale sample values caused production regressions.
- 2026-08-11: Competitor limit is 1-2 real local competitors max per audit. Never fabricate competitor data.
- 2026-08-11: Priority Engine uses 6D scoring (Impact, Confidence, Gap, Urgency, Fixability, Relevance). Max 5 priorities.
- 2026-08-20: Booking URL not available — CTA page must show phone + email only (Mark: +1 520-349-6378, mark@markbishopmedia.com).
- 2026-08-20: Agency brand structure: Parent = Mark Bishop Media, Division = Local Growth Division (local.markbishopmedia.com).
- 2026-08-20: Client registry tracks all audited businesses at clients/registry.json. Per-client workspace at clients/{slug}/.
- 2026-08-20: Web Report format is the Primary Client Deliverable (Interactive HTML with Print/PDF action).
- 2026-08-20: ZERO GUESSWORK / 100% REAL RESEARCH DATA HARD RULE: Every audit MUST be conducted using live web research and scraping of real business signals (actual reviews count, verified rating, real services catalog, true directory presence, and actual local competitors). Never guess, fabricate, or invent numbers, scores, or claims.
- 2026-08-20: MASTER REPORT LOCATION: All generated HTML reports must be saved directly into `local-business-ai/reports/` and served live via local server.

## mbm-project-memory

- 2026-08-30 [Phase 3 Radar Section]: Asymmetrical Dashboard Layout Pattern. When combining text (terminal) with visual UI cards, an asymmetrical layout (narrow text card on left `flex: 0 1 480px`, wide data card on right `flex: 1` spanning to margin) creates a premium landscape aesthetic compared to equal 50/50 blocks.
- 2026-08-30 [Phase 3 Radar Section]: Absolute Positioning vs Margin. Absolute positioning causes major Z-index and overlap bugs with previous sections. Fixed by moving elements into normal document flow (`display: flex`) and using negative margins (`margin-top: -80px`) to pull elements up safely without breaking responsive reflow.

- 2026-09-01 [Phase 4 Service Matrix]: When designing premium WebGL UIs, CSS static mockups are not sufficient to present an 'ultra-premium' concept to the user. Always spend the time (tokens) to implement the actual Three.js lighting, shadows, and blending modes before showing the first variant.
- 2026-09-13 [Asset Processing]: JPG to PNG Alpha Masking Noise. When converting a black-background JPG to a transparent PNG using `alpha = max(R,G,B)`, JPG compression artifacts (near-black noise) become semi-transparent, resulting in a visible bounding box on dark websites. Fix: Always apply a strict alpha threshold (e.g., `black_level = 25/255`) and linearly remap values to completely crush the noise floor before exporting the PNG.
- 2026-09-13 [Architecture]: Approved Folder Asset Paths & Anchor Links. When archiving an HTML file into a subfolder (like `approved/`), using `<base href="../">` fixes relative image paths but breaks local anchor navigation (e.g., `#reviews` jumps to the parent directory listing instead of scrolling). Fix: Do not use `<base>` for archiving. Instead, permanently rewrite all asset paths (`src="assets/"` and `src="./assets/"` to `src="../assets/"`) within the archived file itself.