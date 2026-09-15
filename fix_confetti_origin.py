import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r"(// Trigger Confetti\s+if \(typeof confetti !== 'undefined'\) \{)(\s+const duration = 3000;.*?\n\s+confetti\(Object\.assign\(\{\}, defaults, \{ \n\s+particleCount, \n\s+origin: \{ x: 0\.5, y: 0\.5 \},\n\s+colors: \['#00d4ff', '#b8ff57', '#ffffff'\]\n\s+\}\)\);\n\s+\}, 250\);\n\s+\})"

# Safer pattern targeting the origin specifically
pattern_safe = r"origin:\s*\{\s*x:\s*0\.5,\s*y:\s*0\.5\s*\}"

# Actually, to compute it dynamically we need to define originX and originY before the interval.
# Let's replace the whole confetti block safely.
block_pattern = r"(\/\/ Trigger Confetti\s+if \(typeof confetti !== 'undefined'\) \{)([\s\S]*?)(const duration = 3000;[\s\S]*?origin: \{ x: 0\.5, y: 0\.5 \}([\s\S]*?\}\);[\s\s]*\}, 250\);[\s\s]*\})"

new_confetti_block = """// Trigger Confetti
      if (typeof confetti !== 'undefined') {
        const rect = successMsg.getBoundingClientRect();
        const originX = (rect.left + rect.width / 2) / window.innerWidth;
        const originY = (rect.top + rect.height / 2) / window.innerHeight;
        
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
  
        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: originX, y: originY },
            colors: ['#00d4ff', '#b8ff57', '#ffffff']
          }));
        }, 250);
      }"""

# Using a simpler string replacement since we just injected this exactly
old_confetti_block = """// Trigger Confetti
      if (typeof confetti !== 'undefined') {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
  
        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: 0.5, y: 0.5 },
            colors: ['#00d4ff', '#b8ff57', '#ffffff']
          }));
        }, 250);
      }"""

if old_confetti_block in html:
    html = html.replace(old_confetti_block, new_confetti_block)
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Confetti origin dynamically updated to successMsg rect.")
else:
    print("Error: Could not find exact confetti block.")
