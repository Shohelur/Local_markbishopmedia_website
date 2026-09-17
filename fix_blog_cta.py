import re

file_path = 'd:/Agentic OS/agency-website/blog.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Inject CSS overrides for .p11-footer
override_css = '''
<style>
/* =============================================
   BLOG CTA SECTION (SLIM & LIGHT MODE)
   ============================================= */
.p11-footer {
    background: var(--bg-base) !important;
    padding: 40px 20px 40px !important; /* Slimmer */
    color: var(--text-main) !important;
    border-top: 1px solid var(--border-glass) !important;
}
.p11-footer h2 {
    color: var(--text-main) !important;
    font-size: clamp(2rem, 4vw, 3rem) !important;
    margin-bottom: 15px !important;
}
.p11-footer p {
    color: var(--text-muted) !important;
    margin-bottom: 25px !important;
}
.p11-footer-cta {
    background: linear-gradient(90deg, #00d4ff, #b8ff57) !important;
    color: #030814 !important;
    padding: 16px 32px !important;
    border: none !important;
    border-radius: 8px !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.2) !important;
}
.p11-footer-cta:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 30px rgba(184, 255, 87, 0.4) !important;
}
</style>
'''

if 'BLOG CTA SECTION (SLIM & LIGHT MODE)' not in html:
    html = html.replace('</head>', override_css + '\n</head>')

# 2. Update the HTML for the CTA button to trigger the modal
html = html.replace('<a href="#" class="p11-footer-cta">Get Your Free 9-Mile Audit</a>', 
                    '<a href="javascript:void(0)" onclick="openAuditModal()" class="p11-footer-cta">Get Your Free 9-Mile Audit</a>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Blog CTA section updated.")
