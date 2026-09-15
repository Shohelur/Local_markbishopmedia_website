import re

master_path = r'D:\Agentic OS\clean.html'
out_path = r'D:\Agentic OS\agency-website\final-website-master.html'

with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Wrap Phase 10, 11, 13
html = html.replace('<section class="phase10-section" id="phase10-comparison">', '<div class="unified-ocean-zone" id="unified-ocean-zone">\n  <canvas id="unified-ocean-canvas"></canvas>\n  <section class="phase10-section" id="phase10-comparison">')

# Close the div right before </body>
html = html.replace('</body>', '</div> <!-- END UNIFIED OCEAN ZONE -->\n</body>')

# 2. Remove any old canvases just in case (the p13-ribbon-canvas)
html = re.sub(r'<canvas id="p13-ribbon-canvas"></canvas>\s*', '', html)

# 3. Inject CSS
css_injection = """
  /* =========================================
     UNIFIED OCEAN ZONE (Phase 10, 11, 13)
     ========================================= */
  .unified-ocean-zone {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: #02050f; 
  }
  
  #unified-ocean-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  
  #phase10-comparison, #phase11-booking, #phase13-cyber-footer {
    position: relative;
    z-index: 10;
    background: transparent !important;
  }
  
  .p10-card {
    background: rgba(10, 15, 30, 0.95) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  
  .p11-form-box {
    background: rgba(10, 15, 30, 0.95) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  
  .p13-footer-content {
    background: rgba(2, 5, 15, 0.95) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 40px;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.05);
  }
"""
html = html.replace('</style>', css_injection + '\n</style>')

# 4. Inject JS
unified_js = """<script>
// --- V5: UNIFIED FLUID OCEAN (PHASE 10, 11, 13) ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('unified-ocean-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  const NUM_PARTICLES = window.innerWidth > 768 ? 1400 : 500;
  const MOUSE_RADIUS = 250; 
  const SPRING_FORCE = 0.02; 
  const FRICTION = 0.85; 
  const REPULSION_STRENGTH = 5;
  const MAX_CONNECT_DISTANCE = 120; 
  
  let mouse = { x: -1000, y: -1000 };

  const resize = () => {
    const wrapper = document.getElementById('unified-ocean-zone');
    if (!wrapper) return;
    width = canvas.width = wrapper.offsetWidth;
    height = canvas.height = wrapper.offsetHeight;
    initParticles(); 
  };
  
  window.addEventListener('resize', resize);

  const zone = document.getElementById('unified-ocean-zone');
  if (zone) {
    zone.addEventListener('mousemove', (e) => {
      const rect = zone.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    zone.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });
  }

  class Particle {
    constructor(x, y) {
      this.originX = x;
      this.originY = y;
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.baseRadius = Math.random() * 1.5 + 0.5;
      this.color = Math.random() > 0.3 ? '#00d4ff' : '#b8ff57'; 
    }
    
    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distanceToMouse = Math.sqrt(dx * dx + dy * dy);
      
      if (distanceToMouse < MOUSE_RADIUS) {
        let force = (MOUSE_RADIUS - distanceToMouse) / MOUSE_RADIUS;
        let angle = Math.atan2(dy, dx);
        let pushX = Math.cos(angle) * force * REPULSION_STRENGTH;
        let pushY = Math.sin(angle) * force * REPULSION_STRENGTH;
        this.vx -= pushX;
        this.vy -= pushY;
      }
      
      let springDx = this.originX - this.x;
      let springDy = this.originY - this.y;
      this.vx += springDx * SPRING_FORCE;
      this.vy += springDy * SPRING_FORCE;
      this.vx *= FRICTION;
      this.vy *= FRICTION;
      
      this.x += this.vx;
      this.y += this.vy;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      let x = Math.random() * width;
      let y = Math.random() * height;
      particles.push(new Particle(x, y));
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        if (Math.abs(particles[a].y - particles[b].y) > MAX_CONNECT_DISTANCE) continue;
        
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MAX_CONNECT_DISTANCE) {
          let opacity = 1 - (distance / MAX_CONNECT_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.15})`; 
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    connectParticles();
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  };
  
  setTimeout(() => {
    resize();
    animate();
  }, 100);
});
</script>"""

# Replace the placeholder from the cleanup step
html = re.sub(r'<script>\n// --- V4: FLUID PARTICLE OCEAN \(REPULSION PHYSICS\) ---\n</script>', unified_js, html, flags=re.DOTALL)

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Proper injection complete.")
