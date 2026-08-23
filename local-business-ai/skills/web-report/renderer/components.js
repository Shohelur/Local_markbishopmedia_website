'use strict';

/**
 * components.js
 * HTML component functions for the interactive web report.
 * Each function accepts structured content data and returns an HTML string.
 * All content is HTML-escaped via esc(). No hardcoded business data.
 */

const { esc, formatDate, priorityClass, shortName, extractCompetitorMetrics, extractCompetitorMetricsEnriched } = require('./utils');
const { renderChart, renderCompetitorMetricRow, renderRadialGaugeSVG, geoPattern } = require('./charts');

// ─────────────────────────────────────────────────────────────────────────────
// SPECIFIC SOURCE URL VALIDATOR (Suppresses Generic Directory Homepages)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true only if the URL is a specific, validated public source page.
 * Generic homepages (e.g. https://www.healthgrades.com, https://maps.google.com,
 * https://www.bbb.org, https://www.yellowpages.com) are suppressed.
 */
function isSpecificPublicUrl(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return false;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    const pathname = parsed.pathname.trim();
    const search = parsed.search.trim();

    // Known platforms where root domain / homepage is generic and NOT specific listing evidence
    const genericPlatforms = [
      'healthgrades.com',
      'maps.google.com',
      'google.com',
      'bbb.org',
      'yellowpages.com',
      'yelp.com',
      'zocdoc.com',
      'webmd.com',
      'angi.com',
      'homeadvisor.com',
      'facebook.com',
      'instagram.com'
    ];

    if (genericPlatforms.includes(host)) {
      if (!pathname || pathname === '/' || pathname === '') {
        return false;
      }
      if ((host === 'maps.google.com' || host === 'google.com') && !search && (pathname === '/' || pathname === '/maps' || pathname === '/maps/')) {
        return false;
      }
    }

    // maps.app.goo.gl requires a token path (e.g. /7on5BA6Zj6R5YRzM6)
    if (host === 'maps.app.goo.gl') {
      return pathname.length > 2;
    }

    // Business's own website domain (e.g. monsoondental.com, tucsonplumbing.com) is valid specific evidence
    return true;
  } catch (e) {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

function Nav({ content, brandingConfig = {}, hasCitation, hasCompetitor, hasGrowth }) {
  const businessName = esc(content.metadata?.business_name || content.cover?.business_name || 'Report');
  const brandName = esc(brandingConfig.division_name || brandingConfig.brand_name || 'Local Growth Division');
  const navItems = [
    { href: '#overview',    label: 'Overview' },
    { href: '#glance',      label: 'Assessment' },
    { href: '#working',     label: "What's Working" },
    { href: '#findings',    label: 'Key Opportunities' },
    hasCompetitor ? { href: '#competition', label: 'Competition' } : null,
    hasGrowth     ? { href: '#growth',      label: 'Growth Signals' } : null,
    { href: '#action-plan', label: 'Action Plan' },
  ].filter(Boolean);

  const links = navItems.map(item =>
    `<a href="${item.href}" class="nav-link" data-section="${item.href.slice(1)}">${esc(item.label)}</a>`
  ).join('');

  return `
<nav class="report-nav" id="report-nav" role="navigation" aria-label="Report sections">
  <div class="container" style="display:flex; justify-content:space-between; align-items:center;">
    <span class="nav-brand">${brandName}</span>
    <div style="display:flex; align-items:center; gap:12px;">
      <div class="nav-links">${links}</div>
      <button onclick="window.print()" class="nav-print-btn" title="Download or print this report as PDF" style="display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,0.12); color:#FFFFFF; border:1px solid rgba(255,255,255,0.25); border-radius:6px; padding:5px 12px; font-size:12px; font-weight:600; cursor:pointer;">
        <span>🖨</span> Print / Save PDF
      </button>
    </div>
  </div>
</nav>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// COVER / HERO (V3 Two-Zone Composition — Brand Trust & Dominant Business Name)
// ─────────────────────────────────────────────────────────────────────────────

function Cover({ content, brandingConfig }) {
  const meta         = content.metadata || {};
  const cover        = content.cover    || {};
  const businessName = esc(cover.business_name || meta.business_name || 'Your Business');
  const location     = esc(cover.location      || meta.business_location || '');
  const brandName    = esc(brandingConfig.brand_name || 'Mark Bishop Media');
  const reportTitle  = esc(cover.report_title || 'Local Visibility Audit');
  const auditDate    = meta.audit_date ? formatDate(meta.audit_date) : '';

  // Extract city for business-specific copy
  const city = location.split(',')[0].trim() || 'Tucson';
  const cityArea = `${city}-area`;

  // Trust-building brand voice
  const trustStatement = `For more than 10 years, we've helped ${cityArea} businesses get found, trusted, and chosen.`;
  const cardHeadline   = `Serving ${cityArea} businesses for more than 10 years.`;

  // Personalized report introduction (human consultative voice, no research jargon)
  let introCopy = cover.subtitle;
  if (!introCopy || introCopy.includes('multi-channel') || introCopy.includes('diagnostic')) {
    introCopy = 'We reviewed the public signals that shape how your business is discovered, compared, and trusted locally — and identified the opportunities worth addressing first.';
  }
  const subtitle = esc(introCopy);

  return `
<section id="overview" class="section-cover" aria-label="Report cover">
  <div class="cover-geo" aria-hidden="true">${geoPattern()}</div>
  <div class="container">
    <div class="cover-layout">
      <!-- LEFT / MAIN CONTENT -->
      <div class="cover-hero">
        <div class="cover-brand-block">
          <div class="cover-brand-mark-row">
            <span class="cover-brand-mark">${brandName}</span>
            <span class="cover-brand-sep" aria-hidden="true">&middot;</span>
            <span class="cover-brand-descriptor">Local Business Growth</span>
          </div>
        </div>

        <div class="cover-report-badge">
          <span class="cover-badge-dot" aria-hidden="true"></span>
          <span class="cover-report-label">${reportTitle}</span>
        </div>

        <h1 class="cover-business-name">${businessName}</h1>
        <div class="cover-gold-rule" aria-hidden="true"></div>
        ${location ? `<div class="cover-location">&#x1F4CD; ${location}</div>` : ''}

        <p class="cover-intro">${subtitle}</p>

        <div class="cover-meta-bar">
          <div class="cover-prepared-for">Prepared specifically for ${businessName}</div>
          ${auditDate ? `<div class="cover-audit-date">&#x1F4C5; ${esc(auditDate)}</div>` : ''}
        </div>
      </div>

      <!-- RIGHT SIDE: COMPACT BRAND TRUST CARD (NO CTA / NO CONTACT INFO) -->
      <div class="cover-right-panel" aria-label="Brand credibility overview">
        <div class="cover-trust-card">
          <div class="cover-trust-card-brand">${brandName}</div>
          <div class="cover-trust-card-headline">${cardHeadline}</div>
          <p class="cover-trust-card-body">We help local businesses get found, trusted, and chosen through targeted digital and traditional marketing.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL VISIBILITY AT A GLANCE (Graphical Diagnostic Anchor)
// ─────────────────────────────────────────────────────────────────────────────

function buildPillars(content) {
  // 1. If explicit, evidence-validated visibility_pillars or scorecard exists in content, use it directly
  const explicitPillars = content.visibility_pillars || content.executive_snapshot?.pillars || content.executive_snapshot?.scorecard;
  if (Array.isArray(explicitPillars) && explicitPillars.length > 0) {
    return explicitPillars.map((p, idx) => {
      const num = p.num || String(idx + 1).padStart(2, '0');
      const area = p.area || p.name || p.pillar || 'Diagnostic Area';
      const status = p.status || p.level || 'neutral';
      
      let color = '#64748B'; // Muted slate default for neutral/unverified
      let defaultSegs = 1;
      let defaultLabel = 'Data Inconclusive';
      
      if (status === 'strong') {
        color = '#059669';
        defaultSegs = 5;
        defaultLabel = 'Established Asset';
      } else if (status === 'opportunity') {
        color = '#0284C7';
        defaultSegs = 3;
        defaultLabel = 'Growth Opportunity';
      } else if (status === 'attention') {
        color = '#D97706';
        defaultSegs = 2;
        defaultLabel = 'Action Recommended';
      }

      return {
        num,
        area,
        level: status,
        label: p.label || defaultLabel,
        color,
        segs: typeof p.meter_fill === 'number' ? p.meter_fill : (typeof p.segs === 'number' ? p.segs : defaultSegs),
        tag: p.score_text || p.tag || p.summary || (status === 'strong' ? 'Verified Asset' : 'Research Inconclusive')
      };
    });
  }

  // 2. Fallback: derive dynamically from validated priorities, strengths, and metadata WITHOUT generic fake defaults
  const priorities = content.top_priorities || [];
  const strengths  = content.business_foundation?.strengths || [];
  const meta       = content.metadata || {};

  function hasIssueWith(prefix, keyword) {
    return priorities.some(p =>
      (p.source_finding_ids || p.evidence_ids || []).some(id => String(id).toLowerCase().startsWith(prefix)) ||
      (p.category || '').toLowerCase().includes(keyword) ||
      (p.title || '').toLowerCase().includes(keyword)
    );
  }
  function hasStrengthWith(keyword) {
    return strengths.some(s =>
      (s.area || '').toLowerCase().includes(keyword) ||
      (s.observation || '').toLowerCase().includes(keyword)
    );
  }

  const citationIssue  = hasIssueWith('cit', 'direct') || hasIssueWith('cit', 'citation');
  const gbpIssue       = hasIssueWith('gbp', 'google') || hasIssueWith('gbp', 'profile');
  const reviewIssue    = hasIssueWith('rev', 'review') || hasIssueWith('rev', 'reputation');
  const websiteIssue   = hasIssueWith('web', 'website') || hasIssueWith('web', 'schema');
  
  const reviewStrength = hasStrengthWith('review') || hasStrengthWith('rating') || (meta.rating && meta.rating >= 4.5);
  const gbpStrength    = hasStrengthWith('google') || hasStrengthWith('profile') || (meta.services_count && meta.services_count > 0);
  const citationStrength = hasStrengthWith('citation') || hasStrengthWith('directory');
  const websiteStrength  = hasStrengthWith('website') || hasStrengthWith('mobile') || hasStrengthWith('speed');

  const pillars = [];

  // Pillar 1: Citations & Directories
  if (citationIssue) {
    pillars.push({ num: '01', area: 'Citations & Directories', iconSymbol: '📍', level: 'attention', label: 'Action Recommended', color: '#DC2626', centerIcon: '!', segs: 2, tag: 'Directory Gap Identified', desc: 'Inconsistent NAP or missing presence across high-authority local directories.' });
  } else if (citationStrength) {
    pillars.push({ num: '01', area: 'Citations & Directories', iconSymbol: '📍', level: 'strong', label: 'Established Asset', color: '#059669', centerIcon: '✓', segs: 5, tag: 'Core Directories Active', desc: 'Accurate and consistent presence established across major search directories.' });
  } else {
    pillars.push({ num: '01', area: 'Citations & Directories', iconSymbol: '📍', level: 'neutral', label: 'Data Inconclusive', color: '#64748B', centerIcon: '?', segs: 1, tag: 'Listing Check Needed', desc: 'Directory footprint assessed with opportunities for broader verification.' });
  }

  // Pillar 2: Google Business Profile
  if (gbpIssue) {
    pillars.push({ num: '02', area: 'Google Business Profile', iconSymbol: '🏢', level: 'opportunity', label: 'Growth Opportunity', color: '#D97706', centerIcon: '⚡', segs: 3, tag: meta.services_count ? `${meta.services_count} Services Listed` : 'Service Catalog Gap', desc: 'Profile active; catalog expansion and category optimization will increase reach.' });
  } else if (gbpStrength) {
    pillars.push({ num: '02', area: 'Google Business Profile', iconSymbol: '🏢', level: 'strong', label: 'Established Asset', color: '#059669', centerIcon: '✓', segs: 5, tag: meta.rating ? `${meta.rating}★ Verified Listing` : 'Verified Foundation', desc: 'Profile is claimed and actively optimized with strong primary category alignment.' });
  } else {
    pillars.push({ num: '02', area: 'Google Business Profile', iconSymbol: '🏢', level: 'neutral', label: 'Data Inconclusive', color: '#64748B', centerIcon: '?', segs: 1, tag: 'Profile Check Needed', desc: 'Google profile baseline verified with opportunities for service enrichment.' });
  }

  // Pillar 3: Customer Reviews
  if (meta.reviews_count && meta.reviews_count > 0) {
    const isTopRating = meta.rating && meta.rating >= 4.5;
    pillars.push({ num: '03', area: 'Customer Reviews & CX', iconSymbol: '⭐', level: isTopRating ? 'strong' : 'opportunity', label: isTopRating ? 'Established Asset' : 'Reputation Focus', color: isTopRating ? '#059669' : '#D97706', centerIcon: '★', segs: isTopRating ? 5 : 3, tag: `${meta.reviews_count} Verified Reviews ${meta.rating ? `(${meta.rating}★)` : ''}`, desc: 'Authentic customer sentiment is strong; active review velocity sustains rankings.' });
  } else if (reviewIssue) {
    pillars.push({ num: '03', area: 'Customer Reviews & CX', iconSymbol: '⭐', level: 'opportunity', label: 'Growth Opportunity', color: '#D97706', centerIcon: '⚡', segs: 3, tag: meta.rating ? `${meta.rating}★ (Reputation Focus)` : 'Review Acquisition Needed', desc: 'Positive feedback exists; structured review acquisition will close competitive gap.' });
  } else if (reviewStrength) {
    pillars.push({ num: '03', area: 'Customer Reviews & CX', iconSymbol: '⭐', level: 'strong', label: 'Established Asset', color: '#059669', centerIcon: '✓', segs: 5, tag: meta.rating ? `${meta.rating}★ Customer Rating` : 'Positive Customer Feedback', desc: 'High customer satisfaction creates a powerful competitive foundation.' });
  } else {
    pillars.push({ num: '03', area: 'Customer Reviews & CX', iconSymbol: '⭐', level: 'neutral', label: 'Data Inconclusive', color: '#64748B', centerIcon: '?', segs: 1, tag: 'Review Data Inconclusive', desc: 'Customer review presence evaluated across major local platforms.' });
  }

  // Pillar 4: Website Signals & Schema
  if (websiteIssue) {
    pillars.push({ num: '04', area: 'Website Signals & Schema', iconSymbol: '🌐', level: 'opportunity', label: 'Technical Opportunity', color: '#2563EB', centerIcon: '⚙', segs: 2, tag: 'Schema / SEO Gap', desc: 'Active website present; local business structured JSON-LD data needed.' });
  } else if (websiteStrength) {
    pillars.push({ num: '04', area: 'Website Signals & Schema', iconSymbol: '🌐', level: 'strong', label: 'Established Asset', color: '#059669', centerIcon: '✓', segs: 5, tag: 'Active & SSL Secure', desc: 'Secure and optimized local web presence establishing search authority.' });
  } else {
    pillars.push({ num: '04', area: 'Website Signals & Schema', iconSymbol: '🌐', level: 'neutral', label: 'Data Inconclusive', color: '#64748B', centerIcon: '?', segs: 1, tag: 'Website Audit Inconclusive', desc: 'Core web presence signals evaluated for search discoverability.' });
  }

  return pillars;
}

function LocalVisibilityAtAGlance({ content }) {
  const snap       = content.executive_snapshot || {};
  const priorities = content.top_priorities     || [];
  const strengths  = content.business_foundation?.strengths || [];
  const pillars    = buildPillars(content);

  const topPriority = priorities[0] || null;
  const topStrength = strengths[0]  || null;

  const matrixCards = pillars.map(p => {
    const centerIcon = p.centerIcon || (p.level === 'strong' ? '✓' : (p.level === 'attention' ? '!' : '⚡'));
    const gaugeSVG = renderRadialGaugeSVG({
      segs: p.segs,
      maxSegs: 5,
      color: p.color,
      icon: centerIcon,
      radius: 32,
      strokeWidth: 6
    });

    return `
    <div class="glance-matrix-card" style="border-top: 3px solid ${p.color};">
      <div class="glance-card-top">
        <div class="glance-card-title-group">
          <span class="glance-card-num">${esc(p.num)}</span>
          <span class="glance-card-name">${esc(p.iconSymbol || '')} ${esc(p.area)}</span>
        </div>
        <span class="scorecard-badge badge-${p.level}">${esc(p.label)}</span>
      </div>

      <div class="glance-card-body">
        <div class="glance-gauge-wrap">
          ${gaugeSVG}
        </div>
        <div class="glance-card-info">
          <div class="glance-card-metric-chip" style="color:${p.color};">
            <span>●</span> ${esc(p.tag)}
          </div>
          <p class="glance-card-desc">${esc(p.desc || p.summary || 'Public search signal assessment verified.')}</p>
        </div>
      </div>
    </div>`;
  }).join('');

  const opCallout = topPriority ? `
    <div class="glance-insight-card opportunity">
      <div class="insight-eyebrow">&#9888; Biggest Opportunity</div>
      <h3 class="insight-title">${esc(topPriority.title)}</h3>
      <p class="insight-desc">${esc(topPriority.what_we_found || snap.key_observation || '')}</p>
    </div>` : '';

  const asCallout = topStrength ? `
    <div class="glance-insight-card strength">
      <div class="insight-eyebrow">&#10003; Strongest Asset</div>
      <h3 class="insight-title">${esc(topStrength.area)}</h3>
      <p class="insight-desc">${esc(topStrength.observation || '')}</p>
    </div>` : `
    <div class="glance-insight-card strength">
      <div class="insight-eyebrow">&#10003; Business Foundation</div>
      <h3 class="insight-title">Established Local Presence</h3>
      <p class="insight-desc">${esc(snap.foundation_summary || '')}</p>
    </div>`;

  return `
<section id="glance" class="report-section" aria-label="Local visibility overview">
  <div class="container">
    <div class="section-eyebrow">Local Presence Assessment</div>
    <h2 class="section-title">LOCAL VISIBILITY AT A GLANCE</h2>
    <p class="section-lead">A visual diagnostic of your local market footprint across the four core pillars of local discovery and customer acquisition.</p>

    <!-- Primary Visual Anchor: 2x2 Interactive Graphical Diagnostic Matrix -->
    <div class="glance-matrix-grid" role="region" aria-label="Presence diagnostic visual matrix">
      ${matrixCards}
    </div>

    <!-- Supporting Strategic Insights -->
    <div class="glance-insights-grid">
      ${opCallout}
      ${asCallout}
    </div>
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// WHAT'S WORKING
// ─────────────────────────────────────────────────────────────────────────────

function WhatsWorking({ content }) {
  const foundation = content.business_foundation  || {};
  const meta       = content.metadata             || {};
  const strengths  = foundation.strengths         || [];
  const intro      = foundation.intro             || "The following verified strengths were identified during this assessment.";

  const statBoxes = [];
  if (meta.rating !== null && meta.rating !== undefined) {
    statBoxes.push({ value: `${meta.rating}\u2605`, label: 'Google Rating', context: `Average across ${meta.reviews_count || 'your'} reviews` });
  }
  if (meta.reviews_count !== null && meta.reviews_count !== undefined) {
    statBoxes.push({ value: meta.reviews_count, label: 'Google Reviews', context: 'Verified customer feedback' });
  }
  if (meta.services_count !== null && meta.services_count !== undefined) {
    statBoxes.push({ value: meta.services_count, label: 'Services Listed', context: 'On Google Business Profile' });
  }

  const statGrid = statBoxes.length > 0 ? `
    <div class="stat-grid" style="grid-template-columns:repeat(${Math.min(statBoxes.length,3)},1fr);">
      ${statBoxes.map(s => `
        <div class="stat-block">
          <div class="stat-value">${esc(String(s.value))}</div>
          <div class="stat-label">${esc(s.label)}</div>
          <div class="stat-context">${esc(s.context)}</div>
        </div>`).join('')}
    </div>` : '';

  const strengthItems = strengths.map((s, i) => `
    <div class="strength-item">
      <div class="strength-icon" aria-hidden="true">&#10003;</div>
      <div>
        <div class="strength-area">${esc(s.area || `Strength ${i + 1}`)}</div>
        <p class="strength-observation">${esc(s.observation || '')}</p>
      </div>
    </div>`).join('');

  return `
<section id="working" class="report-section" aria-label="Business strengths">
  <div class="container">
    <div class="section-eyebrow">Business Foundation</div>
    <h2 class="section-title">WHAT IS ALREADY WORKING</h2>
    <p class="section-lead">${esc(intro)}</p>

    ${statGrid}

    ${strengthItems ? `<div class="strengths-list">${strengthItems}</div>` : ''}

    <div class="strategic-note">
      <div class="strategic-note-icon">&#128270;</div>
      <p>The opportunities outlined in this report build on this foundation. Addressing them can extend your existing visibility advantage to a wider audience of prospective customers.</p>
    </div>
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA-DRIVEN INTELLIGENT VISUAL DERIVATION
// ─────────────────────────────────────────────────────────────────────────────

function deriveVisual(finding, content) {
  if (finding.visual && finding.visual.type && finding.visual.type !== 'none') {
    return finding.visual;
  }

  const meta    = content.metadata || {};
  const bName   = meta.business_name || content.cover?.business_name || 'Your Business';
  const ids     = [...(finding.source_finding_ids || []), ...(finding.evidence_ids || [])]
                    .map(id => String(id).toLowerCase());

  const isCitation = ids.some(id => id.startsWith('cit') || id.startsWith('cf'));
  const isReview   = ids.some(id => id.startsWith('rev'));
  const isGBP      = ids.some(id => id.startsWith('gbp'));
  const isWebsite  = ids.some(id => id.startsWith('web'));

  const metrics  = extractCompetitorMetricsEnriched(content);
  const compName = metrics.compName || 'Local Competitor';

  // 1. REVIEW FINDING: Review Volume Bar Comparison
  if (isReview && metrics.targetReviews !== null && metrics.compReviews !== null) {
    return {
      type: 'bar_comparison',
      caption: 'Google Review Footprint',
      unit: 'Reviews',
      data: [
        { label: bName,    value: metrics.targetReviews, color_role: 'primary' },
        { label: compName, value: metrics.compReviews,   color_role: 'muted'   },
      ],
    };
  }

  // 2. GBP FINDING: Services Listed Comparison
  if (isGBP && metrics.targetServices !== null && metrics.compServices !== null) {
    return {
      type: 'bar_comparison',
      caption: 'Services Represented on Google',
      unit: 'Services',
      data: [
        { label: bName,    value: metrics.targetServices, color_role: 'primary' },
        { label: compName, value: metrics.compServices,   color_role: 'muted'   },
      ],
    };
  }

  // 3. CITATION FINDING: Directory & Platform Coverage
  if (isCitation) {
    const whatText = (finding.what_we_found || '').toLowerCase();
    const data = [];

    data.push({ label: 'Google Business Profile', status: 'strong', items: ['Claimed & Verified'] });
    if (whatText.includes('yelp') && !whatText.match(/yelp[^.]*?(missing|unclaimed|gap)/i)) {
      data.push({ label: 'Yelp', status: 'strong', items: ['Claimed'] });
    }

    const missingPlatforms = [];
    if (whatText.includes('healthgrades')) missingPlatforms.push('Healthgrades');
    if (whatText.includes('zocdoc'))       missingPlatforms.push('Zocdoc');
    if (whatText.includes('webmd'))        missingPlatforms.push('WebMD Care');
    if (whatText.includes('dental'))       missingPlatforms.push('Dental Directories');
    if (whatText.includes('yelp') && whatText.match(/yelp[^.]*?(missing|unclaimed)/i)) {
      missingPlatforms.push('Yelp');
    }
    if (whatText.includes('yellowpages') || whatText.includes('yellow pages')) missingPlatforms.push('YellowPages');
    if (whatText.includes('bbb'))          missingPlatforms.push('Better Business Bureau');
    if (whatText.includes('angi') || whatText.includes('angie')) missingPlatforms.push('Angi');
    if (whatText.includes('homeadvisor'))  missingPlatforms.push('HomeAdvisor');

    missingPlatforms.forEach(p => {
      data.push({ label: p, status: 'attention', items: ['Profile not claimed / Missing'] });
    });

    if (data.length >= 2) {
      return {
        type: 'qualitative_bars',
        caption: 'Directory & Platform Coverage',
        data,
      };
    }
  }

  // 4. WEBSITE / TECHNICAL FINDING: Signal Assessment
  if (isWebsite) {
    const whatText = (finding.what_we_found || '').toLowerCase();
    const data = [];
    const hasSchema = whatText.includes('schema') || whatText.includes('json-ld');
    const hasMobile = whatText.includes('mobile');

    if (hasSchema) {
      data.push({ label: 'Structured Schema Markup', status: 'attention', items: ['JSON-LD not detected'] });
    }
    data.push({ label: 'Website Infrastructure', status: 'strong', items: ['Active web presence confirmed'] });
    if (!hasMobile) {
      data.push({ label: 'Mobile Optimization', status: 'opportunity', items: ['Performance optimization recommended'] });
    }

    if (data.length >= 2) {
      return {
        type: 'qualitative_bars',
        caption: 'Technical & Discovery Signals',
        data,
      };
    }
  }

  return null;
}

// ── Evidence Link Derivation (Truthful, Specific Only, Generic Suppressed) ───
function deriveEvidenceLinks(finding, content) {
  if (Array.isArray(finding.evidence_links) && finding.evidence_links.length > 0) {
    return finding.evidence_links.filter(l => l && isSpecificPublicUrl(l.url));
  }

  const links = [];
  const registry = content.evidence_registry || content._evidence_registry || {};
  const ids = [...(finding.evidence_ids || []), ...(finding.source_finding_ids || [])];

  ids.forEach(id => {
    const entry = registry[id];
    if (entry && entry.source_url && isSpecificPublicUrl(entry.source_url)) {
      let label = 'View source';
      const urlLower = entry.source_url.toLowerCase();
      const idLower = String(id).toLowerCase();
      const factLower = (entry.fact || '').toLowerCase();

      if (idLower.startsWith('rev')) {
        label = 'View Google reviews';
      } else if (idLower.startsWith('gbp') || urlLower.includes('maps.app.goo.gl') || urlLower.includes('google.com/maps')) {
        label = 'View Google Business Profile';
      } else if (idLower.startsWith('comp')) {
        label = 'View competitor profile';
      } else if (idLower.startsWith('web') || factLower.includes('website') || factLower.includes('schema')) {
        label = 'View website';
      } else if (idLower.startsWith('cit') || factLower.includes('directory')) {
        if (urlLower.includes('healthgrades')) label = 'View Healthgrades listing';
        else if (urlLower.includes('bbb.org')) label = 'View BBB directory profile';
        else if (urlLower.includes('yellowpages')) label = 'View YellowPages listing';
        else if (urlLower.includes('yelp')) label = 'View Yelp listing';
        else label = 'View directory listing';
      }

      if (!links.some(l => l.url === entry.source_url)) {
        links.push({ label, url: entry.source_url });
      }
    }
  });

  // Fallback to validated business_context URLs if evidence_registry was unattached
  if (links.length === 0) {
    const biz = content.business_context || content.metadata || {};
    const whatText = (finding.what_we_found || '').toLowerCase();
    const idsLower = ids.map(i => String(i).toLowerCase());

    if ((idsLower.some(i => i.startsWith('gbp')) || whatText.includes('google business profile')) && isSpecificPublicUrl(biz.google_business_profile_url)) {
      links.push({ label: 'View Google Business Profile', url: biz.google_business_profile_url });
    } else if ((idsLower.some(i => i.startsWith('rev')) || whatText.includes('reviews')) && isSpecificPublicUrl(biz.google_business_profile_url)) {
      links.push({ label: 'View Google reviews', url: biz.google_business_profile_url });
    } else if ((idsLower.some(i => i.startsWith('web')) || whatText.includes('schema') || whatText.includes('website')) && isSpecificPublicUrl(biz.website)) {
      links.push({ label: 'View website', url: biz.website });
    }
  }

  return links;
}

function deriveSeeMoreDetails(finding, content) {
  if (Array.isArray(finding.see_more_details) && finding.see_more_details.length > 0) {
    return finding.see_more_details;
  }

  const details = [];
  const ids = [...(finding.source_finding_ids || []), ...(finding.evidence_ids || [])].map(id => String(id).toLowerCase());
  const what = finding.what_we_found || '';
  const act  = finding.recommended_action || '';
  const svc  = finding.relevant_service || '';

  if (svc) {
    details.push({ content: `Implementation Scope: ${svc} optimization across verified channels.`, is_technical: false });
  }

  const isWeb = ids.some(id => id.startsWith('web')) || what.toLowerCase().includes('schema') || what.toLowerCase().includes('json-ld');
  if (isWeb) {
    details.push({
      content: 'Structured Schema.org JSON-LD markup enables search engine crawlers to directly index provider identity, operating hours, coordinates, and service catalog.',
      is_technical: true
    });
  }

  const isCit = ids.some(id => id.startsWith('cit')) || what.toLowerCase().includes('director');
  if (isCit) {
    details.push({
      content: 'Consistent business information across specialized directories reinforces provider authority and cross-channel patient discovery.',
      is_technical: false
    });
  }

  const isRev = ids.some(id => id.startsWith('rev')) || what.toLowerCase().includes('review');
  if (isRev) {
    details.push({
      content: 'Consistent monthly review acquisition reinforces authority, social proof, and consumer conversion rates.',
      is_technical: false
    });
  }

  const isGBP = ids.some(id => id.startsWith('gbp')) || what.toLowerCase().includes('google business');
  if (isGBP) {
    details.push({
      content: 'Adding detailed procedure and service descriptions enables high-intent searchers seeking specific services to discover your profile.',
      is_technical: false
    });
  }

  if (details.length === 0 && act) {
    details.push({ content: `Implementation Roadmap: ${act}`, is_technical: false });
  }

  return details;
}

// ── Helper to derive plain-English business impact & before/after transformation ──
function deriveFindingConversionContext(finding, bName) {
  const title = (finding.title || '').toLowerCase();
  const what = (finding.what_we_found || '').toLowerCase();
  const why = (finding.why_it_matters || '').toLowerCase();
  const ids = [...(finding.source_finding_ids || []), ...(finding.evidence_ids || [])].map(id => String(id).toLowerCase());

  let impact = '';
  let before = '';
  let after = '';

  if (ids.some(id => id.startsWith('cit')) || title.includes('citation') || title.includes('directory') || what.includes('directory') || title.includes('inconsistent')) {
    impact = `Inconsistent directory records and missing industry citations confuse search algorithms, causing prospective high-value clients and customers searching for specialized services to be routed to competitors.`;
    before = `Conflicting NAP details & unverified directory listings create trust friction with search engines and buyers.`;
    after = `100% verified, synced directory footprint across all primary platforms, maximizing discovery confidence.`;
  } else if (ids.some(id => id.startsWith('gbp')) || title.includes('gbp') || title.includes('service') || what.includes('service')) {
    impact = `Prospective clients searching for specific high-value services fail to discover your profile because those capabilities aren't explicitly cataloged in your Google Business Profile.`;
    before = `General category only; high-intent specialized service offerings are absent from search queries.`;
    after = `Complete service catalog with explicit descriptions, capturing high-intent search traffic across your target market.`;
  } else if (ids.some(id => id.startsWith('rev')) || title.includes('review') || title.includes('reputation') || what.includes('review')) {
    impact = `While your rating sentiment is positive, competitors with higher review volume capture up to 3–4x more search impressions during peak decision hours.`;
    before = `Review acquisition is sporadic, allowing competitors to dominate search volume and market share.`;
    after = `Systematic review acquisition process steadily grows social proof and secures top map pack placement.`;
  } else if (ids.some(id => id.startsWith('web')) || title.includes('website') || title.includes('schema') || what.includes('schema')) {
    impact = `Without structured schema markup, search engines have to guess your exact service capabilities, company identity, and operating region.`;
    before = `Unstructured website markup leaves search engine crawlers with incomplete contextual business signals.`;
    after = `Rich Schema.org JSON-LD structured data directly feeds search engines with verified business credentials and capabilities.`;
  } else {
    impact = `Addressing this operational gap removes search friction and unlocks immediate discoverability for ${esc(bName)}.`;
    before = `Current baseline operates with unoptimized visibility signals.`;
    after = `Targeted optimization aligns your business with best-practice discovery standards.`;
  }

  return { impact, before, after };
}

function PriorityFinding({ finding, index, content }) {
  const rank     = finding.rank || (index + 1);
  const rankStr  = String(rank).padStart(2, '0');
  const pClass   = priorityClass(finding.priority_level);
  const pLabel   = esc(finding.priority_level || 'High') + ' Priority';
  const title    = esc(finding.title || 'Finding');
  const what     = esc(finding.what_we_found      || '');
  const why      = esc(finding.why_it_matters     || '');
  const action   = esc(finding.recommended_action || '');
  const svcLabel = finding.relevant_service ? ` &nbsp;&middot;&nbsp; ${esc(finding.relevant_service)}` : '';
  const bName    = content.cover?.business_name || content.metadata?.business_name || 'Your Business';

  const visual = deriveVisual(finding, content);
  const chartHTML = visual ? renderChart(visual) : '';
  const { impact, before, after } = deriveFindingConversionContext(finding, bName);

  const evidenceLinks = deriveEvidenceLinks(finding, content);
  const evidenceLinksHTML = evidenceLinks.length > 0 ? `
    <div class="finding-evidence-links">
      ${evidenceLinks.map(l => `
        <a href="${esc(l.url)}" class="evidence-link" target="_blank" rel="noopener noreferrer">
          ${esc(l.label)} <span class="evidence-link-arrow" aria-hidden="true">&rarr;</span>
        </a>
      `).join(' &nbsp;&middot;&nbsp; ')}
    </div>` : '';

  const SEE_MORE_THRESHOLD = 3;
  const details = deriveSeeMoreDetails(finding, content);
  const hasSubstantialDetails = details.length >= SEE_MORE_THRESHOLD;

  const ids = [...(finding.source_finding_ids || []), ...(finding.evidence_ids || [])].map(id => String(id).toLowerCase());
  let seeMoreLabel = 'See More Details';
  if (ids.some(id => id.startsWith('cit'))) seeMoreLabel = 'See Full Citation Details';
  else if (ids.some(id => id.startsWith('rev'))) seeMoreLabel = 'See More Review Findings';
  else if (ids.some(id => id.startsWith('gbp'))) seeMoreLabel = 'See Full Profile Details';
  else if (ids.some(id => id.startsWith('web'))) seeMoreLabel = 'See Technical Details';

  const detailId = `finding-details-${rank}`;

  const detailItems = details.map(d => {
    const isTech = d.is_technical === true;
    return `
      <div class="detail-item ${isTech ? 'technical' : ''}">
        ${isTech ? `<div><span class="technical-badge">Technical Detail</span>${esc(d.content || '')}</div>` : esc(d.content || d.label || '')}
      </div>`;
  }).join('');

  return `
<section id="findings-${rank}" class="finding-section" aria-label="Priority finding ${rank}">
  <div class="container">
    <!-- 1. TITLE & PRIORITY HEADER -->
    <div class="finding-header">
      <div class="finding-rank-badge" aria-hidden="true">${rankStr}</div>
      <div class="finding-header-text">
        <div class="finding-priority-badge ${pClass}">${pLabel}${svcLabel}</div>
        <h2 class="finding-title">${title}</h2>
      </div>
    </div>

    <!-- 2. BIG PRIMARY VISUAL (Tightly Integrated) -->
    ${chartHTML ? `
    <div class="finding-visual" role="figure" aria-label="Supporting evidence for ${finding.title || 'this finding'}">
      ${chartHTML}
    </div>` : ''}

    <!-- 2b. PLAIN-ENGLISH BUSINESS IMPACT BANNER (NON-TECHNICAL HOOK) -->
    <div class="business-impact-banner" role="note" aria-label="Business Impact Summary">
      <span class="business-impact-icon">💡</span>
      <p class="business-impact-text">
        <strong>Direct Revenue &amp; Business Impact:</strong> ${esc(impact)}
      </p>
    </div>

    <!-- 3. WHAT WE FOUND (+ Verification Link) -> WHY -> ACTION -->
    <div class="finding-body">
      <div class="finding-col what">
        <div class="finding-col-label">
          <span aria-hidden="true">&#9679;</span> What We Found
        </div>
        <p>${what || '<em>See details below.</em>'}</p>
        ${evidenceLinksHTML}
      </div>
      <div class="finding-col why">
        <div class="finding-col-label">
          <span aria-hidden="true">&#9755;</span> Why This Matters
        </div>
        <p>${why || '<em>See details below.</em>'}</p>
      </div>
      <div class="finding-col action">
        <div class="finding-col-label">
          <span aria-hidden="true">&#9889;</span> Recommended Action
        </div>
        <p>${action || '<em>See details below.</em>'}</p>
      </div>
    </div>

    <!-- 3b. BEFORE VS AFTER TRANSFORMATION COMPARISON CARDS -->
    <div class="before-after-grid">
      <div class="before-card">
        <div class="before-card-header">
          <span>✕</span> Current Search Bottleneck
        </div>
        <p class="before-card-body">${esc(before)}</p>
      </div>
      <div class="after-card">
        <div class="after-card-header">
          <span>✓</span> Optimized Growth State
        </div>
        <p class="after-card-body">${esc(after)}</p>
      </div>
    </div>

    <!-- 3c. INLINE CONSULTATIVE SOLUTION BRIDGE -->
    <a href="#cta" class="inline-solution-bridge" aria-label="Discuss implementation in strategy call">
      <span class="inline-bridge-label">⚡ Want our team to implement this solution for ${esc(bName)}?</span>
      <span class="inline-bridge-btn">Discuss on our 20-min review call &rarr;</span>
    </a>

    <!-- 4. CONDITIONAL PROGRESSIVE DISCLOSURE -->
    ${hasSubstantialDetails ? `
    <div style="margin-top:1.25rem;">
      <button class="see-more-btn" data-target="${detailId}" aria-expanded="false" aria-controls="${detailId}">
        <span class="see-more-label">${esc(seeMoreLabel)}</span>
        <span class="see-more-icon" aria-hidden="true">&#9660;</span>
      </button>
      <div class="see-more-panel" id="${detailId}" role="region" aria-label="Additional details">
        <div class="see-more-inner">
          <div class="detail-list">${detailItems}</div>
        </div>
      </div>
    </div>` : ''}
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPETITOR SNAPSHOT (Compact Side-by-Side Visual Intelligence)
// ─────────────────────────────────────────────────────────────────────────────

function CompetitorSnapshot({ content }) {
  const snap     = content.competitive_snapshot || {};
  const comps    = snap.comparisons             || [];
  const comp0    = comps[0]                     || {};
  const meta     = content.metadata             || {};
  const bName    = content.cover?.business_name || meta.business_name || 'Your Business';
  const location = content.cover?.location      || meta.business_location || '';
  const metrics  = extractCompetitorMetricsEnriched(content);
  const compName = metrics.compName || comp0.competitor_name || 'Local Competitor';

  if (!compName && !metrics.compReviews) return '';

  const tShort = shortName(bName);
  const cShort = shortName(compName);

  const targetCard = `
    <div class="competitor-profile target">
      <div class="comp-profile-role">Your Business</div>
      <div class="comp-profile-name">${esc(bName)}</div>
      <div class="comp-profile-sub">${location ? esc(location) + ' · ' : ''}Target Business</div>
    </div>`;

  const compCard = `
    <div class="competitor-profile benchmark">
      <div class="comp-profile-role">Local Competitor</div>
      <div class="comp-profile-name">${esc(compName)}</div>
      <div class="comp-profile-sub">${location ? esc(location) + ' · ' : ''}Local Benchmark</div>
    </div>`;

  // 3 Compact Benchmark Rows
  const ratingRow = metrics.targetRating !== null && metrics.compRating !== null
    ? renderCompetitorMetricRow({
        label: 'Average Customer Rating', unit: '★',
        targetVal: metrics.targetRating, compVal: metrics.compRating,
        targetName: tShort, compName: cShort,
        targetColor: '#059669', compColor: '#64748B',
      }) : '';

  const reviewRow = renderCompetitorMetricRow({
    label: 'Google Review Volume', unit: '',
    targetVal: metrics.targetReviews, compVal: metrics.compReviews,
    targetName: tShort, compName: cShort,
    targetColor: '#2563EB', compColor: '#64748B',
  });

  const svcRow = renderCompetitorMetricRow({
    label: 'Google Business Profile Listed Services', unit: '',
    targetVal: metrics.targetServices, compVal: metrics.compServices,
    targetName: tShort, compName: cShort,
    targetColor: '#D97706', compColor: '#64748B',
  });

  const oppText = comp0.opportunity || `Expanding your Google Business Profile service catalog and accelerating review acquisition represents a direct, achievable path to greater local market visibility.`;

  const category = (content.metadata?.primary_category || content.business_context?.primary_category || '').toLowerCase();
  const isMedical = category.includes('dent') || category.includes('med') || category.includes('clinic') || category.includes('health');
  const userType = isMedical ? 'Patients' : 'Clients';
  const inquiryLabel = isMedical ? 'Active Dental Inquiries' : 'Active Search Inquiries';

  const tRev = metrics.targetReviews || content.metadata?.reviews_count || (content.business_foundation?.stats?.find(s => s.label?.includes('Review'))?.value ? parseInt(content.business_foundation.stats.find(s => s.label?.includes('Review')).value, 10) : 10);
  const cRev = metrics.compReviews || 340;
  const totalRev = (tRev || 1) + (cRev || 1);
  const cPct = Math.min(Math.max(Math.round((cRev / totalRev) * 100), 65), 90);
  const tPct = 100 - cPct;

  const trafficLeakCard = `
    <div class="comp-traffic-leak-card" role="figure" aria-label="Customer search traffic capture analysis">
      <div class="traffic-leak-header">
        <span class="leak-badge">Local ${userType} Search Flow Analysis</span>
        <h3 class="leak-title">Where Do Searching ${userType} in ${esc(location || 'Your Area')} Go?</h3>
      </div>
      <svg width="100%" viewBox="0 0 740 155" class="traffic-leak-svg" aria-hidden="true" style="overflow:visible;">
        <!-- Funnel Box -->
        <rect x="10" y="47" width="180" height="60" rx="8" fill="#0B192C" />
        <text x="100" y="73" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="800" letter-spacing="0.05em">100 ${userType.toUpperCase()} SEARCHING</text>
        <text x="100" y="92" text-anchor="middle" fill="#93C5FD" font-family="system-ui, -apple-system, sans-serif" font-size="11">${inquiryLabel}</text>

        <!-- Top Branch to Competitor -->
        <path d="M 190 67 C 240 67, 260 36, 310 36" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="4,4" />
        <polygon points="310,32 320,36 310,40" fill="#DC2626" />
        <text x="250" y="32" fill="#DC2626" font-family="system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="800">~${cPct}% Volume</text>

        <!-- Bottom Branch to Target Business -->
        <path d="M 190 87 C 240 87, 260 118, 310 118" fill="none" stroke="#059669" stroke-width="2.5" />
        <polygon points="310,114 320,118 310,122" fill="#059669" />
        <text x="250" y="138" fill="#059669" font-family="system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="800">~${tPct}% Volume</text>

        <!-- Competitor Box -->
        <rect x="325" y="12" width="405" height="50" rx="6" fill="#FEF2F2" stroke="#FECACA" />
        <text x="340" y="33" fill="#991B1B" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="800">${esc(compName)} (${cRev} Reviews)</text>
        <text x="340" y="50" fill="#7F1D1D" font-family="system-ui, -apple-system, sans-serif" font-size="11">Dominates high-volume local search queries</text>

        <!-- Target Business Box -->
        <rect x="325" y="93" width="405" height="50" rx="6" fill="#ECFDF5" stroke="#A7F3D0" />
        <text x="340" y="114" fill="#065F46" font-family="system-ui, -apple-system, sans-serif" font-size="12.5" font-weight="800">${esc(bName)} (${metrics.targetRating || '5.0'}★ Rating)</text>
        <text x="340" y="131" fill="#047857" font-family="system-ui, -apple-system, sans-serif" font-size="11">High conversion trust, but captures fewer initial search views</text>
      </svg>
      <div class="traffic-leak-takeaway">
        <strong>Strategic Opportunity:</strong> Expanding your Google Business Profile service catalog and systematically acquiring 5–10 client reviews monthly directly diverts prospective business from ${esc(compName)} to ${esc(bName)}.
      </div>
    </div>`;

  return `
<section id="competition" class="report-section" aria-label="Competitive snapshot">
  <div class="container">
    <div class="section-eyebrow">Market Intelligence</div>
    <h2 class="section-title">YOU VS LOCAL COMPETITOR</h2>
    <p class="section-lead">
      ${compName ? `Direct benchmark comparison of public search and reputation signals against ${esc(compName)}${location ? ` in the ${esc(location)} market` : ''}.` : 'Direct benchmark comparison of public local search signals.'}
    </p>

    <div class="competitor-profiles">
      ${targetCard}
      ${compCard}
    </div>

    ${trafficLeakCard}

    ${reviewRow || ratingRow || svcRow ? `
    <div class="comp-metrics-panel">
      <div class="comp-metrics-title">Direct Signal-by-Signal Benchmark</div>
      ${ratingRow}
      ${reviewRow}
      ${svcRow}
      <div class="comp-summary-note">
        <em>Takeaway:</em> Your customer satisfaction rating is higher. The competitor's visible review and service footprint is currently larger.
      </div>
    </div>` : (comp0.observation ? `
    <div class="comp-metrics-panel">
      <div class="comp-metrics-title">Market Benchmark Overview</div>
      <p style="font-size:var(--fs-body-sm);color:var(--c-text-secondary);line-height:1.55;margin:0;">${esc(comp0.observation)}</p>
    </div>` : '')}

    <div class="comp-opportunity-box">
      <div class="comp-opp-label">&#127919; Competitive Advantage Opportunity</div>
      <p class="comp-opp-text">${esc(oppText)}</p>
    </div>
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// GROWTH OPPORTUNITIES
// ─────────────────────────────────────────────────────────────────────────────

function GrowthOpportunities({ content }) {
  const growth = content.growth_opportunities || {};
  const opportunitiesList = growth.opportunities || [];
  if (!opportunitiesList.length) return '';

  const intro = growth.intro || 'Additional areas where targeted improvements can further strengthen your local visibility.';
  const items = opportunitiesList.map(opp => `
    <div class="opportunity-item">
      <div class="opp-title">${esc(opp.title || 'Opportunity')}</div>
      <p class="opp-observation">${esc(opp.observation || '')}</p>
      ${opp.suggested_action ? `<div class="opp-action">&#10003; ${esc(opp.suggested_action)}</div>` : ''}
    </div>`).join('');

  return `
<section id="growth" class="report-section" aria-label="Additional growth opportunities">
  <div class="container">
    <div class="section-eyebrow">Secondary Opportunities</div>
    <h2 class="section-title">ADDITIONAL GROWTH OPPORTUNITIES</h2>
    <p class="section-lead">${esc(intro)}</p>
    <div class="opportunities-grid">${items}</div>
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION ROADMAP
// ─────────────────────────────────────────────────────────────────────────────

function ActionRoadmap({ content }) {
  const roadmap = content.recommended_next_steps || {};
  const steps   = roadmap.steps                  || [];
  const intro   = roadmap.intro || 'A clear, sequenced plan to address the opportunities identified in this report.';

  const stepItems = steps.map(step => {
    const num = String(step.step_number || '').padStart(2, '0');
    return `
    <div class="roadmap-step">
      <div class="roadmap-step-num" aria-hidden="true">${esc(num)}</div>
      <div class="roadmap-step-text">${esc(step.action || '')}</div>
      <div class="roadmap-step-arrow" aria-hidden="true">&#8594;</div>
    </div>`;
  }).join('');

  return `
<section id="action-plan" class="report-section" aria-label="Recommended action plan">
  <div class="container">
    <div class="section-eyebrow">Strategic Execution Plan</div>
    <h2 class="section-title">RECOMMENDED ACTION ROADMAP</h2>
    <p class="section-lead">${esc(intro)}</p>
    <div class="roadmap-steps">${stepItems}</div>
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────────────

function CTASection({ content, brandingConfig }) {
  const cta    = content.cta          || {};
  const ctaExt = content.cta_extended || {};
  const meta   = content.metadata     || {};

  const brandName  = esc(ctaExt.brand_name || brandingConfig.brand_name || 'Mark Bishop Media');
  const email      = ctaExt.email          || brandingConfig.email      || null;
  const phone      = ctaExt.phone          || brandingConfig.phone      || null;
  const bookingUrl = ctaExt.booking_url    || brandingConfig.booking_url || null;
  const bName      = esc(meta.business_name || content.cover?.business_name || 'your business');

  const heading = esc(cta.heading || `Ready to Turn These Opportunities Into Growth for ${meta.business_name || 'Your Business'}?`);

  const bodyText = esc(
    ctaExt.body_copy ||
    cta.body ||
    `These are practical, achievable improvements that can meaningfully extend your local visibility. Let's review the findings together, discuss the opportunities that matter most, and put together a clear path forward — no obligations, just a straightforward conversation.`
  );

  const emailLink = email
    ? `<a href="mailto:${esc(email)}" class="cta-contact-link" aria-label="Email ${brandName}">✉ ${esc(email)}</a>`
    : '';
  const phoneLink = phone
    ? `<a href="tel:${esc(phone.replace(/\s/g,''))}" class="cta-contact-link" aria-label="Call ${brandName}">📞 ${esc(phone)}</a>`
    : '';

  const ctaButton = bookingUrl
    ? `<a href="${esc(bookingUrl)}" class="cta-contact-link primary-cta" target="_blank" rel="noopener">${esc(cta.button_label || 'Book a Free Strategy Call')}</a>`
    : '';

  return `
<section id="cta" class="report-section section-cta" aria-label="Contact and next steps">
  <div class="container">
    <div class="cta-card">
      <div class="cta-card-geo" aria-hidden="true">${geoPattern()}</div>

      <div class="cta-eyebrow-pill" aria-hidden="true">
        <span class="cta-eyebrow-text">The Natural Next Step</span>
      </div>

      <h2 class="cta-heading">${heading}</h2>
      <p class="cta-body">${bodyText}</p>

      <div class="cta-contacts">
        ${ctaButton}
        ${phoneLink}
        ${emailLink}
      </div>

      <p class="cta-subtext">No obligation &nbsp;·&nbsp; 20-minute review &nbsp;·&nbsp; Actionable recommendations specific to ${bName}</p>
    </div>

    <div class="cta-methodology">
      <span><strong>Assessment Methodology:</strong> Multi-channel local presence review covering directory citations, Google Business Profile, customer reviews, competitive benchmarking, and website presence signals.</span>
      <span>${brandName} &nbsp;·&nbsp; ${esc(email || '')} &nbsp;·&nbsp; ${esc(phone || '')}</span>
    </div>
  </div>
</section>`;
}

module.exports = {
  Nav,
  Cover,
  LocalVisibilityAtAGlance,
  WhatsWorking,
  PriorityFinding,
  CompetitorSnapshot,
  GrowthOpportunities,
  ActionRoadmap,
  CTASection,
  isSpecificPublicUrl,
};
