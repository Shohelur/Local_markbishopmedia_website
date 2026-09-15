import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the CSS for the canvas to ensure the particles are bright
css_pattern = r"(#p13-ribbon-canvas\s*\{[^}]*?opacity:\s*)0\.\d+([^}]*?\})"
html = re.sub(css_pattern, r"\g<1>0.8\g<2>", html)

# 2. Replace the JS Engine
js_pattern = r"<script>\s*// --- V2: STRIPE-BEATER HOLOGRAPHIC MESH ENGINE ---.*?</script>"
js_injection = """<script>
// --- V3: INTERACTIVE 3D PARTICLE SPHERE ENGINE ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('p13-ribbon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  
  // 3D Engine Constants
  const FOV = 800; // Field of view
  const NUM_PARTICLES = 600;
  const GLOBE_RADIUS = 350; // Size of the sphere
  
  let particles = [];
  
  // Mouse interaction state
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;

  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  // Track mouse over the footer
  const footer = document.getElementById('phase13-cyber-footer');
  footer.addEventListener('mousemove', (e) => {
    const rect = footer.getBoundingClientRect();
    // Normalize mouse position from -1 to 1
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    
    // Set target rotation (limit max rotation angle)
    targetRotationY = x * 1.5; // Look left/right
    targetRotationX = -y * 1.5; // Look up/down
  });
  
  footer.addEventListener('mouseleave', () => {
    targetRotationX = 0;
    targetRotationY = 0;
  });

  // Particle Class
  class Particle {
    constructor() {
      // Golden ratio Fibonacci sphere distribution for even spacing
      // Alternatively, random spherical coordinates
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Calculate 3D coordinates on a sphere
      this.x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
      this.y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
      this.z = GLOBE_RADIUS * Math.cos(phi);
      
      // Assign random color (Cyan or Lime)
      this.color = Math.random() > 0.3 ? '#00d4ff' : '#b8ff57';
      this.baseRadius = Math.random() * 1.5 + 0.5;
    }
    
    project(rotX, rotY) {
      // 1. Rotate around X axis
      let y1 = this.y * Math.cos(rotX) - this.z * Math.sin(rotX);
      let z1 = this.y * Math.sin(rotX) + this.z * Math.cos(rotX);
      
      // 2. Rotate around Y axis
      let x2 = this.x * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -this.x * Math.sin(rotY) + z1 * Math.cos(rotY);
      let y2 = y1;
      
      // 3. Project to 2D screen
      const scaleProjected = FOV / (FOV + z2);
      const xProjected = (x2 * scaleProjected) + (width / 2);
      const yProjected = (y2 * scaleProjected) + (height / 2);
      
      return {
        x: xProjected,
        y: yProjected,
        scale: scaleProjected,
        z: z2 // Keep Z for depth sorting
      };
    }
  }

  // Initialize particles
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }

  let autoRotation = 0;

  const draw = () => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    
    // Smoothly interpolate current rotation towards target mouse rotation (Easing)
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    
    // Add constant slow auto-rotation
    autoRotation += 0.002;
    
    const finalRotX = currentRotationX;
    const finalRotY = currentRotationY + autoRotation;

    // Project and sort particles by depth (Z) so closer particles render on top
    const projectedParticles = particles.map(p => {
      const proj = p.project(finalRotX, finalRotY);
      return { ...proj, color: p.color, baseRadius: p.baseRadius };
    });
    
    projectedParticles.sort((a, b) => b.z - a.z);

    // Render
    ctx.globalCompositeOperation = 'screen';
    
    projectedParticles.forEach(p => {
      // Fade out particles that are far away (back of the sphere)
      const alpha = Math.max(0.05, Math.min(1, p.scale * 1.5 - 0.5));
      
      if (alpha > 0.05) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius * p.scale, 0, Math.PI * 2);
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        
        // Add subtle glow to front particles
        if (p.z < 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      }
    });
    
    requestAnimationFrame(draw);
  };
  
  setTimeout(() => {
    resize();
    draw();
  }, 100);
});
</script>"""

if re.search(js_pattern, html, flags=re.DOTALL):
    html = re.sub(js_pattern, js_injection, html, flags=re.DOTALL)
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("3D Particle Sphere Engine injected successfully!")
else:
    print("Error: Could not find the V2 Stripe-Beater script block.")
