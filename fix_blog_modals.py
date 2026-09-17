import re

with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

# 1. Fix Button Size
old_btn = '<button type="submit" class="btn-cta-glow" id="audit-submit-btn" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px 24px;">'
new_btn = '<button type="submit" class="btn-cta-glow" id="audit-submit-btn" style="width: 100% !important; justify-content: center !important; font-size: 1.1rem !important; padding: 14px 24px !important; min-height: 50px !important;">'
blog_html = blog_html.replace(old_btn, new_btn)

# Also fix the Return to Site button
old_return = '<button class="btn-cta-glow" onclick="closeAuditModal()" type="button" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px 24px; background: rgba(0, 212, 255, 0.1); color: white; font-weight: 700; border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 12px; letter-spacing: 1px; transition: all 0.3s ease;">'
new_return = '<button class="btn-cta-glow" onclick="closeAuditModal()" type="button" style="width: 100% !important; justify-content: center !important; font-size: 1.1rem !important; padding: 14px 24px !important; min-height: 50px !important; background: rgba(0, 212, 255, 0.1); color: white !important; font-weight: 700; border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 12px; letter-spacing: 1px; transition: all 0.3s ease;">'
blog_html = blog_html.replace(old_return, new_return)

# 2. Inject Confetti
confetti_tag = '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>'
if confetti_tag not in blog_html:
    blog_html = blog_html.replace('</head>', '  ' + confetti_tag + '\n</head>')

# 3. Inject FAQ CSS
# Extract the FAQ CSS block from master
faq_css_match = re.search(r'(\.p12-faq-item \{.*?\n\s*\.p12-faq-answer p \{.*?\})', master_html, re.DOTALL)
if faq_css_match:
    faq_css = faq_css_match.group(1)
    
    # Check if FAQ CSS already exists in blog.html, if not, inject it before </head>
    if '.p12-faq-item {' not in blog_html:
        # Let's add a few more known FAQ classes that might be missing
        extra_css = '''
        .p12-faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 25px 35px;
            background: none;
            border: none;
            color: white;
            font-size: 1.15rem;
            font-weight: 600;
            text-align: left;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s ease;
        }
        .p12-faq-icon {
            position: relative;
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            margin-left: 20px;
        }
        .p12-faq-icon::before, .p12-faq-icon::after {
            content: '';
            position: absolute;
            background: rgba(255,255,255,0.7);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .p12-faq-icon::before { top: 9px; left: 0; width: 20px; height: 2px; }
        .p12-faq-icon::after { top: 0; left: 9px; width: 2px; height: 20px; }
        .p12-faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .p12-faq-answer p {
            padding: 0 35px 35px;
            color: rgba(255,255,255,0.6);
            line-height: 1.6;
            margin: 0;
            font-size: 0.95rem;
        }
        '''
        
        full_faq_css = f'<style>\n{faq_css}\n{extra_css}\n</style>\n'
        blog_html = blog_html.replace('</head>', full_faq_css + '</head>')

with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_html)
print('Fixed blog modals (button sizes, confetti, FAQ CSS)')
