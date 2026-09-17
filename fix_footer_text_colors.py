files_to_fix = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html',
    'd:/Agentic OS/agency-website/blog.html'
]

override_css = '''
<style>
/* =============================================
   FOOTER TEXT COLOR FIXES (FOR LIGHT MODE PAGES)
   ============================================= */
#phase13-cyber-footer .p13-link-item {
    color: #ffffff !important;
}
#phase13-cyber-footer .p13-link-item:hover {
    color: #b8ff57 !important; /* lime glow */
}
#phase13-cyber-footer .p13-col-title {
    color: rgba(255, 255, 255, 0.5) !important;
}
#phase13-cyber-footer .p13-manifesto,
#phase13-cyber-footer .p13-copyright,
#phase13-cyber-footer .p13-legal-links a {
    color: rgba(255, 255, 255, 0.7) !important;
}
#phase13-cyber-footer .p13-contact-btn {
    color: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
}
#phase13-cyber-footer .p13-contact-btn span {
    color: rgba(255, 255, 255, 0.5) !important;
}
#phase13-cyber-footer .p13-contact-btn strong {
    color: #ffffff !important;
}
</style>
'''

for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    if 'FOOTER TEXT COLOR FIXES' not in html:
        html = html.replace('</head>', override_css + '\n</head>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Injected footer text color fixes into {file_path}")
    else:
        print(f"{file_path} already has the text fixes.")
