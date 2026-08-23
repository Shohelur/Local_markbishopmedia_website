#!/usr/bin/env node
/**
 * generate.js
 * Main CLI entry point for the LocalRank AI PDF Generator.
 *
 * Usage:
 *   node generate.js \
 *     --content path/to/report_content.json \
 *     --design  path/to/report_design.json \
 *     --output  path/to/output.pdf \
 *     [--branding '{"booking_url":"...","brand_name":"..."}']
 *
 * Outputs a pdf_generation.json metadata object to stdout.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { buildHTML } = require('./renderer/html-builder');

// ── CLI Argument Parser ────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      args[key] = argv[i + 1] || null;
      i++;
    }
  }
  return args;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv);
  const contentPath = args.content;
  const designPath = args.design;
  const outputPath = args.output || 'report.pdf';
  const brandingRaw = args.branding || '{}';

  const startedAt = new Date().toISOString();
  const result = {
    status: 'success',
    output_file: null,
    page_count: null,
    validation: {
      content_valid: false,
      design_valid: false,
      priority_count: 0,
      sections_rendered: [],
      sections_skipped: [],
      issues: [],
    },
    warnings: [],
    render_metadata: {
      business_id: null,
      audit_id: null,
      business_name: null,
      audit_date: null,
      created_at: startedAt,
      renderer: 'puppeteer',
      renderer_version: null,
      design_version: null,
    },
    visual_qa: { available: false, status: 'unavailable', notes: ['Visual QA requires PDF-to-image tooling not present in this environment.'] },
  };

  // ── Load inputs ──────────────────────────────────────────────────────────────
  let content, design, brandingConfig;

  try {
    if (!contentPath || !fs.existsSync(contentPath)) throw new Error(`Content file not found: ${contentPath}`);
    content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    result.validation.content_valid = true;
  } catch (err) {
    result.status = 'validation_failed';
    result.validation.issues.push(`Content load error: ${err.message}`);
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  try {
    if (!designPath || !fs.existsSync(designPath)) throw new Error(`Design file not found: ${designPath}`);
    design = JSON.parse(fs.readFileSync(designPath, 'utf8'));
    result.validation.design_valid = true;
    result.render_metadata.design_version = design.metadata?.design_version || '1.0';
  } catch (err) {
    result.status = 'validation_failed';
    result.validation.issues.push(`Design load error: ${err.message}`);
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  try {
    brandingConfig = JSON.parse(brandingRaw);
  } catch {
    brandingConfig = {};
    result.warnings.push('Could not parse --branding JSON. Using defaults.');
  }

  // ── Populate metadata ────────────────────────────────────────────────────────
  result.render_metadata.business_name = content.metadata?.business_name || content.cover?.business_name || 'Unknown';
  result.render_metadata.audit_date = content.metadata?.audit_date || '';
  result.render_metadata.business_id = content.metadata?.business_id || null;
  result.render_metadata.audit_id = content.metadata?.report_id || null;
  result.validation.priority_count = content.top_priorities?.length || 0;

  // ── Build HTML ────────────────────────────────────────────────────────────────
  let html;
  try {
    const buildResult = buildHTML(content, design, brandingConfig);
    html = buildResult.html;
    result.warnings.push(...buildResult.warnings);
    result.validation.sections_rendered = buildResult.sectionsRendered;
    result.validation.sections_skipped = buildResult.sectionsSkipped;
  } catch (err) {
    if (err.message.startsWith('validation_failed')) {
      result.status = 'validation_failed';
      result.validation.issues.push(err.message);
    } else {
      result.status = 'render_failed';
      result.validation.issues.push(`HTML build error: ${err.message}`);
    }
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  // ── Render PDF ────────────────────────────────────────────────────────────────
  const absOutputPath = path.resolve(outputPath);
  const outputDir = path.dirname(absOutputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluateHandle('document.fonts.ready');

    const format = design.page_settings?.format || 'Letter';
    await page.pdf({
      path: absOutputPath,
      format,
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: '0mm',
        bottom: '0mm',
        left: '0mm',
        right: '0mm',
      },
    });

    await browser.close();

    // ── Validate output ────────────────────────────────────────────────────────
    if (!fs.existsSync(absOutputPath)) throw new Error('PDF file was not created.');
    const stats = fs.statSync(absOutputPath);
    if (stats.size < 1000) throw new Error('Generated PDF appears to be empty or corrupt.');

    result.status = 'success';
    result.output_file = absOutputPath;
    // Estimate page count from section count (Puppeteer doesn't return page count directly)
    result.page_count = result.validation.sections_rendered.length + 1; // +1 for cover

  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    result.status = 'render_failed';
    result.validation.issues.push(`Puppeteer render error: ${err.message}`);
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  result.render_metadata.renderer_version = puppeteer.default?.executablePath ? 'puppeteer@22' : 'puppeteer';
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
