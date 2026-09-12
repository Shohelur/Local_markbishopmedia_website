const fs = require('fs');
const path = require('path');

const masterPath = path.join(__dirname, '../final-website-master.html');
const phase4Path = path.join(__dirname, '../sections/04-services-cinematic.html');

let masterHtml = fs.readFileSync(masterPath, 'utf8');
const phase4Html = fs.readFileSync(phase4Path, 'utf8');

// 1. ADD GSAP PLUGINS TO HEAD
const gsapScript = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>';
const pluginsScript = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
`;
if (!masterHtml.includes('ScrollTrigger.min.js')) {
  masterHtml = masterHtml.replace(gsapScript, gsapScript + pluginsScript);
}

// 2. INJECT PHASE 4 HTML/CSS/JS
if (masterHtml.includes('phase4-pin-master')) {
    console.log("Phase 4 is already injected!");
} else {
    // Inject right before </body>
    masterHtml = masterHtml.replace('</body>', phase4Html + '\n</body>');
    fs.writeFileSync(masterPath, masterHtml);
    console.log("Phase 4 successfully injected into final-website-master.html!");
}
