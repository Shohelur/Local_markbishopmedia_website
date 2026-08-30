const fs = require('fs');
let html = fs.readFileSync('final-website-master.html', 'utf8');
const start = html.indexOf('<div class="radar-ui-container"');
console.log(html.substring(start, start + 2500));
