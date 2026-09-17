import re

file_path = r'd:\Agentic OS\agency-website\blog\post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove top gap from header
html = html.replace('margin: 120px auto 0 auto;', 'margin: 30px auto 0 auto;')

# 2. Add floating back button and background meshes right after body
body_start = '<body class="blog-read-page">'
floating_elements = '''<body class="blog-read-page">

<!-- Colorful Ambient Background -->
<div class="ambient-bg" style="position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 15% 50%, rgba(79, 70, 229, 0.15), transparent 40%), radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.15), transparent 40%), radial-gradient(circle at 50% 100%, rgba(225, 29, 72, 0.1), transparent 50%); pointer-events: none;"></div>

<!-- Floating Fixed Back Button -->
<a href="../blog.html" class="floating-back-btn">← Back</a>
'''
html = html.replace(body_start, floating_elements)

# 3. Remove old back button
old_nav = '''      <div class="blog-header-nav">
        <a href="../blog.html" class="back-to-blog-btn">← Back to Blog</a>
      </div>'''
html = html.replace(old_nav, '')

# 4. Add bottom back button before HR
hr_tag = '<hr>'
bottom_btn = '''<div class="bottom-back-wrapper">
      <a href="../blog.html" class="bottom-back-btn">← Back to Blog</a>
    </div>
    <hr>'''
html = html.replace(hr_tag, bottom_btn, 1)

# 5. Add new CSS for buttons
css_to_add = '''
  /* FLOATING BACK BUTTON */
  .floating-back-btn {
    position: fixed;
    top: 24px;
    left: 24px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.8), rgba(6, 182, 212, 0.8));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3), 0 0 15px rgba(6, 182, 212, 0.4);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .floating-back-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 35px rgba(0,0,0,0.4), 0 0 25px rgba(6, 182, 212, 0.6);
    color: #ffffff;
  }
  
  /* BOTTOM BACK BUTTON */
  .bottom-back-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  .bottom-back-btn {
    display: inline-flex;
    align-items: center;
    padding: 14px 32px;
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    color: #f8fafc;
    border-radius: 10px;
    text-decoration: none;
    font-size: 16px;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .bottom-back-btn:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }
'''
html = html.replace('/* GLASS TIP STYLES */', css_to_add + '\n  /* GLASS TIP STYLES */')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
