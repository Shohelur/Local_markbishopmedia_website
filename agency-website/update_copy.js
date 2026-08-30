const fs = require('fs');
let html = fs.readFileSync('final-website-master.html', 'utf8');

const targetHtml = `<div class="outcome-box" id="outcome-ui">
    <div class="outcome-title">▶ PRIORITY FINDING REVEALED</div>
    <div class="outcome-text">Missing 3 Primary Citations (Angi, BBB, Yelp). Competitors are capturing your local traffic.</div>
    <div style="display:flex; justify-content:space-between; align-items:flex-end;">
      <div>
        <div style="font-family:'JetBrains Mono'; font-size:10px; color:rgba(255,255,255,0.5); margin-bottom:4px;">PRIORITY SCORE</div>
        <div class="outcome-score">94<span style="font-size:24px;color:rgba(255,255,255,0.3)">/100</span></div>
      </div>
      <a href="#" class="btn-action">CLAIM 12% LOST TRAFFIC</a>
    </div>
  </div>
</div>

<button id="btn-rerun" onclick="startAuditSequence()">RE-RUN AUDIT</button>`;

const replacementHtml = `<div class="outcome-box" id="outcome-ui" style="border: 1px solid rgba(0, 212, 255, 0.4); box-shadow: 0 0 30px rgba(0, 212, 255, 0.15), inset 0 0 20px rgba(0, 212, 255, 0.05); background: rgba(2, 6, 15, 0.85); backdrop-filter: blur(12px);">
    <div class="outcome-title" style="color: #00d4ff; text-shadow: 0 0 10px rgba(0,212,255,0.6);">▶ LOCAL MARKET GAP</div>
    <div class="outcome-text" style="font-size: 16px; letter-spacing: -0.01em; color: rgba(255,255,255,0.9);">Are local competitors stealing your high-intent calls? <span style="color:#b8ff57; font-weight:600;">See exactly where you are invisible</span> across your 9-mile radius.</div>
    <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-top: 8px;">
      <div>
        <div style="font-family:'JetBrains Mono'; font-size:10px; color:rgba(255,255,255,0.5); margin-bottom:4px; letter-spacing: 0.15em;">GEO-GRID SCAN</div>
        <div class="outcome-score" style="color: #00d4ff; text-shadow: 0 0 20px rgba(0,212,255,0.5);">81<span style="font-size:16px;color:rgba(255,255,255,0.5); letter-spacing:0.05em; margin-left:4px;">POINTS</span></div>
      </div>
      <a href="#audit" class="btn-action" style="background: linear-gradient(135deg, #00d4ff, #b8ff57); color: #020205; text-shadow: none; box-shadow: 0 0 25px rgba(0,212,255,0.4); font-family: 'Space Grotesk', sans-serif; font-weight: 800; letter-spacing: 0.05em; transition: all 0.3s ease;">FIND MY LOST TRAFFIC</a>
    </div>
  </div>
</div>`;

html = html.replace(targetHtml, replacementHtml);
fs.writeFileSync('final-website-master.html', html, 'utf8');
console.log("Copy updated!");
