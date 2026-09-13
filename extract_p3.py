import sys
import re

file = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Try to find the section by checking for geo-radar or scan
match = re.search(r'<section[^>]*id="phase3[^>]*>', content)
if not match:
    match = re.search(r'<section[^>]*id="radar[^>]*>', content)
if not match:
    match = re.search(r'<section[^>]*class="[^"]*radar[^"]*">', content)

if match:
    start = match.start()
    end = min(len(content), start + 3000)
    with open('phase3_html.txt', 'w', encoding='utf-8') as out:
        out.write(content[start:end])
    print('Found and wrote to phase3_html.txt')
else:
    print('Section not found')
