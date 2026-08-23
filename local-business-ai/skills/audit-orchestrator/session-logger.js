/**
 * session-logger.js
 * Audit Session Logger for Local Business AI.
 *
 * After each audit completes, this module:
 * 1. Appends to clients/{slug}/memory/audit-log.md
 * 2. Updates clients/registry.json with latest audit metadata
 * 3. Returns a session summary for Agentic OS memory consumption
 *
 * Usage:
 *   const { logAuditSession } = require('./session-logger');
 *   await logAuditSession(auditState, clientSlug);
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CLIENTS_DIR = path.resolve(__dirname, '../../clients');
const REGISTRY_PATH = path.join(CLIENTS_DIR, 'registry.json');

/**
 * Log a completed audit session to the client workspace and registry.
 *
 * @param {Object} auditState - The complete Master Audit Object (state JSON)
 * @param {string} clientSlug - The client folder slug (e.g., 'monsoon-dental')
 * @param {Object} [options] - Optional configuration
 * @param {Function} [options.logger] - Logger function (default: console.log)
 * @returns {Object} Session summary object
 */
function logAuditSession(auditState, clientSlug, options = {}) {
  const logger = options.logger || console.log;

  if (!auditState || !clientSlug) {
    throw new Error('logAuditSession requires auditState and clientSlug');
  }

  const auditId = auditState.audit_metadata?.audit_id || 'unknown-audit';
  const businessName = auditState.business_context?.business_name || 'Unknown Business';
  const category = auditState.business_context?.primary_category || 'Unknown';
  const location = auditState.business_context?.target_location ||
    `${auditState.business_context?.city || ''}, ${auditState.business_context?.state || ''}`.trim();
  const status = auditState.audit_metadata?.overall_status || 'UNKNOWN';
  const date = new Date().toISOString().split('T')[0];

  // Extract key metrics
  const rating = auditState.business_context?.metadata?.rating || 'N/A';
  const reviews = auditState.business_context?.metadata?.reviews_count || 'N/A';
  const priorityCount = auditState.outputs?.report_content?.top_priorities?.length || 0;
  const topPriority = auditState.outputs?.report_content?.top_priorities?.[0]?.title || 'N/A';

  // ── 1. Ensure client workspace exists ──
  const clientDir = path.join(CLIENTS_DIR, clientSlug);
  const auditDir = path.join(clientDir, 'audits');
  const reportsDir = path.join(clientDir, 'reports');
  const memoryDir = path.join(clientDir, 'memory');

  [clientDir, auditDir, reportsDir, memoryDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // ── 2. Save audit state JSON to client workspace ──
  const stateFilename = `${auditId}_state.json`;
  const statePath = path.join(auditDir, stateFilename);
  fs.writeFileSync(statePath, JSON.stringify(auditState, null, 2), 'utf8');
  logger(`[SessionLogger] Saved audit state: ${statePath}`);

  // ── 3. Save business context.json (latest snapshot) ──
  if (auditState.business_context) {
    const contextPath = path.join(clientDir, 'context.json');
    fs.writeFileSync(contextPath, JSON.stringify(auditState.business_context, null, 2), 'utf8');
    logger(`[SessionLogger] Updated client context: ${contextPath}`);
  }

  // ── 4. Append to audit-log.md ──
  const auditLogPath = path.join(memoryDir, 'audit-log.md');
  const existingLog = fs.existsSync(auditLogPath) ? fs.readFileSync(auditLogPath, 'utf8') : '';

  // Count existing audit entries to determine the next number
  const auditEntryCount = (existingLog.match(/^## Audit #\d+/gm) || []).length;
  const nextAuditNum = auditEntryCount + 1;

  // Only create header if file is new
  const header = existingLog ? '' : `# Audit Log — ${businessName}\n\n`;

  const entry = `## Audit #${nextAuditNum}
- **Date:** ${date}
- **Audit ID:** ${auditId}
- **Category:** ${category}
- **Location:** ${location}
- **Google Rating:** ${rating} ★
- **Reviews:** ${reviews}
- **Status:** ${status}
- **Top Priority:** ${topPriority}
- **Total Priorities:** ${priorityCount}
- **State:** ../audits/${stateFilename}

---

`;

  fs.appendFileSync(auditLogPath, header + entry, 'utf8');
  logger(`[SessionLogger] Appended audit #${nextAuditNum} to: ${auditLogPath}`);

  // ── 5. Update registry.json ──
  let registry = { version: '1.0.0', updated_at: new Date().toISOString(), clients: [] };
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
    } catch (e) {
      logger(`[SessionLogger] Warning: Could not parse registry.json, creating new one.`);
    }
  }

  const existingClient = registry.clients.find(c => c.slug === clientSlug);
  if (existingClient) {
    existingClient.last_audit = date;
    existingClient.audit_count = (existingClient.audit_count || 0) + 1;
    if (!existingClient.audit_ids.includes(auditId)) {
      existingClient.audit_ids.push(auditId);
    }
    existingClient.status = status === 'COMPLETED' ? 'completed' : 'in-progress';
  } else {
    registry.clients.push({
      slug: clientSlug,
      business_name: businessName,
      category: category,
      location: location,
      first_audit: date,
      last_audit: date,
      audit_count: 1,
      audit_ids: [auditId],
      status: status === 'COMPLETED' ? 'completed' : 'in-progress',
    });
  }

  registry.updated_at = new Date().toISOString();
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf8');
  logger(`[SessionLogger] Updated registry: ${REGISTRY_PATH}`);

  // ── 6. Build session summary for Agentic OS memory ──
  const sessionSummary = {
    audit_id: auditId,
    client_slug: clientSlug,
    business_name: businessName,
    category,
    location,
    date,
    status,
    rating,
    reviews,
    priority_count: priorityCount,
    top_priority: topPriority,
    files: {
      state: statePath,
      audit_log: auditLogPath,
      registry: REGISTRY_PATH,
    },
    memory_line: `- ${date}: Audited ${businessName} (${category}, ${location}) — ${rating}★, ${reviews} reviews, ${priorityCount} priorities. Top: ${topPriority}. [${auditId}]`,
  };

  logger(`[SessionLogger] Session logged successfully for ${businessName}`);
  return sessionSummary;
}

/**
 * Copy a PDF report to the client's reports/ folder.
 *
 * @param {string} pdfSourcePath - Absolute path to the generated PDF
 * @param {string} clientSlug - The client folder slug
 * @param {string} auditId - The audit ID (used for filename)
 */
function copyReportToClient(pdfSourcePath, clientSlug, auditId) {
  if (!fs.existsSync(pdfSourcePath)) return;

  const reportsDir = path.join(CLIENTS_DIR, clientSlug, 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  const destPath = path.join(reportsDir, `${auditId}.pdf`);
  fs.copyFileSync(pdfSourcePath, destPath);
  return destPath;
}

module.exports = { logAuditSession, copyReportToClient };
