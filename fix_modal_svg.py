import re

files = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html'
]

old_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
new_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    html = html.replace(old_svg, new_svg)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Fixed SVGs in {file_path}')
