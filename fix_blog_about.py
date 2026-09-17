with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('approved/about.html', 'about.html')

with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated about page links in blog.html')
