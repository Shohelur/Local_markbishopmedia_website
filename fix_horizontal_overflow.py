import re

file_path = r'd:\Agentic OS\agency-website\approved\blog.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add overflow-x to HTML
html = html.replace('body {\n      font-family:', 'html, body {\n      overflow-x: hidden;\n      width: 100%;\n    }\n    body {\n      font-family:')
# If it's already there from a previous fix, let's just make sure we replace the 100vw issues
if 'width: 100vw;' in html:
    html = html.replace('width: 100vw;', 'width: 100%;')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
