import sys
import re

file_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the missing p5-glow-line
html_replacement = """<div class="p5-pipeline-container">
      <div class="p5-glow-line" id="p5-scroll-line"></div>
      <!-- Wave Directional Line -->"""

content = re.sub(r'<div class="p5-pipeline-container">\s*<!-- Wave Directional Line -->', html_replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored p5-glow-line securely.")
