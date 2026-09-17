import re

with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_test_html = '<li class="nav-item" id="nav-item-testimonials">\n        <span>Testimonials</span>\n      </li>'
new_test_html = '<li class="nav-item" id="nav-item-testimonials">\n        <a href="final-website-master.html#phase8-testimonials" style="text-decoration: none; color: inherit; display: block; width: 100%; height: 100%;">Testimonials</a>\n      </li>'

if old_test_html in html:
    html = html.replace(old_test_html, new_test_html)
else:
    # Try regex fallback if spacing is different
    html = re.sub(
        r'<li class="nav-item" id="nav-item-testimonials">\s*<span>Testimonials</span>\s*</li>',
        new_test_html,
        html
    )

with open('d:/Agentic OS/agency-website/about.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated testimonials link in about.html')
