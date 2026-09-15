import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix CSS for .p11-right, ::before, and .p11-form-glass
css_pattern = r'(\.p11-right \{.*?\.p11-form-glass \{.*?box-shadow:.*?\n\})'

new_css = """.p11-right {
  position: relative;
  border-radius: 26px;
  padding: 2px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0, 212, 255, 0.1);
  background: #030814;
}

/* Spinning Holographic Border */
.p11-right::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background: conic-gradient(from 0deg, transparent 40%, #ff00ff 60%, var(--cyan-glow) 80%, var(--lime-glow) 100%);
  animation: p11-rotate-border 4s linear infinite;
  z-index: 0;
  opacity: 1;
}

@keyframes p11-rotate-border {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.p11-form-glass {
  position: relative;
  background: linear-gradient(135deg, rgba(16, 26, 48, 0.95) 0%, rgba(5, 10, 20, 0.98) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  z-index: 1;
  border: none;
  /* Glass reflection */
  box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.1);
}"""

html = re.sub(css_pattern, new_css, html, flags=re.DOTALL)

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Card CSS fixed and colorful border applied.")
