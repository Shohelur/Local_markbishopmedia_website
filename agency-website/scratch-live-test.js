const puppeteer = require('puppeteer-core');
const path = require('path');

async function testHover() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\aee7a380-8183-43c7-9788-a996c129f995';

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.goto('file:///D:/Agentic%20OS/agency-website/prototypes/02-hero-desktop.html', { waitUntil: 'domcontentloaded' });
  
  // Wait 2.2s for hero section to settle
  await new Promise(r => setTimeout(r, 2200));

  // Move mouse over 3D pin position on desktop (Right side, approx X: 1250, Y: 500)
  await page.mouse.move(1250, 500);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'proof_hover_small_business.png') });

  await browser.close();
  console.log('Hover screenshot captured successfully!');
}

testHover().catch(console.error);
