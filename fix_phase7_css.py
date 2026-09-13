import re
import os

master_path = r"D:\Agentic OS\agency-website\final-website-master.html"

with open(master_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to change the CSS for #phase7-industry-marquee
# Currently it is:
# padding: 100px 0;
# We will change to padding: 40px 0; 
# and add margin: 0 auto; to .section-header inside #phase7-industry-marquee

# Let's replace the padding
old_css_marquee = """#phase7-industry-marquee {
  position: relative;
  width: 100%;
  padding: 100px 0;
  /* Beautiful dark gradient to obscure the 3D canvas behind it */"""

new_css_marquee = """#phase7-industry-marquee {
  position: relative;
  width: 100%;
  padding: 40px 0;
  /* Beautiful dark gradient to obscure the 3D canvas behind it */"""

content = content.replace(old_css_marquee, new_css_marquee)

# Let's fix the alignment for .section-header
old_header_css = """    .section-header {
      text-align: center;
      margin-bottom: 50px;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }"""

new_header_css = """    #phase7-industry-marquee .section-header {
      text-align: center;
      margin-bottom: 40px;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
    }"""

content = content.replace(old_header_css, new_header_css)

# Namespace the other Phase 7 specific classes to avoid global conflict and ensure they work
content = content.replace("    .section-subtitle {", "    #phase7-industry-marquee .section-subtitle {")
content = content.replace("    .section-title {", "    #phase7-industry-marquee .section-title {")
content = content.replace("    .section-desc {", "    #phase7-industry-marquee .section-desc {")

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Phase 7 CSS for centering and padding.")
