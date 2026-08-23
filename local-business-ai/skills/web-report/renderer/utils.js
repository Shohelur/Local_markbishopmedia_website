'use strict';

/**
 * utils.js
 * Shared utility functions for the web report renderer.
 */

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T12:00:00Z');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return esc(dateStr);
  }
}

function priorityClass(level) {
  const l = (level || '').toLowerCase();
  if (l.includes('very high') || l.includes('veryhigh')) return 'priority-very-high';
  if (l.includes('high'))     return 'priority-high';
  if (l.includes('moderate')) return 'priority-moderate';
  return 'priority-low';
}

function truncate(str, maxLen = 160) {
  if (!str || str.length <= maxLen) return str || '';
  return str.slice(0, maxLen).trim() + '\u2026';
}

function shortName(name) {
  if (!name) return 'Business';
  return (name.split(' ')[0] || name).replace(/[^A-Za-z0-9]/g, '').slice(0, 20) || 'Business';
}

/**
 * Extracts competitor metrics from the competitive_snapshot.
 * STRICT RULE: Only reads structured competitor_metrics and metadata fields.
 * Never extracts or manufactures chart numbers from narrative prose via regex.
 * Returns { targetReviews, targetRating, targetServices, compReviews, compRating, compServices, compName }
 */
function extractCompetitorMetrics(content) {
  const out = {
    targetReviews:  null,
    targetRating:   null,
    targetServices: null,
    compReviews:    null,
    compRating:     null,
    compServices:   null,
    compName:       null,
  };

  const meta = content.metadata || {};
  out.targetReviews  = (meta.reviews_count !== undefined && meta.reviews_count !== null) ? Number(meta.reviews_count) : null;
  out.targetRating   = (meta.rating        !== undefined && meta.rating !== null)        ? Number(meta.rating)        : null;
  out.targetServices = (meta.services_count !== undefined && meta.services_count !== null) ? Number(meta.services_count) : null;

  const snap = content.competitive_snapshot || {};

  // 1) Read structured competitor_metrics if present
  const cm = snap.competitor_metrics;
  if (cm) {
    const c = cm.competitor || {};
    const t = cm.target     || {};
    if (c.name) out.compName = c.name;
    if (c.reviews  !== undefined && c.reviews  !== null) out.compReviews   = Number(c.reviews);
    if (c.rating   !== undefined && c.rating   !== null) out.compRating    = Number(c.rating);
    if (c.services !== undefined && c.services !== null) out.compServices  = Number(c.services);
    if (t.reviews  !== undefined && t.reviews  !== null) out.targetReviews  = Number(t.reviews);
    if (t.rating   !== undefined && t.rating   !== null) out.targetRating   = Number(t.rating);
    if (t.services !== undefined && t.services !== null) out.targetServices = Number(t.services);
    return out;
  }

  // 2) Competitor name from comparisons array
  const comps = snap.comparisons || [];
  const comp0 = comps[0] || {};
  if (comp0.competitor_name) {
    out.compName = comp0.competitor_name;
  }

  // Strictly no regex parsing of free prose. Numeric values remain null.
  return out;
}

/**
 * Extracts structured competitor metrics including numbers from the machine-generated
 * comparisons[0].observation field.
 *
 * IMPORTANT ARCHITECTURE NOTE:
 * The comparisons[0].observation is a MACHINE-GENERATED STRUCTURED TEMPLATE, not
 * free narrative prose. It is always produced in the format:
 *   "[Competitor] has NNN Google reviews (vs. NNN) and a N.N rating (vs. N.N),
 *    with NN listed GBP services (vs. NN)."
 *
 * These patterns match only that exact machine template — they do NOT parse
 * arbitrary prose or hallucinate values. If the pattern does not match,
 * the numeric fields remain null and no values are introduced.
 *
 * Returns an augmented metrics object (same shape as extractCompetitorMetrics).
 */
function extractCompetitorMetricsEnriched(content) {
  const base = extractCompetitorMetrics(content);

  // Already have structured competitor_metrics — nothing to enrich
  if (base.compReviews !== null && base.compServices !== null) return base;

  const snap  = content.competitive_snapshot || {};
  const comps = snap.comparisons || [];
  const comp0 = comps[0] || {};
  const obs   = comp0.observation || '';

  if (!obs) return base;

  // Set competitor name if not already set
  if (!base.compName && comp0.competitor_name) {
    base.compName = comp0.competitor_name;
  }

  // Pattern: "NNN Google reviews (vs. NNN)"
  // comp value is first, target value is in the parenthetical
  const reviewMatch = obs.match(/(\d+)\s+Google reviews\s*\(vs\.\s*(\d+)\)/);
  if (reviewMatch) {
    base.compReviews   = Number(reviewMatch[1]);
    // Only set targetReviews from enriched if metadata didn't already provide it
    if (base.targetReviews === null) base.targetReviews = Number(reviewMatch[2]);
  }

  // Pattern: "a N.N rating (vs. N.N)"
  const ratingMatch = obs.match(/a\s+([\d.]+)\s+rating\s*\(vs\.\s*([\d.]+)\)/);
  if (ratingMatch) {
    base.compRating   = Number(ratingMatch[1]);
    if (base.targetRating === null) base.targetRating = Number(ratingMatch[2]);
  }

  // Pattern: "NNN listed GBP services (vs. NNN)"
  const svcMatch = obs.match(/(\d+)\s+listed\s+GBP services\s*\(vs\.\s*(\d+)\)/);
  if (svcMatch) {
    base.compServices   = Number(svcMatch[1]);
    if (base.targetServices === null) base.targetServices = Number(svcMatch[2]);
  }

  return base;
}

module.exports = {
  esc,
  formatDate,
  priorityClass,
  truncate,
  shortName,
  extractCompetitorMetrics,
  extractCompetitorMetricsEnriched,
};
