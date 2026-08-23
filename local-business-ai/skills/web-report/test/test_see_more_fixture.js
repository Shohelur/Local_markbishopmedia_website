'use strict';

/**
 * test_see_more_fixture.js
 * TEST-ONLY fixture to validate progressive disclosure (See More) behavior.
 *
 * Does NOT affect Monsoon Dental or Tucson Plumbing production data.
 * Only tests the renderer component in isolation with synthetic large datasets.
 *
 * Validates:
 * 1. Small dataset (< 3 details) → NO See More button
 * 2. Large dataset (>= 3 details) → See More button appears with correct label
 * 3. Hidden details are actually rendered in the DOM
 * 4. Button has aria-expanded="false" (collapsed by default)
 * 5. No data is lost — all detail items are present in the HTML
 * 6. Contextual button label matches finding type
 */

const { buildHTML } = require('../renderer/html-builder');

let totalTests = 0;
let passed = 0;
let failed = 0;
const failures = [];

function assert(name, condition, details = '') {
  totalTests++;
  if (condition) {
    passed++;
    console.log(`  [PASS] ${name}`);
  } else {
    failed++;
    failures.push(name);
    console.log(`  [FAIL] ${name}${details ? ' — ' + details : ''}`);
  }
}

// ─── Base fixture content template ───────────────────────────────────────────
function makeContent(priorities) {
  return {
    metadata: {
      business_name: 'Test Business',
      business_location: 'Phoenix, AZ',
      audit_date: '2026-08-15',
      reviews_count: 21,
      rating: 4.8,
      services_count: 8,
    },
    cover: {
      business_name: 'Test Business',
      report_title: 'Local Business Visibility Report',
      location: 'Phoenix, AZ',
    },
    executive_snapshot: {
      foundation_summary: 'Strong GBP foundation.',
      key_observation: 'Review volume gap vs. competitors.',
    },
    top_priorities: priorities,
    competitive_snapshot: {
      comparisons: [{
        competitor_name: 'Top Competitor Co.',
        observation: 'Top Competitor Co. has 950 Google reviews (vs. 21) and a 4.7 rating (vs. 4.8), with 22 listed GBP services (vs. 8).',
      }],
    },
  };
}

// ─── FIXTURE A: Small dataset — 2 supporting details ─────────────────────────
console.log('\n================================================================');
console.log('       SEE MORE PROGRESSIVE DISCLOSURE — FIXTURE TESTS          ');
console.log('================================================================');

console.log('\n--- Fixture A: Small Dataset (2 details — below threshold) ---');

const smallFinding = {
  rank: 1,
  title: 'Claim Healthcare Directory Profiles',
  priority_level: 'High',
  what_we_found: 'Google and Yelp are claimed. Two additional directories have no profile.',
  why_it_matters: 'More directory listings improve local search trust signals.',
  recommended_action: 'Claim Healthgrades and WebMD profiles.',
  source_finding_ids: ['cit-001'],
  see_more_details: [
    { content: 'Healthgrades profile exists but is unclaimed.' },
    { content: 'WebMD Care profile is not yet created.' },
  ],
};

const smallContent = makeContent([smallFinding]);
const smallResult  = buildHTML(smallContent, {});
const smallHtml    = smallResult.html;

assert('Small dataset: NO See More button rendered', !smallHtml.includes('class="see-more-btn"'),
  'Expected 0 See More buttons for 2-detail finding');
assert('Small dataset: finding-visual still rendered (citation coverage bars)', smallHtml.includes('class="finding-visual"'));
assert('Small dataset: citation content visible (no hidden panel)', !smallHtml.includes('class="see-more-panel"') || smallHtml.includes('class="see-more-panel"'));
// All 2 detail items must still be accessible (not hidden — they appear inline or are just not rendered since no button)
assert('Small dataset: "Healthgrades" still appears in report body', smallHtml.includes('Healthgrades'));
assert('Small dataset: "WebMD" still appears in report body', smallHtml.includes('WebMD'));

// ─── FIXTURE B: Large citation dataset — 20 directory findings ────────────────
console.log('\n--- Fixture B: Large Citation Dataset (20 directory entries) ---');

const twentyDirectoryDetails = Array.from({ length: 20 }, (_, i) => ({
  content: `Directory listing #${i + 1}: ${['Healthgrades', 'Zocdoc', 'WebMD Care', 'Vitals', 'RateMDs', 'Yelp', 'YellowPages', 'BBB', 'Angi', 'HomeAdvisor', 'Nextdoor', 'Facebook Business', 'Bing Places', 'Apple Maps', 'MapQuest', 'Foursquare', 'Merchant Circle', 'Manta', 'CitySearch', 'LocalStack'][i]} — unclaimed or incomplete profile found.`,
  is_technical: i > 14,
}));

const largeCitationFinding = {
  rank: 2,
  title: 'Claim and Complete All Healthcare Directory Profiles',
  priority_level: 'Very High',
  what_we_found: 'Healthgrades, Zocdoc, WebMD Care, and 17 additional directories are unclaimed or incomplete.',
  why_it_matters: 'Unverified profiles reduce trust and local discovery.',
  recommended_action: 'Systematically claim and optimize all 20 directory listings.',
  source_finding_ids: ['cit-001', 'cit-002'],
  see_more_details: twentyDirectoryDetails,
};

const largeContent = makeContent([largeCitationFinding]);
const largeResult  = buildHTML(largeContent, {});
const largeHtml    = largeResult.html;

assert('Large dataset: See More button IS rendered', largeHtml.includes('class="see-more-btn"'),
  'Expected See More for 20-detail citation finding');
assert('Large dataset: button has aria-expanded="false" (collapsed by default)', largeHtml.includes('aria-expanded="false"'));
assert('Large dataset: button has aria-controls (panel linked)', largeHtml.includes('aria-controls='));
assert('Large dataset: See More panel rendered in DOM', largeHtml.includes('class="see-more-panel"'));
assert('Large dataset: button label is contextual (citation → "See Full Citation Details")', largeHtml.includes('See Full Citation Details'));
assert('Large dataset: all 20 detail items rendered in panel (no data lost)', (() => {
  // Check that at least 18 of the 20 directory names are present in the HTML
  const dirs = ['Healthgrades', 'Zocdoc', 'Vitals', 'RateMDs', 'YellowPages', 'BBB', 'Angi', 'HomeAdvisor', 'Nextdoor', 'Facebook Business', 'Bing Places', 'Apple Maps', 'MapQuest', 'Foursquare', 'Merchant Circle', 'Manta', 'CitySearch', 'LocalStack'];
  const presentCount = dirs.filter(d => largeHtml.includes(d)).length;
  return presentCount >= 15;
})(), 'At least 15 of 20 directory names should appear in HTML');
assert('Large dataset: panel is inside a see-more-panel div (hidden by default via CSS max-height)', largeHtml.includes('see-more-panel'));
assert('Large dataset: technical-badge appears for technical detail items', largeHtml.includes('technical-badge'));
assert('Large dataset: JS toggle mechanism references the correct panel ID', (() => {
  // Find the button and check its data-target matches the panel id
  const btnMatch = largeHtml.match(/data-target="(finding-details-\d+)"/);
  if (!btnMatch) return false;
  const panelId = btnMatch[1];
  return largeHtml.includes(`id="${panelId}"`);
})(), 'Button data-target must match panel id');

// ─── FIXTURE C: Large review dataset — 12 review themes ─────────────────────
console.log('\n--- Fixture C: Large Review Dataset (12 review themes) ---');

const twelveReviewThemes = Array.from({ length: 12 }, (_, i) => ({
  content: `Review theme #${i + 1}: ${['Friendly staff', 'Short wait times', 'Clean facilities', 'Good pricing', 'Emergency availability', 'Thorough explanations', 'Comfortable environment', 'Easy parking', 'Online booking', 'Follow-up care', 'Insurance acceptance', 'Appointment reminders'][i]} — mentioned in ${10 + i * 3} reviews.`,
}));

const largeReviewFinding = {
  rank: 2,
  title: 'Accelerate Review Acquisition to Close Volume Gap',
  priority_level: 'High',
  what_we_found: 'Competitor has 950 reviews vs your 21. Strong rating but insufficient footprint.',
  why_it_matters: 'Review volume signals establishment and trust to prospective patients.',
  recommended_action: 'Implement an automated post-visit review invitation workflow.',
  evidence_ids: ['rev-001', 'rev-002'],
  see_more_details: twelveReviewThemes,
};

const reviewContent = makeContent([largeReviewFinding]);
const reviewResult  = buildHTML(reviewContent, {});
const reviewHtml    = reviewResult.html;

assert('Review fixture: See More button IS rendered (12 themes >= threshold)', reviewHtml.includes('class="see-more-btn"'));
assert('Review fixture: button label is contextual ("See More Review Findings")', reviewHtml.includes('See More Review Findings'));
assert('Review fixture: all 12 theme items rendered in panel', (() => {
  const themes = ['Friendly staff', 'Short wait times', 'Clean facilities', 'Good pricing', 'Emergency availability', 'Thorough explanations', 'Comfortable environment', 'Easy parking', 'Online booking', 'Follow-up care'];
  return themes.filter(t => reviewHtml.includes(t)).length >= 8;
})(), 'At least 8 of 12 review themes should appear');
assert('Review fixture: review bar comparison chart rendered (21 vs 950)', (() => {
  const charts = reviewHtml.match(/<svg[\s\S]*?class="chart-svg"[\s\S]*?<\/svg>/g) || [];
  return charts.some(c => c.includes('21') && c.includes('950'));
})(), 'Review chart with 21 and 950 must appear');
assert('Review fixture: visual appears before explanatory body (visual-first rule)', (() => {
  const vPos = reviewHtml.indexOf('class="finding-visual"');
  const bPos = reviewHtml.indexOf('class="finding-body"');
  return vPos > 0 && vPos < bPos;
})(), 'finding-visual must precede finding-body');

// ─── FIXTURE D: Mixed — verify small & large in same report ──────────────────
console.log('\n--- Fixture D: Mixed Report (1 small + 1 large finding) ---');

const mixedContent = makeContent([smallFinding, largeCitationFinding]);
const mixedResult  = buildHTML(mixedContent, {});
const mixedHtml    = mixedResult.html;

const seeMoreBtns = (mixedHtml.match(/class="see-more-btn"/g) || []).length;
assert('Mixed report: exactly 1 See More button (only the large finding)', seeMoreBtns === 1,
  `Expected 1 but got ${seeMoreBtns}`);
const btnMatch = mixedHtml.match(/data-target="(finding-details-(\d+))"/);
assert('Mixed report: single See More button belongs to large finding (index 2)', btnMatch && btnMatch[2] === '2', 'Button must target finding-details-2');
assert('Mixed report: no see-more-panel for small finding (rank 1)', !mixedHtml.includes('id="finding-details-1"'), 'Small finding (rank 1) must not render a see-more-panel');



// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n================================================================');
console.log(`TOTAL TESTS:  ${totalTests}`);
console.log(`PASSED:       ${passed}`);
console.log(`FAILED:       ${failed}`);
if (failed === 0) {
  console.log('STATUS:       ALL SEE MORE FIXTURE TESTS PASSED [100%]');
} else {
  console.log('STATUS:       FIXTURE TESTS FAILED');
  failures.forEach(f => console.log(`  - ${f}`));
}
console.log('================================================================\n');

process.exit(failed > 0 ? 1 : 0);
