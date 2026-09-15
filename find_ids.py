import re
f=open(r'D:\Agentic OS\agency-website\final-website-master.html', 'r', encoding='utf-8').read()
ids = re.findall(r'id="([^"]+)"', f)
for i in ids:
    if 'phase' in i.lower() or '10' in i or '11' in i or '13' in i:
        print(i)
