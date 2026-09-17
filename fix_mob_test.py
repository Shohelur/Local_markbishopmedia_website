with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('href="testimonials.html"', 'href="final-website-master.html#phase8-testimonials"')

with open('d:/Agentic OS/agency-website/about.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Fixed mobile testimonials link in about.html')
