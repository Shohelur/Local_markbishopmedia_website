import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern to find the old script block
pattern = r"<script>\s*// --- Stripe-style Neon Ribbon Canvas ---.*?</script>"

new_script = """<script>
// --- V2: STRIPE-BEATER HOLOGRAPHIC MESH ENGINE ---
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

  const draw = () => {
    // Clear and set composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    
    // Use screen blending for intense neon light overlap
    ctx.globalCompositeOperation = 'screen';
    
    const lines = 65; // Massive density increase
    const yOffset = height * 0.65; 
    
    for (let i = 0; i < lines; i++) {
      ctx.beginPath();
      
      // Calculate depth (0.0 to 1.0)
      const depth = i / lines; 
      
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      
      // Rich, intense colors matching MBM and Stripe's vibrancy
      // Depth controls opacity to create atmospheric perspective
      const alpha = 0.05 + (depth * 0.4); 
      
      gradient.addColorStop(0, `rgba(0, 212, 255, 0)`);
      gradient.addColorStop(0.15, `rgba(0, 212, 255, ${alpha})`); // Cyan
      gradient.addColorStop(0.5, `rgba(255, 0, 255, ${alpha * 0.8})`); // Magenta Core
      gradient.addColorStop(0.85, `rgba(184, 255, 87, ${alpha})`); // Lime
      gradient.addColorStop(1, `rgba(184, 255, 87, 0)`);
      
      ctx.strokeStyle = gradient;
      
      // Lines in "front" are thicker, lines in "back" are hair-thin (3D effect)
      ctx.lineWidth = 0.5 + (depth * 2.5);
      
      const phase = i * 0.15; 
      const speed1 = 0.008 + (depth * 0.005);
      const speed2 = 0.012 + (depth * 0.003);
      
      // Complex multi-frequency wave math for liquid flow
      const freq1 = 0.0015;
      const freq2 = 0.0025;
      const freq3 = 0.001;
      
      const amp1 = height * 0.15 * (0.5 + depth);
      const amp2 = height * 0.1 * (0.8 + depth * 0.2);
      const amp3 = height * 0.05;

      for (let x = 0; x <= width; x += 10) {
        // Combining 3 frequencies creates organic, non-repeating folds
        const y = yOffset 
                + Math.sin(x * freq1 + time * speed1 + phase) * amp1
                + Math.cos(x * freq2 - time * speed2 + phase) * amp2
                + Math.sin(x * freq3 + time * speed1 * 0.5) * amp3;
                
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
    time += 1;
    requestAnimationFrame(draw);
  };
  
  setTimeout(() => {
    resize();
    draw();
  }, 100);
});
</script>"""

if re.search(pattern, html, flags=re.DOTALL):
    html = re.sub(pattern, new_script, html, flags=re.DOTALL)
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("V2 Stripe-Beater Engine injected successfully!")
else:
    print("Error: Could not find the old script block.")
