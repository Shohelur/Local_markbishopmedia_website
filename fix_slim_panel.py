files_to_fix = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html',
    'd:/Agentic OS/agency-website/blog.html'
]

override_css = '''
<style>
/* =============================================
   SLIM TOP-RIGHT THEME PANEL OVERRIDE
   ============================================= */
.theme-panel,
.theme-glass-panel {
    top: 120px !important;
    transform: none !important;
    right: 15px !important;
    padding: 12px 8px !important;
    border-radius: 20px !important;
    gap: 10px !important;
    width: auto !important;
}
.theme-dot {
    width: 12px !important;
    height: 12px !important;
    border-radius: 4px !important; /* Slim rounded square */
}
.theme-dot::after {
    border-radius: 6px !important;
}
.theme-glass-panel .theme-dot::before {
    border-radius: 6px !important;
    top: -3px !important;
    left: -3px !important;
    right: -3px !important;
    bottom: -3px !important;
}
</style>
'''

for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # If it's already there, replace it
    if 'SLIM TOP-RIGHT THEME PANEL OVERRIDE' in html:
        import re
        html = re.sub(r'<style>\s*/\* =+.*?SLIM TOP-RIGHT THEME PANEL OVERRIDE.*?</style>', override_css, html, flags=re.DOTALL)
    else:
        html = html.replace('</head>', override_css + '\n</head>')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Injected slim panel CSS into {file_path}")
