import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Inject CSS
css_pattern = r"(/\* Massive Glowing Watermark \*/)"
css_injection = """/* Ribbon Canvas */
#p13-ribbon-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
  mix-blend-mode: screen;
}

"""
html = re.sub(css_pattern, css_injection + r"\1", html)

# 2. Inject HTML Canvas
html_pattern = r"(<footer id=\"phase13-cyber-footer\">)"
html_injection = """<canvas id="p13-ribbon-canvas"></canvas>
  """
html = re.sub(html_pattern, r"\1\n  " + html_injection, html)

# 3. Inject JS Logic
js_pattern = r"(<!-- ==============================================\s*END PHASE 13\s*=============================================== -->)"
js_injection = """<script>
// --- Stripe-style Neon Ribbon Canvas ---
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('p13-ribbon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let time = 0;
  
  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  // Draw a smooth animated mesh
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    
    // Ribbon configuration
    const lines = 18;
    const amplitudeBase = height * 0.12;
    const frequencyBase = 0.002;
    const yOffset = height * 0.7; // Lower part of the footer
    
    for (let i = 0; i < lines; i++) {
      ctx.beginPath();
      
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      // Fade in/out edges and blend colors (Cyan, Magenta, Lime)
      const baseAlpha = 0.1 + (i * 0.015);
      gradient.addColorStop(0, `rgba(0, 212, 255, 0)`);
      gradient.addColorStop(0.2, `rgba(0, 212, 255, ${baseAlpha})`);
      gradient.addColorStop(0.5, `rgba(255, 0, 255, ${baseAlpha})`); // Stripe magenta touch
      gradient.addColorStop(0.8, `rgba(184, 255, 87, ${baseAlpha})`);
      gradient.addColorStop(1, `rgba(184, 255, 87, 0)`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.2;
      
      const phase = i * 0.25; // Stagger the lines
      const speed = 0.015 + (i * 0.0008);
      
      for (let x = 0; x <= width; x += 4) {
        // Complex math for a fluid, natural look
        const y = yOffset 
                + Math.sin(x * frequencyBase + time * speed + phase) * amplitudeBase
                + Math.sin(x * frequencyBase * 0.4 - time * speed) * (amplitudeBase * 0.6);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    time += 1;
    requestAnimationFrame(draw);
  };
  
  // Wait a fraction of a second for layout to settle before starting loop
  setTimeout(() => {
    resize();
    draw();
  }, 100);
});
</script>
"""

html = re.sub(js_pattern, js_injection + r"\1", html)

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Canvas Ribbon injected successfully!")
