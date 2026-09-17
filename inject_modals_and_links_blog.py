import re

with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

# Extract modal block from about.html
# It should start somewhere with <style id="faq-modal-css"> or <!-- FAQ MODAL OVERLAY -->
# Let's just find the start of the injected block.
modal_match = re.search(r'(<!-- INJECTED MODALS START -->.*<!-- INJECTED MODALS END -->)', about_html, re.DOTALL)
modals = modal_match.group(1) if modal_match else ''

if not modals:
    # Maybe I didn't use INJECTED MODALS START. Let's find <!-- FAQ MODAL OVERLAY --> up to closing script of closeAuditModal
    m = re.search(r'(<style>\s*/\*\s*FAQ MODAL OVERLAY.*?)\s*</body>', about_html, re.DOTALL)
    if m:
        modals = m.group(1)
        
with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

# Replace Testimonials Desktop Link
old_test = '<li class="nav-item" id="nav-item-testimonials">\n        <span>Testimonials</span>\n      </li>'
new_test = '<li class="nav-item" id="nav-item-testimonials">\n        <a href="final-website-master.html#phase8-testimonials" style="text-decoration: none; color: inherit; display: block; width: 100%; height: 100%;">Testimonials</a>\n      </li>'
blog_html = blog_html.replace(old_test, new_test)
blog_html = blog_html.replace('<span>Testimonials</span>\n      </li>', '<a href="final-website-master.html#phase8-testimonials" style="text-decoration: none; color: inherit; display: block; width: 100%; height: 100%;">Testimonials</a>\n      </li>')

# Replace Testimonials Mobile Link
blog_html = blog_html.replace('<a href="testimonials.html"', '<a href="final-website-master.html#phase8-testimonials"')

# Inject Modals
if modals and 'closeAuditModal' not in blog_html:
    blog_html = blog_html.replace('</body>', '\n' + modals + '\n</body>')

with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_html)
print('Done injecting modals and fixing links in blog.html.')
