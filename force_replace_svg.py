files = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html'
]

robust_svg = '<svg viewBox="0 0 24 24" fill="none" style="width: 24px; height: 24px; min-width: 24px; min-height: 24px; display: block; overflow: visible;"><line x1="18" y1="6" x2="6" y2="18" style="stroke: #00d4ff !important; stroke-width: 2.5px !important; stroke-linecap: round;"></line><line x1="6" y1="6" x2="18" y2="18" style="stroke: #00d4ff !important; stroke-width: 2.5px !important; stroke-linecap: round;"></line></svg>'

old_str_1 = '''<button class="faq-modal-close" onclick="closeAuditModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>'''

old_str_2 = '''<button class="faq-modal-close" onclick="closeAuditModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>'''

new_str = f'''<button class="faq-modal-close" onclick="closeAuditModal()">
        {robust_svg}
      </button>'''

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = html.replace(old_str_1, new_str)
    html = html.replace(old_str_2, new_str)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Fixed robust SVG in {file_path}')
