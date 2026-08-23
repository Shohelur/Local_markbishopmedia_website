/**
 * html-builder.js
 * Assembles the full HTML document from report_content.json + report_design.json.
 * V4 Content-Driven Visual Intelligence Architecture with comfortable typography and rich data storytelling.
 */

'use strict';

const { buildCSSTokens, buildBaseCSS } = require('./tokens');
const components = require('./components');

/**
 * Builds the full HTML string for PDF rendering.
 * @param {object} content - Parsed report_content.json
 * @param {object} design - Parsed report_design.json
 * @param {object} brandingConfig - Optional branding overrides
 * @returns {{ html: string, sectionsRendered: string[], sectionsSkipped: string[], warnings: string[] }}
 */
function buildHTML(content, design, brandingConfig = {}) {
  const warnings = [];
  const sectionsRendered = [];
  const sectionsSkipped = [];

  // Validation guards
  if (!content.cover || !content.cover.business_name) {
    throw new Error('validation_failed: report_content.cover.business_name is required.');
  }
  if (!content.top_priorities || content.top_priorities.length === 0) {
    warnings.push('No top_priorities found in report_content. Report will have no priority section.');
  }
  if (content.top_priorities && content.top_priorities.length > 5) {
    warnings.push(`Priority count exceeds maximum (${content.top_priorities.length} found, capping at 5).`);
    content.top_priorities = content.top_priorities.slice(0, 5);
  }
  if (!brandingConfig.booking_url) {
    warnings.push('No booking_url in branding_config. CTA will render as text only.');
  }
  if (!brandingConfig.logo_url) {
    warnings.push('No logo_url in branding_config. Logo placeholder used.');
  }

  const cssTokens = buildCSSTokens(design, brandingConfig);
  const baseCSS = buildBaseCSS();

  const pages = [];

  // ── PAGE 1: COVER ──────────────────────────────────────────────────────────
  pages.push(components.Cover({
    cover: content.cover,
    metadata: content.metadata || {},
    brandingConfig,
  }));
  sectionsRendered.push('cover');

  // ── PAGE 2: LOCAL VISIBILITY SNAPSHOT (PROBLEM SIGNALS) ────────────────────
  pages.push(components.LocalVisibilitySnapshot({
    content,
    brandingConfig,
  }));
  sectionsRendered.push('local_visibility_snapshot');

  // ── PAGE 3: WHAT'S WORKING WELL (FOUNDATION ANALYSIS) ──────────────────────
  const hasStrengths = content.business_foundation &&
    content.business_foundation.strengths &&
    content.business_foundation.strengths.length > 0;

  if (hasStrengths) {
    pages.push(components.WhatsWorkingSection({
      content,
      brandingConfig,
    }));
    sectionsRendered.push('whats_working_well');
  } else {
    sectionsSkipped.push('whats_working_well');
  }

  // ── PAGE 4: PRIORITY RANKING & HERO SECTION ────────────────────────────────
  if (content.top_priorities && content.top_priorities.length > 0) {
    pages.push(components.PriorityRankingAndHeroSection({
      content,
      brandingConfig,
    }));
    sectionsRendered.push('priority_ranking_and_hero');
  } else {
    sectionsSkipped.push('priority_ranking_and_hero');
  }

  // ── PAGE 5: SUPPORTING PRIORITIES DEEP DIVE (#2 - #4) ──────────────────────
  if (content.top_priorities && content.top_priorities.length > 1) {
    pages.push(components.SupportingPrioritiesSection({
      content,
      brandingConfig,
    }));
    sectionsRendered.push('supporting_priorities_deep_dive');
  } else {
    sectionsSkipped.push('supporting_priorities_deep_dive');
  }

  // ── PAGE 6: COMPETITOR BENCHMARK & SIGNAL ANALYSIS ─────────────────────────
  const hasCompetitor = content.competitive_snapshot &&
    content.competitive_snapshot.comparisons &&
    content.competitive_snapshot.comparisons.length > 0;

  if (hasCompetitor) {
    pages.push(components.CompetitorBenchmarkSection({
      content,
      brandingConfig,
    }));
    sectionsRendered.push('competitor_benchmark_and_signals');
  } else {
    sectionsSkipped.push('competitor_benchmark_and_signals');
  }

  // ── PAGE 7: ROADMAP & SECONDARY OPPORTUNITIES ──────────────────────────────
  const hasOppsOrSteps = (content.growth_opportunities?.opportunities?.length > 0) ||
    (content.recommended_next_steps?.steps?.length > 0);

  if (hasOppsOrSteps) {
    pages.push(components.RoadmapAndOpportunitiesSection({
      content,
      brandingConfig,
    }));
    sectionsRendered.push('action_roadmap_and_opportunities');
  } else {
    sectionsSkipped.push('action_roadmap_and_opportunities');
  }

  // ── PAGE 8: STRATEGIC CALL TO ACTION ───────────────────────────────────────
  if (content.cta) {
    pages.push(components.StrategicCTASection({
      content,
      brandingConfig,
    }));
    sectionsRendered.push('strategic_call_to_action');
  } else {
    sectionsSkipped.push('strategic_call_to_action');
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${content.cover.business_name} — ${content.cover.report_title || 'Local Visibility Audit'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    ${cssTokens}
    ${baseCSS}
    @page {
      size: ${design.page_settings?.format || 'Letter'} ${design.page_settings?.orientation || 'portrait'};
      margin: 0;
    }
  </style>
</head>
<body>
  ${pages.join('\n')}
</body>
</html>`;

  return { html, sectionsRendered, sectionsSkipped, warnings };
}

module.exports = { buildHTML };
