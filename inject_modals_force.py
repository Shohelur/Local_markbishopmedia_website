with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

import re
# We know the block starts with <!-- FAQ MODAL OVERLAY --> and goes up to just before </body>
modal_match = re.search(r'(<!-- FAQ MODAL OVERLAY -->.*?</script>)\s*</body>', about_html, re.DOTALL)
if modal_match:
    modals = modal_match.group(1)
    
    with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
        blog_html = f.read()
    
    # only inject if it's not already there
    if '<!-- FAQ MODAL OVERLAY -->' not in blog_html:
        blog_html = blog_html.replace('</body>', '\n' + modals + '\n</body>')
        
        with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
            f.write(blog_html)
        print("Modals forcefully injected into blog.html.")
    else:
        print("Modals already exist.")
else:
    print("Could not find modal block in about.html")
