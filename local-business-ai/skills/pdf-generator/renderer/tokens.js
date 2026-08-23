/**
 * tokens.js
 * Converts report_design.json design tokens into a CSS :root block.
 * Modern SaaS-grade design system for Local Visibility Intelligence Reports (V4 Redesign).
 * Emphasizes comfortable readability (13.5px body), visual data storytelling, and uncompressed spacing.
 */

'use strict';

/**
 * Builds a CSS :root {} block from report_design.json design_tokens.
 * @param {object} designSpec - Parsed report_design.json
 * @param {object} brandingConfig - Optional branding overrides
 * @returns {string} CSS string
 */
function buildCSSTokens(designSpec, brandingConfig = {}) {
  const tokens = designSpec.design_tokens || {};
  const colors = tokens.colors || {};
  const typography = tokens.typography || {};
  const branding = designSpec.branding_config || {};

  // Merge branding overrides
  const primaryColor = brandingConfig.primary_color || branding.primary_color || colors.primary || '#0B192C';
  const secondaryColor = brandingConfig.secondary_color || branding.secondary_color || colors.secondary || '#D97706';
  const fontPrimary = typography.font_primary || 'Inter';

  return `
    :root {
      /* Brand Core */
      --color-primary: ${primaryColor};
      --color-primary-dark: #050D1A;
      --color-primary-light: #1E3E62;
      --color-secondary: ${secondaryColor};
      --color-secondary-light: #F59E0B;
      --color-secondary-dark: #B45309;

      /* Surfaces */
      --color-surface: ${colors.surface || '#FFFFFF'};
      --color-surface-alt: ${colors.surface_alt || '#F8FAFC'};
      --color-surface-muted: #F1F5F9;
      --color-surface-card: #FFFFFF;
      --color-surface-dark: #0B192C;

      /* Text (High-Contrast & Readable) */
      --color-text-primary: ${colors.text_primary || '#0F172A'};
      --color-text-secondary: ${colors.text_secondary || '#334155'};
      --color-text-muted: ${colors.text_muted || '#64748B'};
      --color-text-light: #94A3B8;
      --color-text-white: #FFFFFF;

      /* Borders & Dividers */
      --color-border: ${colors.border || '#E2E8F0'};
      --color-border-subtle: #F1F5F9;
      --color-divider: ${colors.divider || '#CBD5E1'};

      /* Priority Status System (Restrained & Professional) */
      --color-priority-very-high: #991B1B;
      --color-priority-very-high-bg: #FEF2F2;
      --color-priority-very-high-border: #FECACA;

      --color-priority-high: #B45309;
      --color-priority-high-bg: #FFFBEB;
      --color-priority-high-border: #FDE68A;

      --color-priority-moderate: #1D4ED8;
      --color-priority-moderate-bg: #EFF6FF;
      --color-priority-moderate-border: #BFDBFE;

      --color-priority-low: #475569;
      --color-priority-low-bg: #F8FAFC;
      --color-priority-low-border: #E2E8F0;

      /* Strengths & Opportunities */
      --color-strength: #047857;
      --color-strength-bg: #ECFDF5;
      --color-strength-border: #A7F3D0;

      --color-opportunity: #0369A1;
      --color-opportunity-bg: #F0F9FF;
      --color-opportunity-border: #BAE6FD;

      /* Typography Scale (Comfortable 13.5px Body, 24px+ Headings) */
      --font-display: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
      --font-primary: '${fontPrimary}', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-size-display: 38px;
      --font-size-h1: 24px;
      --font-size-h2: 19px;
      --font-size-h3: 15px;
      --font-size-body-lg: 14.5px;
      --font-size-body: 13.5px;
      --font-size-body-sm: 12px;
      --font-size-small: 11px;
      --font-size-tiny: 9.5px;
      --line-height-heading: 1.25;
      --line-height-body: 1.6;

      /* Spacing */
      --spacing-section: 24px;
      --spacing-card: 16px;
      --spacing-paragraph: 8px;
      --spacing-heading: 12px;

      /* Decorative */
      --border-radius: 8px;
      --border-radius-lg: 12px;
      --border-radius-sm: 6px;
      --border-radius-pill: 9999px;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
      --shadow-card: 0 2px 4px -1px rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03);
      --shadow-elevated: 0 10px 20px -3px rgba(0, 0, 0, 0.1);

      /* Page Padding (Printable Letter Dimensions) */
      --page-margin-top: 15mm;
      --page-margin-bottom: 15mm;
      --page-margin-left: 16mm;
      --page-margin-right: 16mm;
    }
  `;
}

/**
 * Returns base global CSS rules for page composition.
 */
function buildBaseCSS() {
  return `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      word-spacing: normal !important;
      font-kerning: normal !important;
    }

    html, body {
      font-family: var(--font-primary);
      font-size: var(--font-size-body);
      color: var(--color-text-primary);
      background: #FFFFFF;
      line-height: var(--line-height-body);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, .font-display {
      font-family: var(--font-display);
      line-height: var(--line-height-heading);
      font-weight: 700;
      letter-spacing: 0;
      word-spacing: normal;
    }

    p {
      margin-bottom: var(--spacing-paragraph);
      word-spacing: normal;
    }

    /* Page Container Definition */
    .page {
      page-break-after: always;
      position: relative;
      width: 100%;
      height: 100vh;
      max-height: 100vh;
      padding: var(--page-margin-top) var(--page-margin-right) var(--page-margin-bottom) var(--page-margin-left);
      box-sizing: border-box;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
    }

    .page:last-child {
      page-break-after: auto;
    }

    .no-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Header & Footer Bars */
    .page-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--color-border);
      flex-shrink: 0;
    }

    .page-header-bar .report-tag {
      font-size: var(--font-size-tiny);
      font-weight: 800;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      word-spacing: 0.1em;
    }

    .page-header-bar .business-title {
      font-size: var(--font-size-small);
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .page-footer-bar {
      margin-top: auto;
      padding-top: 10px;
      border-top: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--font-size-tiny);
      color: var(--color-text-muted);
      flex-shrink: 0;
    }

    /* Section Titles */
    .section-eyebrow {
      font-size: var(--font-size-tiny);
      font-weight: 800;
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      word-spacing: 0.12em;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .section-title {
      font-size: var(--font-size-h1);
      color: var(--color-primary);
      font-weight: 800;
      letter-spacing: 0;
      word-spacing: normal;
      margin-bottom: 4px;
    }

    .section-subtitle {
      font-size: var(--font-size-body-sm);
      color: var(--color-text-muted);
      margin-bottom: 16px;
      line-height: 1.45;
      word-spacing: normal;
    }

    /* Badges & Pills */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: var(--border-radius-pill);
      font-size: var(--font-size-tiny);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      word-spacing: 0.05em;
      line-height: 1;
    }

    .badge-very-high {
      background: var(--color-priority-very-high-bg);
      color: var(--color-priority-very-high);
      border: 1px solid var(--color-priority-very-high-border);
    }

    .badge-high {
      background: var(--color-priority-high-bg);
      color: var(--color-priority-high);
      border: 1px solid var(--color-priority-high-border);
    }

    .badge-moderate {
      background: var(--color-priority-moderate-bg);
      color: var(--color-priority-moderate);
      border: 1px solid var(--color-priority-moderate-border);
    }

    .badge-strength {
      background: var(--color-strength-bg);
      color: var(--color-strength);
      border: 1px solid var(--color-strength-border);
    }

    .badge-opportunity {
      background: var(--color-opportunity-bg);
      color: var(--color-opportunity);
      border: 1px solid var(--color-opportunity-border);
    }

    .badge-neutral {
      background: var(--color-surface-muted);
      color: var(--color-text-secondary);
      border: 1px solid var(--color-border);
    }

    /* Modern Table */
    table.comparison-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      overflow: hidden;
      font-size: var(--font-size-body);
    }

    table.comparison-table th {
      background: var(--color-primary);
      color: #FFFFFF;
      padding: 10px 14px;
      font-size: var(--font-size-small);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      text-align: left;
    }

    table.comparison-table td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--color-border);
      vertical-align: middle;
    }

    table.comparison-table tr:last-child td {
      border-bottom: none;
    }

    table.comparison-table tr:nth-child(even) td {
      background: var(--color-surface-alt);
    }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `;
}

module.exports = { buildCSSTokens, buildBaseCSS };
