files_to_fix = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html',
    'd:/Agentic OS/agency-website/blog.html'
]

override_css = '''
<style>
/* =============================================
   FOOTER BACKGROUND & FAQ TITLE FIXES
   ============================================= */
#phase13-cyber-footer {
    background: #020205 !important;
    position: relative;
    z-index: 100;
}
#faq-modal-overlay .p12-title {
    color: #ffffff !important;
}
#faq-modal-overlay .p12-subtitle {
    color: rgba(255, 255, 255, 0.7) !important;
}
#faq-modal-overlay .p12-tag {
    color: #00d4ff !important;
    border-color: rgba(0, 212, 255, 0.3) !important;
}
#audit-modal-overlay h2, #audit-modal-overlay p, #audit-modal-overlay label {
    color: #ffffff !important;
}
#audit-modal-overlay .audit-modal-header p {
    color: rgba(255, 255, 255, 0.7) !important;
}
</style>
'''

for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    if 'FOOTER BACKGROUND & FAQ TITLE FIXES' not in html:
        html = html.replace('</head>', override_css + '\n</head>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Injected footer background and FAQ title fixes into {file_path}")
    else:
        print(f"{file_path} already has the fixes.")
