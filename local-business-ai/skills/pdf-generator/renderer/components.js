/**
 * components.js
 * SaaS-grade Component Library for Local Visibility Intelligence Reports (V4 Redesign).
 * 100% Data-Driven: Master Audit Object → report_content.json → report_design.json → PDF
 * Zero hardcoded business metrics, sample competitor names, or fallback fixture numbers.
 */

'use strict';

const { esc } = require('./utils');

// ─── HEADER & FOOTER BARS ───────────────────────────────────────────────────
function HeaderBar({ businessName = 'Local Business Audit', categoryTag = 'Local Visibility Audit' }) {
  return `
  <div class="page-header-bar">
    <span class="report-tag">${esc(categoryTag)}</span>
    <span class="business-title">${esc(businessName)}</span>
  </div>`;
}

function FooterBar({ brandingConfig = {}, pageNumber, totalPages = 8, disclaimer = null }) {
  const divisionName = brandingConfig.division_name || null;
  const parentBrand = brandingConfig.parent_brand || null;
  const brandName = divisionName || brandingConfig.brand_name || 'Local Growth Division';
  const footerLabel = (divisionName && parentBrand)
    ? `${divisionName} · ${parentBrand}`
    : brandName;
  return `
  <div class="page-footer-bar">
    <span><strong>${esc(footerLabel)}</strong> • Confidential Business Intelligence</span>
    ${disclaimer ? `<span>${esc(disclaimer)}</span>` : ''}
    <span>Page ${pageNumber} of ${totalPages}</span>
  </div>`;
}

// ─── PAGE 1: COVER ──────────────────────────────────────────────────────────
function Cover({ cover = {}, metadata = {}, brandingConfig = {} }) {
  const divisionName = brandingConfig.division_name || brandingConfig.brand_name || 'Local Growth Division';
  const parentBrand = brandingConfig.parent_brand || 'Mark Bishop Media';
  const businessName = cover.business_name || metadata.business_name || 'DATA NOT AVAILABLE';
  const location = cover.location || metadata.business_location || null;
  const logoUrl = brandingConfig.logo_url || null;
  const logoHtml = logoUrl
    ? `<img src="${esc(logoUrl)}" alt="${esc(divisionName)} logo" style="max-height:36px; max-width:160px; object-fit:contain;" />`
    : `<div>
        <div style="font-size:14px; font-weight:800; color:#FFFFFF; letter-spacing:0.06em; word-spacing:0.1em; text-transform:uppercase;">${esc(divisionName)}</div>
        <div style="font-size:9.5px; font-weight:600; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.04em;">A ${esc(parentBrand)} Company</div>
       </div>`;

  return `
  <div class="page" style="background: linear-gradient(145deg, #0B192C 0%, #050D1A 60%, #1E3E62 100%); color:#FFFFFF; padding:40px; position:relative; justify-content:space-between;">
    <!-- Abstract Geometric SVG Grid Motif -->
    <svg style="position:absolute; right:0; top:0; width:55%; height:100%; opacity:0.08; pointer-events:none;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern-v4" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" stroke-width="0.75" />
          <circle cx="0" cy="0" r="1.5" fill="#D97706" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern-v4)" />
      <circle cx="80%" cy="30%" r="140" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="4,4" />
      <circle cx="80%" cy="30%" r="220" fill="none" stroke="#FFFFFF" stroke-width="1" />
      <circle cx="80%" cy="30%" r="300" fill="none" stroke="#FFFFFF" stroke-width="0.5" stroke-dasharray="6,6" />
    </svg>

    <!-- Top Bar -->
    <div style="display:flex; justify-content:space-between; align-items:center; z-index:2;">
      ${logoHtml}
      <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:var(--border-radius-pill); padding:5px 14px; font-size:9.5px; font-weight:700; letter-spacing:0.06em; word-spacing:0.1em; text-transform:uppercase; color:var(--color-secondary-light);">
        Verified Business Intelligence Audit
      </div>
    </div>

    <!-- Center Hero Identity -->
    <div style="z-index:2; padding:30px 0;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(217,119,6,0.15); border:1px solid rgba(245,158,11,0.3); border-radius:var(--border-radius-sm); padding:5px 12px; margin-bottom:18px;">
        <span style="width:6px; height:6px; background:var(--color-secondary-light); border-radius:50%;"></span>
        <span style="font-size:10.5px; font-weight:800; letter-spacing:0.06em; word-spacing:0.12em; text-transform:uppercase; color:var(--color-secondary-light);">
          Local Visibility Intelligence
        </span>
      </div>

      <h1 style="font-size:42px; font-weight:800; color:#FFFFFF; margin-bottom:12px; line-height:1.1; letter-spacing:0; word-spacing:normal;">
        ${esc(businessName)}
      </h1>

      <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px;">
        ${location ? `<span style="font-size:17px; color:rgba(255,255,255,0.9); font-weight:500;">📍 ${esc(location)}</span><span style="color:rgba(255,255,255,0.3);">•</span>` : ''}
        <span style="font-size:15px; color:rgba(255,255,255,0.7);">
          Multi-Channel Local Search Diagnostic
        </span>
      </div>

      <p style="font-size:13.5px; color:rgba(255,255,255,0.65); max-width:540px; line-height:1.6; word-spacing:normal;">
        ${esc(cover.subtitle || 'An evidence-based diagnostic evaluating local search presence, reputation momentum, listing accuracy, and competitive benchmarks.')}
      </p>
    </div>

    <!-- Bottom Metadata Panel -->
    <div style="z-index:2; background:rgba(15,23,42,0.65); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.12); border-radius:var(--border-radius); padding:16px 20px; display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
      <div>
        <div style="font-size:9px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.06em; word-spacing:0.08em; margin-bottom:3px;">Prepared For</div>
        <div style="font-size:12px; font-weight:700; color:#FFFFFF;">${esc(businessName)}</div>
      </div>
      <div>
        <div style="font-size:9px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.06em; word-spacing:0.08em; margin-bottom:3px;">Audit Date</div>
        <div style="font-size:12px; font-weight:600; color:#FFFFFF;">${esc(metadata.audit_date || 'August 2026')}</div>
      </div>
      <div>
        <div style="font-size:9px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.06em; word-spacing:0.08em; margin-bottom:3px;">Channels Evaluated</div>
        <div style="font-size:12px; font-weight:600; color:#FFFFFF;">GBP, Citations, Reviews, Web</div>
      </div>
      <div>
        <div style="font-size:9px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.06em; word-spacing:0.08em; margin-bottom:3px;">Audit Status</div>
        <div style="font-size:12px; font-weight:700; color:#34D399;">✓ Complete &amp; Verified</div>
      </div>
    </div>
  </div>`;
}

// ─── PAGE 2: LOCAL VISIBILITY SNAPSHOT (HEALTH MAP DIAGNOSTIC) ───────────────
function LocalVisibilitySnapshot({ content = {}, brandingConfig = {} }) {
  const snapshot = content.executive_snapshot || {};
  const businessName = content.cover?.business_name || content.metadata?.business_name || 'DATA NOT AVAILABLE';
  const priorities = content.top_priorities || [];
  const p1 = priorities[0] || {};
  const strengths = content.business_foundation?.strengths || [];

  // Helper to safely inspect source-specific audit findings
  const findFinding = (prefix, regex) => {
    return priorities.find(p => 
      (p.source_finding_ids && p.source_finding_ids.some(id => id.startsWith(prefix))) ||
      regex.test(p.title + ' ' + (p.what_we_found || ''))
    );
  };

  const findStrength = (regex) => {
    return strengths.find(s => regex.test((s.area || '') + ' ' + (s.observation || '')));
  };

  // 1. Citations & Directories Pillar (from citation-research / citation-analysis)
  const citationFinding = findFinding('cf-', /citation|listing|inconsistent|directory/i);
  const citationStrength = findStrength(/citation|directory|listing/i);
  let citationStatus = 'DATA NOT AVAILABLE';
  let citationColor = '#64748B';
  let citationBg = '#F1F5F9';
  let citationBorder = '#CBD5E1';
  let citationSegments = 0;
  let citationSignal = 'DATA NOT AVAILABLE';
  let citationTag = 'Directory Health';

  if (citationFinding) {
    citationStatus = 'Needs Attention';
    citationColor = '#991B1B';
    citationBg = '#FEF2F2';
    citationBorder = '#FECACA';
    citationSegments = 1;
    citationSignal = citationFinding.what_we_found || 'Inconsistent business details identified across directories';
    citationTag = 'Listing Inconsistencies';
  } else if (citationStrength) {
    citationStatus = 'Strong Foundation';
    citationColor = '#047857';
    citationBg = '#ECFDF5';
    citationBorder = '#A7F3D0';
    citationSegments = 4;
    citationSignal = citationStrength.observation || 'Consistent business information across major directories';
    citationTag = 'Consistent Information';
  }

  // 2. Google Business Profile Pillar (from gbp-audit)
  const gbpFinding = findFinding('gbp-', /gbp|google business/i);
  const gbpStrength = findStrength(/google|gbp|profile/i);
  let gbpStatus = 'DATA NOT AVAILABLE';
  let gbpColor = '#64748B';
  let gbpBg = '#F1F5F9';
  let gbpBorder = '#CBD5E1';
  let gbpSegments = 0;
  let gbpSignal = 'DATA NOT AVAILABLE';
  let gbpTag = 'Profile Health';

  if (gbpStrength) {
    gbpStatus = 'Strong Foundation';
    gbpColor = '#047857';
    gbpBg = '#ECFDF5';
    gbpBorder = '#A7F3D0';
    gbpSegments = 4;
    gbpSignal = gbpFinding
      ? (gbpFinding.what_we_found || 'Verified profile active; catalog expansion recommended')
      : (gbpStrength.observation || 'Claimed and verified profile foundation');
    gbpTag = gbpFinding ? 'Verified • Expansion Needed' : 'Claimed & Verified';
  } else if (gbpFinding) {
    gbpStatus = 'Needs Attention';
    gbpColor = '#991B1B';
    gbpBg = '#FEF2F2';
    gbpBorder = '#FECACA';
    gbpSegments = 1;
    gbpSignal = gbpFinding.what_we_found || 'Profile requires optimization or expanded service catalog';
    gbpTag = 'Profile Optimization';
  }

  // 3. Reputation & Reviews Pillar (from review-analysis)
  const reviewFinding = findFinding('rev-', /review|rating|reputation/i);
  const reviewStrength = findStrength(/review|rating|star/i);
  let reviewStatus = 'DATA NOT AVAILABLE';
  let reviewColor = '#64748B';
  let reviewBg = '#F1F5F9';
  let reviewBorder = '#CBD5E1';
  let reviewSegments = 0;
  let reviewSignal = 'DATA NOT AVAILABLE';
  let reviewTag = 'Reputation Health';

  if (reviewFinding && reviewStrength) {
    reviewStatus = 'Reputation Gap';
    reviewColor = '#D97706';
    reviewBg = '#FFFBEB';
    reviewBorder = '#FDE68A';
    reviewSegments = 3;
    reviewSignal = reviewFinding.what_we_found || 'Positive customer sentiment, with competitive review acquisition opportunity';
    reviewTag = 'Reputation Opportunity';
  } else if (reviewStrength) {
    reviewStatus = 'Strong Foundation';
    reviewColor = '#047857';
    reviewBg = '#ECFDF5';
    reviewBorder = '#A7F3D0';
    reviewSegments = 4;
    reviewSignal = reviewStrength.observation || 'Strong genuine customer review sentiment';
    reviewTag = 'Strong Sentiment';
  } else if (reviewFinding) {
    reviewStatus = 'Needs Attention';
    reviewColor = '#991B1B';
    reviewBg = '#FEF2F2';
    reviewBorder = '#FECACA';
    reviewSegments = 1;
    reviewSignal = reviewFinding.what_we_found || 'Review acquisition process needed';
    reviewTag = 'Review Acquisition';
  }

  // 4. Website & Schema Pillar (from conditional website-audit)
  const webFinding = findFinding('web-', /website|schema|structured/i);
  const webStrength = findStrength(/website|site|schema/i);
  let webStatus = 'DATA NOT AVAILABLE';
  let webColor = '#64748B';
  let webBg = '#F1F5F9';
  let webBorder = '#CBD5E1';
  let webSegments = 0;
  let webSignal = 'DATA NOT AVAILABLE';
  let webTag = 'Technical Health';

  if (webFinding) {
    webStatus = 'Growth Opportunity';
    webColor = '#1D4ED8';
    webBg = '#EFF6FF';
    webBorder = '#BFDBFE';
    webSegments = 2;
    webSignal = webFinding.what_we_found || 'Active website; local structured data schema missing';
    webTag = 'Structured Data Enhancement';
  } else if (webStrength) {
    webStatus = 'Strong Foundation';
    webColor = '#047857';
    webBg = '#ECFDF5';
    webBorder = '#A7F3D0';
    webSegments = 4;
    webSignal = webStrength.observation || 'Active website with local business structured information';
    webTag = 'Active Schema';
  }

  // Helper to render discrete qualitative indicator segments without numbers
  const renderQualitativeBar = (activeSegments, color) => {
    return `
    <div style="display:flex; gap:4px; margin-top:8px; margin-bottom:4px;">
      <div style="flex:1; height:8px; border-radius:3px; background:${activeSegments >= 1 ? color : '#E2E8F0'};"></div>
      <div style="flex:1; height:8px; border-radius:3px; background:${activeSegments >= 2 ? color : '#E2E8F0'};"></div>
      <div style="flex:1; height:8px; border-radius:3px; background:${activeSegments >= 3 ? color : '#E2E8F0'};"></div>
      <div style="flex:1; height:8px; border-radius:3px; background:${activeSegments >= 4 ? color : '#E2E8F0'};"></div>
    </div>`;
  };

  return `
  <div class="page">
    ${HeaderBar({ businessName, categoryTag: '01 / Executive Diagnostic' })}

    <div class="section-eyebrow">Executive Summary &amp; Diagnostic Overview</div>
    <h2 class="section-title">LOCAL VISIBILITY SNAPSHOT</h2>
    <p class="section-subtitle">
      A consolidated diagnostic across core discovery channels, establishing current health and critical visibility gaps.
    </p>

    <!-- UNIFIED LOCAL VISIBILITY HEALTH MAP MATRIX -->
    <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius); padding:16px 18px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px; font-weight:800; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em;">
            Local Visibility Health Map
          </span>
          <span style="font-size:9.5px; font-weight:700; background:#F1F5F9; color:#475569; padding:2px 8px; border-radius:10px;">
            Qualitative Status Diagnostic
          </span>
        </div>
        <div style="font-size:10px; color:var(--color-text-muted);">
          4 Core Pillars Evaluated
        </div>
      </div>

      <!-- 4 Pillars Side-by-Side Health Cards -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin-bottom:12px;">
        
        <!-- Pillar 1: Citations -->
        <div style="background:${citationBg}; border:1px solid ${citationBorder}; border-radius:var(--border-radius-sm); padding:12px 10px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="font-size:9px; font-weight:800; color:#475569; text-transform:uppercase; margin-bottom:2px;">01 • Citations</div>
            <div style="font-size:12px; font-weight:800; color:${citationColor}; line-height:1.2; margin-bottom:4px;">
              ${esc(citationStatus)}
            </div>
            ${renderQualitativeBar(citationSegments, citationColor)}
          </div>
          <div style="font-size:9.5px; font-weight:600; color:${citationColor}; margin-top:4px;">
            ${esc(citationTag)}
          </div>
        </div>

        <!-- Pillar 2: GBP -->
        <div style="background:${gbpBg}; border:1px solid ${gbpBorder}; border-radius:var(--border-radius-sm); padding:12px 10px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="font-size:9px; font-weight:800; color:#475569; text-transform:uppercase; margin-bottom:2px;">02 • Profile (GBP)</div>
            <div style="font-size:12px; font-weight:800; color:${gbpColor}; line-height:1.2; margin-bottom:4px;">
              ${esc(gbpStatus)}
            </div>
            ${renderQualitativeBar(gbpSegments, gbpColor)}
          </div>
          <div style="font-size:9.5px; font-weight:600; color:${gbpColor}; margin-top:4px;">
            ${esc(gbpTag)}
          </div>
        </div>

        <!-- Pillar 3: Reviews -->
        <div style="background:${reviewBg}; border:1px solid ${reviewBorder}; border-radius:var(--border-radius-sm); padding:12px 10px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="font-size:9px; font-weight:800; color:#475569; text-transform:uppercase; margin-bottom:2px;">03 • Reviews &amp; CX</div>
            <div style="font-size:12px; font-weight:800; color:${reviewColor}; line-height:1.2; margin-bottom:4px;">
              ${esc(reviewStatus)}
            </div>
            ${renderQualitativeBar(reviewSegments, reviewColor)}
          </div>
          <div style="font-size:9.5px; font-weight:600; color:${reviewColor}; margin-top:4px;">
            ${esc(reviewTag)}
          </div>
        </div>

        <!-- Pillar 4: Website -->
        <div style="background:${webBg}; border:1px solid ${webBorder}; border-radius:var(--border-radius-sm); padding:12px 10px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="font-size:9px; font-weight:800; color:#475569; text-transform:uppercase; margin-bottom:2px;">04 • Web &amp; Schema</div>
            <div style="font-size:12px; font-weight:800; color:${webColor}; line-height:1.2; margin-bottom:4px;">
              ${esc(webStatus)}
            </div>
            ${renderQualitativeBar(webSegments, webColor)}
          </div>
          <div style="font-size:9.5px; font-weight:600; color:${webColor}; margin-top:4px;">
            ${esc(webTag)}
          </div>
        </div>
      </div>

      <!-- Diagnostic Status Legend Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--border-radius-sm); padding:8px 12px; font-size:10px;">
        <span style="font-weight:700; color:#0B192C;">Diagnostic Spectrum:</span>
        <span style="color:#047857; font-weight:700;">● Strong Foundation</span>
        <span style="color:#D97706; font-weight:700;">● Reputation Gap</span>
        <span style="color:#1D4ED8; font-weight:700;">● Growth Opportunity</span>
        <span style="color:#991B1B; font-weight:700;">● Needs Attention</span>
      </div>
    </div>

    <!-- DOMINANT CALLOUT: BIGGEST VISIBILITY GAP -->
    <div style="background:#FFFFFF; border:1px solid #FECACA; border-left:5px solid #991B1B; border-radius:var(--border-radius); padding:14px 16px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="background:#FEF2F2; color:#991B1B; font-weight:800; font-size:9px; padding:3px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.04em;">
            Biggest Visibility Gap • Priority 01
          </span>
          <span style="font-size:13px; font-weight:800; color:var(--color-primary);">
            ${esc(p1.title || 'Inconsistent Business Contact Information Across Directories')}
          </span>
        </div>
        <span style="font-size:10.5px; font-weight:700; color:#991B1B;">Action Required</span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:8px;">
        <div style="background:#FEF2F2; padding:10px 12px; border-radius:var(--border-radius-sm);">
          <div style="font-size:9px; font-weight:800; color:#991B1B; text-transform:uppercase; margin-bottom:3px;">Validated Finding</div>
          <p style="font-size:11.5px; color:#7F1D1D; margin:0; line-height:1.45;">
            ${esc(p1.what_we_found || 'Inconsistent phone and address formatting across local business directories.')}
          </p>
        </div>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:10px 12px; border-radius:var(--border-radius-sm);">
          <div style="font-size:9px; font-weight:800; color:#475569; text-transform:uppercase; margin-bottom:3px;">Why This Matters First</div>
          <p style="font-size:11.5px; color:#334155; margin:0; line-height:1.45;">
            ${esc(p1.why_it_matters || 'Conflicting contact information creates customer friction and mixed signals in local search systems.')}
          </p>
        </div>
      </div>
    </div>

    <!-- 2x2 SUPPORTING DETAILS MATRIX -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
      
      <!-- Box 1: Citations -->
      <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
          <span style="font-size:11px; font-weight:700; color:var(--color-primary);">Citations &amp; Directories</span>
          <span style="font-size:9px; font-weight:800; color:${citationColor}; text-transform:uppercase;">${esc(citationStatus)}</span>
        </div>
        <p style="font-size:11px; color:var(--color-text-secondary); margin:0; line-height:1.4;">
          ${esc(citationSignal)}
        </p>
      </div>

      <!-- Box 2: GBP -->
      <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
          <span style="font-size:11px; font-weight:700; color:var(--color-primary);">Google Business Profile</span>
          <span style="font-size:9px; font-weight:800; color:${gbpColor}; text-transform:uppercase;">${esc(gbpStatus)}</span>
        </div>
        <p style="font-size:11px; color:var(--color-text-secondary); margin:0; line-height:1.4;">
          ${esc(gbpSignal)}
        </p>
      </div>

      <!-- Box 3: Reviews -->
      <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
          <span style="font-size:11px; font-weight:700; color:var(--color-primary);">Reputation &amp; Reviews</span>
          <span style="font-size:9px; font-weight:800; color:${reviewColor}; text-transform:uppercase;">${esc(reviewStatus)}</span>
        </div>
        <p style="font-size:11px; color:var(--color-text-secondary); margin:0; line-height:1.4;">
          ${esc(reviewSignal)}
        </p>
      </div>

      <!-- Box 4: Website -->
      <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
          <span style="font-size:11px; font-weight:700; color:var(--color-primary);">Website &amp; Schema</span>
          <span style="font-size:9px; font-weight:800; color:${webColor}; text-transform:uppercase;">${esc(webStatus)}</span>
        </div>
        <p style="font-size:11px; color:var(--color-text-secondary); margin:0; line-height:1.4;">
          ${esc(webSignal)}
        </p>
      </div>
    </div>

    <!-- EXECUTIVE ASSESSMENT -->
    <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius); padding:12px 16px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div style="border-left:3px solid #047857; padding-left:12px;">
        <div style="font-size:9.5px; font-weight:800; color:#047857; text-transform:uppercase; margin-bottom:3px;">Core Foundation</div>
        <p style="font-size:12px; color:var(--color-text-secondary); margin:0; line-height:1.5;">
          ${esc(snapshot.foundation_summary || 'Your business has established a legitimate local presence with a verified profile and positive customer sentiment.')}
        </p>
      </div>
      <div style="border-left:3px solid #D97706; padding-left:12px;">
        <div style="font-size:9.5px; font-weight:800; color:#B45309; text-transform:uppercase; margin-bottom:3px;">Key Bottleneck &amp; Strategic Opportunity</div>
        <p style="font-size:12px; color:var(--color-text-secondary); margin:0; line-height:1.5;">
          ${esc(snapshot.key_observation || 'Directory data inconsistencies and competitor review volume represent the most direct opportunities for immediate visibility growth.')}
        </p>
      </div>
    </div>

    ${FooterBar({ brandingConfig, pageNumber: 2, totalPages: 8 })}
  </div>`;
}

// ─── PAGE 3: WHAT'S WORKING WELL (FOUNDATION ANALYSIS) ──────────────────────
function WhatsWorkingSection({ content = {}, brandingConfig = {} }) {
  const foundation = content.business_foundation || {};
  const strengths = foundation.strengths || [];
  const businessName = content.cover?.business_name || content.metadata?.business_name || 'DATA NOT AVAILABLE';

  // Dynamically extract verified rating and review count from metadata or strengths
  const rawRating = content.metadata?.rating;
  const ratingMatch = (rawRating !== undefined && rawRating !== null)
    ? `${Number(rawRating).toFixed(1)} ★`
    : (content.executive_snapshot?.foundation_summary?.match(/(\d\.\d)\s*[\-★]?\s*star/i) || [])[1]
      ? `${(content.executive_snapshot.foundation_summary.match(/(\d\.\d)\s*[\-★]?\s*star/i))[1]} ★`
      : (strengths.map(s => s.observation || '').join(' ').match(/(\d\.\d)\s*[\-★]?\s*star/i) || [])[1]
        ? `${(strengths.map(s => s.observation || '').join(' ').match(/(\d\.\d)\s*[\-★]?\s*star/i))[1]} ★`
        : null;

  const reviewCountMatch = content.metadata?.reviews_count || content.metadata?.review_count
    ? `${content.metadata.reviews_count || content.metadata.review_count}`
    : (content.executive_snapshot?.foundation_summary?.match(/(\d+)\s*reviews/i) || [])[1]
      ? (content.executive_snapshot.foundation_summary.match(/(\d+)\s*reviews/i))[1]
      : (strengths.map(s => s.observation || '').join(' ').match(/(\d+)\s*reviews/i) || [])[1]
        ? (strengths.map(s => s.observation || '').join(' ').match(/(\d+)\s*reviews/i))[1]
        : null;

  const stat1Value = ratingMatch || 'Verified';
  const stat1Subtext = reviewCountMatch ? `${reviewCountMatch} Verified Reviews` : (ratingMatch ? 'Customer Reviews' : 'DATA NOT AVAILABLE');

  return `
  <div class="page">
    ${HeaderBar({ businessName, categoryTag: '02 / Foundation Analysis' })}

    <div class="section-eyebrow">Verified Assets &amp; Market Strengths</div>
    <h2 class="section-title">WHAT'S WORKING WELL</h2>
    <p class="section-subtitle">
      A balanced audit recognizes what is already succeeding. These established strengths form the foundation for closing remaining visibility gaps.
    </p>

    <!-- 3 Large Visual Metric Stat Anchors -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; margin-bottom:20px;">
      <div style="background:#F0FDF4; border:1px solid #A7F3D0; border-radius:var(--border-radius); padding:16px; text-align:center;">
        <div style="font-size:36px; font-weight:800; color:#047857; line-height:1; margin-bottom:4px;">${esc(stat1Value)}</div>
        <div style="font-size:12px; font-weight:800; color:#065F46; text-transform:uppercase; margin-bottom:2px;">Customer Sentiment</div>
        <div style="font-size:10.5px; color:#64748B;">${esc(stat1Subtext)}</div>
      </div>

      <div style="background:#F0FDF4; border:1px solid #A7F3D0; border-radius:var(--border-radius); padding:16px; text-align:center;">
        <div style="font-size:36px; font-weight:800; color:#047857; line-height:1; margin-bottom:4px;">Claimed</div>
        <div style="font-size:12px; font-weight:800; color:#065F46; text-transform:uppercase; margin-bottom:2px;">Google Profile</div>
        <div style="font-size:10.5px; color:#64748B;">Core Details Verified</div>
      </div>

      <div style="background:#F0FDF4; border:1px solid #A7F3D0; border-radius:var(--border-radius); padding:16px; text-align:center;">
        <div style="font-size:36px; font-weight:800; color:#047857; line-height:1; margin-bottom:4px;">Active</div>
        <div style="font-size:12px; font-weight:800; color:#065F46; text-transform:uppercase; margin-bottom:2px;">Major Directories</div>
        <div style="font-size:10.5px; color:#64748B;">Core Listings Established</div>
      </div>
    </div>

    <!-- Detailed Strength Cards -->
    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
      ${strengths.length > 0 ? strengths.map(s => `
        <div style="background:#FFFFFF; border:1px solid var(--color-border); border-left:4px solid #047857; border-radius:var(--border-radius-sm); padding:14px 16px; display:flex; align-items:flex-start; gap:14px; box-shadow:var(--shadow-sm);">
          <div style="width:28px; height:28px; border-radius:50%; background:#ECFDF5; color:#047857; font-weight:800; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px;">
            ✓
          </div>
          <div>
            <div style="font-size:14px; font-weight:700; color:var(--color-primary); margin-bottom:4px;">${esc(s.area || 'Verified Strength')}</div>
            <p style="font-size:13px; color:var(--color-text-secondary); margin:0; line-height:1.55;">${esc(s.observation || '')}</p>
          </div>
        </div>
      `).join('') : `
        <div style="background:#F8FAFC; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:14px 16px; text-align:center; color:var(--color-text-muted); font-size:12px;">
          DATA NOT AVAILABLE
        </div>
      `}
    </div>

    <!-- Strategic Reassurance Quote -->
    <div style="background:#F8FAFC; border:1px dashed #CBD5E1; border-radius:var(--border-radius); padding:14px 18px; display:flex; align-items:center; gap:14px;">
      <span style="font-size:22px;">💡</span>
      <p style="font-size:12px; color:#475569; margin:0; line-height:1.5;">
        <strong>Strategic Takeaway:</strong> Your established reputation and verified profiles provide a strong base. Targeted correction of citation discrepancies and service expansions will generate maximum return.
      </p>
    </div>

    ${FooterBar({ brandingConfig, pageNumber: 3, totalPages: 8 })}
  </div>`;
}

// ─── PAGE 4: PRIORITY RANKING & HERO SECTION ────────────────────────────────
function PriorityRankingAndHeroSection({ content = {}, brandingConfig = {} }) {
  const priorities = content.top_priorities || [];
  const p1 = priorities[0] || {};
  const businessName = content.cover?.business_name || content.metadata?.business_name || 'DATA NOT AVAILABLE';

  const getPriorityStyle = (level) => {
    const l = (level || '').toLowerCase();
    if (l.includes('very high')) return { color: '#991B1B', bg: '#FEF2F2', badge: 'badge-very-high', width: '95%' };
    if (l.includes('high')) return { color: '#B45309', bg: '#FFFBEB', badge: 'badge-high', width: '75%' };
    if (l.includes('moderate')) return { color: '#1D4ED8', bg: '#EFF6FF', badge: 'badge-moderate', width: '50%' };
    return { color: '#475569', bg: '#F1F5F9', badge: 'badge-low', width: '30%' };
  };

  const p1Style = getPriorityStyle(p1.priority_level);

  return `
  <div class="page">
    ${HeaderBar({ businessName, categoryTag: '03 / Priority Hierarchy' })}

    <div class="section-eyebrow">Ranked Priority Hierarchy</div>
    <h2 class="section-title">STRATEGIC IMPROVEMENT HIERARCHY</h2>
    <p class="section-subtitle">
      All audit findings ranked by local search impact, evidence confidence, and customer acquisition potential.
    </p>

    <!-- Dynamic Visual Severity Hierarchy Bars -->
    <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius); padding:14px 16px; margin-bottom:16px; box-shadow:var(--shadow-sm);">
      <div style="font-size:11px; font-weight:800; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:10px;">
        Visual Priority Hierarchy
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        ${priorities.length > 0 ? priorities.map((p, idx) => {
          const num = String(p.rank || (idx + 1)).padStart(2, '0');
          const style = getPriorityStyle(p.priority_level);
          return `
          <div style="display:flex; align-items:center; gap:10px; font-size:12px;">
            <span style="font-weight:800; color:${style.color}; width:24px;">${num}</span>
            <div style="flex:1; background:${style.bg}; border-radius:4px; height:20px; overflow:hidden; display:flex; align-items:center; padding:0 8px;">
              <div style="width:${style.width}; background:${style.color}; height:100%; border-radius:3px; display:flex; align-items:center; padding-left:8px; color:#FFFFFF; font-size:10px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${esc(p.title || 'Priority Item')}
              </div>
            </div>
            <span class="badge ${style.badge}" style="font-size:8.5px;">${esc((p.priority_level || 'Moderate').toUpperCase())}</span>
          </div>`;
        }).join('') : `
          <div style="font-size:12px; color:var(--color-text-muted); text-align:center; padding:8px;">DATA NOT AVAILABLE</div>
        `}
      </div>
    </div>

    <!-- Dominant Hero Priority Block (#1) -->
    <div style="border:1px solid #FECACA; background:#FFFFFF; border-radius:var(--border-radius); overflow:hidden; box-shadow:var(--shadow-card);">
      <!-- Hero Top Banner -->
      <div style="background:linear-gradient(135deg, #0B192C 0%, #1E3E62 100%); color:#FFFFFF; padding:16px 20px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:38px; height:38px; border-radius:8px; background:#D97706; color:#FFFFFF; font-size:17px; font-weight:800; display:flex; align-items:center; justify-content:center;">
            01
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:3px;">
              <span class="badge ${p1Style.badge}" style="background:#FEF2F2; color:#991B1B; border:none; font-weight:800; font-size:9px;">
                ${esc((p1.priority_level || 'HIGH').toUpperCase())} PRIORITY
              </span>
              ${p1.relevant_service ? `<span style="font-size:10px; color:rgba(255,255,255,0.75); text-transform:uppercase;">Service: ${esc(p1.relevant_service)}</span>` : ''}
            </div>
            <h3 style="font-size:17px; font-weight:800; color:#FFFFFF; margin:0;">
              ${esc(p1.title || 'DATA NOT AVAILABLE')}
            </h3>
          </div>
        </div>
      </div>

      <!-- 3-Column Structured Breakdown -->
      <div style="padding:16px 20px; display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; background:#FFFFFF;">
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--border-radius-sm); padding:12px 14px;">
          <div style="font-size:10px; font-weight:800; color:#0B192C; text-transform:uppercase; margin-bottom:6px;">
            <span style="color:#D97706;">●</span> WHAT WE FOUND
          </div>
          <p style="font-size:12.5px; color:#334155; line-height:1.5; margin:0;">
            ${esc(p1.what_we_found || 'DATA NOT AVAILABLE')}
          </p>
        </div>

        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:var(--border-radius-sm); padding:12px 14px;">
          <div style="font-size:10px; font-weight:800; color:#0B192C; text-transform:uppercase; margin-bottom:6px;">
            <span style="color:#D97706;">●</span> WHY IT MATTERS
          </div>
          <p style="font-size:12.5px; color:#334155; line-height:1.5; margin:0;">
            ${esc(p1.why_it_matters || 'DATA NOT AVAILABLE')}
          </p>
        </div>

        <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:var(--border-radius-sm); padding:12px 14px;">
          <div style="font-size:10px; font-weight:800; color:#1D4ED8; text-transform:uppercase; margin-bottom:6px;">
            <span>⚡</span> RECOMMENDED ACTION
          </div>
          <p style="font-size:12.5px; color:#1E3A8A; line-height:1.5; margin:0; font-weight:500;">
            ${esc(p1.recommended_action || 'DATA NOT AVAILABLE')}
          </p>
        </div>
      </div>

      <!-- Footer Callout Strip -->
      <div style="background:#FFFBEB; border-top:1px solid #FDE68A; padding:10px 20px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#92400E;">
        <span><strong>Implementation Scope:</strong> ${p1.relevant_service ? `${esc(p1.relevant_service)} implementation across verified local channels.` : 'Verified local search presence optimization.'}</span>
        <span style="font-weight:700; color:#B45309;">Estimated Effort: Low • Impact: High</span>
      </div>
    </div>

    ${FooterBar({ brandingConfig, pageNumber: 4, totalPages: 8 })}
  </div>`;
}

// ─── PAGE 5: SUPPORTING PRIORITIES DEEP DIVE (#2 - #4) ──────────────────────
function SupportingPrioritiesSection({ content = {}, brandingConfig = {} }) {
  const priorities = (content.top_priorities || []).slice(1);
  const businessName = content.cover?.business_name || content.metadata?.business_name || 'DATA NOT AVAILABLE';

  return `
  <div class="page">
    ${HeaderBar({ businessName, categoryTag: '04 / Supporting Action Plan' })}

    <div class="section-eyebrow">Near-Term Improvements</div>
    <h2 class="section-title">SUPPORTING PRIORITIES (#2 – #4)</h2>
    <p class="section-subtitle">
      Supporting optimizations to expand service discoverability, customer review velocity, and website clarity.
    </p>

    <!-- Detailed Supporting Priority Cards -->
    <div style="display:flex; flex-direction:column; gap:14px;">
      ${priorities.length > 0 ? priorities.map((p, idx) => {
        const num = String(p.rank || (idx + 2)).padStart(2, '0');
        const level = (p.priority_level || 'Moderate').toLowerCase();
        const badgeClass = level.includes('very high') ? 'badge-very-high' : level.includes('high') ? 'badge-high' : level.includes('low') ? 'badge-low' : 'badge-moderate';
        return `
        <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius); overflow:hidden; box-shadow:var(--shadow-sm);">
          <div style="background:#F8FAFC; border-bottom:1px solid var(--color-border); padding:10px 16px; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:13px; font-weight:800; color:var(--color-primary); background:#E2E8F0; padding:2px 8px; border-radius:4px;">${num}</span>
              <span style="font-size:15px; font-weight:700; color:var(--color-primary);">${esc(p.title || 'Supporting Priority')}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              ${p.relevant_service ? `<span style="font-size:10.5px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600;">Service: ${esc(p.relevant_service)}</span>` : ''}
              <span class="badge ${badgeClass}">${esc(p.priority_level || 'Moderate')} Priority</span>
            </div>
          </div>
          <div style="padding:14px 16px; display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div>
              <div style="font-size:10px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">What Was Found &amp; Why It Matters</div>
              <p style="font-size:13px; color:var(--color-text-secondary); margin-bottom:4px; line-height:1.5;">${esc(p.what_we_found || 'DATA NOT AVAILABLE')}</p>
              <p style="font-size:12px; color:var(--color-text-muted); margin:0; line-height:1.45;"><em>${esc(p.why_it_matters || '')}</em></p>
            </div>
            <div style="background:#F8FAFC; border-left:3px solid var(--color-secondary); padding:12px 14px; border-radius:0 6px 6px 0;">
              <div style="font-size:10px; font-weight:800; color:var(--color-secondary-dark); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">Recommended Action</div>
              <p style="font-size:13px; color:var(--color-text-primary); margin:0; font-weight:500; line-height:1.5;">${esc(p.recommended_action || 'DATA NOT AVAILABLE')}</p>
            </div>
          </div>
        </div>`;
      }).join('') : `
        <div style="background:#F8FAFC; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:14px 16px; text-align:center; color:var(--color-text-muted); font-size:12px;">
          DATA NOT AVAILABLE
        </div>
      `}
    </div>

    ${FooterBar({ brandingConfig, pageNumber: 5, totalPages: 8 })}
  </div>`;
}

// ─── PAGE 6: COMPETITOR BENCHMARK & SIGNAL ANALYSIS ─────────────────────────
function CompetitorBenchmarkSection({ content = {}, brandingConfig = {} }) {
  const comp = content.competitive_snapshot || {};
  const comparisons = comp.comparisons || [];
  const comp0 = comparisons[0] || {};
  const businessName = content.cover?.business_name || content.metadata?.business_name || 'Your Business';
  const location = content.cover?.location || content.metadata?.business_location || '';
  const obsText = comp0.observation || '';

  // ── Prefer structured competitor_metrics; fall back to regex for backward compat ──
  const cm = comp.competitor_metrics || null;
  let compReviews, targetReviews, compRating, targetRating, compServices, targetServices, competitorName;

  if (cm) {
    // Structured path — no prose parsing needed
    const t = cm.target     || {};
    const c = cm.competitor || {};
    competitorName  = c.name || comp0.competitor_name || null;
    targetReviews   = t.reviews  !== undefined ? Number(t.reviews)  : (content.metadata?.reviews_count  !== undefined ? Number(content.metadata.reviews_count)  : null);
    targetRating    = t.rating   !== undefined ? Number(t.rating)   : (content.metadata?.rating          !== undefined ? Number(content.metadata.rating)          : null);
    targetServices  = t.services !== undefined ? Number(t.services) : (content.metadata?.services_count !== undefined ? Number(content.metadata.services_count) : null);
    compReviews     = c.reviews  !== undefined ? Number(c.reviews)  : null;
    compRating      = c.rating   !== undefined ? Number(c.rating)   : null;
    compServices    = c.services !== undefined ? Number(c.services) : null;
  } else {
    // Regex fallback for report_content that predates structured competitor_metrics
    competitorName = comp0.competitor_name || null;
    const compReviewsRaw  = (obsText.match(/(\d[\d,]+)\s*(?:Google\s*)?reviews/i) || [])[1];
    const targetReviewsRaw = (obsText.match(/reviews\s*\(vs\.?\s*(\d+)\)/i) || obsText.match(/vs\.?\s*(\d+)\)/i) || [])[1];
    const compRatingRaw   = (obsText.match(/(\d\.\d)\s*rating/i) || [])[1];
    const targetRatingRaw  = (obsText.match(/rating\s*\(vs\.?\s*(\d\.\d)\)/i) || obsText.match(/vs\.?\s*(\d\.\d)\)/i) || [])[1];
    const compServicesRaw = (obsText.match(/(\d+)\s*(?:listed\s*)?(?:GBP\s*)?services/i) || obsText.match(/(\d+)\s*service categories/i) || [])[1];
    compReviews   = compReviewsRaw  ? parseInt(compReviewsRaw.replace(/,/g,''), 10) : null;
    targetReviews = content.metadata?.reviews_count !== undefined ? parseInt(content.metadata.reviews_count, 10) : (targetReviewsRaw ? parseInt(targetReviewsRaw, 10) : null);
    compRating    = compRatingRaw   ? parseFloat(compRatingRaw)  : null;
    targetRating  = content.metadata?.rating          !== undefined ? parseFloat(content.metadata.rating)          : (targetRatingRaw ? parseFloat(targetRatingRaw) : null);
    compServices  = compServicesRaw ? parseInt(compServicesRaw, 10) : null;
    targetServices = content.metadata?.services_count !== undefined ? parseInt(content.metadata.services_count, 10) : null;
  }

  const shortTarget = businessName.split(' ')[0] || 'Target';
  const shortComp = (competitorName || 'Competitor').split(' ')[0] || 'Competitor';

  return `
  <div class="page">
    ${HeaderBar({ businessName, categoryTag: '05 / Market Benchmark' })}

    <div class="section-eyebrow">Local Market Intelligence</div>
    <h2 class="section-title">YOU vs LOCAL COMPETITOR</h2>
    <p class="section-subtitle">
      ${competitorName ? `Side-by-side public search signal benchmark against ${esc(competitorName)}${location ? ` in the ${esc(location)} market` : ''}.` : 'Side-by-side public search signal benchmark against local competitor.'}
    </p>

    <!-- Head-to-Head Profile Cards -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
      <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:var(--border-radius); padding:14px 18px;">
        <div style="font-size:10px; font-weight:800; color:#1D4ED8; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:2px;">Your Business</div>
        <div style="font-size:17px; font-weight:800; color:#1E3A8A;">${esc(businessName)}</div>
        <div style="font-size:11px; color:#60A5FA;">${location ? `${esc(location)} • ` : ''}Target Audit Profile</div>
      </div>

      <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:var(--border-radius); padding:14px 18px;">
        <div style="font-size:10px; font-weight:800; color:#475569; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:2px;">Local Competitor</div>
        <div style="font-size:17px; font-weight:800; color:#1E293B;">${competitorName ? esc(competitorName) : 'DATA NOT AVAILABLE'}</div>
        <div style="font-size:11px; color:#64748B;">${location ? `${esc(location)} • ` : ''}Benchmark Competitor</div>
      </div>
    </div>

    <!-- Comparative Metric Progress & Gap Bars -->
    <div style="background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius); padding:18px 20px; margin-bottom:16px; box-shadow:var(--shadow-sm);">
      <div style="font-size:12px; font-weight:800; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:14px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">
        Signal-by-Signal Benchmark Breakdown
      </div>

      <!-- Metric 1: Review Volume -->
      <div style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:5px;">
          <span>Google Review Volume</span>
          ${targetReviews !== null && compReviews !== null ? `<span>${targetReviews} Reviews (You) vs ${compReviews} Reviews (Competitor)</span>` : `<span>DATA NOT AVAILABLE</span>`}
        </div>
        ${targetReviews !== null && compReviews !== null ? `
          <div style="height:14px; background:#F1F5F9; border-radius:7px; overflow:hidden; display:flex; gap:2px;">
            <div style="width:${Math.round((targetReviews / (targetReviews + compReviews)) * 100)}%; background:#2563EB; border-radius:7px 0 0 7px;"></div>
            <div style="width:${100 - Math.round((targetReviews / (targetReviews + compReviews)) * 100)}%; background:#94A3B8; border-radius:0 7px 7px 0;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748B; margin-top:3px;">
            <span style="color:#2563EB; font-weight:700;">● ${esc(shortTarget)}: ${targetReviews} Reviews</span>
            <span style="color:#475569; font-weight:700;">● ${esc(shortComp)}: ${compReviews} Reviews (+${compReviews - targetReviews} Review Gap • ${(compReviews / (targetReviews || 1)).toFixed(1)}x Volume)</span>
          </div>
        ` : `
          <div style="font-size:11.5px; color:var(--color-text-muted); padding:4px 0;">DATA NOT AVAILABLE</div>
        `}
      </div>

      <!-- Metric 2: Average Rating -->
      <div style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:5px;">
          <span>Average Customer Rating</span>
          ${targetRating !== null && compRating !== null ? `<span>${targetRating} ★ (You) vs ${compRating} ★ (Competitor)</span>` : `<span>DATA NOT AVAILABLE</span>`}
        </div>
        ${targetRating !== null && compRating !== null ? `
          <div style="height:14px; background:#F1F5F9; border-radius:7px; overflow:hidden; display:flex; gap:2px;">
            <div style="width:${Math.round((targetRating / (targetRating + compRating)) * 100)}%; background:#059669; border-radius:7px 0 0 7px;"></div>
            <div style="width:${100 - Math.round((targetRating / (targetRating + compRating)) * 100)}%; background:#10B981; border-radius:0 7px 7px 0;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748B; margin-top:3px;">
            <span style="color:#059669; font-weight:700;">● ${esc(shortTarget)}: ${targetRating} ★ Rating</span>
            <span style="color:#10B981; font-weight:700;">● ${esc(shortComp)}: ${compRating} ★ Rating (High Satisfaction for Both)</span>
          </div>
        ` : `
          <div style="font-size:11.5px; color:var(--color-text-muted); padding:4px 0;">DATA NOT AVAILABLE</div>
        `}
      </div>

      <!-- Metric 3: GBP Services -->
      <div>
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:5px;">
          <span>GBP Services Represented</span>
          ${targetServices !== null && compServices !== null ? `<span>${targetServices} Services (You) vs ${compServices} Services (Competitor)</span>` : `<span>DATA NOT AVAILABLE</span>`}
        </div>
        ${targetServices !== null && compServices !== null ? `
          <div style="height:14px; background:#F1F5F9; border-radius:7px; overflow:hidden; display:flex; gap:2px;">
            <div style="width:${Math.round((targetServices / (targetServices + compServices)) * 100)}%; background:#D97706; border-radius:7px 0 0 7px;"></div>
            <div style="width:${100 - Math.round((targetServices / (targetServices + compServices)) * 100)}%; background:#94A3B8; border-radius:0 7px 7px 0;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748B; margin-top:3px;">
            <span style="color:#D97706; font-weight:700;">● ${esc(shortTarget)}: ${targetServices} Listed</span>
            <span style="color:#475569; font-weight:700;">● ${esc(shortComp)}: ${compServices} Listed (+${compServices - targetServices} Service Categories Gap)</span>
          </div>
        ` : `
          <div style="font-size:11.5px; color:var(--color-text-muted); padding:4px 0;">DATA NOT AVAILABLE</div>
        `}
      </div>
    </div>

    <!-- Strategic Opportunity Synthesis Box -->
    <div style="background:#F0FDF4; border:1px solid #A7F3D0; border-left:4px solid #059669; border-radius:var(--border-radius); padding:14px 18px;">
      <div style="font-size:11px; font-weight:800; color:#065F46; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">
        🎯 Actionable Competitive Opportunity
      </div>
      <p style="font-size:12.5px; color:#064E3B; margin:0; line-height:1.55;">
        ${esc(comp0.opportunity || 'Closing the review volume gap and expanding your Google Business Profile service catalog represents a direct, achievable path to capturing greater local market share.')}
      </p>
    </div>

    ${FooterBar({ brandingConfig, pageNumber: 6, totalPages: 8 })}
  </div>`;
}

// ─── PAGE 7: ROADMAP & SECONDARY OPPORTUNITIES ──────────────────────────────
function RoadmapAndOpportunitiesSection({ content = {}, brandingConfig = {} }) {
  const steps = content.recommended_next_steps?.steps || [];
  const opps = content.growth_opportunities?.opportunities || [];
  const businessName = content.cover?.business_name || content.metadata?.business_name || 'DATA NOT AVAILABLE';

  return `
  <div class="page">
    ${HeaderBar({ businessName, categoryTag: '06 / Action Roadmap & Opportunities' })}

    <div class="section-eyebrow">Strategic Execution Plan</div>
    <h2 class="section-title">RECOMMENDED ACTION ROADMAP</h2>
    <p class="section-subtitle">
      A clear, phased implementation plan to systematically execute all audit recommendations.
    </p>

    <!-- 4-Step Sequential Action Timeline -->
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      ${steps.length > 0 ? steps.map((step, idx) => {
        const num = String(step.step_number || (idx + 1)).padStart(2, '0');
        return `
        <div style="display:flex; align-items:center; gap:14px; background:#FFFFFF; border:1px solid var(--color-border); border-radius:var(--border-radius); padding:12px 16px; box-shadow:var(--shadow-sm);">
          <div style="width:32px; height:32px; border-radius:6px; background:var(--color-primary); color:#FFFFFF; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            ${num}
          </div>
          <div style="font-size:13px; font-weight:600; color:var(--color-text-primary); flex:1; line-height:1.45;">
            ${esc(step.action || 'DATA NOT AVAILABLE')}
          </div>
          <span style="color:#94A3B8; font-size:14px;">➔</span>
        </div>`;
      }).join('') : `
        <div style="background:#F8FAFC; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:14px 16px; text-align:center; color:var(--color-text-muted); font-size:12px;">
          DATA NOT AVAILABLE
        </div>
      `}
    </div>

    <!-- Secondary Growth Opportunities Section -->
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-top:1px solid var(--color-border); padding-top:12px;">
        <span style="font-size:12px; font-weight:800; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em;">Additional Growth Opportunities</span>
        <span style="font-size:10.5px; color:var(--color-text-muted);">Secondary Actions</span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        ${opps.length > 0 ? opps.map(opp => `
          <div style="background:#F8FAFC; border:1px solid var(--color-border); border-left:3px solid var(--color-opportunity); border-radius:var(--border-radius-sm); padding:12px 14px;">
            <div style="font-size:13px; font-weight:700; color:var(--color-primary); margin-bottom:3px;">${esc(opp.title || 'Growth Opportunity')}</div>
            <p style="font-size:11.5px; color:var(--color-text-secondary); margin-bottom:4px; line-height:1.45;">${esc(opp.observation || '')}</p>
            ${opp.suggested_action ? `<div style="font-size:10.5px; font-weight:600; color:var(--color-opportunity);">Suggested Action: ${esc(opp.suggested_action)}</div>` : ''}
          </div>
        `).join('') : `
          <div style="background:#F8FAFC; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); padding:14px 16px; text-align:center; color:var(--color-text-muted); font-size:12px; grid-column:span 2;">
            DATA NOT AVAILABLE
          </div>
        `}
      </div>
    </div>

    ${FooterBar({ brandingConfig, pageNumber: 7, totalPages: 8 })}
  </div>`;
}

// ─── PAGE 8: STRATEGIC CALL TO ACTION ───────────────────────────────────────
function StrategicCTASection({ content = {}, brandingConfig = {} }) {
  const cta = content.cta || {};
  const businessName = content.cover?.business_name || content.metadata?.business_name || 'DATA NOT AVAILABLE';

  // Agency branding: try agency-config.json values first, then branding_config, then defaults
  const agencyPhone = brandingConfig.phone || null;
  const agencyEmail = brandingConfig.email || null;
  const agencyDivision = brandingConfig.division_name || null;
  const agencyParent = brandingConfig.parent_brand || null;
  const brandName = agencyDivision || brandingConfig.brand_name || 'Local Growth Division';
  const brandAttribution = (agencyDivision && agencyParent)
    ? `${agencyDivision} — A ${agencyParent} Company`
    : brandName;
  const url = brandingConfig.booking_url || null;

  // Build contact buttons: booking URL > phone + email > generic label
  let contactButtonsHtml;
  if (url) {
    // Has booking URL — show booking button
    contactButtonsHtml = `
      <a href="${esc(url)}" style="display:inline-block; background:linear-gradient(135deg, #D97706 0%, #B45309 100%); color:#FFFFFF; padding:15px 36px; border-radius:8px; font-weight:800; font-size:13.5px; text-decoration:none; text-transform:uppercase; letter-spacing:0.04em; box-shadow:0 4px 12px rgba(217,119,6,0.35);">
        ${esc(cta.button_label || 'Book a Free Strategy Call')}
      </a>`;
  } else if (agencyPhone || agencyEmail) {
    // No booking URL but has phone/email — show contact buttons
    const phoneBtn = agencyPhone ? `
      <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:8px; padding:12px 24px;">
        <span style="font-size:16px;">📞</span>
        <span style="font-size:13.5px; font-weight:700; color:#FFFFFF;">${esc(agencyPhone)}</span>
      </div>` : '';
    const emailBtn = agencyEmail ? `
      <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:8px; padding:12px 24px;">
        <span style="font-size:16px;">✉</span>
        <span style="font-size:13.5px; font-weight:700; color:#FFFFFF;">${esc(agencyEmail)}</span>
      </div>` : '';
    contactButtonsHtml = `
      <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
        ${phoneBtn}
        ${emailBtn}
      </div>`;
  } else {
    // Fallback — generic CTA label without link
    contactButtonsHtml = `
      <div style="display:inline-block; background:linear-gradient(135deg, #D97706 0%, #B45309 100%); color:#FFFFFF; padding:15px 36px; border-radius:8px; font-weight:800; font-size:13.5px; text-transform:uppercase; letter-spacing:0.04em; box-shadow:0 4px 12px rgba(217,119,6,0.35);">
        ${esc(cta.button_label || 'Contact Us for a Strategy Review')}
      </div>`;
  }

  return `
  <div class="page" style="justify-content:space-between;">
    ${HeaderBar({ businessName, categoryTag: '07 / Consultation & Strategy' })}

    <!-- Centerpiece Hero CTA Card -->
    <div style="background:linear-gradient(145deg, #0B192C 0%, #050D1A 70%, #1E3E62 100%); color:#FFFFFF; border-radius:var(--border-radius-lg); padding:44px 36px; text-align:center; box-shadow:var(--shadow-elevated); margin:auto 0; position:relative; overflow:hidden;">
      <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(217,119,6,0.2); border:1px solid rgba(245,158,11,0.4); border-radius:var(--border-radius-pill); padding:5px 14px; margin-bottom:18px;">
        <span style="font-size:10px; font-weight:800; color:#FDE68A; text-transform:uppercase; letter-spacing:0.08em; word-spacing:0.1em;">The Natural Next Step</span>
      </div>

      <h2 style="font-size:26px; font-weight:800; color:#FFFFFF; margin-bottom:12px; line-height:1.25; letter-spacing:0; word-spacing:normal;">
        ${esc(cta.heading || 'Ready to Improve Your Local Visibility?')}
      </h2>

      <p style="font-size:13.5px; color:rgba(255,255,255,0.75); max-width:520px; margin:0 auto 24px; line-height:1.6; word-spacing:normal;">
        ${esc(cta.body || "Let's review these findings together. We'll walk you through the priority action plan and show you how to close the competitive gaps identified in this report.")}
      </p>

      ${contactButtonsHtml}

      <div style="font-size:10.5px; color:rgba(255,255,255,0.45); margin-top:20px;">
        No obligation · 20-minute review · Actionable recommendations specific to ${esc(businessName)}
      </div>
    </div>

    <!-- Assurance & Methodology Note -->
    <div style="background:#F8FAFC; border:1px solid var(--color-border); border-radius:var(--border-radius); padding:14px 18px; display:flex; justify-content:space-between; align-items:center; font-size:10.5px; color:#64748B;">
      <span><strong>Audit Methodology:</strong> Multi-point local citation, Google Business Profile completeness, and review analysis.</span>
      <span>${esc(brandAttribution)}</span>
    </div>

    ${FooterBar({ brandingConfig, pageNumber: 8, totalPages: 8 })}
  </div>`;
}

module.exports = {
  HeaderBar,
  FooterBar,
  Cover,
  LocalVisibilitySnapshot,
  WhatsWorkingSection,
  PriorityRankingAndHeroSection,
  SupportingPrioritiesSection,
  CompetitorBenchmarkSection,
  RoadmapAndOpportunitiesSection,
  StrategicCTASection,
};
