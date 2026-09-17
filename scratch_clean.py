import re

with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove old HTML (nav wrapper)
content = re.sub(r'<(div|nav)[^>]*class="master-nav-wrapper"[^>]*>.*?</\1>', '', content, flags=re.DOTALL)

# Remove old modals
content = re.sub(r'<div[^>]*class="mobile-drawer-sheet"[^>]*>.*?</div>', '', content, flags=re.DOTALL)
content = re.sub(r'<div[^>]*id="faq-modal-overlay"[^>]*>.*?</div>\s*(<style>.*?</style>)?', '', content, flags=re.DOTALL)
content = re.sub(r'<div[^>]*id="audit-modal-overlay"[^>]*>.*?</div>\s*(<style>.*?</style>)?', '', content, flags=re.DOTALL)

# Remove old JS
content = re.sub(r'/\*\s*--- 4\. APPROVED MASTER 3D NAVIGATION INTERACTION CONTROLLER --- \*/.*?(?=</script>|/\*\s*--- 5\.|/\*\s*PHASE 4)', '', content, flags=re.DOTALL)

# Also remove the duplicate HTML body tags that got inserted AFTER the </nav> block!
# In the earlier inspection I saw:
# </nav>
# </div>
# <!DOCTYPE html>
# \n
# <section id="about-mark">
# So let's just find <!DOCTYPE html>\n\n<canvas id="glass-canvas"> and remove the doctype.
content = re.sub(r'<!DOCTYPE html>\s*<canvas', '<canvas', content)

# Inject Clean HTML and JS
with open('d:/Agentic OS/nav_html.txt', 'r', encoding='utf-8') as f:
    new_html = f.read()
with open('d:/Agentic OS/nav_js.txt', 'r', encoding='utf-8') as f:
    new_js = f.read()

content = re.sub(r'(<body[^>]*>)', r'\1\n' + new_html, content, count=1)
content = re.sub(r'(<script[^>]*>)', r'\1\n' + new_js, content, count=1)

with open('d:/Agentic OS/agency-website/about.html', 'w', encoding='utf-8') as f:
    f.write(content)
