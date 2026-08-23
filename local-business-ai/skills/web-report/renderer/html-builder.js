'use strict';

/**
 * html-builder.js
 * Assembles the full self-contained web report HTML document
 * from structured report_content.json and branding config.
 * All CSS, JS, and SVG are embedded — no external dependencies.
 */

const { buildCSS }    = require('./tokens');
const {
  Nav,
  Cover,
  LocalVisibilityAtAGlance,
  WhatsWorking,
  PriorityFinding,
  CompetitorSnapshot,
  GrowthOpportunities,
  ActionRoadmap,
  CTASection,
} = require('./components');
const { esc } = require('./utils');

// ── Inline JS for interactivity ───────────────────────────────────────────────
const INLINE_JS = `
(function () {
  'use strict';

  // ── See More / See Less toggle ───────────────────────────────────────────
  document.querySelectorAll('.see-more-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var panel    = document.getElementById(targetId);
      if (!panel) return;
      var isOpen   = panel.classList.contains('is-open');
      panel.classList.toggle('is-open', !isOpen);
      this.setAttribute('aria-expanded', !isOpen);
      var label = this.querySelector('.see-more-label');
      var icon  = this.querySelector('.see-more-icon');
      if (label) label.textContent = isOpen ? 'See More Details' : 'See Less';
      if (icon)  icon.innerHTML    = isOpen ? '&#9660;' : '&#9650;';
    });
  });

  // ── Navigation scroll spy ────────────────────────────────────────────────
  var sections = [];
  var navLinks = document.querySelectorAll('.nav-link[data-section]');

  function collectSections() {
    sections = [];
    navLinks.forEach(function (link) {
      var id  = link.getAttribute('data-section');
      var el  = document.getElementById(id);
      if (el) sections.push({ id: id, el: el, link: link });
    });
  }

  function updateActiveNav() {
    var scrollY  = window.pageYOffset;
    var navH     = 64;
    var current  = '';
    sections.forEach(function (s) {
      if (s.el.getBoundingClientRect().top + scrollY - navH <= scrollY) {
        current = s.id;
      }
    });
    navLinks.forEach(function (link) {
      var active = link.getAttribute('data-section') === current;
      link.classList.toggle('active', active);
    });
  }

  // ── Smooth scroll for nav links ──────────────────────────────────────────
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id  = this.getAttribute('data-section');
      var el  = document.getElementById(id);
      if (!el) return;
      var navH = document.getElementById('report-nav') ? document.getElementById('report-nav').offsetHeight : 56;
      var top  = el.getBoundingClientRect().top + window.pageYOffset - navH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ── Init ─────────────────────────────────────────────────────────────────
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', collectSections, { passive: true });
  collectSections();
  updateActiveNav();
})();
`;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN BUILDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds the complete self-contained HTML report.
 *
 * @param {object} content       - report_content.json payload
 * @param {object} brandingConfig - Mark Bishop Media branding (email, phone, etc.)
 * @returns {{ html: string, warnings: string[], sectionsRendered: string[], sectionsSkipped: string[] }}
 */
function buildHTML(content, brandingConfig = {}) {
  const warnings          = [];
  const sectionsRendered  = [];
  const sectionsSkipped   = [];

  const meta       = content.metadata || {};
  const priorities = content.top_priorities   || [];
  const snap       = content.competitive_snapshot || {};
  const growth     = content.growth_opportunities  || {};
  const roadmap    = content.recommended_next_steps || {};
  const strengths  = content.business_foundation?.strengths || [];

  const businessName = meta.business_name || content.cover?.business_name || '';
  const location     = meta.business_location || content.cover?.location || '';

  // ── Validate content ────────────────────────────────────────────────────
  if (!businessName) warnings.push('business_name is missing from metadata and cover.');
  if (!priorities.length) warnings.push('No top_priorities found — finding sections will be empty.');

  // ── Build page title & meta description ─────────────────────────────────
  const safeTitle = businessName ? `${esc(businessName)} — Local Business Visibility Report` : 'Local Business Visibility Report';
  const safeDesc  = `Local business visibility assessment for ${esc(businessName)}${location ? ', ' + esc(location) : ''}. Prepared by Mark Bishop Media.`;

  // ── Determine which optional sections exist ──────────────────────────────
  const hasCompetitor  = !!(snap.comparisons?.length || snap.competitor_metrics);
  const hasGrowth      = !!(growth.opportunities?.length);
  const hasRoadmap     = !!(roadmap.steps?.length);
  const hasStrengths   = !!(strengths.length || content.business_foundation?.intro);
  const hasCitation    = false; // inline section — managed by finding cards

  // ── Render sections ──────────────────────────────────────────────────────

  // Navigation
  const navHTML = Nav({ content, brandingConfig, hasCitation, hasCompetitor, hasGrowth });
  sectionsRendered.push('nav');

  // Cover
  const coverHTML = Cover({ content, brandingConfig });
  sectionsRendered.push('cover');

  // Local Visibility at a Glance
  const glanceHTML = LocalVisibilityAtAGlance({ content });
  sectionsRendered.push('glance');

  // What's Working
  let workingHTML = '';
  if (hasStrengths) {
    workingHTML = WhatsWorking({ content });
    sectionsRendered.push('working');
  } else {
    sectionsSkipped.push('working');
    warnings.push('No strengths found — What\'s Working section skipped.');
  }

  // Priority Findings
  let findingsHTML = '';
  if (priorities.length > 0) {
    findingsHTML = priorities.map((finding, i) => PriorityFinding({ finding, index: i, content })).join('\n');
    sectionsRendered.push(`findings (${priorities.length})`);
  } else {
    sectionsSkipped.push('findings');
  }

  // Competitor Snapshot
  let competitorHTML = '';
  if (hasCompetitor) {
    competitorHTML = CompetitorSnapshot({ content });
    sectionsRendered.push('competition');
  } else {
    sectionsSkipped.push('competition');
  }

  // Growth Opportunities
  let growthHTML = '';
  if (hasGrowth) {
    growthHTML = GrowthOpportunities({ content });
    sectionsRendered.push('growth');
  } else {
    sectionsSkipped.push('growth');
  }

  // Action Roadmap
  let roadmapHTML = '';
  if (hasRoadmap) {
    roadmapHTML = ActionRoadmap({ content });
    sectionsRendered.push('action-plan');
  } else {
    sectionsSkipped.push('action-plan');
    warnings.push('No recommended_next_steps found — Action Roadmap section skipped.');
  }

  // CTA — always included
  const ctaHTML = CTASection({ content, brandingConfig });
  sectionsRendered.push('cta');

  // ── Assemble CSS ─────────────────────────────────────────────────────────
  const css = buildCSS(brandingConfig);

  // ── Assemble full HTML document ──────────────────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  <style>${css}</style>
</head>
<body>

  ${navHTML}

  <main id="report-main" role="main">

    ${coverHTML}

    ${glanceHTML}

    ${workingHTML}

    <div id="findings" aria-label="Priority findings">
      ${findingsHTML}
    </div>

    ${competitorHTML}

    ${growthHTML}

    ${roadmapHTML}

    ${ctaHTML}

  </main>

  <script>${INLINE_JS}</script>
</body>
</html>`;

  return { html, warnings, sectionsRendered, sectionsSkipped };
}

module.exports = { buildHTML };
