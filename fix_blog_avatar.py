import re

file_path = r'd:\Agentic OS\agency-website\blog.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the cartoon avatar with mark-bishop-real.png
html = html.replace('assets/images/cartoon_avatar_transparent.png', 'assets/images/mark-bishop-real.png')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
