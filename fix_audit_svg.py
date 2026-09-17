import re

files = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html'
]

robust_svg = '<svg viewBox="0 0 24 24" fill="none" style="width: 24px; height: 24px; min-width: 24px; min-height: 24px; display: block; overflow: visible;"><line x1="18" y1="6" x2="6" y2="18" style="stroke: #00d4ff !important; stroke-width: 2.5px !important; stroke-linecap: round;"></line><line x1="6" y1="6" x2="18" y2="18" style="stroke: #00d4ff !important; stroke-width: 2.5px !important; stroke-linecap: round;"></line></svg>'

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # We find the <button class="faq-modal-close" onclick="closeAuditModal()"> and its inner content
    # and replace the SVG.
    
    pattern = r'(<button class="faq-modal-close" onclick="closeAuditModal()">\s*)<svg.*?</svg>(\s*</button>)'
    
    html = re.sub(pattern, r'\g<1>' + robust_svg + r'\g<2>', html, flags=re.DOTALL)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Fixed robust SVG in {file_path}')
