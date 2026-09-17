import re

with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

btn_match = re.search(r'(\.p11-submit-btn \{.*?\n\s*\.p11-submit-btn:active \{.*?\})', master_html, re.DOTALL)
if btn_match:
    btn_css = btn_match.group(1) + '\n'
    # Just in case, hardcode it if regex fails to grab everything
    btn_css = '''
    .p11-submit-btn {
      width: 100%;
      padding: 18px;
      background: linear-gradient(90deg, #00d4ff, #b8ff57) !important;
      border: none !important;
      border-radius: 8px !important;
      color: #030814 !important;
      font-weight: 800 !important;
      font-size: 18px !important;
      font-family: 'Inter', sans-serif !important;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      box-shadow: 0 4px 15px rgba(0, 212, 255, 0.2);
    }
    .p11-submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(184, 255, 87, 0.4);
    }
    .p11-submit-btn:active {
      transform: translateY(0);
    }
    '''

    for file_path in ['d:/Agentic OS/agency-website/blog.html', 'd:/Agentic OS/agency-website/about.html']:
        with open(file_path, 'r', encoding='utf-8') as f:
            html = f.read()
        
        # Inject into the existing <style> tag just before </head>
        if '.p11-submit-btn {' not in html:
            html = html.replace('</head>', f'<style>{btn_css}</style>\n</head>')
            
            # Revert the previous manual button replacements that removed the original text format
            html = html.replace('<button type="submit" class="btn-cta-glow" id="audit-submit-btn" style="width: 100% !important; justify-content: center !important; font-size: 1.1rem !important; padding: 14px 24px !important; min-height: 50px !important;">', 
                                '<button type="submit" class="p11-submit-btn" id="audit-submit-btn">')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f'Injected p11-submit-btn CSS into {file_path}')
        else:
            print(f'{file_path} already has p11-submit-btn css')
