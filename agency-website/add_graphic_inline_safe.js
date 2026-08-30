const fs = require('fs');
let html = fs.readFileSync('final-website-master.html', 'utf8');

const startIdx = html.indexOf('<div class="outcome-box" id="outcome-ui"');
const endMarker = 'FIND MY LOST TRAFFIC</a>\n    </div>\n  </div>';
const endIdx = html.indexOf(endMarker, startIdx) + endMarker.length;

if (startIdx !== -1 && html.indexOf(endMarker) !== -1) {
  const originalBox = html.substring(startIdx, endIdx);
  
  const wrapperStart = `<div style="display:flex; flex-direction:row; gap:20px; align-items:flex-end; max-width: 100%;">
  `;
  const wrapperEnd = `

  <!-- LIVE DATA STREAM GRAPHIC (RIGHT SIDE) -->
  <div id="engine-status-widget" style="width:260px; border: 1px solid rgba(184, 255, 87, 0.2); background: rgba(2, 6, 15, 0.75); backdrop-filter: blur(12px); padding: 18px; border-radius: 12px; z-index: 20; display:flex; flex-direction:column; gap: 14px; box-shadow: 0 0 30px rgba(184, 255, 87, 0.1);">
    <style>
      @keyframes barPulse { 0% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } 100% { transform: scaleY(0.5); } }
      .eq-bar { flex:1; border-radius:2px; transform-origin: bottom; animation: barPulse 1.5s infinite ease-in-out; }
      .eq-bar:nth-child(1) { background:rgba(0,212,255,0.8); animation-delay: 0.1s; height:40%; }
      .eq-bar:nth-child(2) { background:rgba(0,212,255,0.4); animation-delay: 0.4s; height:80%; }
      .eq-bar:nth-child(3) { background:#b8ff57; animation-delay: 0.2s; height:100%; box-shadow:0 0 10px rgba(184,255,87,0.5); }
      .eq-bar:nth-child(4) { background:rgba(0,212,255,0.6); animation-delay: 0.5s; height:60%; }
      .eq-bar:nth-child(5) { background:rgba(0,212,255,0.3); animation-delay: 0.3s; height:30%; }
      .eq-bar:nth-child(6) { background:rgba(0,212,255,0.7); animation-delay: 0.6s; height:75%; }
      .eq-bar:nth-child(7) { background:rgba(0,212,255,0.5); animation-delay: 0.2s; height:50%; }
      .eq-bar:nth-child(8) { background:rgba(0,212,255,0.9); animation-delay: 0.1s; height:90%; }
      .eq-bar:nth-child(9) { background:rgba(0,212,255,0.4); animation-delay: 0.4s; height:45%; }
    </style>
    
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div style="font-family:'JetBrains Mono'; font-size:9px; color:rgba(255,255,255,0.5); letter-spacing:0.15em;">6D ALGORITHM STATUS</div>
      <div style="display:flex; align-items:center; gap: 6px;">
        <span style="font-family:'JetBrains Mono'; font-size:9px; color:#b8ff57; letter-spacing:0.1em;">SYNCING</span>
        <span style="width:6px; height:6px; border-radius:50%; background:#b8ff57; box-shadow:0 0 10px #b8ff57; animation: pulse-dot 1.5s infinite;"></span>
      </div>
    </div>
    
    <div style="display:flex; gap: 4px; height: 28px; align-items:flex-end; justify-content: space-between;">
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
      <div class="eq-bar"></div>
    </div>
    
    <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
      <div style="font-family:'Space Grotesk'; font-size:11px; color:rgba(255,255,255,0.7); font-weight:600; text-transform:uppercase;">
        Data Stream <br><span style="color:#00d4ff;">Encrypted</span>
      </div>
      <div style="font-family:'JetBrains Mono'; font-size:18px; font-weight:800; color:#fff;">
        100<span style="font-size:10px; color:rgba(255,255,255,0.4);">%</span>
      </div>
    </div>
  </div>
</div>`;
  
  html = html.substring(0, startIdx) + wrapperStart + originalBox + wrapperEnd + html.substring(endIdx);
  fs.writeFileSync('final-website-master.html', html, 'utf8');
  console.log("Success");
} else {
  console.log("Failed to find indices", startIdx, html.indexOf(endMarker));
}
