import re
import os

master_path = r"D:\Agentic OS\agency-website\final-website-master.html"

with open(master_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the CSS to include the new colors
old_css = """    .t-med { --theme-color: #00e5ff; }
    .t-hvac { --theme-color: #ff5500; }
    .t-roof { --theme-color: #b8ff57; }
    .t-law { --theme-color: #bd00ff; }
    .t-auto { --theme-color: #ff3333; }
    .t-elec { --theme-color: #ffd700; }
    .t-pest { --theme-color: #00ff88; }
    .t-clean { --theme-color: #0088ff; }
    .t-all { --theme-color: #ffffff; }"""

new_css = """    .t-med { --theme-color: #00e5ff; }
    .t-hvac { --theme-color: #ff5500; }
    .t-roof { --theme-color: #b8ff57; }
    .t-law { --theme-color: #bd00ff; }
    .t-auto { --theme-color: #ff3333; }
    .t-elec { --theme-color: #ffd700; }
    .t-pest { --theme-color: #00ff88; }
    .t-clean { --theme-color: #0088ff; }
    .t-real { --theme-color: #ff9900; }
    .t-land { --theme-color: #33cc33; }
    .t-chiro { --theme-color: #00ccff; }
    .t-food { --theme-color: #ff3366; }
    .t-move { --theme-color: #ffcc00; }
    .t-gym { --theme-color: #ff5500; }
    .t-spa { --theme-color: #ff66b2; }
    .t-vet { --theme-color: #33ff99; }
    .t-build { --theme-color: #ffaa00; }
    .t-paint { --theme-color: #aa00ff; }
    .t-cpa { --theme-color: #00ffcc; }
    .t-all { --theme-color: #ffffff; }"""

# 2. Update the HTML block for the 20 items. 
# We need to replace the entire <div class="marquee-track"> contents.

track_content_regex = re.compile(r'<div class="marquee-track">.*?</div>\s*</div>\s*</section>', re.DOTALL)

new_track_content = """<div class="marquee-track">
      
      <!-- SET 1 -->
      <div class="industry-item t-med"><div class="industry-icon">⚕️</div> Dentists & Medical</div>
      <div class="industry-item t-hvac"><div class="industry-icon">🔧</div> Plumbers & HVAC</div>
      <div class="industry-item t-roof"><div class="industry-icon">🏠</div> Roofers & Contractors</div>
      <div class="industry-item t-law"><div class="industry-icon">⚖️</div> Attorneys & Law Firms</div>
      <div class="industry-item t-elec"><div class="industry-icon">⚡</div> Electricians</div>
      <div class="industry-item t-auto"><div class="industry-icon">🚗</div> Auto Repair</div>
      <div class="industry-item t-pest"><div class="industry-icon">🐜</div> Pest Control</div>
      <div class="industry-item t-clean"><div class="industry-icon">✨</div> Cleaning Services</div>
      <div class="industry-item t-real"><div class="industry-icon">🏡</div> Real Estate</div>
      <div class="industry-item t-land"><div class="industry-icon">🌳</div> Landscaping</div>
      <div class="industry-item t-chiro"><div class="industry-icon">🦴</div> Chiropractors</div>
      <div class="industry-item t-food"><div class="industry-icon">🍽️</div> Restaurants & Cafes</div>
      <div class="industry-item t-move"><div class="industry-icon">📦</div> Movers</div>
      <div class="industry-item t-gym"><div class="industry-icon">🏋️</div> Fitness Centers</div>
      <div class="industry-item t-spa"><div class="industry-icon">💆‍♀️</div> Salons & Spas</div>
      <div class="industry-item t-vet"><div class="industry-icon">🐾</div> Veterinarians</div>
      <div class="industry-item t-build"><div class="industry-icon">🔨</div> Home Remodeling</div>
      <div class="industry-item t-paint"><div class="industry-icon">🎨</div> Painters</div>
      <div class="industry-item t-cpa"><div class="industry-icon">📊</div> Accountants & CPAs</div>
      <div class="industry-item t-all"><div class="industry-icon">📍</div> All Local Businesses</div>

      <!-- SET 2 (DUPLICATE FOR SEAMLESS LOOPING) -->
      <div class="industry-item t-med"><div class="industry-icon">⚕️</div> Dentists & Medical</div>
      <div class="industry-item t-hvac"><div class="industry-icon">🔧</div> Plumbers & HVAC</div>
      <div class="industry-item t-roof"><div class="industry-icon">🏠</div> Roofers & Contractors</div>
      <div class="industry-item t-law"><div class="industry-icon">⚖️</div> Attorneys & Law Firms</div>
      <div class="industry-item t-elec"><div class="industry-icon">⚡</div> Electricians</div>
      <div class="industry-item t-auto"><div class="industry-icon">🚗</div> Auto Repair</div>
      <div class="industry-item t-pest"><div class="industry-icon">🐜</div> Pest Control</div>
      <div class="industry-item t-clean"><div class="industry-icon">✨</div> Cleaning Services</div>
      <div class="industry-item t-real"><div class="industry-icon">🏡</div> Real Estate</div>
      <div class="industry-item t-land"><div class="industry-icon">🌳</div> Landscaping</div>
      <div class="industry-item t-chiro"><div class="industry-icon">🦴</div> Chiropractors</div>
      <div class="industry-item t-food"><div class="industry-icon">🍽️</div> Restaurants & Cafes</div>
      <div class="industry-item t-move"><div class="industry-icon">📦</div> Movers</div>
      <div class="industry-item t-gym"><div class="industry-icon">🏋️</div> Fitness Centers</div>
      <div class="industry-item t-spa"><div class="industry-icon">💆‍♀️</div> Salons & Spas</div>
      <div class="industry-item t-vet"><div class="industry-icon">🐾</div> Veterinarians</div>
      <div class="industry-item t-build"><div class="industry-icon">🔨</div> Home Remodeling</div>
      <div class="industry-item t-paint"><div class="industry-icon">🎨</div> Painters</div>
      <div class="industry-item t-cpa"><div class="industry-icon">📊</div> Accountants & CPAs</div>
      <div class="industry-item t-all"><div class="industry-icon">📍</div> All Local Businesses</div>

    </div>
  </div>
</section>"""

if old_css in content:
    content = content.replace(old_css, new_css)
else:
    print("Warning: CSS not found.")

if track_content_regex.search(content):
    content = track_content_regex.sub(new_track_content, content)
else:
    print("Warning: HTML Track not found.")

# We also need to increase the animation speed since the track is now much longer.
# Old: animation: scroll 35s linear infinite;
# New track is >2x the size, so maybe 60s is better to keep the visual speed the same.
content = content.replace("animation: scroll 35s linear infinite;", "animation: scroll 65s linear infinite;")

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Expanded marquee to 20 items successfully.")
