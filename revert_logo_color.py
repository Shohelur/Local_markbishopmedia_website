with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

bad_css = '''    /* Make the brand logo solid dark for light mode */
    .brand-logo-svg.brand-logo-full,
    .brand-logo-mobile-icon,
    .brand-logo-svg.brand-logo-mobile-icon {
      filter: brightness(0) !important;
    }'''

html = html.replace(bad_css, '')

with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Reverted logo color in blog.html.')
