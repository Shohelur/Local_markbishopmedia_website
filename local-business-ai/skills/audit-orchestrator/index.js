#!/usr/bin/env node
/**
 * index.js
 * CLI Entry Point and module exporter for the Audit Orchestrator.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { AuditOrchestrator, STAGES, OVERALL_STATUS } = require('./engine');

async function main() {
  const args = process.argv.slice(2);
  const inputArg = args[0];

  let inputData = null;

  if (inputArg && fs.existsSync(inputArg)) {
    inputData = JSON.parse(fs.readFileSync(inputArg, 'utf8'));
  } else {
    // Default demo input
    inputData = {
      report_id: 'orchestrated-demo-001',
      business_name: 'Mesa Valley Plumbing',
      address: '1234 E Main St',
      city: 'Mesa',
      state: 'AZ',
      zip: '85203',
      phone: '(480) 555-0199',
      website: 'https://mesavalleyplumbing.com',
      primary_category: 'Plumber',
      services: ['Emergency Plumbing', 'Drain Cleaning', 'Water Heater Installation'],
    };
  }

  const orchestrator = new AuditOrchestrator({
    outputDir: path.resolve(__dirname, 'output'),
  });

  orchestrator.createAudit(inputData);
  const result = await orchestrator.run();

  const jsonOutputPath = path.join(orchestrator.outputDir, `${result.audit_metadata.audit_id}_state.json`);
  fs.writeFileSync(jsonOutputPath, JSON.stringify(result, null, 2), 'utf8');

  console.log('');
  console.log('════════════════════════════════════════════════════');
  console.log(`✓ Master Audit State saved: ${jsonOutputPath}`);
  if (result.outputs.pdf_path) {
    console.log(`✓ Final PDF Deliverable:    ${result.outputs.pdf_path}`);
  }
  console.log('════════════════════════════════════════════════════');
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal CLI Error:', err.message);
    process.exit(1);
  });
}

module.exports = {
  AuditOrchestrator,
  STAGES,
  OVERALL_STATUS,
};
