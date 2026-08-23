'use strict';

/**
 * tokens.js
 * Builds the embedded CSS for the interactive web report.
 * All design tokens are centralized here as CSS custom properties.
 * Components reference var(--token-name), never raw color values.
 */

/**
 * @param {object} brandingConfig
 * @returns {string} Full CSS string to embed in <style> tag
 */
function buildCSS(brandingConfig = {}) {
  const primary   = brandingConfig.primary_color   || '#0B192C';
  const secondary = brandingConfig.secondary_color  || '#D97706';

  return `
/* ── DESIGN TOKENS ──────────────────────────────────────────────────────── */
:root {
  /* Brand */
  --c-primary:          ${primary};
  --c-primary-dark:     #050D1A;
  --c-primary-mid:      #1E3E62;
  --c-secondary:        ${secondary};
  --c-secondary-light:  #F59E0B;
  --c-secondary-dark:   #B45309;

  /* Surfaces */
  --c-bg:               #FFFFFF;
  --c-bg-alt:           #F8FAFC;
  --c-bg-muted:         #F1F5F9;
  --c-bg-dark:          #0B192C;

  /* Text */
  --c-text-primary:   #0F172A;
  --c-text-secondary: #334155;
  --c-text-muted:     #64748B;
  --c-text-light:     #94A3B8;
  --c-text-white:     #FFFFFF;

  /* Borders */
  --c-border:         #E2E8F0;
  --c-border-subtle:  #F1F5F9;
  --c-divider:        #CBD5E1;

  /* Priority System */
  --c-ph:             #991B1B; --c-ph-bg: #FEF2F2; --c-ph-border: #FECACA;
  --c-p1:             #B45309; --c-p1-bg: #FFFBEB; --c-p1-border: #FDE68A;
  --c-p2:             #1D4ED8; --c-p2-bg: #EFF6FF; --c-p2-border: #BFDBFE;
  --c-p3:             #475569; --c-p3-bg: #F8FAFC; --c-p3-border: #E2E8F0;

  /* Semantics */
  --c-strength:        #059669; --c-strength-bg: #ECFDF5; --c-strength-border: #A7F3D0;
  --c-opportunity:     #0284C7; --c-opportunity-bg: #F0F9FF; --c-opportunity-border: #BAE6FD;

  /* Typography */
  --font-display: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-body:    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --fs-cover-name: clamp(1.95rem, 3.8vw, 2.75rem);
  --fs-hero:      clamp(2.0rem, 4vw, 3.0rem);
  --fs-h1:        clamp(1.6rem, 3.5vw, 2.25rem);
  --fs-h2:        clamp(1.25rem, 2.4vw, 1.65rem);
  --fs-h3:        1.1rem;
  --fs-body-lg:   1.025rem;
  --fs-body:      0.95rem;
  --fs-body-sm:   0.875rem;
  --fs-small:     0.78rem;
  --fs-tiny:      0.72rem;
  --lh-heading:   1.15;
  --lh-body:      1.65;

  /* Spacing */
  --sp-section: clamp(3.0rem, 5.5vw, 4.5rem);
  --sp-inner:   clamp(1.25rem, 4vw, 2.25rem);
  --sp-card:    1.25rem;
  --sp-gap:     1.25rem;
  --sp-gap-sm:  0.625rem;

  /* Radius */
  --r-sm:   6px;
  --r-md:   10px;
  --r-lg:   16px;
  --r-pill: 9999px;

  /* Shadows */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.07);
  --shadow-lg:  0 12px 32px rgba(0,0,0,0.12);

  /* Layout */
  --max-w: 1140px;
  --nav-h: 56px;
}

/* ── RESET & BASE ───────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  color: var(--c-text-primary);
  background: var(--c-bg);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-display);
  line-height: var(--lh-heading);
  font-weight: 700;
  letter-spacing: -0.01em;
}

p { margin-bottom: 0.6em; }
p:last-child { margin-bottom: 0; }

a { color: var(--c-secondary); text-decoration: none; }
a:hover { text-decoration: underline; }

ul { list-style: none; }
img { max-width: 100%; height: auto; }

/* ── LAYOUT UTILITIES ───────────────────────────────────────────────────── */
.container {
  width: 100%;
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--sp-inner);
}

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-gap); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-gap); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-gap); }

/* ── STICKY NAVIGATION ──────────────────────────────────────────────────── */
.report-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(11, 25, 44, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  height: var(--nav-h);
  display: flex;
  align-items: center;
}

.report-nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.nav-brand {
  font-family: var(--font-display);
  font-size: var(--fs-small);
  font-weight: 800;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.nav-links::-webkit-scrollbar { display: none; }

.nav-link {
  font-size: var(--fs-tiny);
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.35rem 0.75rem;
  border-radius: var(--r-pill);
  white-space: nowrap;
  transition: color 0.2s, background 0.2s;
  cursor: pointer;
  text-decoration: none;
}
.nav-link:hover {
  color: rgba(255,255,255,0.95);
  background: rgba(255,255,255,0.08);
  text-decoration: none;
}
.nav-link.active {
  color: #F59E0B;
  background: rgba(217,119,6,0.15);
}

/* ── SECTION BASE ───────────────────────────────────────────────────────── */
.report-section {
  padding: var(--sp-section) 0;
  border-bottom: 1px solid var(--c-border);
}
.report-section:last-child { border-bottom: none; }

.section-eyebrow {
  font-size: var(--fs-tiny);
  font-weight: 800;
  color: var(--c-secondary);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.section-eyebrow::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 2px;
  background: var(--c-secondary);
  border-radius: 2px;
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: var(--fs-h1);
  color: var(--c-primary);
  font-weight: 800;
  margin-bottom: 0.65rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-transform: uppercase;
}

.section-lead {
  font-size: var(--fs-body-lg);
  color: var(--c-text-secondary);
  max-width: 760px;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-weight: 400;
}

/* ── COVER SECTION (Compact, Balanced Two-Column Composition) ───────────── */
.section-cover {
  position: relative;
  background: linear-gradient(145deg, #060E1C 0%, #0B192C 50%, #102A45 100%);
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2.75rem, 5vw, 3.75rem) var(--sp-inner);
  overflow: hidden;
  border-bottom: 4px solid var(--c-secondary);
}

.cover-geo {
  position: absolute;
  right: 0; top: 0;
  width: 48%; height: 100%;
  opacity: 0.04;
  pointer-events: none;
}

.cover-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  width: 100%;
}

.cover-hero {
  max-width: 600px;
  width: 100%;
}

.cover-brand-block {
  margin-bottom: 1.0rem;
}

.cover-brand-mark-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cover-brand-mark {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #F59E0B;
}

.cover-brand-sep {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  line-height: 1;
}

.cover-brand-descriptor {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.cover-report-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(217, 119, 6, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.38);
  padding: 0.3rem 0.85rem;
  border-radius: var(--r-pill);
  margin-bottom: 0.85rem;
}

.cover-badge-dot {
  width: 6px;
  height: 6px;
  background: #F59E0B;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.6);
}

.cover-report-label {
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FDE68A;
}

.cover-business-name {
  font-family: var(--font-display);
  font-size: var(--fs-cover-name);
  font-weight: 900;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 0.75rem;
  letter-spacing: -0.025em;
  word-break: break-word;
  overflow-wrap: break-word;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
}

.cover-gold-rule {
  width: 56px;
  height: 3px;
  background: linear-gradient(90deg, #D97706, #F59E0B);
  border-radius: 2px;
  margin-bottom: 0.85rem;
}

.cover-location {
  font-size: 1rem;
  font-weight: 600;
  color: #E2E8F0;
  margin-bottom: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.cover-intro {
  font-size: 0.98rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 540px;
  line-height: 1.55;
  margin-bottom: 1.25rem;
  overflow-wrap: break-word;
}

.cover-meta-bar {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 0.85rem;
}

.cover-prepared-for {
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cover-audit-date {
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

/* Right-side Brand / Trust Card (Dedicated 320px-350px Card — NO CTA) */
.cover-right-panel {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.cover-trust-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--r-lg);
  padding: 1.75rem 1.6rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  width: 100%;
  max-width: 330px;
  position: relative;
  overflow: hidden;
  word-break: break-word;
  overflow-wrap: break-word;
}

.cover-trust-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #D97706, #F59E0B);
}

.cover-trust-card-brand {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #F59E0B;
  margin-bottom: 0.55rem;
}

.cover-trust-card-headline {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.35;
  margin-bottom: 0.65rem;
}

.cover-trust-card-body {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.55;
  margin: 0;
}

/* ── LOCAL VISIBILITY AT A GLANCE (2x2 Visual Diagnostic Matrix) ────────── */
.glance-matrix-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.glance-matrix-card {
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  padding: 1.4rem 1.6rem;
  box-shadow: 0 4px 12px rgba(11, 25, 44, 0.04);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.glance-matrix-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(11, 25, 44, 0.08);
}

.glance-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--c-border-subtle);
}

.glance-card-title-group {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.glance-card-num {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--c-text-muted);
  background: var(--c-bg-muted);
  width: 26px; height: 26px;
  border-radius: var(--r-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.glance-card-name {
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 800;
  color: var(--c-primary);
}

.glance-card-body {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.glance-gauge-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glance-card-info {
  flex: 1;
}

.glance-card-metric-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
}

.glance-card-desc {
  font-size: 0.86rem;
  color: var(--c-text-secondary);
  line-height: 1.45;
  margin: 0;
}

.scorecard-badge {
  font-size: var(--fs-tiny);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: var(--r-pill);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.badge-strong      { background: var(--c-strength-bg); color: var(--c-strength); border: 1px solid var(--c-strength-border); }
.badge-opportunity { background: var(--c-opportunity-bg); color: var(--c-opportunity); border: 1px solid var(--c-opportunity-border); }
.badge-attention   { background: var(--c-ph-bg); color: #B45309; border: 1px solid #FDE68A; }
.badge-neutral     { background: var(--c-bg-muted); color: var(--c-text-secondary); border: 1px solid var(--c-border); }

.scorecard-tag {
  font-size: var(--fs-tiny);
  font-weight: 600;
  color: var(--c-text-muted);
  text-align: right;
}

.glance-insights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.glance-insight-card {
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 1.35rem 1.5rem;
  box-shadow: var(--shadow-sm);
}
.glance-insight-card.opportunity {
  border-left: 4px solid #D97706;
  background: linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%);
}
.glance-insight-card.strength {
  border-left: 4px solid var(--c-strength);
  background: linear-gradient(180deg, #ECFDF5 0%, #FFFFFF 100%);
}

.insight-eyebrow {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
}
.glance-insight-card.opportunity .insight-eyebrow { color: #B45309; }
.glance-insight-card.strength .insight-eyebrow    { color: var(--c-strength); }

.insight-title {
  font-size: var(--fs-h3);
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 0.4rem;
}
.insight-desc {
  font-size: var(--fs-body-sm);
  color: var(--c-text-secondary);
  line-height: 1.6;
}

/* ── WHAT'S WORKING ─────────────────────────────────────────────────────── */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.75rem;
}

.stat-block {
  background: var(--c-strength-bg);
  border: 1px solid var(--c-strength-border);
  border-radius: var(--r-md);
  padding: 1.35rem;
  text-align: center;
}
.stat-value {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--c-strength);
  line-height: 1;
  margin-bottom: 0.35rem;
}
.stat-label {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #065F46;
  margin-bottom: 0.25rem;
}
.stat-context {
  font-size: var(--fs-tiny);
  color: var(--c-text-muted);
}

.strengths-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.strength-item {
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-left: 4px solid var(--c-strength);
  border-radius: var(--r-sm);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
}

.strength-icon {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--c-strength-bg);
  color: var(--c-strength);
  font-size: 0.875rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.strength-area {
  font-size: var(--fs-body);
  font-weight: 700;
  color: var(--c-primary);
  margin-bottom: 0.2rem;
}
.strength-observation {
  font-size: var(--fs-body-sm);
  color: var(--c-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.strategic-note {
  background: var(--c-bg-alt);
  border: 1px dashed var(--c-divider);
  border-radius: var(--r-md);
  padding: 1rem 1.35rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.strategic-note-icon { font-size: 1.3rem; flex-shrink: 0; }
.strategic-note p { font-size: var(--fs-body-sm); color: #475569; margin: 0; line-height: 1.6; }

/* ── PRIORITY FINDING SECTIONS (Tightened Vertical Flow) ─────────────────── */
.finding-section {
  padding: var(--sp-section) 0;
  border-bottom: 1px solid var(--c-border);
}
.finding-section:nth-child(even) {
  background: var(--c-bg-alt);
}

.finding-header {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 0.85rem;
}

.finding-rank-badge {
  width: 48px; height: 48px;
  background: var(--c-primary);
  color: #FFFFFF;
  border-radius: var(--r-md);
  font-size: 1.25rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: var(--font-display);
}

.finding-header-text { flex: 1; min-width: 0; }

.finding-priority-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.75rem;
  border-radius: var(--r-pill);
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.4rem;
}
.priority-ph { background: var(--c-ph-bg); color: var(--c-ph); border: 1px solid var(--c-ph-border); }
.priority-p1 { background: var(--c-p1-bg); color: var(--c-p1); border: 1px solid var(--c-p1-border); }
.priority-p2 { background: var(--c-p2-bg); color: var(--c-p2); border: 1px solid var(--c-p2-border); }
.priority-p3 { background: var(--c-p3-bg); color: var(--c-p3); border: 1px solid var(--c-p3-border); }

.finding-title {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 800;
  color: var(--c-primary);
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* Primary Visual Container — Content-Driven Height */
.finding-visual {
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  padding: 1.25rem 1.5rem 1rem;
  margin: 0.75rem 0 1.5rem;
  box-shadow: var(--shadow-sm);
}

.finding-visual-caption {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
  margin-bottom: 0.75rem;
}

/* Consultative Flow: What -> Evidence Link -> Why -> Action */
.finding-body {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 1.5rem;
}

.finding-col {
  padding: 1rem 0;
  border-bottom: 1px solid var(--c-border-subtle);
}
.finding-col:last-child { border-bottom: none; padding-bottom: 0; }

.finding-col-label {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.finding-col.what .finding-col-label   { color: var(--c-text-muted); }
.finding-col.why .finding-col-label    { color: #92400E; }
.finding-col.action .finding-col-label { color: #1D4ED8; }

.finding-col p {
  font-size: var(--fs-body);
  color: var(--c-text-primary);
  line-height: 1.65;
  margin: 0;
  max-width: 820px;
}
.finding-col.action p {
  color: var(--c-primary);
  font-weight: 600;
}

/* Subtle Verification Link */
.finding-evidence-links {
  margin-top: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.evidence-link {
  font-size: var(--fs-body-sm);
  font-weight: 600;
  color: #2563EB;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  transition: color 0.2s;
}
.evidence-link:hover {
  color: #1D4ED8;
  text-decoration: underline;
}
.evidence-link-arrow {
  font-size: 0.95rem;
  line-height: 1;
  transition: transform 0.2s;
}
.evidence-link:hover .evidence-link-arrow {
  transform: translateX(2px);
}

/* Business Impact Banner (Non-Technical Owner Hook) */
.business-impact-banner {
  background: linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%);
  border: 1px solid #FCD34D;
  border-left: 4px solid #D97706;
  border-radius: var(--r-md);
  padding: 0.85rem 1.15rem;
  margin: 0.75rem 0 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.business-impact-icon {
  font-size: 1.1rem;
  line-height: 1.2;
  flex-shrink: 0;
}
.business-impact-text {
  font-size: 0.88rem;
  color: #78350F;
  line-height: 1.45;
  margin: 0;
}
.business-impact-text strong {
  color: #92400E;
}

/* Before vs After Transformation Comparison Cards */
.before-after-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.25rem 0 0.5rem;
}
.before-card {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: var(--r-md);
  padding: 1rem 1.2rem;
}
.before-card-header {
  font-size: 0.76rem;
  font-weight: 800;
  color: #991B1B;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.before-card-body {
  font-size: 0.86rem;
  color: #7F1D1D;
  line-height: 1.45;
  margin: 0;
}

.after-card {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: var(--r-md);
  padding: 1rem 1.2rem;
}
.after-card-header {
  font-size: 0.76rem;
  font-weight: 800;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.after-card-body {
  font-size: 0.86rem;
  color: #064E3B;
  line-height: 1.45;
  margin: 0;
}

/* Inline Solution Bridge CTA */
.inline-solution-bridge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: var(--r-md);
  padding: 0.85rem 1.25rem;
  margin-top: 1.25rem;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.inline-solution-bridge:hover {
  background: #EFF6FF;
  border-color: #93C5FD;
  transform: translateY(-1px);
}
.inline-bridge-label {
  font-size: 0.88rem;
  color: var(--c-text-primary);
  font-weight: 600;
}
.inline-bridge-btn {
  font-size: 0.84rem;
  font-weight: 800;
  color: #2563EB;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

/* See More Progressive Disclosure */
.see-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-sm);
  padding: 0.45rem 1.1rem;
  font-family: var(--font-body);
  font-size: var(--fs-body-sm);
  font-weight: 700;
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}
.see-more-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
  background: var(--c-bg-alt);
}
.see-more-icon { font-size: 0.65rem; transition: transform 0.3s; }
.see-more-btn[aria-expanded="true"] .see-more-icon { transform: rotate(180deg); }

.see-more-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.see-more-panel.is-open { max-height: 3000px; }

.see-more-inner {
  padding-top: 1.1rem;
  border-top: 1px solid var(--c-border);
  margin-top: 1.1rem;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.detail-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  font-size: var(--fs-body-sm);
  color: var(--c-text-secondary);
  padding: 0.55rem 0.85rem;
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-sm);
  line-height: 1.5;
}
.detail-item::before { content: "›"; color: var(--c-secondary); font-weight: 800; font-size: 1.1rem; line-height: 1; }
.detail-item.technical {
  background: #F8FAFC;
  border-left: 3px solid var(--c-text-light);
}
.technical-badge {
  font-size: var(--fs-tiny);
  font-weight: 800;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.2rem;
}

/* ── CHARTS & VISUAL ELEMENTS ───────────────────────────────────────────── */
.chart-container { width: 100%; }
.chart-svg { display: block; width: 100%; overflow: visible; }

.metric-comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}
.metric-block {
  text-align: center;
  padding: 1.25rem;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  background: var(--c-bg-alt);
}
.metric-block.primary-metric {
  background: #EFF6FF;
  border-color: #BFDBFE;
}
.metric-block-value {
  font-family: var(--font-display);
  font-size: 2.35rem;
  font-weight: 900;
  color: var(--c-primary);
  line-height: 1;
  margin-bottom: 0.35rem;
}
.metric-block-label {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
  margin-bottom: 0.2rem;
}
.metric-block-context {
  font-size: var(--fs-tiny);
  color: var(--c-text-light);
}

.qlbar-panel {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.qlbar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.65rem 0.85rem;
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
}
.qlbar-label {
  font-size: var(--fs-body-sm);
  font-weight: 700;
  width: 200px;
  flex-shrink: 0;
  color: var(--c-primary);
}
.qlbar-segs {
  display: flex;
  gap: 4px;
  width: 120px;
  flex-shrink: 0;
}
.qlbar-seg {
  height: 7px;
  border-radius: 3px;
  flex: 1;
}
.qlbar-badge-wrap {
  width: 130px;
  flex-shrink: 0;
}
.qlbar-badge {
  display: inline-block;
  font-size: var(--fs-tiny);
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: var(--r-pill);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.qlbar-badge.strong      { background: var(--c-strength-bg); color: var(--c-strength); }
.qlbar-badge.opportunity { background: var(--c-opportunity-bg); color: var(--c-opportunity); }
.qlbar-badge.attention   { background: var(--c-ph-bg); color: #B45309; }

.qlbar-items {
  font-size: var(--fs-tiny);
  color: var(--c-text-secondary);
  flex: 1;
}

.cov-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  overflow: hidden;
  font-size: var(--fs-body-sm);
}
.cov-table th {
  background: var(--c-primary);
  color: #FFFFFF;
  padding: 0.75rem 1.1rem;
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: left;
}
.cov-table td {
  padding: 0.75rem 1.1rem;
  border-bottom: 1px solid var(--c-border);
  vertical-align: middle;
}
.cov-table tr:last-child td { border-bottom: none; }
.cov-table tr:nth-child(even) td { background: var(--c-bg-alt); }
.cov-name-cell strong { color: var(--c-primary); display: block; }
.cov-item-detail { font-size: var(--fs-tiny); color: var(--c-text-muted); }
.cov-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--fs-tiny);
  font-weight: 800;
  padding: 0.2rem 0.65rem;
  border-radius: var(--r-pill);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cov-status.strong      { background: var(--c-strength-bg); color: var(--c-strength); }
.cov-status.attention   { background: var(--c-ph-bg); color: #B45309; }
.cov-status.opportunity { background: var(--c-opportunity-bg); color: var(--c-opportunity); }
.cov-status.neutral     { background: var(--c-bg-muted); color: var(--c-text-muted); }

/* ── COMPETITOR SNAPSHOT (Compact High-Density Snapshot) ────────────────── */
.competitor-profiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}
.competitor-profile {
  border-radius: var(--r-md);
  padding: 1.1rem 1.35rem;
  box-shadow: var(--shadow-sm);
}
.competitor-profile.target    { background: #EFF6FF; border: 1px solid #BFDBFE; border-left: 4px solid #2563EB; }
.competitor-profile.benchmark { background: #FFFFFF; border: 1px solid var(--c-border); border-left: 4px solid var(--c-text-muted); }
.comp-profile-role {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}
.competitor-profile.target .comp-profile-role { color: #1D4ED8; }
.competitor-profile.benchmark .comp-profile-role { color: var(--c-text-muted); }
.comp-profile-name {
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  font-weight: 800;
  margin-bottom: 0.15rem;
}
.competitor-profile.target .comp-profile-name { color: #1E3A8A; }
.competitor-profile.benchmark .comp-profile-name { color: var(--c-text-primary); }
.comp-profile-sub {
  font-size: var(--fs-tiny);
  color: var(--c-text-muted);
}

.comp-metrics-panel {
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}
.comp-metrics-title {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
  margin-bottom: 1.25rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--c-border);
}

.v3-comp-row {
  margin-bottom: 1.25rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--c-border-subtle);
}
.v3-comp-row:last-of-type { margin-bottom: 0.75rem; padding-bottom: 0.75rem; border-bottom: none; }

.v3-comp-label {
  font-size: var(--fs-body-sm);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--c-primary);
  margin-bottom: 0.65rem;
  text-align: center;
}
.v3-comp-metrics {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.v3-comp-side {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.v3-comp-side.target { align-items: flex-end; text-align: right; }
.v3-comp-side.comp   { align-items: flex-start; text-align: left; }

.v3-comp-name {
  font-size: var(--fs-tiny);
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}
.v3-comp-value {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3.5vw, 2.5rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.v3-comp-bar-container {
  width: 100%;
  max-width: 240px;
  height: 6px;
  background: var(--c-border);
  border-radius: 3px;
  overflow: hidden;
}
.v3-comp-bar {
  height: 100%;
  border-radius: 3px;
}
.v3-comp-divider {
  font-size: var(--fs-tiny);
  font-weight: 900;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: var(--c-bg-muted);
  padding: 0.35rem 0.65rem;
  border-radius: var(--r-pill);
}

.comp-summary-note {
  font-size: var(--fs-body-sm);
  color: var(--c-text-secondary);
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border-subtle);
  border-radius: var(--r-sm);
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  line-height: 1.5;
}
.comp-summary-note em { font-weight: 700; color: var(--c-primary); font-style: normal; }

.comp-opportunity-box {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-left: 4px solid #2563EB;
  border-radius: var(--r-md);
  padding: 1.1rem 1.4rem;
  margin-top: 1.25rem;
}
.comp-opp-label {
  font-size: var(--fs-tiny);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #1D4ED8;
  margin-bottom: 0.35rem;
}
.comp-opp-text {
  font-size: var(--fs-body);
  color: #1E3A8A;
  line-height: 1.55;
  margin: 0;
}

/* Patient Traffic Flow & Market Leak Diagnostic Card */
.comp-traffic-leak-card {
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  padding: 1.4rem 1.6rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}
.traffic-leak-header {
  margin-bottom: 1rem;
}
.leak-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #EFF6FF;
  color: #1D4ED8;
  padding: 0.2rem 0.65rem;
  border-radius: var(--r-pill);
  margin-bottom: 0.4rem;
}
.leak-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--c-primary);
  margin: 0;
}
.traffic-leak-svg {
  display: block;
  width: 100%;
  margin: 1rem 0;
}
.traffic-leak-takeaway {
  background: #F8FAFC;
  border-left: 3px solid #059669;
  border-radius: var(--r-sm);
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  color: var(--c-text-primary);
  line-height: 1.5;
}

/* ── GROWTH OPPORTUNITIES ───────────────────────────────────────────────── */
.opportunities-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.opportunity-item {
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border);
  border-left: 4px solid var(--c-opportunity);
  border-radius: var(--r-md);
  padding: 1.15rem 1.25rem;
  box-shadow: var(--shadow-sm);
}
.opp-title {
  font-size: var(--fs-body);
  font-weight: 700;
  color: var(--c-primary);
  margin-bottom: 0.3rem;
}
.opp-observation {
  font-size: var(--fs-body-sm);
  color: var(--c-text-secondary);
  margin-bottom: 0.4rem;
  line-height: 1.55;
}
.opp-action {
  font-size: var(--fs-tiny);
  font-weight: 700;
  color: var(--c-opportunity);
}

/* ── ACTION ROADMAP ─────────────────────────────────────────────────────── */
.roadmap-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.roadmap-step {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 1.1rem 1.35rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}
.roadmap-step:hover { box-shadow: var(--shadow-md); transform: translateX(3px); }
.roadmap-step-num {
  width: 38px; height: 38px;
  background: var(--c-primary);
  color: #FFFFFF;
  border-radius: var(--r-sm);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.roadmap-step-text {
  font-size: var(--fs-body);
  font-weight: 600;
  color: var(--c-text-primary);
  flex: 1;
  line-height: 1.5;
}
.roadmap-step-arrow { color: var(--c-text-light); font-size: 1.1rem; }

/* ── CTA SECTION ────────────────────────────────────────────────────────── */
.section-cta { background: var(--c-bg-alt); }

.cta-card {
  background: linear-gradient(145deg, #060E1C 0%, #0B192C 60%, #153255 100%);
  color: #FFFFFF;
  border-radius: var(--r-lg);
  padding: 3.5rem 2.25rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}

.cta-card-geo {
  position: absolute;
  right: -5%; bottom: -20%;
  width: 55%; height: 140%;
  opacity: 0.05;
  pointer-events: none;
}

.cta-eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(217,119,6,0.18);
  border: 1px solid rgba(245,158,11,0.35);
  border-radius: var(--r-pill);
  padding: 0.35rem 1rem;
  margin-bottom: 1.25rem;
}
.cta-eyebrow-text {
  font-size: var(--fs-tiny);
  font-weight: 800;
  color: #FDE68A;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cta-heading {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 0.85rem;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.cta-body {
  font-size: var(--fs-body);
  color: rgba(255,255,255,0.8);
  max-width: 600px;
  margin: 0 auto 1.75rem;
  line-height: 1.7;
  position: relative;
  z-index: 1;
}

.cta-contacts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.cta-contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFFFFF;
  font-size: var(--fs-body-sm);
  font-weight: 600;
  text-decoration: none;
  padding: 0.7rem 1.4rem;
  border-radius: var(--r-pill);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.2s;
}
.cta-contact-link:hover {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.4);
  text-decoration: none;
}
.cta-contact-link.primary-cta {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(217,119,6,0.45);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cta-contact-link.primary-cta:hover {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  text-decoration: none;
  transform: translateY(-1px);
}

.cta-subtext {
  font-size: var(--fs-tiny);
  color: rgba(255,255,255,0.5);
  position: relative;
  z-index: 1;
}

.cta-methodology {
  background: #FFFFFF;
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 0.85rem 1.35rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  font-size: var(--fs-tiny);
  color: var(--c-text-muted);
}

/* ── RESPONSIVE ───────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .scorecard-row { grid-template-columns: 1fr; gap: 0.75rem; }
  .scorecard-tag { text-align: left; }
  .stat-grid { grid-template-columns: 1fr 1fr; }
  .glance-insights-grid { grid-template-columns: 1fr; }
  .competitor-profiles { grid-template-columns: 1fr; }
  .cover-layout { grid-template-columns: 1fr; gap: 2rem; }
  .cover-right-panel { justify-content: flex-start; }
  .cover-trust-card { max-width: 480px; }
  .cover-hero { max-width: 100%; }
}

@media (max-width: 640px) {
  .grid-2, .grid-3, .grid-4, .stat-grid, .opportunities-grid { grid-template-columns: 1fr; }
  .section-cover { padding: 2.25rem 1.25rem; }
  .cover-business-name { font-size: clamp(1.75rem, 7vw, 2.25rem); }
  .cover-brand-trust { font-size: 0.8rem; }
  .cover-report-label { font-size: 0.9rem; }
  .cover-intro { font-size: 0.92rem; }
  .cover-trust-card { padding: 1.4rem 1.25rem; }
  .nav-brand { display: none; }
  .cta-card { padding: 2.5rem 1.25rem; }
  .cta-contacts { gap: 0.875rem; }
  .section-title { font-size: clamp(1.4rem, 5vw, 1.9rem); }
  .finding-title { font-size: clamp(1.15rem, 4.5vw, 1.4rem); }
  .v3-comp-metrics { flex-direction: column; gap: 0.75rem; }
  .v3-comp-side.target, .v3-comp-side.comp { align-items: center; text-align: center; }
  .qlbar-row { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
  .qlbar-label { width: 100%; }
}

/* ── PRINT STYLES ───────────────────────────────────────────────────────── */
@media print {
  .report-nav { display: none; }
  .see-more-btn { display: none; }
  .see-more-panel { max-height: none !important; }
  .report-section, .finding-section { page-break-inside: avoid; }
  .cta-card { background: #0B192C !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-size: 12px; }
}
`;
}

module.exports = { buildCSS };
