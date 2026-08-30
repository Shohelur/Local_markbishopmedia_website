const fs = require('fs');
const radarHtml = fs.readFileSync('approved/03-variant-e-radar-approved.html', 'utf8');

// Extract the Phase 3 CSS
const cssStart = radarHtml.indexOf('<style>') + 7;
const cssEnd = radarHtml.indexOf('</style>');
let radarCss = radarHtml.substring(cssStart, cssEnd).trim();
// Filter out body and generic tags that conflict with master
radarCss = radarCss.replace(/\* \{.*?\}/g, '').replace(/body \{.*?\}/g, '');
// namespace the generic CSS classes
radarCss = radarCss.replace(/\.ui-container/g, '.radar-ui-container');
radarCss = radarCss.replace(/\.vignette/g, '.radar-vignette');
radarCss = radarCss.replace(/header \{/g, '.radar-header {');
radarCss = radarCss.replace(/h2 \{/g, '.radar-ui-container h2 {');
radarCss = radarCss.replace(/p \{/g, '.radar-ui-container p {');

// Extract the Phase 3 HTML body content
const htmlStart = radarHtml.indexOf('<canvas id="audit-canvas"></canvas>');
const htmlEnd = radarHtml.indexOf('<script>');
let radarBody = radarHtml.substring(htmlStart, htmlEnd).trim();
radarBody = radarBody.replace(/ui-container/g, 'radar-ui-container');
radarBody = radarBody.replace(/vignette/g, 'radar-vignette');

// Extract Phase 3 JS
const jsStart = radarHtml.indexOf('<script>') + 8;
const jsEnd = radarHtml.lastIndexOf('</script>');
let radarJs = radarHtml.substring(jsStart, jsEnd).trim();

// Now load master
let masterHtml = fs.readFileSync('final-website-master.html', 'utf8');

// Insert CSS
if(!masterHtml.includes('.radar-ui-container')) {
  masterHtml = masterHtml.replace('</style>', radarCss + '\n</style>');
}

// Create a wrapper section for the Radar
const radarSection = `
<!-- ═══════════════════════════════════════════════════════════
     STAGE 6: PHASE 3 INTERACTIVE GEO-GRID RADAR 
     ═══════════════════════════════════════════════════════════ -->
<section id="phase3-radar-container" style="position:relative; width:100%; min-height:100vh; overflow:hidden; border-top:1px solid rgba(0,255,102,0.15);">
  ${radarBody}
</section>
`;

// Insert HTML before <script>
if(!masterHtml.includes('phase3-radar-container')) {
  masterHtml = masterHtml.replace('<!-- ═══════════════════════════════════════════════════════════\r\n     MASTER JAVASCRIPT CONTROLLER', radarSection + '\n<!-- ═══════════════════════════════════════════════════════════\r\n     MASTER JAVASCRIPT CONTROLLER');
  masterHtml = masterHtml.replace('<!-- ═══════════════════════════════════════════════════════════\n     MASTER JAVASCRIPT CONTROLLER', radarSection + '\n<!-- ═══════════════════════════════════════════════════════════\n     MASTER JAVASCRIPT CONTROLLER');
}

// Ensure the JS is wrapped in a function to avoid conflicts
const safeJs = `
function initRadar3D() {
  ${radarJs}
}
initRadar3D();
`;

if(!masterHtml.includes('initRadar3D()')) {
  masterHtml = masterHtml.replace('</script>\r\n</body>', safeJs + '\n</script>\r\n</body>');
  masterHtml = masterHtml.replace('</script>\n</body>', safeJs + '\n</script>\n</body>');
}

fs.writeFileSync('final-website-master.html', masterHtml, 'utf8');
console.log('Successfully injected Phase 3 Radar back into Master');
