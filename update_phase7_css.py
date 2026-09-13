import re
import os

master_path = r"D:\Agentic OS\agency-website\final-website-master.html"

with open(master_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to change the CSS for #phase7-industry-marquee
# Currently it is:
# #phase7-industry-marquee {
#   position: relative;
#   width: 100%;
#   padding: 80px 0;
#   background: transparent;
#   z-index: 10;
# }

# We will change background to a beautiful dark gradient to hide the 3D canvas behind it,
# and also update the .section-title to be colorful instead of silver.

old_css_marquee = """#phase7-industry-marquee {
  position: relative;
  width: 100%;
  padding: 80px 0;
  background: transparent;
  z-index: 10;
}"""

new_css_marquee = """#phase7-industry-marquee {
  position: relative;
  width: 100%;
  padding: 100px 0;
  /* Beautiful dark gradient to obscure the 3D canvas behind it */
  background: radial-gradient(ellipse at center, #0a1128 0%, #010409 100%);
  border-top: 1px solid rgba(0, 229, 255, 0.1);
  border-bottom: 1px solid rgba(0, 229, 255, 0.1);
  z-index: 10;
}"""

# Update the section-title CSS which is currently:
old_title_css = """    .section-title {
      font-family: var(--font-display);
      font-size: clamp(32px, 5vw, 64px);
      font-weight: 800;
      line-height: 1.1;
      /* Premium metallic silver gradient */
      background: linear-gradient(180deg, #FFFFFF 0%, #a0a5aa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 24px;
      letter-spacing: -1px;
    }"""

new_title_css = """    .section-title {
      font-family: var(--font-display);
      font-size: clamp(32px, 5vw, 64px);
      font-weight: 800;
      line-height: 1.1;
      /* Vibrant colorful gradient */
      background: linear-gradient(90deg, #00e5ff 0%, #bd00ff 50%, #ff5500 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 24px;
      letter-spacing: -1px;
    }"""

content = content.replace(old_css_marquee, new_css_marquee)
content = content.replace(old_title_css, new_title_css)

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Phase 7 CSS in master HTML successfully.")
