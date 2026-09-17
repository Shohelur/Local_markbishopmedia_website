import re

file_path = r'd:\Agentic OS\agency-website\blog\post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Let's see all CSS for post-author
matches = re.findall(r'.*post-author.*\{.*?\}', html, re.DOTALL)
if not matches:
    print('No post-author specific full blocks found. Searching line by line:')
    lines = html.split('\n')
    for i, line in enumerate(lines):
        if 'post-author' in line:
            print(f'Line {i+1}: {line.strip()}')
            # print surrounding 5 lines
            for j in range(i+1, min(i+6, len(lines))):
                print(f'      {lines[j].strip()}')
else:
    for m in matches:
        print(m)
