#!/usr/bin/env node
/**
 * generate.js
 * Web Report Generator — CLI entry point.
 *
 * Usage:
 *   node generate.js \
 *     --content path/to/report_content.json \
 *     --output  path/to/report.html \
 *     [--branding '{"brand_name":"Mark Bishop Media","email":"mark@markbishopmedia.com","phone":"+1 (520) 349-6378"}']
 *
 * Outputs: A JSON metadata object to stdout.
 * Writes:  A self-contained HTML file to --output path.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { buildHTML } = require('./renderer/html-builder');

// ── CLI Argument Parser ──────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const valParts = [];
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
        valParts.push(argv[i + 1]);
        i++;
      }
      args[key] = valParts.length > 0 ? valParts.join(' ') : true;
    }
  }
  return args;
}

/**
 * Robustly parses branding options from CLI arguments.
 * Supports:
 *  1. --branding-file <path>
 *  2. --branding <JSON string or shell-escaped string>
 *  3. Direct CLI flags (--brand_name, --email, --phone, --booking_url, --primary_color, --secondary_color)
 */
function parseBranding(args, warnings) {
  let branding = {};

  // 1. Check for --branding-file
  const brandingFile = args['branding-file'] || args.branding_file;
  if (brandingFile) {
    try {
      if (fs.existsSync(brandingFile)) {
        branding = JSON.parse(fs.readFileSync(brandingFile, 'utf8'));
      } else {
        warnings.push(`Branding file not found: ${brandingFile}`);
      }
    } catch (e) {
      warnings.push(`Could not parse branding file: ${e.message}`);
    }
  }

  // 2. Check for --branding JSON string
  if (args.branding && typeof args.branding === 'string') {
    const raw = args.branding.trim();
    if (raw && raw !== '{}') {
      let parsed = false;
      // Attempt 1: Standard JSON parse
      try {
        branding = Object.assign(branding, JSON.parse(raw));
        parsed = true;
      } catch (e1) {
        // Attempt 2: Unescape quotes and trim wrapping single/double quotes
        try {
          const unescaped = raw.replace(/\\"/g, '"').replace(/^['"]+|['"]+$/g, '');
          branding = Object.assign(branding, JSON.parse(unescaped));
          parsed = true;
        } catch (e2) {
          // Attempt 3: Key-value pair extraction for shell-mangled JSON (e.g. PowerShell stripped quotes)
          try {
            const obj = {};
            const inner = raw.replace(/^[\{\['"]+|[\}\]'""]+$/g, '');
            const pairs = inner.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            for (const pair of pairs) {
              const idx = pair.indexOf(':');
              if (idx > -1) {
                const k = pair.slice(0, idx).trim().replace(/^['"]+|['"]+$/g, '');
                const v = pair.slice(idx + 1).trim().replace(/^['"]+|['"]+$/g, '');
                if (k) obj[k] = v;
              }
            }
            if (Object.keys(obj).length > 0) {
              branding = Object.assign(branding, obj);
              parsed = true;
            }
          } catch (e3) {
            // failed parsing
          }
        }
      }
      if (!parsed) {
        warnings.push('Could not parse --branding string. Using defaults or direct flags.');
      }
    }
  }

  // 3. Direct CLI flags take precedence
  const directKeys = [
    'brand_name', 'email', 'phone', 'booking_url', 'logo_url',
    'primary_color', 'secondary_color'
  ];
  for (const k of directKeys) {
    if (args[k] !== undefined && args[k] !== null && typeof args[k] === 'string') {
      branding[k] = args[k];
    }
  }

  // 4. Merge with default values
  return Object.assign({
    brand_name:      'Mark Bishop Media',
    email:           'mark@markbishopmedia.com',
    phone:           '+1 (520) 349-6378',
    booking_url:     null,
    logo_url:        null,
    primary_color:   '#0B192C',
    secondary_color: '#D97706',
  }, branding);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args        = parseArgs(process.argv);
  const contentPath = args.content;
  const outputPath  = args.output || 'report.html';
  const startedAt   = new Date().toISOString();

  const result = {
    status: 'success',
    output_file: null,
    warnings: [],
    render_metadata: {
      business_name:    null,
      audit_date:       null,
      created_at:       startedAt,
      renderer:         'web-report-generator',
      renderer_version: '1.0',
    },
    validation: {
      content_valid:     false,
      sections_rendered: [],
      sections_skipped:  [],
      issues:            [],
    },
  };

  // ── Load report_content.json ─────────────────────────────────────────────
  let content;
  try {
    if (!contentPath) throw new Error('--content argument is required.');
    if (!fs.existsSync(contentPath)) throw new Error(`Content file not found: ${contentPath}`);
    const raw = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    // Support both raw audit output (outputs.report_content) and direct report_content.json
    content = raw.outputs?.report_content || raw;
    result.validation.content_valid = true;
  } catch (err) {
    result.status = 'validation_failed';
    result.validation.issues.push(`Content load error: ${err.message}`);
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  // ── Validate required fields ─────────────────────────────────────────────
  const businessName = content.metadata?.business_name || content.cover?.business_name;
  if (!businessName) {
    result.status = 'validation_failed';
    result.validation.issues.push('validation_failed: business_name is required in metadata or cover.');
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }
  if (!content.top_priorities || content.top_priorities.length === 0) {
    result.warnings.push('No top_priorities found. Report will have no finding sections.');
  }

  // ── Load branding config ─────────────────────────────────────────────────
  const brandingConfig = parseBranding(args, result.warnings);

  result.render_metadata.business_name = businessName;
  result.render_metadata.audit_date    = content.metadata?.audit_date || '';

  // ── Build HTML ────────────────────────────────────────────────────────────
  let html;
  try {
    const buildResult = buildHTML(content, brandingConfig);
    html = buildResult.html;
    result.warnings.push(...buildResult.warnings);
    result.validation.sections_rendered = buildResult.sectionsRendered;
    result.validation.sections_skipped  = buildResult.sectionsSkipped;
  } catch (err) {
    result.status = 'render_failed';
    result.validation.issues.push(`HTML build error: ${err.message}`);
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  // ── Write output HTML ─────────────────────────────────────────────────────
  const absOutputPath = path.resolve(outputPath);
  const outputDir     = path.dirname(absOutputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  try {
    fs.writeFileSync(absOutputPath, html, 'utf8');
    result.status      = 'success';
    result.output_file = absOutputPath;
  } catch (err) {
    result.status = 'write_failed';
    result.validation.issues.push(`File write error: ${err.message}`);
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
