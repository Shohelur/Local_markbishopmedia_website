import sys

file_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the SVG with a version that has the style block right next to it, and inline attributes.
svg_target = """<svg class="p5-wave-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path class="p5-wave-path-bg" d="M 50 0 C 50 10, 25 10, 25 20 C 25 30, 75 30, 75 40 C 75 50, 25 50, 25 60 C 25 70, 75 70, 75 80 C 75 90, 50 90, 50 100" vector-effect="non-scaling-stroke"></path>
          <path class="p5-wave-path-active" id="p5-wave-active" d="M 50 0 C 50 10, 25 10, 25 20 C 25 30, 75 30, 75 40 C 75 50, 25 50, 25 60 C 25 70, 75 70, 75 80 C 75 90, 50 90, 50 100" vector-effect="non-scaling-stroke"></path>
        </svg>"""

# Using explicit inline styles to guarantee it works without depending on <style> tag matching
svg_replacement = """
      <style>
        .p5-wave-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .p5-wave-path-active {
          filter: drop-shadow(0 0 10px rgba(0,212,255,0.8));
          transition: stroke-dashoffset 0.05s linear;
        }
      </style>
      <svg class="p5-wave-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path class="p5-wave-path-bg" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="4px" d="M 50 0 C 50 10, 25 10, 25 20 C 25 30, 75 30, 75 40 C 75 50, 25 50, 25 60 C 25 70, 75 70, 75 80 C 75 90, 50 90, 50 100" vector-effect="non-scaling-stroke"></path>
          <path class="p5-wave-path-active" id="p5-wave-active" fill="none" stroke="#00d4ff" stroke-width="4px" d="M 50 0 C 50 10, 25 10, 25 20 C 25 30, 75 30, 75 40 C 75 50, 25 50, 25 60 C 25 70, 75 70, 75 80 C 75 90, 50 90, 50 100" vector-effect="non-scaling-stroke"></path>
        </svg>"""

# Because of potential newline spacing issues with the original string, I will use regex
import re
# Match the SVG tag and its contents exactly, ignoring whitespace variances between the lines
pattern = re.compile(r'<svg class="p5-wave-svg".*?</svg>', re.DOTALL)
content = pattern.sub(svg_replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed SVG styling perfectly.")
