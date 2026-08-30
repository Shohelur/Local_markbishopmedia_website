const fs = require('fs');
let html = fs.readFileSync('final-website-master.html', 'utf8');

// 1. Fix overlapping canvas
html = html.replace('#audit-canvas { position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:1; }', '#audit-canvas { position:absolute; top:0; left:0; width:100%; height:100%; z-index:1; }');

// 2. Add solid background to phase 3 to hide master 3d canvas
html = html.replace('<section id="phase3-radar-container" style="position:relative; width:100%; min-height:100vh; overflow:hidden; border-top:1px solid rgba(0,255,102,0.15);">', '<section id="phase3-radar-container" style="position:relative; width:100%; min-height:100vh; overflow:hidden; border-top:1px solid rgba(0,255,102,0.15); background:#010a05; z-index:30;">');

// 3. Hide customerGroup initially so search queries don't show in intro
html = html.replace('const customerGroup = new THREE.Group();\r\nscene.add(customerGroup);', 'const customerGroup = new THREE.Group();\r\ncustomerGroup.visible = false;\r\nscene.add(customerGroup);');
html = html.replace('const customerGroup = new THREE.Group();\nscene.add(customerGroup);', 'const customerGroup = new THREE.Group();\ncustomerGroup.visible = false;\nscene.add(customerGroup);');

// 4. Show customerGroup when hero mode is active
html = html.replace('isInHeroMode = true;\r\n      isHeroPurchasesEnabled = true;', 'isInHeroMode = true;\r\n      isHeroPurchasesEnabled = true;\r\n      customerGroup.visible = true;');
html = html.replace('isInHeroMode = true;\n      isHeroPurchasesEnabled = true;', 'isInHeroMode = true;\n      isHeroPurchasesEnabled = true;\n      customerGroup.visible = true;');

fs.writeFileSync('final-website-master.html', html, 'utf8');
console.log('Fixed CSS and visibility!');
