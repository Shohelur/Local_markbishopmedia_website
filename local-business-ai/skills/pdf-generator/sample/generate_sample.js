#!/usr/bin/env node
/**
 * generate_sample.js
 * Standalone runner that generates sample_report_v4.pdf using the bundled demo data.
 * Run from the skills/pdf-generator directory:
 *   node sample/generate_sample.js
 *
 * Output: sample/output/sample_report_v4.pdf
 */

'use strict';

const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { buildHTML } = require('../renderer/html-builder');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_PATH = path.join(__dirname, 'sample_content.json');
const DESIGN_PATH = path.join(__dirname, 'sample_design.json');
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'sample_report_v4.pdf');

const BRANDING = {
  brand_name: 'LocalRank AI',
  logo_url: null,
  primary_color: '#0B192C',
  secondary_color: '#D97706',
  booking_url: null,
};

async function run() {
  console.log('════════════════════════════════════════════════════');
  console.log('  LocalRank AI — PDF Generator V4 Visual Intelligence ');
  console.log('════════════════════════════════════════════════════');

  // Load inputs
  const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'));
  const design = JSON.parse(fs.readFileSync(DESIGN_PATH, 'utf8'));
  console.log(`✓ Content loaded: ${content.metadata.business_name}`);
  console.log(`✓ Design loaded: v${design.metadata.design_version}`);

  // Build HTML
  const { html, sectionsRendered, sectionsSkipped, warnings } = buildHTML(content, design, BRANDING);
  console.log(`✓ HTML assembled (${sectionsRendered.length} pages rendered, ${sectionsSkipped.length} skipped):`);
  sectionsRendered.forEach((s, idx) => console.log(`  Page ${idx + 1}: ${s}`));
  if (warnings.length > 0) warnings.forEach(w => console.warn(`  ⚠ ${w}`));

  // Ensure output directory
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Launch Puppeteer and render
  console.log('  Launching headless Chromium...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Ensure all web fonts are 100% loaded and glyphs shaped
    await page.evaluateHandle('document.fonts.ready');

    console.log('  Rendering PDF (Letter portrait, V4 Visual Intelligence)...');
    await page.pdf({
      path: OUTPUT_PATH,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' }, // page margins handled in CSS
    });
    await browser.close();
  } catch (err) {
    await browser.close().catch(() => {});
    console.error('✗ Render failed:', err.message);
    process.exit(1);
  }

  // Validate
  if (!fs.existsSync(OUTPUT_PATH)) { console.error('✗ PDF file not created.'); process.exit(1); }
  const size = fs.statSync(OUTPUT_PATH).size;
  if (size < 1000) { console.error('✗ PDF appears empty or corrupt.'); process.exit(1); }

  console.log('');
  console.log('════════════════════════════════════════════════════');
  console.log(`✓ PDF v4 generated successfully!`);
  console.log(`  Output:     ${OUTPUT_PATH}`);
  console.log(`  File Size:  ${(size / 1024).toFixed(1)} KB`);
  console.log(`  Page Count: ${sectionsRendered.length} Pages (Visual Intelligence)`);
  console.log('════════════════════════════════════════════════════');
}

run().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
