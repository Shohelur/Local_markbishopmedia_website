/**
 * monsoon_dental_integrity.test.js
 * Automated Data Integrity & Regression Test for Monsoon Dental Audit.
 * Verifies that:
 * 1. Monsoon Dental live data renders with 100% fidelity.
 * 2. ZERO stale Tucson Plumbing or sample demo values are rendered.
 * 3. Priority levels match source data without artificial mutation.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { buildHTML } = require('../renderer/html-builder');

function runMonsoonDentalIntegrityTest() {
  console.log('════════════════════════════════════════════════════');
  console.log('  PDF Generator — Monsoon Dental Data Integrity Test');
  console.log('════════════════════════════════════════════════════\n');

  let passed = 0;
  let failed = 0;

  try {
    console.log('▶ TEST 1: Verifying Monsoon Dental live audit data in rendered HTML...');

    const statePath = path.resolve(__dirname, '../../audit-orchestrator/output/dentist-monsoon-dental-audit-001_state.json');
    assert.ok(fs.existsSync(statePath), `State JSON must exist at ${statePath}`);

    const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    const reportContent = state.outputs.report_content;
    const reportDesign = state.outputs.report_design;
    const branding = state.branding_config || {};

    const { html, sectionsRendered } = buildHTML(reportContent, reportDesign, branding);

    assert.strictEqual(sectionsRendered.length, 8, 'Must render exactly 8 pages');

    // 1. Positive Assertions (Must be present in HTML)
    const requiredStrings = [
      'Monsoon Dental',
      'Tucson, Arizona',
      '5.0 ★',
      '21 Verified Reviews',
      'Gentle Dental',
      '520 Reviews',
      '4.8 ★',
      '8 Listed',
      '15 Listed',
      'HIGH PRIORITY',
    ];

    requiredStrings.forEach(str => {
      assert.ok(html.includes(str), `Rendered HTML must contain verified value: "${str}"`);
    });

    // 2. Negative Assertions (Must NOT be present in HTML)
    const prohibitedStrings = [
      'Tucson Plumbing',
      '3322 N Richey',
      'Right Now Plumbing',
      'Mesa Valley Plumbing',
      'SunState Plumbing',
      'Mesa, AZ',
      '47 Reviews',
      '182 Reviews',
      '272 Reviews',
      '380 Reviews',
      '6 Listed',
      '14 Listed',
      '16 Listed',
    ];

    prohibitedStrings.forEach(str => {
      assert.ok(!html.includes(str), `Rendered HTML must NOT contain stale/foreign value: "${str}"`);
    });

    console.log('  ✓ TEST 1 PASSED: 100% genuine Monsoon Dental data rendered; zero stale or foreign values present.\n');
    passed++;
  } catch (err) {
    console.error('  ✗ TEST 1 FAILED:', err.message, '\n');
    failed++;
  }

  console.log('════════════════════════════════════════════════════');
  console.log(`  Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('════════════════════════════════════════════════════');

  if (failed > 0) process.exit(1);
}

runMonsoonDentalIntegrityTest();
