const fs = require('fs');
let html = fs.readFileSync('final-website-master.html', 'utf8');

const targetHtml = '<img id="center-logo-html" src="../assets/logos/mbm-icon.svg" style="position:fixed; top:50%; left:50%; width:100px; height:100px; transform:translate(-50%, -50%); z-index:10; pointer-events:none; filter: drop-shadow(0 0 15px rgba(0,255,102,0.6));">';
const replacementHtml = '<img id="center-logo-html" src="./assets/logos/mbm-icon.svg" style="position:absolute; top:50%; left:50%; width:100px; height:100px; transform:translate(-50%, -50%); z-index:10; pointer-events:none; filter: drop-shadow(0 0 15px rgba(0,255,102,0.6));">';

html = html.replace(targetHtml, replacementHtml);

fs.writeFileSync('final-website-master.html', html, 'utf8');
console.log('Logo fixed successfully.');
