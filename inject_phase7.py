import os

master_path = r"D:\Agentic OS\agency-website\final-website-master.html"
studio_path = r"D:\Agentic OS\agency-website\mockup-studio\07-industry-marquee-studio.html"

with open(master_path, 'r', encoding='utf-8') as f:
    master_content = f.read()

with open(studio_path, 'r', encoding='utf-8') as f:
    studio_content = f.read()

# Extract CSS
style_start = studio_content.find("<style>") + len("<style>")
style_end = studio_content.find("</style>")
studio_css = studio_content[style_start:style_end]

# Extract HTML body
# We will get everything between <div class="ambient-glow"> and </body>
html_start = studio_content.find('<div class="ambient-glow">')
html_end = studio_content.find('</body>')
studio_html = studio_content[html_start:html_end]

# Remove the ambient-glow from HTML since it might interfere with the master canvas
# actually, let's keep it but namespace it so it's only in Phase 7 section.
studio_html = studio_html.replace('<div class="ambient-glow"></div>', '')

# Construct the injection block
injection = f"""
<!-- ═══════════════════════════════════════════════════════════
     PHASE 7: INFINITE INDUSTRY MARQUEE
     ═══════════════════════════════════════════════════════════ -->
<style>
/* Phase 7 Scoped CSS */
#phase7-industry-marquee {{
  position: relative;
  width: 100%;
  padding: 80px 0;
  background: transparent;
  z-index: 10;
}}
{studio_css.replace('body {', '/* body {').replace('min-height: 100vh;', '*/')}
</style>

<section id="phase7-industry-marquee">
  {studio_html}
</section>

"""

# Find injection point in master
# Looking for:
# </section>
# 
# <script>
# /* ─── 1. THREE.JS MASTER UNIVERSE INITIALIZATION ─── */
injection_target = "</section>\n\n<script>\n/* ─── 1. THREE.JS MASTER UNIVERSE INITIALIZATION"

if injection_target in master_content:
    new_master = master_content.replace(injection_target, "</section>\n" + injection + "<script>\n/* ─── 1. THREE.JS MASTER UNIVERSE INITIALIZATION")
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(new_master)
    print("Success: Phase 7 injected into master.")
else:
    print("Error: Could not find injection point.")
