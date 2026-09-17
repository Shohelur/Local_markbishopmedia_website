import re

with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

# Extract the base FAQ accordion CSS block from final-website-master.html
# It starts with .p12-faq-item and ends around .p12-faq-answer
match = re.search(r'(\.p12-faq-item \{.*?\.p12-faq-answer \{.*?\})', master_html, re.DOTALL)

if match:
    # We will just construct the missing CSS manually to be 100% safe
    base_faq_css = '''
<style>
/* =============================================
   FAQ ACCORDION BASE CSS (RESTORED)
   ============================================= */
.p12-faq-item {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 100%;
}
.p12-faq-item:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(0, 212, 255, 0.2);
}
.p12-faq-question {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100%;
  cursor: pointer;
  border: none;
}
.p12-faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.p12-faq-item.active .p12-faq-answer {
  max-height: 500px;
}
.p12-faq-icon {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.p12-faq-icon::before, .p12-faq-icon::after {
  content: '';
  position: absolute;
  background: #fff;
  transition: transform 0.3s ease;
}
.p12-faq-icon::before { width: 16px; height: 2px; }
.p12-faq-icon::after { width: 2px; height: 16px; }
.p12-faq-item.active .p12-faq-icon::after {
  transform: rotate(90deg);
  opacity: 0;
}
.p12-faq-item.active .p12-faq-icon::before {
  background: var(--cyan-glow, #00d4ff);
}
</style>
'''

    for file_path in ['d:/Agentic OS/agency-website/about.html', 'd:/Agentic OS/agency-website/blog.html']:
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()

        if 'FAQ ACCORDION BASE CSS (RESTORED)' not in html:
            html = html.replace('</head>', base_faq_css + '\n</head>')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Injected base FAQ accordion CSS into {file_path}")
        else:
            print(f"{file_path} already has the base FAQ CSS.")
else:
    print("Could not find the base FAQ CSS in master.")
