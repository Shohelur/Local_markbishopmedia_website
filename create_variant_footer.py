import os

file_path = r'D:\Agentic OS\agency-website\mockup-studio\13-footer-variant-studio.html'

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 13 Variant - Magnetic Glass Footer</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #02050f;
      --cyan-glow: #00d4ff;
      --lime-glow: #b8ff57;
      --glass-bg: rgba(10, 15, 30, 0.4);
      --glass-border: rgba(255, 255, 255, 0.08);
      --text-main: #ffffff;
      --text-muted: #8892b0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      overflow-x: hidden;
      /* Padding to simulate scrolling down to footer */
      padding-top: 50vh; 
    }

    /* -------------------------------------
       BACKGROUND: FLUID PARTICLE OCEAN
       ------------------------------------- */
    .footer-wrapper {
      position: relative;
      width: 100%;
      min-height: 500px;
      overflow: hidden;
      padding: 80px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--glass-border);
    }

    #p13-ribbon-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2; /* Over text */
      pointer-events: none; /* Let clicks pass through */
    }

    /* -------------------------------------
       FOREGROUND: MAGNETIC GLASS DASHBOARD
       ------------------------------------- */
    .v2-dashboard {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1200px;
      background: var(--glass-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--glass-border);
      border-radius: 40px;
      padding: 60px;
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 60px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
      
      /* Glow tracking effect setup */
      background-image: radial-gradient(
        circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
        rgba(0, 212, 255, 0.08) 0%, 
        transparent 50%
      );
    }

    /* Brand Section */
    .v2-brand .logo {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -1px;
      margin-bottom: 20px;
      
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

    .v2-brand .logo svg {
      width: 40px;
      height: 40px;
      /* Use drop-shadow instead of standard glow so it applies to the SVG stroke */
      filter: drop-shadow(0 0 10px var(--cyan-glow));
    }
    
    .v2-brand p {
      color: var(--text-muted);
      font-size: 1.1rem;
      line-height: 1.6;
      max-width: 350px;
    }

    /* Links Section */
    .v2-links h4, .v2-contact h4 {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--text-muted);
      margin-bottom: 25px;
      font-weight: 600;
    }
    
    .v2-links ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .v2-links a {
      color: var(--text-main);
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 400;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
      width: fit-content;
    }
    
    .v2-links a::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 0%;
      height: 2px;
      background: var(--lime-glow);
      transition: width 0.3s ease;
    }
    
    .v2-links a:hover {
      color: var(--lime-glow);
      text-shadow: 0 0 10px rgba(184, 255, 87, 0.5);
    }
    .v2-links a:hover::after {
      width: 100%;
    }

    /* Magnetic Contact Buttons */
    .v2-contact {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    /* The wrapper handles the magnetic padding area */
    .magnetic-wrap {
      display: inline-block;
      padding: 10px; /* Trigger area */
      margin: -10px;
      cursor: pointer;
    }

    .magnetic-btn {
      display: flex;
      align-items: center;
      gap: 15px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 16px 24px;
      border-radius: 16px;
      color: var(--text-main);
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s, box-shadow 0.3s;
      /* Will-change for smoother animation */
      will-change: transform; 
    }
    
    .magnetic-btn svg {
      width: 20px;
      height: 20px;
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

    /* Bottom Copyright */
    .v2-bottom-bar {
      margin-top: 80px;
      border-top: 1px solid var(--glass-border);
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      color: var(--text-muted);
      font-size: 0.9rem;
      grid-column: 1 / -1;
    }

    @media (max-width: 960px) {
      .v2-dashboard {
        grid-template-columns: 1fr;
        padding: 40px;
        border-radius: 24px;
      }
      .v2-bottom-bar {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
    }
  </style>
</head>
<body>

  <div class="footer-wrapper" id="v2-footer-wrapper">
    <canvas id="p13-ribbon-canvas"></canvas>

    <div class="v2-dashboard" id="v2-dashboard">
      
      <!-- Brand -->
      <div class="v2-brand">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Mark Bishop Media
        </div>
        <p>
          The Local Visibility Operating System.<br>
          We build dominance for local businesses through data, strategy, and execution.
        </p>
      </div>
      
      <!-- Links -->
      <div class="v2-links">
        <h4>Navigation</h4>
        <ul>
          <li><a href="#">Free Audit</a></li>
          <li><a href="#">Local SEO Strategy</a></li>
          <li><a href="#">Client Results</a></li>
          <li><a href="#">About Mark</a></li>
        </ul>
      </div>
      
      <!-- Contact (Magnetic Buttons) -->
      <div class="v2-contact">
        <h4>Connect</h4>
        
        <div class="magnetic-wrap">
          <a href="#" class="magnetic-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Tucson, Arizona, USA
          </a>
        </div>
        
        <div class="magnetic-wrap">
          <a href="#" class="magnetic-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            mark@markbishopmedia.com
          </a>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="v2-bottom-bar">
        <div>&copy; 2026 Mark Bishop Media. All rights reserved.</div>
        <div>Designed for Dominance.</div>
      </div>

    </div>
  </div>

  <script>
    // --- 1. MAGNETIC BUTTON PHYSICS ---
    const magneticWrappers = document.querySelectorAll('.magnetic-wrap');
    
    magneticWrappers.forEach(wrap => {
      const btn = wrap.querySelector('.magnetic-btn');
      
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        // Calculate mouse position relative to center of wrapper
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Pull strength (higher = pulls further)
        const pullX = x * 0.4;
        const pullY = y * 0.4;
        
        // Apply transform. Remove transition so it tracks instantly.
        btn.style.transition = 'none';
        btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
      });
      
      wrap.addEventListener('mouseleave', () => {
        // Snap back with spring easing
        btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        btn.style.transform = 'translate(0px, 0px)';
      });
    });

    // --- 2. DASHBOARD GLOW TRACKING ---
    const dashboard = document.getElementById('v2-dashboard');
    dashboard.addEventListener('mousemove', (e) => {
      const rect = dashboard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      dashboard.style.setProperty('--mouse-x', `${x}%`);
      dashboard.style.setProperty('--mouse-y', `${y}%`);
    });

    // --- 3. FLUID PARTICLE OCEAN ENGINE ---
    document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('p13-ribbon-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      let width, height;
      let particles = [];
      
      // Physics Constants
      const NUM_PARTICLES = window.innerWidth > 768 ? 500 : 250;
      const MOUSE_RADIUS = 150; 
      const SPRING_FORCE = 0.02; 
      const FRICTION = 0.85; 
      const REPULSION_STRENGTH = 4;
      const MAX_CONNECT_DISTANCE = 100; 
      
      let mouse = { x: -1000, y: -1000 };

      const resize = () => {
        const wrapper = document.getElementById('v2-footer-wrapper');
        width = canvas.width = wrapper.offsetWidth;
        height = canvas.height = wrapper.offsetHeight;
        initParticles();
      };
      
      window.addEventListener('resize', resize);

      const footer = document.getElementById('v2-footer-wrapper');
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
  </script>
</body>
</html>
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Created Variant 2 Footer Studio file at: {file_path}")
