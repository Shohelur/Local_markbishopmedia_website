import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update CSS to add the Glass Shield to the text content grid
css_pattern = r"(\.p13-footer-content\s*\{[^}]*?z-index:\s*1;)"
css_injection = """
  background: rgba(2, 5, 15, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
"""
html = re.sub(css_pattern, r"\1" + css_injection, html)

# 2. Replace the JS Engine
js_pattern = r"<script>\s*// --- V3: INTERACTIVE 3D PARTICLE SPHERE ENGINE ---.*?</script>"
js_injection = """<script>
// --- V4: FLUID PARTICLE OCEAN (REPULSION PHYSICS) ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('p13-ribbon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  // Physics Constants
  const NUM_PARTICLES = window.innerWidth > 768 ? 300 : 150;
  const MOUSE_RADIUS = 150; // How far the "water" parts
  const SPRING_FORCE = 0.02; // How fast they snap back
  const FRICTION = 0.85; // How bouncy/fluid it feels
  const REPULSION_STRENGTH = 4;
  const MAX_CONNECT_DISTANCE = 100; // Network line distance
  
  let mouse = { x: -1000, y: -1000 };

  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    initParticles(); // Recreate network on resize
  };
  
  window.addEventListener('resize', resize);

  // Track mouse over the footer
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
      this.color = Math.random() > 0.3 ? '#00d4ff' : '#b8ff57'; // Cyan or Lime
    }
    
    update() {
      // 1. Calculate distance from mouse
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distanceToMouse = Math.sqrt(dx * dx + dy * dy);
      
      // 2. Mouse Repulsion Force (Water parting effect)
      if (distanceToMouse < MOUSE_RADIUS) {
        // Calculate force based on how close mouse is
        let force = (MOUSE_RADIUS - distanceToMouse) / MOUSE_RADIUS;
        // Direction to push away
        let angle = Math.atan2(dy, dx);
        
        let pushX = Math.cos(angle) * force * REPULSION_STRENGTH;
        let pushY = Math.sin(angle) * force * REPULSION_STRENGTH;
        
        this.vx -= pushX;
        this.vy -= pushY;
      }
      
      // 3. Spring Force (Water flowing back to place)
      let springDx = this.originX - this.x;
      let springDy = this.originY - this.y;
      this.vx += springDx * SPRING_FORCE;
      this.vy += springDy * SPRING_FORCE;
      
      // 4. Apply Friction
      this.vx *= FRICTION;
      this.vy *= FRICTION;
      
      // 5. Update Position
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
          // Opacity based on distance (closer = brighter)
          let opacity = 1 - (distance / MAX_CONNECT_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          // Subtle glowing lines
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.15})`; 
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw the network connections first
    connectParticles();
    
    // Update and draw particles
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

if re.search(js_pattern, html, flags=re.DOTALL):
    html = re.sub(js_pattern, js_injection, html, flags=re.DOTALL)
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fluid Particle Engine injected successfully!")
else:
    print("Error: Could not find the V3 Sphere script block.")
