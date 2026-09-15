import os

dir_path = r'D:\Agentic OS\agency-website\mockup-studio'

# ==========================================
# VARIANT 3: CYBER-GRID HOLOGRAM
# ==========================================
v3_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>V3: Cyber-Grid Hologram</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding-top: 50vh; background: #010308; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    .footer-wrapper { position: relative; width: 100%; min-height: 500px; padding: 60px 20px; display: flex; justify-content: center; overflow: hidden; border-top: 2px solid #00d4ff; box-shadow: 0 -10px 40px rgba(0,212,255,0.1); }
    canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
    .ui-panel { position: relative; z-index: 1; max-width: 1200px; width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
    .glitch-box { background: rgba(0, 30, 50, 0.6); border: 1px solid rgba(0, 212, 255, 0.3); padding: 40px; backdrop-filter: blur(10px); position: relative; overflow: hidden; }
    .glitch-box::before { content: ''; position: absolute; top: -100%; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, rgba(0,212,255,0.2), transparent); animation: scan 4s linear infinite; }
    @keyframes scan { 0% { top: -100%; } 100% { top: 100%; } }
    h3 { font-family: 'JetBrains Mono', monospace; color: #00d4ff; text-transform: uppercase; letter-spacing: 2px; }
    p, a { color: #8892b0; font-family: 'JetBrains Mono', monospace; text-decoration: none; display: block; margin-bottom: 10px; }
    a:hover { color: #b8ff57; text-shadow: 0 0 8px #b8ff57; }
  </style>
</head>
<body>
  <div class="footer-wrapper" id="v3-wrapper">
    <canvas id="v3-canvas"></canvas>
    <div class="ui-panel">
      <div class="glitch-box">
        <h3>[ SYS.BRAND ]</h3>
        <p style="color:#fff; font-size:1.2rem; font-weight:bold;">MARK BISHOP MEDIA</p>
        <p>LOCAL_VISIBILITY_OS v1.0<br>STATUS: DOMINATING</p>
      </div>
      <div class="glitch-box">
        <h3>[ NAV.LINKS ]</h3>
        <a href="#">> FREE_AUDIT.exe</a>
        <a href="#">> STRATEGY.dll</a>
        <a href="#">> RESULTS.log</a>
      </div>
      <div class="glitch-box">
        <h3>[ COMMS.PORT ]</h3>
        <a href="#">> LOC: TUCSON_AZ</a>
        <a href="#">> PING: MARK@MARKBI..</a>
      </div>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('v3-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let speedMult = 1;
    
    document.getElementById('v3-wrapper').addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const y = e.clientY - rect.top;
      // Faster when mouse is near bottom
      speedMult = 1 + (y / height) * 4;
    });

    const resize = () => { width = canvas.width = canvas.offsetWidth; height = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize); resize();
    
    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.lineWidth = 1;
      
      const cx = width / 2;
      const cy = height * 0.2; // Horizon line
      
      // Vertical Perspective Lines
      for (let i = -20; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + i * 150, height);
        ctx.stroke();
      }
      
      // Horizontal Moving Lines
      offset = (offset + 1 * speedMult) % 50;
      for (let i = 0; i < 20; i++) {
        const yBase = i * 50 + offset;
        const perspectiveY = cy + Math.pow(yBase, 1.4) * 0.1;
        if (perspectiveY > cy && perspectiveY < height) {
          ctx.beginPath();
          ctx.moveTo(0, perspectiveY);
          ctx.lineTo(width, perspectiveY);
          
          // Glow closer to bottom
          const alpha = (perspectiveY - cy) / (height - cy);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.8})`;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  </script>
</body>
</html>"""

# ==========================================
# VARIANT 4: ABSTRACT GEOMETRIC ORBIT
# ==========================================
v4_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>V4: Abstract Geometric Orbit</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;600&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding-top: 50vh; background: #050505; color: #fff; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
    .footer-wrapper { position: relative; width: 100%; min-height: 600px; padding: 100px 20px; display: flex; align-items: center; justify-content: center; }
    canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
    .minimal-glass { position: relative; z-index: 1; max-width: 1400px; width: 100%; display: flex; justify-content: space-between; align-items: flex-end; padding: 40px; background: rgba(255,255,255,0.02); backdrop-filter: blur(40px); border-radius: 30px; border: 1px solid rgba(255,255,255,0.05); }
    h1 { font-size: 3rem; margin: 0; font-weight: 600; letter-spacing: -1px; background: linear-gradient(90deg, #fff, #b8ff57); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .links-group { display: flex; gap: 40px; }
    .links-group div { display: flex; flex-direction: column; gap: 10px; }
    .links-group h4 { color: #666; margin-bottom: 10px; font-weight: 600; letter-spacing: 1px; }
    .links-group a { color: #ccc; text-decoration: none; font-size: 1.1rem; transition: color 0.3s; }
    .links-group a:hover { color: #fff; }
  </style>
</head>
<body>
  <div class="footer-wrapper" id="v4-wrapper">
    <canvas id="v4-canvas"></canvas>
    <div class="minimal-glass">
      <div>
        <h4 style="color:#666; letter-spacing:2px; margin-bottom:10px;">OPERATING SYSTEM</h4>
        <h1>Mark Bishop Media</h1>
      </div>
      <div class="links-group">
        <div>
          <h4>NAVIGATION</h4>
          <a href="#">Free Audit</a>
          <a href="#">Strategy</a>
        </div>
        <div>
          <h4>CONNECT</h4>
          <a href="#">Tucson, AZ</a>
          <a href="#">Email Mark</a>
        </div>
      </div>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('v4-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    
    let mouse = { x: -1000, y: -1000 };
    document.getElementById('v4-wrapper').addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    
    const resize = () => { width = canvas.width = canvas.offsetWidth; height = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize); resize();
    
    // Create random 3D points
    let points = [];
    for(let i=0; i<60; i++) {
      points.push({
        ox: (Math.random()-0.5)*600, oy: (Math.random()-0.5)*600, oz: (Math.random()-0.5)*600,
        x:0, y:0, z:0, vx:0, vy:0, vz:0
      });
    }

    let rotY = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      rotY += 0.005;
      
      const cx = width/2; const cy = height/2;
      
      let projPoints = [];
      points.forEach(p => {
        // Rotate
        let x1 = p.ox * Math.cos(rotY) - p.oz * Math.sin(rotY);
        let z1 = p.ox * Math.sin(rotY) + p.oz * Math.cos(rotY);
        let y1 = p.oy;
        
        // Interaction (Shatter)
        let screenX = cx + x1; let screenY = cy + y1;
        let dx = mouse.x - screenX; let dy = mouse.y - screenY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
           p.vx -= (dx/dist) * 2; p.vy -= (dy/dist) * 2;
        }
        
        // Spring back
        p.vx += (0 - p.x) * 0.05; p.vy += (0 - p.y) * 0.05;
        p.vx *= 0.8; p.vy *= 0.8;
        p.x += p.vx; p.y += p.vy;
        
        // Final
        let fx = x1 + p.x; let fy = y1 + p.y; let fz = z1;
        let scale = 800 / (800 + fz);
        projPoints.push({ x: cx + fx*scale, y: cy + fy*scale, z: fz });
      });
      
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      // Draw lines between close points
      for(let i=0; i<projPoints.length; i++) {
        for(let j=i+1; j<projPoints.length; j++) {
           let dx = projPoints[i].x - projPoints[j].x;
           let dy = projPoints[i].y - projPoints[j].y;
           if(dx*dx + dy*dy < 15000) {
             ctx.beginPath(); ctx.moveTo(projPoints[i].x, projPoints[i].y); ctx.lineTo(projPoints[j].x, projPoints[j].y); ctx.stroke();
           }
        }
      }
      
      requestAnimationFrame(draw);
    };
    draw();
  </script>
</body>
</html>"""

# ==========================================
# VARIANT 5: LOCAL DOMINANCE RADAR
# ==========================================
v5_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>V5: Local Dominance Radar</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding-top: 50vh; background: #03080c; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    .footer-wrapper { position: relative; width: 100%; min-height: 500px; padding: 60px 20px; display: flex; align-items: center; justify-content: space-between; }
    canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
    .radar-ui { position: relative; z-index: 1; max-width: 500px; background: rgba(0,0,0,0.7); padding: 40px; border-left: 4px solid #b8ff57; backdrop-filter: blur(10px); }
    h2 { font-size: 2.5rem; color: #b8ff57; margin: 0 0 10px 0; }
    .radar-stats { display: flex; gap: 20px; margin-top: 30px; }
    .stat-box { background: rgba(184, 255, 87, 0.1); padding: 15px; border-radius: 8px; flex: 1; }
    .stat-box span { display: block; font-size: 1.5rem; font-weight: bold; color: #b8ff57; }
    .stat-box small { color: #8892b0; font-size: 0.8rem; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="footer-wrapper" id="v5-wrapper">
    <canvas id="v5-canvas"></canvas>
    
    <!-- Push UI to right side -->
    <div style="flex:1;"></div>
    
    <div class="radar-ui">
      <h2>Mark Bishop Media</h2>
      <p style="color:#8892b0; line-height:1.6;">Scanning 9-Mile Radius.<br>Locating local business dominance opportunities in Tucson, AZ.</p>
      
      <div class="radar-stats">
        <div class="stat-box">
          <span>9 MI</span>
          <small>Scan Radius</small>
        </div>
        <div class="stat-box">
          <span id="pin-count">0</span>
          <small>Targets Found</small>
        </div>
      </div>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('v5-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    
    const resize = () => { width = canvas.width = canvas.offsetWidth; height = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize); resize();
    
    let angle = 0;
    
    // Generate map pins
    let pins = [];
    for(let i=0; i<50; i++) {
      pins.push({
        x: Math.random() * 2000 - 1000, 
        y: Math.random() * 2000 - 1000,
        active: 0
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 8, 12, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      const cx = width * 0.3; // Radar center on left
      const cy = height * 0.5;
      
      // Draw radar rings
      ctx.strokeStyle = 'rgba(184, 255, 87, 0.2)';
      ctx.lineWidth = 1;
      for(let r=100; r<=800; r+=150) {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
      }
      
      // Draw Sweep
      angle += 0.03;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 800, angle, angle + 0.5);
      ctx.lineTo(cx, cy);
      ctx.fillStyle = 'rgba(184, 255, 87, 0.15)';
      ctx.fill();
      
      // Draw Pins
      let activeCount = 0;
      pins.forEach(p => {
        let px = cx + p.x; let py = cy + p.y;
        
        // Check if pin is inside the sweep angle
        let pa = Math.atan2(p.y, p.x);
        if (pa < 0) pa += Math.PI*2;
        let normAngle = angle % (Math.PI*2);
        
        // Light up
        if (Math.abs(pa - normAngle) < 0.2 || Math.abs((pa+Math.PI*2) - normAngle) < 0.2) {
          p.active = 1;
        }
        
        if (p.active > 0) {
          ctx.beginPath(); ctx.arc(px, py, 4 + p.active*3, 0, Math.PI*2);
          ctx.fillStyle = `rgba(184, 255, 87, ${p.active})`;
          ctx.fill();
          p.active -= 0.02;
          activeCount++;
        } else {
          ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI*2);
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fill();
        }
      });
      
      document.getElementById('pin-count').innerText = activeCount;
      
      requestAnimationFrame(draw);
    };
    draw();
  </script>
</body>
</html>"""

with open(os.path.join(dir_path, '13-footer-v3-cybergrid.html'), 'w', encoding='utf-8') as f:
    f.write(v3_html)
with open(os.path.join(dir_path, '13-footer-v4-geometry.html'), 'w', encoding='utf-8') as f:
    f.write(v4_html)
with open(os.path.join(dir_path, '13-footer-v5-radar.html'), 'w', encoding='utf-8') as f:
    f.write(v5_html)

print("Generated Variant 3, 4, and 5 successfully!")
