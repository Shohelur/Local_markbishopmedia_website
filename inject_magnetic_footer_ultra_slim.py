import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'

with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

start_str = '<!-- ==============================================\n     PHASE 13:'
end_str = '<!-- ==============================================\n     END PHASE 13\n=============================================== -->'

start_idx = html.find(start_str)
end_idx = html.find(end_str)

if start_idx == -1 or end_idx == -1:
    print("Error: Could not find Phase 13")
    exit(1)

end_idx += len(end_str)

# New Phase 13 Block - Ultra Slim Dashboard (Everything inside glass)
new_phase13 = """<!-- ==============================================
     PHASE 13: MAGNETIC V2 DASHBOARD (ULTRA SLIM)
=============================================== -->
<style>
  #phase13-cyber-footer {
    position: relative;
    width: 100%;
    min-height: auto;
    padding: 40px 20px; /* Slimmer outer padding */
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(0, 212, 255, 0.1);
    z-index: 10;
    overflow: hidden;
  }
  
  #p13-ribbon-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; 
    pointer-events: none; 
  }

  /* The V2 Frosted Glass Dashboard - ULTRA SLIM */
  .v2-dashboard {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1200px;
    background: rgba(10, 15, 30, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 30px;
    padding: 40px 50px 20px 50px; /* Slimmer padding, tighter bottom */
    display: flex;
    flex-direction: column;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
    
    /* Glow tracking */
    background-image: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
      rgba(0, 212, 255, 0.1) 0%, 
      transparent 50%
    );
  }

  .v2-dashboard-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1.2fr;
    gap: 40px; /* Tighter gap */
  }

  /* Brand Section */
  .v2-brand .p13-brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -1px;
    margin-bottom: 15px;
    
    /* Liquid Metal Gradient Text */
    background: linear-gradient(135deg, #ffffff 0%, #b8ff57 50%, #00d4ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 5s ease infinite;
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .v2-brand .p13-brand-logo svg {
    width: 35px;
    height: 35px;
    filter: drop-shadow(0 0 10px var(--cyan-glow));
  }
  
  .v2-brand .p13-tagline {
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.6;
    max-width: 350px;
  }

  /* Links Section */
  .p13-col-title {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-muted);
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .p13-links-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .p13-link-item {
    color: var(--text-main);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    width: fit-content;
  }
  
  .p13-link-item::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0%;
    height: 2px;
    background: var(--lime-glow);
    transition: width 0.3s ease;
  }
  
  .p13-link-item:hover {
    color: var(--lime-glow);
    text-shadow: 0 0 10px rgba(184, 255, 87, 0.5);
  }
  .p13-link-item:hover::after {
    width: 100%;
  }

  /* Magnetic Contact Buttons */
  .p13-contact-col {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Tighter */
  }
  
  .magnetic-wrap {
    display: inline-block;
    padding: 10px; 
    margin: -10px;
    cursor: pointer;
  }

  .magnetic-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 12px 20px; /* Slimmer padding inside button */
    border-radius: 12px;
    color: var(--text-main);
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s, box-shadow 0.3s;
    will-change: transform; 
  }
  
  .magnetic-btn svg {
    width: 18px;
    height: 18px;
    color: var(--cyan-glow);
    transition: all 0.3s;
  }

  .magnetic-wrap:hover .magnetic-btn {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0, 212, 255, 0.1);
  }
  
  .magnetic-wrap:hover .magnetic-btn svg {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px var(--cyan-glow));
  }

  /* Neon Horizon Bottom Bar (NOW INSIDE THE DASHBOARD) */
  .p13-bottom-bar {
    width: 100%;
    margin-top: 40px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .p13-copyright, .p13-status {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  @media (max-width: 960px) {
    .v2-dashboard-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .p13-bottom-bar {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
  }
</style>

<footer id="phase13-cyber-footer">
  <canvas id="p13-ribbon-canvas"></canvas>

  <div class="v2-dashboard" id="v2-dashboard">
    <div class="v2-dashboard-grid">
      <!-- Brand -->
      <div class="v2-brand">
        <div class="p13-brand-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          Mark Bishop Media
        </div>
        <div class="p13-tagline">
          The Local Visibility Operating System. <br>We build dominance for local businesses through data, strategy, and execution.
        </div>
      </div>

      <!-- Quick Links -->
      <div class="p13-links-col">
        <div class="p13-col-title">Navigation</div>
        <a href="#" class="p13-link-item">Free Audit</a>
        <a href="#" class="p13-link-item">Local SEO Strategy</a>
        <a href="#" class="p13-link-item">Client Results</a>
        <a href="#" class="p13-link-item">About Mark</a>
      </div>

      <!-- Contact Nodes (Magnetic Buttons) -->
      <div class="p13-contact-col">
        <div class="p13-col-title">Connect</div>
        
        <div class="magnetic-wrap">
          <a href="#" class="magnetic-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Tucson, Arizona, USA
          </a>
        </div>
        
        <div class="magnetic-wrap">
          <a href="#" class="magnetic-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            mark@markbishopmedia.com
          </a>
        </div>
      </div>
    </div> <!-- END GRID -->

    <!-- BOTTOM BAR INSIDE THE GLASS BOX -->
    <div class="p13-bottom-bar">
      <div class="p13-copyright">
        © 2026 Mark Bishop Media. All rights reserved.
      </div>
      <div class="p13-status">
        Designed for Dominance.
      </div>
    </div>
  </div>
</footer>

<script>
// --- V4: FLUID PARTICLE OCEAN (REPULSION PHYSICS) ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('p13-ribbon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  const NUM_PARTICLES = window.innerWidth > 768 ? 400 : 150;
  const MOUSE_RADIUS = 150; 
  const SPRING_FORCE = 0.03; 
  const FRICTION = 0.88; 
  const REPULSION_STRENGTH = 4;
  const MAX_CONNECT_DISTANCE = 100; 
  
  let mouse = { x: -1000, y: -1000 };

  const resize = () => {
    const footer = document.getElementById('phase13-cyber-footer');
    width = canvas.width = footer.offsetWidth;
    height = canvas.height = footer.offsetHeight;
    initParticles(); 
  };
  
  window.addEventListener('resize', resize);

  const footer = document.getElementById('phase13-cyber-footer');
  footer.addEventListener('mousemove', (e) => {
    const rect = footer.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  footer.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

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

// --- MAGNETIC BUTTON & GLOW TRACKING PHYSICS ---
document.addEventListener('DOMContentLoaded', () => {
  // Magnetic Buttons
  const magneticWrappers = document.querySelectorAll('.magnetic-wrap');
  magneticWrappers.forEach(wrap => {
    const btn = wrap.querySelector('.magnetic-btn');
    if (!btn) return;
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const pullX = x * 0.4;
      const pullY = y * 0.4;
      btn.style.transition = 'none';
      btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });
    wrap.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // Glow Tracking for V2 Dashboard
  const dashboard = document.getElementById('v2-dashboard');
  if (dashboard) {
    dashboard.addEventListener('mousemove', e => {
      const rect = dashboard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      dashboard.style.setProperty('--mouse-x', `${x}%`);
      dashboard.style.setProperty('--mouse-y', `${y}%`);
    });
  }
});
</script>
<!-- ==============================================
     END PHASE 13
=============================================== -->"""

html = html[:start_idx] + new_phase13 + html[end_idx:]

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Ultra Slim Dashboard replacement complete.")
