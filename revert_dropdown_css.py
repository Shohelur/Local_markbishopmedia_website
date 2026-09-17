with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
# We want to remove the block from "/* Hover dropdown text */" up to "</style>"
pattern = r'/\* Hover dropdown text \*/.*?(?=</style>)'
html = re.sub(pattern, '', html, flags=re.DOTALL)

with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Reverted dropdown CSS.')
