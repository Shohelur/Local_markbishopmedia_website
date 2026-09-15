import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the specific array with a massive colorful one
colorful_array = "colors: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff', '#00d4ff', '#b8ff57', '#ff00ff', '#ffff00', '#00ff00']"

html = html.replace("colors: ['#00d4ff', '#b8ff57', '#ffffff'] // Cyan, Lime, White", colorful_array + " // Multicolored")
html = html.replace("colors: ['#00d4ff', '#b8ff57', '#ffffff']", colorful_array)

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Colors updated successfully.")
