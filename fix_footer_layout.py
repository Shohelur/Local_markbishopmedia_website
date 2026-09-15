import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Revert .p13-footer-content CSS
css_pattern = r"(\.p13-footer-content\s*\{[\s\S]*?z-index:\s*1;).*?(\})"
# The .*? after z-index: 1; matches everything up to the closing brace, effectively deleting the injected background/padding
html = re.sub(css_pattern, r"\1\n}\n", html, flags=re.DOTALL)

# 2. Make canvas render on top of text (z-index: 2 instead of 0)
canvas_css_pattern = r"(#p13-ribbon-canvas\s*\{[\s\S]*?z-index:\s*)0(;\s*pointer-events:\s*none;)"
html = re.sub(canvas_css_pattern, r"\g<1>2\g<2>", html)

# 3. Make particles denser
particles_pattern = r"(const NUM_PARTICLES = window\.innerWidth > 768 \? )300( : )150(;)"
html = re.sub(particles_pattern, r"\g<1>500\g<2>250\g<3>", html)

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Footer layout fixed, canvas z-index updated, and particles made denser!")
