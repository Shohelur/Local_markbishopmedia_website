import re

file_path = r'd:\Agentic OS\agency-website\blog.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Make sure .author-avatar has object-fit: cover
if '{ width: 40px; height: 40px; border-radius: 50%; background: #cbd5e1; }' in html:
    html = html.replace(
        '{ width: 40px; height: 40px; border-radius: 50%; background: #cbd5e1; }',
        '{ width: 40px; height: 40px; border-radius: 50%; background: #cbd5e1; object-fit: cover; }'
    )
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        print("Updated CSS for .author-avatar")
else:
    print("CSS for .author-avatar not exactly matched or already has object-fit.")
