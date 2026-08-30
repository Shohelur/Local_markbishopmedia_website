const fs = require('fs');
let html = fs.readFileSync('final-website-master.html', 'utf8');

html = html.replace(
  '<div style="display:flex; flex-direction:row; gap:20px; align-items:flex-end; max-width: 100%;">',
  \`<style>
    @media(max-width: 860px) {
      .radar-cards-wrapper { flex-direction: column !important; width: 100% !important; }
      .radar-cards-wrapper > div { width: 100% !important; flex: none !important; margin-bottom: 20px; }
    }
  </style>
  <div class="radar-cards-wrapper" style="display:flex; flex-direction:row; gap:20px; align-items:stretch; width: 850px; margin-top: 20px;">\`
);

html = html.replace(
  '<div class="outcome-box" id="outcome-ui" style="border: 1px solid rgba(0, 212, 255, 0.4); box-shadow: 0 0 30px rgba(0, 212, 255, 0.15), inset 0 0 20px rgba(0, 212, 255, 0.05); background: rgba(2, 6, 15, 0.85); backdrop-filter: blur(12px);">',
  '<div class="outcome-box" id="outcome-ui" style="flex: 1; border: 1px solid rgba(0, 212, 255, 0.4); box-shadow: 0 0 30px rgba(0, 212, 255, 0.15), inset 0 0 20px rgba(0, 212, 255, 0.05); background: rgba(2, 6, 15, 0.85); backdrop-filter: blur(12px); display: flex; flex-direction: column; justify-content: space-between;">'
);

html = html.replace(
  '<div id="engine-status-widget" style="width:260px; border: 1px solid rgba(184, 255, 87, 0.2); background: rgba(2, 6, 15, 0.75); backdrop-filter: blur(12px); padding: 18px; border-radius: 12px; z-index: 20; display:flex; flex-direction:column; gap: 14px; box-shadow: 0 0 30px rgba(184, 255, 87, 0.1);">',
  '<div id="engine-status-widget" style="flex: 1; border: 1px solid rgba(184, 255, 87, 0.2); background: rgba(2, 6, 15, 0.75); backdrop-filter: blur(12px); padding: 18px; border-radius: 12px; z-index: 20; display:flex; flex-direction:column; gap: 14px; justify-content: space-between; box-shadow: 0 0 30px rgba(184, 255, 87, 0.1);">'
);

fs.writeFileSync('final-website-master.html', html, 'utf8');
console.log("Success");
