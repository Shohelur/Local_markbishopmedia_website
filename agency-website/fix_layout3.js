const fs = require('fs');
let html = fs.readFileSync('final-website-master.html', 'utf8');

const target1 = `
  <style>
    @media(max-width: 860px) {
      .radar-cards-wrapper { flex-direction: column !important; width: 100% !important; margin-left: 0 !important; }
      .radar-cards-wrapper > div { width: 100% !important; flex: none !important; margin-bottom: 20px; }
    }
  </style>
  <div class="radar-cards-wrapper" style="display:flex; flex-direction:row; gap:20px; align-items:stretch; width: 900px; max-width: 85vw; margin-top: 20px;">`;

const replacement1 = `</div>
  <style>
    @media(max-width: 860px) {
      .radar-cards-wrapper { flex-direction: column !important; width: 90% !important; bottom: 2% !important; }
      .radar-cards-wrapper > div { width: 100% !important; flex: none !important; margin-bottom: 20px; }
    }
  </style>
  <div style="width: 100%; display: flex; justify-content: center; position: relative; z-index: 40;">
    <div class="radar-cards-wrapper" style="display:flex; flex-direction:row; gap:40px; align-items:stretch; width: 1000px; max-width: 90vw;">`;

// The closing div of radar-ui-container is currently after the engine-status-widget:
const target2 = `
    <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
      <div style="font-family:'Space Grotesk'; font-size:11px; color:rgba(255,255,255,0.7); font-weight:600; text-transform:uppercase;">
        Data Stream <br><span style="color:#00d4ff;">Encrypted</span>
      </div>
      <div style="font-family:'JetBrains Mono'; font-size:18px; font-weight:800; color:#fff;">
        100<span style="font-size:10px; color:rgba(255,255,255,0.4);">%</span>
      </div>
    </div>
  </div>
  </div>
</div>`;

const replacement2 = `
    <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
      <div style="font-family:'Space Grotesk'; font-size:11px; color:rgba(255,255,255,0.7); font-weight:600; text-transform:uppercase;">
        Data Stream <br><span style="color:#00d4ff;">Encrypted</span>
      </div>
      <div style="font-family:'JetBrains Mono'; font-size:18px; font-weight:800; color:#fff;">
        100<span style="font-size:10px; color:rgba(255,255,255,0.4);">%</span>
      </div>
    </div>
  </div>
  </div>
  </div>
</div>`;

if (html.includes(target1)) {
    html = html.replace(target1, replacement1);
    if (html.includes(target2)) {
        html = html.replace(target2, replacement2);
        fs.writeFileSync('final-website-master.html', html, 'utf8');
        console.log("Success");
    } else {
        console.log("Failed target 2");
    }
} else {
    console.log("Failed target 1");
}
