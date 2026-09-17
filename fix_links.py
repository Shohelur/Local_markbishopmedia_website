with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix 4: Mobile Nav "About MBM" link
html = html.replace('<a href="approved/about.html" class="mob-direct-nav-link" onclick="closeMobileDrawer()">', '<a href="about.html" class="mob-direct-nav-link" onclick="closeMobileDrawer()">')

with open('d:/Agentic OS/agency-website/final-website-master.html', 'w', encoding='utf-8') as f:
    f.write(html)
