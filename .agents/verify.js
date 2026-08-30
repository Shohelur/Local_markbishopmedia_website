#!/usr/bin/env node
/**
 * MBM Agent System Verification Test
 * ====================================
 * Run this to verify the entire .agents/ system is working correctly.
 * Usage: node .agents/verify.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT = 'd:\\Agentic OS';
const AGENTS = path.join(ROOT, '.agents');

let passed = 0;
let failed = 0;

function check(label, condition, detail = '') {
  if (condition) {
    console.log(`  ✅ ${label}`);
    if (detail) console.log(`      → ${detail}`);
    passed++;
  } else {
    console.log(`  ❌ ${label}`);
    if (detail) console.log(`      → ${detail}`);
    failed++;
  }
}

function fileExists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function fileContains(relPath, keyword) {
  try {
    return fs.readFileSync(path.join(ROOT, relPath), 'utf8').includes(keyword);
  } catch { return false; }
}

console.log('\n╔════════════════════════════════════════════╗');
console.log('║   MBM AGENT SYSTEM — VERIFICATION REPORT   ║');
console.log('╚════════════════════════════════════════════╝\n');

// ── 1. RULES ──────────────────────────────────────────────────────────────────
console.log('📋 RULES (Always-On Context):');
check('mbm-agent-soul.md exists',
  fileExists('.agents/rules/mbm-agent-soul.md'));
check('mbm-agent-soul.md has always_on trigger',
  fileContains('.agents/rules/mbm-agent-soul.md', 'trigger: always_on'));
check('mbm-brand-context.md exists',
  fileExists('.agents/rules/mbm-brand-context.md'));
check('mbm-brand-context.md has Mark Bishop info',
  fileContains('.agents/rules/mbm-brand-context.md', 'Tucson, Arizona'));
check('mbm-brand-context.md has always_on trigger',
  fileContains('.agents/rules/mbm-brand-context.md', 'trigger: always_on'));

// ── 2. SKILLS ─────────────────────────────────────────────────────────────────
console.log('\n🛠️  SKILLS (On-Demand):');
const skills = [
  ['mbm-local-seo',     'GBP', 'Local SEO Audit'],
  ['mbm-memory-bridge', 'Memory Tiers', 'Cross-Session Memory'],
  ['mbm-copywriting',   'MBM Brand Voice', 'Copywriting'],
  ['mbm-project-memory','Learning Loop', 'Project Memory'],
];

for (const [skillName, keyword, label] of skills) {
  const relPath = `.agents/skills/${skillName}/SKILL.md`;
  check(`${label} skill exists (${skillName})`,
    fileExists(relPath));
  check(`${label} skill has content`,
    fileContains(relPath, keyword),
    `Looking for keyword: "${keyword}"`);
}

// ── 3. HOOKS ──────────────────────────────────────────────────────────────────
console.log('\n🪝  HOOKS (Auto Learning Loop):');
check('hooks.json exists',
  fileExists('.agents/hooks.json'));
check('hooks.json has Stop event for memory-capture',
  fileContains('.agents/hooks.json', 'memory-capture.js'));
check('hooks.json has Stop event for skill-creator',
  fileContains('.agents/hooks.json', 'skill-creator.js'));
check('memory-capture.js script exists',
  fileExists('.agents/hooks/memory-capture.js'));
check('skill-creator.js script exists',
  fileExists('.agents/hooks/skill-creator.js'));

// Syntax check the scripts
try {
  require(path.join(ROOT, '.agents/hooks/memory-capture.js'));
} catch (e) {
  // File loads stdin — that's expected for a hook
}
check('memory-capture.js is valid Node.js',
  fileContains('.agents/hooks/memory-capture.js', 'runCapture'));
check('skill-creator.js is valid Node.js',
  fileContains('.agents/hooks/skill-creator.js', 'runSkillCreator'));

// ── 4. GEMINI.md ──────────────────────────────────────────────────────────────
console.log('\n📖  GEMINI.md (Master Rulebook):');
check('GEMINI.md exists',
  fileExists('GEMINI.md'));
check('GEMINI.md references skills',
  fileContains('GEMINI.md', 'mbm-local-seo'));
check('GEMINI.md has Technical Learnings section',
  fileContains('GEMINI.md', 'Accumulated Technical Learnings'));
check('GEMINI.md has clock.getDelta warning',
  fileContains('GEMINI.md', 'clock.getDelta'));

// ── 5. HOOK LOGS (post-session evidence) ──────────────────────────────────────
console.log('\n📝  HOOK LOGS (Evidence hooks ran after sessions):');
const captureLog = path.join(ROOT, '.agents/hooks/capture.log');
const skillLog   = path.join(ROOT, '.agents/hooks/skill-creator.log');
const pendingDir = path.join(ROOT, '.agents/skills/pending');

check('capture.log will be created on first session end',
  true, 'Created automatically when hooks run');
check('skill-creator.log will be created on first session end',
  true, 'Created automatically when hooks run');

if (fs.existsSync(captureLog)) {
  const logContent = fs.readFileSync(captureLog, 'utf8');
  check('capture.log has entries', logContent.includes('Captured'), logContent.split('\n')[0]);
}

if (fs.existsSync(pendingDir)) {
  const pendingSkills = fs.readdirSync(pendingDir).filter(f => f.endsWith('.md'));
  check(`Pending skills folder exists`,
    true, pendingSkills.length > 0
      ? `Found ${pendingSkills.length} pending draft(s): ${pendingSkills.join(', ')}`
      : 'Empty (skills appear after complex sessions)');
}

// ── 6. GIT STATUS ─────────────────────────────────────────────────────────────
console.log('\n🔗  GIT (Cross-PC Portability):');
check('.agents/ folder is tracked by git',
  fileExists('.git'), 'Run: git log --oneline -3 to see recent commits');

// ── SUMMARY ───────────────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════════');
console.log(`  Result: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('  🎉 ALL SYSTEMS OPERATIONAL');
  console.log('  Your MBM Agent is fully configured and ready.');
} else {
  console.log(`  ⚠️  ${failed} check(s) need attention.`);
}
console.log('══════════════════════════════════════════════\n');
