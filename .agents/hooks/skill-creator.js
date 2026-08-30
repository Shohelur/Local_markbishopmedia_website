#!/usr/bin/env node
/**
 * MBM Auto Skill Creator
 * ======================
 * Hermes-inspired Skill Creation Loop — runs after every Antigravity session.
 * Analyzes the conversation transcript, detects if a new repeatable workflow
 * was performed, and creates a draft SKILL.md in .agents/skills/pending/
 * for review in the next session.
 *
 * Triggered by: .agents/hooks.json → Stop event (runs alongside memory-capture.js)
 *
 * Decision Logic:
 * - If session had > 8 unique tool calls → likely a complex, repeatable workflow
 * - Detects task type from user message keywords
 * - Creates a structured draft skill file
 * - Agent reviews + completes the skill draft in the next session
 */

const fs   = require('fs');
const path = require('path');
const readline = require('readline');

let inputData = '';
process.stdin.on('data', chunk => { inputData += chunk; });
process.stdin.on('end', async () => {
  try {
    const payload = JSON.parse(inputData || '{}');
    await runSkillCreator(payload);
  } catch (e) {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  }
});

// ── Task-type detection keywords ──────────────────────────────────────────────
const TASK_SIGNATURES = [
  {
    name: 'website-section',
    keywords: ['section', 'hero', 'radar', 'navigation', 'phase', '3d', 'three.js', 'canvas', 'animation', 'gsap'],
    title: 'Building a Website Section',
    description: 'Step-by-step workflow for building and integrating a new section into the agency website.',
    category: 'web',
  },
  {
    name: 'local-seo-audit',
    keywords: ['audit', 'gbp', 'google business', 'citation', 'competitor', 'ranking', 'yelp', 'healthgrades'],
    title: 'Running a Local SEO Audit',
    description: 'Workflow for auditing a local business GBP, citations, competitors, and generating a priority report.',
    category: 'seo',
  },
  {
    name: 'bug-fix-session',
    keywords: ['bug', 'fix', 'error', 'broken', 'crash', 'not working', 'syntax', 'undefined'],
    title: 'Debugging a Complex Issue',
    description: 'Systematic debugging workflow: identify → isolate → fix → verify.',
    category: 'debug',
  },
  {
    name: 'copywriting-session',
    keywords: ['copy', 'headline', 'landing page', 'email', 'ad copy', 'cta', 'write', 'persuasive'],
    title: 'Writing Persuasive Copy',
    description: 'Workflow for generating MBM-branded copy with variants and scoring.',
    category: 'copy',
  },
  {
    name: 'agent-customization',
    keywords: ['skill', 'rule', 'hook', 'agent', 'memory', 'learning', '.agents', 'gemini.md'],
    title: 'Customizing the Agent System',
    description: 'Workflow for adding skills, rules, hooks to the Antigravity agent customization system.',
    category: 'meta',
  },
];

async function runSkillCreator(payload) {
  const { transcriptPath, workspacePaths = [] } = payload;
  const workspaceRoot = workspacePaths[0] || 'd:\\Agentic OS';
  const pendingDir    = path.join(workspaceRoot, '.agents', 'skills', 'pending');
  const logPath       = path.join(workspaceRoot, '.agents', 'hooks', 'skill-creator.log');

  fs.mkdirSync(pendingDir, { recursive: true });

  // Read transcript
  const lines = await readAllLines(transcriptPath);
  if (lines.length === 0) {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
    return;
  }

  // Parse JSONL transcript
  const steps = [];
  for (const line of lines) {
    try { steps.push(JSON.parse(line)); } catch (_) { /* skip bad lines */ }
  }

  // Count unique tool calls
  const toolCalls = steps.filter(s => s.type === 'PLANNER_RESPONSE' && s.tool_calls?.length > 0);
  const totalToolCalls = toolCalls.reduce((acc, s) => acc + (s.tool_calls?.length || 0), 0);

  // Only create a skill if the session was complex enough
  const COMPLEXITY_THRESHOLD = 8;
  if (totalToolCalls < COMPLEXITY_THRESHOLD) {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
    return;
  }

  // Extract all user messages text
  const userMessages = steps
    .filter(s => s.source === 'USER_EXPLICIT' || s.type === 'USER_INPUT')
    .map(s => (s.content || '').toLowerCase())
    .join(' ');

  // Detect task type
  let detectedTask = null;
  let highestScore = 0;

  for (const sig of TASK_SIGNATURES) {
    const score = sig.keywords.filter(kw => userMessages.includes(kw)).length;
    if (score > highestScore) {
      highestScore = score;
      detectedTask = sig;
    }
  }

  if (!detectedTask || highestScore < 2) {
    // Generic task — create a generic skill draft
    detectedTask = {
      name: 'discovered-workflow',
      title: 'Discovered Workflow',
      description: 'A complex workflow discovered in this session. Review and complete this draft.',
      category: 'meta',
    };
  }

  // Check if a pending skill of this type already exists today
  const today = new Date().toISOString().slice(0, 10);
  const skillFileName = `${today}-${detectedTask.name}.md`;
  const skillFilePath = path.join(pendingDir, skillFileName);

  if (fs.existsSync(skillFilePath)) {
    // Already created today for this task type — don't duplicate
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
    return;
  }

  // Build the skill draft
  const skillDraft = buildSkillDraft(detectedTask, today, totalToolCalls);
  fs.writeFileSync(skillFilePath, skillDraft, 'utf8');

  // Log the event
  fs.appendFileSync(logPath,
    `[${today}] Created pending skill draft: ${skillFileName} (${totalToolCalls} tool calls, type: ${detectedTask.name})\n`
  );

  process.stdout.write(JSON.stringify({ decision: 'allow' }));
}

function buildSkillDraft(task, date, toolCallCount) {
  return `---
name: mbm-${task.name}
description: >-
  ${task.description}
  AUTO-GENERATED DRAFT — Review and complete before using.
  Created: ${date} (detected from session with ${toolCallCount} tool calls)
status: PENDING_REVIEW
---

# ${task.title}

> ⚠️ **DRAFT SKILL** — Auto-generated by the MBM Skill Creator.
> Review this file, fill in the steps, then move it to \`.agents/skills/mbm-${task.name}/SKILL.md\`
> Delete this file from \`pending/\` once done.

---

## What This Skill Does

${task.description}

---

## When to Activate

Triggers when the user asks about: [TODO: fill in trigger phrases based on the session]

---

## Step 1: [TODO — First step of this workflow]

Describe what to do first...

---

## Step 2: [TODO — Second step]

---

## Step 3: [TODO — Third step]

---

## Learnings & Rules

*Updated automatically when issues are discovered. Read before every run.*

- ${date}: Initial skill draft created from session analysis.

---

## Self-Update Rule

If the user corrects an output from this skill, immediately update the \`## Learnings & Rules\`
section with the correction and today's date.
`;
}

async function readAllLines(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return [];
  const lines = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });
  for await (const line of rl) lines.push(line);
  return lines;
}
