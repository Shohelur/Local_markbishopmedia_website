import re

files_to_fix = [
    'd:/Agentic OS/agency-website/final-website-master.html',
    'd:/Agentic OS/agency-website/about.html',
    'd:/Agentic OS/agency-website/blog.html'
]

old_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
new_svg = '<svg viewBox="0 0 24 24" fill="none" style="width: 24px; height: 24px; min-width: 24px; min-height: 24px; display: block; overflow: visible;"><line x1="18" y1="6" x2="6" y2="18" style="stroke: #00d4ff !important; stroke-width: 2.5px !important; stroke-linecap: round;"></line><line x1="6" y1="6" x2="18" y2="18" style="stroke: #00d4ff !important; stroke-width: 2.5px !important; stroke-linecap: round;"></line></svg>'

faq_js_snippet = '''
<script>
  // Setup FAQ toggle logic
  document.addEventListener('DOMContentLoaded', () => {
    function initFaqModals() {
        const premiumFaqItems = document.querySelectorAll('.p12-faq-item');
        premiumFaqItems.forEach(item => {
            // Remove old listeners to prevent duplicates if called multiple times
            const clone = item.cloneNode(true);
            if (item.parentNode) {
                item.parentNode.replaceChild(clone, item);
            }
            clone.addEventListener('click', () => {
                const isActive = clone.classList.contains('active');
                document.querySelectorAll('.p12-faq-item').forEach(faq => faq.classList.remove('active'));
                if (!isActive) {
                    clone.classList.add('active');
                }
            });
        });
    }
    // Run it immediately and also bind to the modal open just in case
    initFaqModals();
    
    const originalOpenFaq = window.openFaqModal;
    window.openFaqModal = function() {
        if(originalOpenFaq) originalOpenFaq();
        setTimeout(initFaqModals, 100);
    };
  });
</script>
'''

for file_path in files_to_fix:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Replace the close button SVG
    html = html.replace(old_svg, new_svg)
    
    # Also just in case the old SVG was slightly different:
    old_svg_alt = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;">'
    if old_svg_alt in html and new_svg not in html:
       html = re.sub(r'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;">.*?</svg>', new_svg, html, flags=re.DOTALL)

    # 2. Inject FAQ JS if not final-website-master (since master already has it)
    if 'final-website-master' not in file_path:
        if 'initFaqModals' not in html:
            html = html.replace('</body>', faq_js_snippet + '\n</body>')
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)

print('Fixed FAQ close buttons and injected FAQ toggle JS')
