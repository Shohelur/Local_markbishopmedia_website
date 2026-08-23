#!/usr/bin/env node
/**
 * generate_sample.js
 * Test script: generates the interactive web report from the Monsoon Dental audit output.
 * Run from: skills/web-report/
 *   node sample/generate_sample.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const AUDIT_JSON = path.resolve(__dirname, '../../../audit-output/dentist-monsoon-dental-audit-001.json');
const OUTPUT_DIR = path.resolve(__dirname, '../../../reports/monsoon-dental');
const OUTPUT_HTML = path.join(OUTPUT_DIR, 'report.html');

const { buildHTML } = require('../renderer/html-builder');

const BRANDING = {
  brand_name:      'Mark Bishop Media',
  email:           'mark@markbishopmedia.com',
  phone:           '+1 (520) 349-6378',
  booking_url:     null,
  primary_color:   '#0B192C',
  secondary_color: '#D97706',
};

function main() {
  console.log('=== Monsoon Dental Web Report Generator ===\n');

  // Load audit JSON
  if (!fs.existsSync(AUDIT_JSON)) {
    console.error(`ERROR: Audit file not found: ${AUDIT_JSON}`);
    process.exit(1);
  }

  const raw   = JSON.parse(fs.readFileSync(AUDIT_JSON, 'utf8'));
  // The audit JSON nests report_content inside outputs.report_content
  const content = raw.outputs?.report_content || raw;

  if (!content.metadata?.business_name && !content.cover?.business_name) {
    console.error('ERROR: Could not find business_name in report content.');
    process.exit(1);
  }

  console.log(`Business: ${content.metadata?.business_name || content.cover?.business_name}`);
  console.log(`Priorities: ${(content.top_priorities || []).length}`);
  console.log(`Has competitor data: ${!!(content.competitive_snapshot?.comparisons?.length)}`);
  console.log(`Has growth opportunities: ${!!(content.growth_opportunities?.opportunities?.length)}\n`);

  // Build HTML
  let result;
  try {
    result = buildHTML(content, BRANDING);
  } catch (err) {
    console.error(`ERROR during HTML build: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }

  // Write output
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_HTML, result.html, 'utf8');

  console.log(`Output: ${OUTPUT_HTML}`);
  console.log(`Sections rendered: ${result.sectionsRendered.join(', ')}`);
  if (result.sectionsSkipped.length) {
    console.log(`Sections skipped:  ${result.sectionsSkipped.join(', ')}`);
  }
  if (result.warnings.length) {
    console.log('\nWarnings:');
    result.warnings.forEach(w => console.log(`  ⚠ ${w}`));
  }

  // Basic validation: check no hardcoded values leaked
  const checks = [
    { name: 'No hardcoded "Mesa Valley Plumbing"', pass: !result.html.includes('Mesa Valley Plumbing') },
    { name: 'No hardcoded "SunState Plumbing"',    pass: !result.html.includes('SunState Plumbing') },
    { name: 'No exposed evidence IDs in body',     pass: !result.html.match(/evidence_id["\s:]/i) },
    { name: 'No AI/LLM language',                  pass: !result.html.match(/our\s+(?:ai|llm|model)\s+found/i) },
    { name: 'No "Stage" references',               pass: !result.html.match(/\bstage\s+\d+\b/i) },
    { name: 'No "scraped" references',             pass: !result.html.match(/\bscraped\b/i) },
    { name: 'CTA appears at end',                  pass: result.html.includes('id="cta"') },
    { name: 'Navigation present',                  pass: result.html.includes('id="report-nav"') },
    { name: 'See More buttons present',            pass: result.html.includes('see-more-btn') },
  ];

  console.log('\nValidation Checks:');
  let allPass = true;
  checks.forEach(c => {
    const icon = c.pass ? '✓' : '✗';
    console.log(`  ${icon} ${c.name}`);
    if (!c.pass) allPass = false;
  });

  console.log(`\n${allPass ? '✓ All validation checks passed.' : '✗ Some validation checks FAILED.'}`);
  console.log(`\nOpen the report in your browser:\n  file://${OUTPUT_HTML.replace(/\\/g, '/')}\n`);
}

main();
