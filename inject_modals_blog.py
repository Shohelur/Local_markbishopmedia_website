import re

# Read master
with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

# Read blog
with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

# Extract FAQ modal CSS
faq_css_match = re.search(r'(<!-- ==============================================\nFAQ MODAL OVERLAY\n=============================================== -->.*?)</style>', master_html, re.DOTALL)
faq_css = faq_css_match.group(1) + '</style>' if faq_css_match else ''

# Extract Modals HTML (FAQ and Audit)
# The modals are at the end of the body in master
modals_html_match = re.search(r'(<div id="faq-modal-overlay" class="faq-modal-overlay">.*?</div>\n  </div>\n  </div>)', master_html, re.DOTALL)
modals_html = modals_html_match.group(1) if modals_html_match else ''
# Wait, let's just grab audit modal and faq modal manually since regex can be tricky with nested divs.
