#!/usr/bin/env node
/**
 * MBM Session Memory Capture
 * ===========================
 * Hermes-inspired Stop Hook — runs after every Antigravity session.
 * Reads the conversation transcript, extracts key learnings,
 * and writes them to the persistent memory files.
 *
 * Triggered by: .agents/hooks.json → Stop event
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// --- Read stdin (hook payload from Antigravity) ---
let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });
process.stdin.on('end', async () => {
  try {
    const payload = JSON.parse(inputData || '{}');
    await runCapture(payload);
  } catch (e) {
    // Always output valid JSON even on error
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  }
});

async function runCapture(payload) {
  const { transcriptPath, workspacePaths = [] } = payload;
  const workspaceRoot = workspacePaths[0] || 'd:\\Agentic OS';

  // Paths
  const learningsPath = path.join(workspaceRoot, 'agentic-os', 'context', 'learnings.md');
  const memoryPath    = path.join(workspaceRoot, 'agentic-os', 'context', 'MEMORY.md');
  const logPath       = path.join(workspaceRoot, '.agents', 'hooks', 'capture.log');

  // Ensure log dir exists
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  // Read last 50 lines of transcript
  const lines = await readLastLines(transcriptPath, 50);
  const sessionText = lines.join('\n');

  // Extract patterns from session
  const learnings = extractLearnings(sessionText);
  const today = new Date().toISOString().slice(0, 10);

  if (learnings.length > 0) {
    // Append to learnings.md
    const appendText = learnings
      .map(l => `- ${today}: ${l}`)
      .join('\n');

    const section = '# General';
    let learningsContent = fs.existsSync(learningsPath)
      ? fs.readFileSync(learningsPath, 'utf8')
      : `# Learnings Journal\n\n# General\n## What works well\n`;

    // Insert after "## What works well"
    const insertAfter = '## What works well\n';
    if (learningsContent.includes(insertAfter)) {
      learningsContent = learningsContent.replace(
        insertAfter,
        `${insertAfter}\n${appendText}\n`
      );
      fs.writeFileSync(learningsPath, learningsContent, 'utf8');
    }

    // Log the capture
    fs.appendFileSync(logPath,
      `[${today}] Captured ${learnings.length} learnings\n${appendText}\n---\n`
    );
  }

  // Always allow the session to stop
  process.stdout.write(JSON.stringify({ decision: 'allow' }));
}

function extractLearnings(text) {
  const learnings = [];

  // Pattern 1: Bug fixes mentioned
  const bugPatterns = [
    /(?:bug|error|fix|crash|broke|issue)[^.]{10,80}\./gi,
    /clock\.getDelta[^.]{5,80}\./gi,
    /Math\.hypot[^.]{5,80}\./gi,
    /SyntaxError[^.]{5,80}\./gi,
  ];

  // Pattern 2: "always use" / "never use" directives
  const rulePatterns = [
    /(?:always|never|must|should not)[^.]{10,80}\./gi,
  ];

  // Pattern 3: "The fix was" / "The solution is"
  const solutionPatterns = [
    /(?:the fix|the solution|the cause|root cause)[^.]{10,80}\./gi,
  ];

  const allPatterns = [...bugPatterns, ...rulePatterns, ...solutionPatterns];

  for (const pattern of allPatterns) {
    const matches = text.match(pattern) || [];
    for (const match of matches.slice(0, 2)) { // max 2 per pattern
      const cleaned = match.trim().replace(/\n/g, ' ');
      if (cleaned.length > 20 && cleaned.length < 200) {
        learnings.push(`[auto-captured] ${cleaned}`);
      }
    }
  }

  // Deduplicate
  return [...new Set(learnings)].slice(0, 5); // max 5 learnings per session
}

async function readLastLines(filePath, numLines) {
  if (!filePath || !fs.existsSync(filePath)) return [];

  const lines = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    lines.push(line);
    if (lines.length > numLines) lines.shift();
  }

  return lines;
}
