import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'\.p11-right \{.*?\.p11-form-header \{'

new_css = """.p11-right {
  position: relative;
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  background: transparent;
}

/* Breathing Neon Glow */
.p11-form-glass {
  position: relative;
  background: linear-gradient(135deg, rgba(16, 26, 48, 0.95) 0%, rgba(5, 10, 20, 0.98) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  z-index: 1;
  border: 1px solid rgba(0, 212, 255, 0.3);
  animation: p11-breathe-glow 4s ease-in-out infinite alternate;
}

@keyframes p11-breathe-glow {
  0% {
    box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.1), 0 0 10px rgba(0, 212, 255, 0.1);
    border-color: rgba(0, 212, 255, 0.2);
  }
  100% {
    box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.1), 0 0 40px rgba(0, 212, 255, 0.5), 0 0 60px rgba(184, 255, 87, 0.2);
    border-color: rgba(184, 255, 87, 0.6);
  }
}

.p11-form-header {"""

if re.search(pattern, html, flags=re.DOTALL):
    html = re.sub(pattern, new_css, html, flags=re.DOTALL)
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Replaced spinning border with breathing neon glow.")
else:
    print("Could not find the block to replace.")
