import re

with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

# 1. Extract Footer CSS
css_match = re.search(r'(<!-- ==============================================\s*PHASE 13: MAGNETIC V2 DASHBOARD.*?</style>)', master_html, re.DOTALL)
footer_css = css_match.group(1) if css_match else ''

# 2. Extract Footer HTML
html_match = re.search(r'(<footer id="phase13-cyber-footer">.*?</footer>)', master_html, re.DOTALL)
footer_html = html_match.group(1) if html_match else ''

# 3. Extract Footer JS (the canvas animation script)
js_match = re.search(r'(<script>\s*// --- V4: FLUID PARTICLE OCEAN.*?)</script>', master_html, re.DOTALL)
footer_js = js_match.group(1) + '</script>' if js_match else ''

if footer_html:
    # Fix links
    footer_html = footer_html.replace('href="#phase4-services"', 'href="final-website-master.html#phase4-services"')
    footer_html = footer_html.replace('href="#phase8-testimonials"', 'href="final-website-master.html#phase8-testimonials"')
    footer_html = footer_html.replace('href="#phase11-booking"', 'href="final-website-master.html#phase11-booking"')
    
    # We also need to fix 'href="about.html"' to 'href="about.html"' (no change needed)
    # And 'href="blog.html"' to 'href="blog.html"' (no change needed)

    for file_path in ['d:/Agentic OS/agency-website/about.html', 'd:/Agentic OS/agency-website/blog.html']:
        with open(file_path, 'r', encoding='utf-8') as f:
            target_html = f.read()

        if '<footer id="phase13-cyber-footer">' not in target_html:
            # Inject CSS before </head>
            target_html = target_html.replace('</head>', '\n' + footer_css + '\n</head>')
            
            # Inject HTML and JS just before <!-- FAQ MODAL OVERLAY --> or </body>
            if '<!-- FAQ MODAL OVERLAY -->' in target_html:
                target_html = target_html.replace('<!-- FAQ MODAL OVERLAY -->', '\n' + footer_html + '\n' + footer_js + '\n\n<!-- FAQ MODAL OVERLAY -->')
            else:
                # If FAQ modal is missing, just inject before </body>
                target_html = target_html.replace('</body>', '\n' + footer_html + '\n' + footer_js + '\n</body>')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(target_html)
            print(f"Successfully injected footer into {file_path}")
        else:
            print(f"Footer already exists in {file_path}")
else:
    print("Failed to extract footer from master.")
