files_to_fix = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html',
    'd:/Agentic OS/agency-website/blog.html'
]

override_css = '''
<style>
/* =============================================
   FAQ MODAL COMPACT OVERRIDES (FIX SPACING & COLOR)
   ============================================= */
.p12-faq-question {
    padding: 16px 20px !important;
    color: #ffffff !important;
    font-size: 1.05rem !important;
    margin: 0 !important;
    text-align: left !important;
    background: transparent !important;
}
.p12-faq-item.active .p12-faq-question {
    color: #00d4ff !important;
    padding-bottom: 10px !important;
}
.p12-faq-answer p {
    padding: 0 20px 16px 20px !important;
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 0.95rem !important;
    margin: 0 !important;
    line-height: 1.5 !important;
}
.p12-faq-icon {
    margin-left: 15px !important;
}
.p12-faq-item {
    margin-bottom: 12px !important;
}
</style>
'''

for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Inject just before </head>
    if 'FAQ MODAL COMPACT OVERRIDES' not in html:
        html = html.replace('</head>', override_css + '\n</head>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Injected compact FAQ CSS into {file_path}")
    else:
        print(f"{file_path} already has the override.")
