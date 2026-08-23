'use strict';

/**
 * charts.js
 * Inline SVG chart and visual renderers for the web report.
 * All values come from structured report_content.json data — never invented.
 * No CDN dependencies.
 */

const { esc } = require('./utils');

// ── Color roles for chart data items ────────────────────────────────────────
const COLOR_ROLE_MAP = {
  primary:     '#2563EB',
  secondary:   '#D97706',
  muted:       '#94A3B8',
  strong:      '#059669',
  attention:   '#DC2626',
};

const STATUS_COLORS = {
  strong:      { fill: '#059669', bg: '#ECFDF5', text: '#065F46', label: 'Claimed / Verified' },
  opportunity: { fill: '#0284C7', bg: '#F0F9FF', text: '#0C4A6E', label: 'Optimization Opportunity' },
  attention:   { fill: '#D97706', bg: '#FFFBEB', text: '#78350F', label: 'Missing / Unclaimed' },
  neutral:     { fill: '#64748B', bg: '#F8FAFC', text: '#334155', label: 'Assessed' },
};

// ── Public entry point ───────────────────────────────────────────────────────
function renderChart(visual) {
  if (!visual || visual.type === 'none' || !visual.type) return '';
  const data = visual.data || [];

  switch (visual.type) {
    case 'bar_comparison':    return renderBarComparison(visual, data);
    case 'metric_comparison': return renderMetricComparison(visual, data);
    case 'qualitative_bars':  return renderQualitativeBars(visual, data);
    case 'coverage_table':    return renderCoverageTable(visual, data);
    default:                  return '';
  }
}

// ── bar_comparison (Compact, High-Density Proportional Bars) ─────────────────
/**
 * Renders horizontal comparison bars with readable value labels.
 * Compact height avoids excessive whitespace while keeping typography bold.
 */
function renderBarComparison(visual, data) {
  if (!data || data.length === 0) return '';

  const numericData = data.filter(d => d.value !== null && d.value !== undefined && !isNaN(Number(d.value)));
  if (numericData.length === 0) return '';

  const values = numericData.map(d => Number(d.value));
  const maxVal = Math.max(...values, 1);

  const LABEL_W  = 180;
  const BAR_X    = LABEL_W + 16;
  const BAR_MAX  = 340;
  const BAR_H    = 34;
  const VAL_AREA = 110;
  const ROW_H    = 52;
  const SVG_W    = LABEL_W + 16 + BAR_MAX + VAL_AREA;
  const SVG_H    = numericData.length * ROW_H + 8;

  const unit    = visual.unit    ? esc(visual.unit)    : '';
  const caption = visual.caption ? esc(visual.caption) : '';
  const LABEL_X = LABEL_W;

  const rows = numericData.map((item, i) => {
    const rawVal    = Number(item.value);
    const barW      = Math.max(Math.round((rawVal / maxVal) * BAR_MAX), 8);
    const y         = i * ROW_H + 4;
    const isPrimary = i === 0;
    const color     = item.color_role ? (COLOR_ROLE_MAP[item.color_role] || '#94A3B8')
                                      : (isPrimary ? '#2563EB' : '#94A3B8');
    const valLabel  = String(item.value) + (unit ? ` ${unit}` : '');
    const labelY    = y + BAR_H / 2 + 5;

    return `
      <!-- label -->
      <text x="${LABEL_X - 10}" y="${labelY}"
            text-anchor="end"
            font-family="system-ui, -apple-system, sans-serif" font-size="13.5" font-weight="700"
            fill="#1E293B">${esc(item.label || '')}</text>
      <!-- track -->
      <rect x="${BAR_X}" y="${y}" width="${BAR_MAX}" height="${BAR_H}"
            rx="6" fill="#F1F5F9"/>
      <!-- bar -->
      <rect x="${BAR_X}" y="${y}" width="${barW}" height="${BAR_H}"
            rx="6" fill="${color}" opacity="0.95"/>
      <!-- value label -->
      <text x="${BAR_X + barW + 12}" y="${labelY + 1}"
            font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="800"
            fill="${color}">${esc(valLabel)}</text>`;
  });

  return `
    <div class="chart-container">
      ${caption ? `<div class="finding-visual-caption">${caption}</div>` : ''}
      <svg width="100%" viewBox="0 0 ${SVG_W} ${SVG_H}"
           xmlns="http://www.w3.org/2000/svg"
           class="chart-svg"
           role="img" aria-label="${caption || 'Comparison chart'}">
        ${rows.join('\n')}
      </svg>
    </div>`;
}

// ── metric_comparison ────────────────────────────────────────────────────────
function renderMetricComparison(visual, data) {
  if (!data || data.length === 0) return '';
  const caption = visual.caption ? esc(visual.caption) : '';

  const blocks = data.map((item, i) => {
    const isPrimary = i === 0;
    const cls = isPrimary ? 'metric-block primary-metric' : 'metric-block secondary-metric';
    const val = item.value !== null && item.value !== undefined ? esc(String(item.value)) : '—';
    const ctx = item.context ? esc(item.context) : '';
    return `
      <div class="${cls}">
        <div class="metric-block-label">${esc(item.label || '')}</div>
        <div class="metric-block-value">${val}</div>
        ${ctx ? `<div class="metric-block-context">${ctx}</div>` : ''}
      </div>`;
  });

  return `
    <div class="chart-container">
      ${caption ? `<div class="finding-visual-caption">${caption}</div>` : ''}
      <div class="metric-comparison-grid">
        ${blocks.join('\n')}
      </div>
    </div>`;
}

// ── qualitative_bars (Coverage & Signal Matrix) ──────────────────────────────
function renderQualitativeBars(visual, data) {
  if (!data || data.length === 0) return '';

  const caption = visual.caption ? esc(visual.caption) : '';
  const SEG_COUNT = 5;
  const statusWeight = { strong: 5, opportunity: 3, attention: 1, neutral: 2 };

  const rows = data.map(item => {
    const st     = item.status || 'neutral';
    const colors = STATUS_COLORS[st] || STATUS_COLORS.neutral;
    const weight = statusWeight[st] || 2;
    const filled = Math.min(weight, SEG_COUNT);

    const segs = Array.from({ length: SEG_COUNT }, (_, i) => {
      const isActive = i < filled;
      return `<div class="qlbar-seg" style="background:${isActive ? colors.fill : '#E2E8F0'};"></div>`;
    }).join('');

    const itemNames = (item.items || []).map(n => esc(n)).join(', ');
    const statusText = st === 'strong' ? 'Claimed' : (st === 'attention' ? 'Missing / Gap' : 'Opportunity');
    const badgeCls   = st === 'strong' ? 'strong' : (st === 'attention' ? 'attention' : 'opportunity');

    return `
      <div class="qlbar-row">
        <div class="qlbar-label">${esc(item.label || '')}</div>
        <div class="qlbar-segs" aria-hidden="true">${segs}</div>
        <div class="qlbar-badge-wrap">
          <span class="qlbar-badge ${badgeCls}">${statusText}</span>
        </div>
        <div class="qlbar-items">${itemNames}</div>
      </div>`;
  });

  return `
    <div class="chart-container">
      ${caption ? `<div class="finding-visual-caption">${caption}</div>` : ''}
      <div class="qlbar-panel">
        ${rows.join('\n')}
      </div>
    </div>`;
}

// ── coverage_table ───────────────────────────────────────────────────────────
function renderCoverageTable(visual, data) {
  if (!data || data.length === 0) return '';

  const caption = visual.caption ? esc(visual.caption) : '';
  const unit    = visual.unit   ? esc(visual.unit)    : 'Directory / Platform';

  const STATUS_META = {
    strong:      { icon: '●', label: 'Claimed & Verified',  css: 'strong' },
    attention:   { icon: '○', label: 'Missing / Unclaimed', css: 'attention' },
    neutral:     { icon: '–', label: 'Unknown Status',      css: 'neutral' },
    opportunity: { icon: '▲', label: 'Incomplete Listing',  css: 'opportunity' },
  };

  const rows = data.map(item => {
    const st   = item.status || 'neutral';
    const meta = STATUS_META[st] || STATUS_META.neutral;
    const ctx  = item.items && item.items.length ? `<span class="cov-item-detail">${esc(item.items.join(', '))}</span>` : '';
    return `
      <tr class="qlbar-row">
        <td class="cov-name-cell">
          <strong>${esc(item.label || '')}</strong>
          ${ctx}
        </td>
        <td class="cov-status-cell">
          <span class="cov-status ${meta.css}">${meta.icon} ${meta.label}</span>
        </td>
      </tr>`;
  });

  return `
    <div class="chart-container">
      ${caption ? `<div class="finding-visual-caption">${caption}</div>` : ''}
      <table class="cov-table">
        <thead>
          <tr><th>${unit}</th><th>Presence Status</th></tr>
        </thead>
        <tbody>
          ${rows.join('\n')}
        </tbody>
      </table>
    </div>`;
}

// ── Competitor comparison metric row (Compact & Balanced) ────────────────────
function renderCompetitorMetricRow({ label, targetVal, compVal, targetName, compName, unit = '', targetColor = '#2563EB', compColor = '#64748B' }) {
  if (targetVal === null || compVal === null) return '';

  const tVal = Number(targetVal);
  const cVal = Number(compVal);
  const max = Math.max(tVal, cVal, 1);
  const tPct = Math.round((tVal / max) * 100);
  const cPct = Math.round((cVal / max) * 100);

  return `
    <div class="v3-comp-row">
      <div class="v3-comp-label">${esc(label)}</div>
      <div class="v3-comp-metrics">
        <div class="v3-comp-side target">
          <div class="v3-comp-name">YOU</div>
          <div class="v3-comp-value" style="color:${targetColor};">${tVal}${unit}</div>
          <div class="v3-comp-bar-container"><div class="v3-comp-bar" style="width:${tPct}%;background:${targetColor};"></div></div>
        </div>
        <div class="v3-comp-divider">vs</div>
        <div class="v3-comp-side comp">
          <div class="v3-comp-name">BENCHMARK</div>
          <div class="v3-comp-value" style="color:${compColor};">${cVal}${unit}</div>
          <div class="v3-comp-bar-container"><div class="v3-comp-bar" style="width:${cPct}%;background:${compColor};"></div></div>
        </div>
      </div>
    </div>`;
}

// ── Radial SVG Progress Gauge ───────────────────────────────────────────────
function renderRadialGaugeSVG({ segs = 3, maxSegs = 5, color = '#0284C7', icon = '⚡', radius = 34, strokeWidth = 6 }) {
  const percent = Math.min(Math.max(segs / maxSegs, 0.08), 1);
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ * (1 - percent);
  const size = (radius + strokeWidth) * 2 + 8;
  const center = size / 2;

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="radial-gauge-svg" aria-hidden="true" style="overflow:visible;">
    <!-- Track Circle -->
    <circle cx="${center}" cy="${center}" r="${radius}"
            fill="none" stroke="#E2E8F0" stroke-width="${strokeWidth}" />
    <!-- Progress Arc -->
    <circle cx="${center}" cy="${center}" r="${radius}"
            fill="none" stroke="${color}" stroke-width="${strokeWidth}"
            stroke-linecap="round"
            stroke-dasharray="${circ}"
            stroke-dashoffset="${strokeDashoffset}"
            transform="rotate(-90 ${center} ${center})" />
    <!-- Center Icon -->
    <text x="${center}" y="${center + 6}"
          text-anchor="middle"
          font-family="system-ui, -apple-system, sans-serif"
          font-size="${Math.round(radius * 0.52)}"
          font-weight="800"
          fill="${color}">${icon}</text>
  </svg>`;
}

// ── Geometric SVG decorations ────────────────────────────────────────────────
function geoPattern() {
  return `<svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
    <defs>
      <pattern id="geo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="600" height="800" fill="url(#geo-grid)"/>
    <circle cx="450" cy="200" r="180" fill="none" stroke="white" stroke-width="0.8" opacity="0.6"/>
    <circle cx="450" cy="200" r="300" fill="none" stroke="white" stroke-width="0.4" opacity="0.4"/>
    <circle cx="520" cy="600" r="120" fill="none" stroke="white" stroke-width="0.6" opacity="0.5"/>
  </svg>`;
}

module.exports = {
  renderChart,
  renderBarComparison,
  renderMetricComparison,
  renderQualitativeBars,
  renderCoverageTable,
  renderCompetitorMetricRow,
  renderRadialGaugeSVG,
  geoPattern,
};

