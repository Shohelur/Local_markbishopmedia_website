/**
 * data_integrity.test.js
 * Automated Regression Test Suite for PDF Renderer Data Integrity.
 * Verifies that:
 * 1. Tucson Plumbing audit renders 100% genuine values.
 * 2. ZERO stale/sample demo values (Mesa Valley, SunState, 47, 182, 6, 14) are rendered.
 * 3. Missing optional data cleanly renders 'DATA NOT AVAILABLE' rather than fake fixtures.
 * 4. Priority levels accurately match source data without artificial mutation.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { buildHTML } = require('../renderer/html-builder');

function runRegressionTests() {
  console.log('════════════════════════════════════════════════════');
  console.log('  PDF Generator — Production Data Integrity Test');
  console.log('════════════════════════════════════════════════════\n');

  let passed = 0;
  let failed = 0;

  // ── TEST 1: Tucson Plumbing Live Data Integrity ───────────────────────────
  try {
    console.log('▶ TEST 1: Verifying Tucson Plumbing live audit data in rendered HTML...');

    const statePath = path.resolve(__dirname, '../../audit-orchestrator/output/tucson-plumbing-audit-001_state.json');
    assert.ok(fs.existsSync(statePath), `State JSON must exist at ${statePath}`);

    const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    const reportContent = state.outputs.report_content;
    const reportDesign = state.outputs.report_design;
    const branding = state.branding_config || {};

    const { html, sectionsRendered } = buildHTML(reportContent, reportDesign, branding);

    assert.strictEqual(sectionsRendered.length, 8, 'Must render exactly 8 pages');

    // 1. Positive Assertions (Must be present in HTML)
    const requiredStrings = [
      'Tucson Plumbing',
      'Tucson, Arizona',
      '4.6 ★',
      '272 Verified Reviews',
      'Right Now Plumbing',
      '380 Reviews',
      '4.8 ★',
      '8 Listed',
      '16 Listed',
    ];

    requiredStrings.forEach(str => {
      assert.ok(html.includes(str), `Rendered HTML must contain verified value: "${str}"`);
    });

    // 2. Negative Assertions (Must NOT be present in HTML)
    const prohibitedStrings = [
      'Mesa Valley Plumbing',
      'SunState Plumbing',
      'Mesa, AZ',
      '47 Reviews',
      '182 Reviews',
      'SunState: 182 Reviews',
      'Mesa Valley: 47 Reviews',
    ];

    prohibitedStrings.forEach(str => {
      assert.ok(!html.includes(str), `Rendered HTML must NOT contain stale sample value: "${str}"`);
    });

    // Word boundary checks to prevent false positives on '16 Listed'
    assert.ok(!/\b6 Listed\b/.test(html), 'Rendered HTML must NOT contain stale sample value: "6 Listed"');
    assert.ok(!/\b14 Listed\b/.test(html), 'Rendered HTML must NOT contain stale sample value: "14 Listed"');

    // 3. Priority level assertion
    assert.ok(html.includes('HIGH PRIORITY') || html.includes('High Priority'), 'Priority 1 must preserve "High Priority" from source data');

    console.log('  ✓ TEST 1 PASSED: 100% genuine Tucson data rendered; zero stale sample values present.\n');
    passed++;
  } catch (err) {
    console.error('  ✗ TEST 1 FAILED:', err.message, '\n');
    failed++;
  }

  // ── TEST 2: Missing Data Fallback ('DATA NOT AVAILABLE') ───────────────────
  try {
    console.log('▶ TEST 2: Verifying fallback to "DATA NOT AVAILABLE" when optional fields are omitted...');

    // Schema-compliant report_content with optional business metrics omitted
    const validSparseContent = {
      metadata: {
        report_id: 'test-sparse-audit-001',
        business_name: 'Apex Dental Care',
        business_location: 'Phoenix, Arizona',
        audit_date: '2026-08-11',
        generated_at: '2026-08-11T18:00:00.000Z',
      },
      cover: {
        report_title: 'Local Visibility Audit',
        business_name: 'Apex Dental Care',
        location: 'Phoenix, Arizona',
        subtitle: 'Preliminary Local Visibility Diagnostic',
      },
      executive_snapshot: {
        foundation_summary: 'Preliminary baseline audit conducted for Apex Dental Care.',
        key_observation: 'Initial signal review pending deep verification.',
        priority_areas: [
          'Initial Directory Alignment',
        ],
      },
      business_foundation: {
        intro: 'Verified strengths:',
        strengths: [
          {
            area: 'Online Presence',
            observation: '', // Empty observation triggers DATA NOT AVAILABLE fallback
          }
        ],
      },
      top_priorities: [
        {
          rank: 1,
          title: 'Initial Directory Alignment',
          priority_level: 'Moderate',
          what_we_found: '', // Empty fields test fallback
          why_it_matters: '',
          recommended_action: '',
          evidence_ids: ['audit-001'],
        },
      ],
      competitive_snapshot: {
        intro: 'Competitive benchmark analysis:',
        comparisons: [
          {
            competitor_name: 'Desert Dental',
            observation: '',
            opportunity: '',
          }
        ],
      },
      growth_opportunities: {
        intro: 'Growth opportunities:',
        opportunities: [
          {
            title: 'Directory Verification',
            observation: '',
            suggested_action: '',
          }
        ],
      },
      recommended_next_steps: {
        intro: 'Action roadmap:',
        steps: [
          {
            step_number: 1,
            action: '',
          }
        ],
      },
      cta: {
        heading: 'Ready to Review Your Practice Visibility?',
        body: "Let's review these baseline findings together.",
        button_label: 'Schedule Call',
      },
    };

    const { html, sectionsRendered } = buildHTML(validSparseContent, {}, {});

    assert.strictEqual(sectionsRendered.length, 7, 'Must render 7 sections for single-priority sparse content');
    assert.ok(html.includes('Apex Dental Care'), 'Rendered HTML must contain genuine business name');
    assert.ok(html.includes('DATA NOT AVAILABLE'), 'HTML must render "DATA NOT AVAILABLE" for omitted content blocks');
    assert.ok(!html.includes('Mesa Valley Plumbing'), 'Empty content must not inject sample business name');
    assert.ok(!html.includes('SunState Plumbing'), 'Empty content must not inject sample competitor');
    assert.ok(!html.includes('47 Reviews'), 'Empty content must not inject sample review counts');
    assert.ok(!html.includes('182 Reviews'), 'Empty content must not inject sample competitor review counts');
    assert.ok(!/\b6 Listed\b/.test(html), 'Empty content must not inject sample service count');
    assert.ok(!/\b14 Listed\b/.test(html), 'Empty content must not inject sample competitor service count');

    console.log('  ✓ TEST 2 PASSED: Missing optional metrics cleanly output "DATA NOT AVAILABLE" without fake data.\n');
    passed++;
  } catch (err) {
    console.error('  ✗ TEST 2 FAILED:', err.message, '\n');
    failed++;
  }

  console.log('════════════════════════════════════════════════════');
  console.log(`  Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('════════════════════════════════════════════════════');

  if (failed > 0) process.exit(1);
}

runRegressionTests();
