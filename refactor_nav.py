import re

file_path = r'd:\Agentic OS\agency-website\blog\post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the floating back button HTML
floating_old = '<a href="../blog.html" class="floating-back-btn">← Back</a>'
nav_bar_new = '''
<nav class="blog-master-nav">
  <a href="../blog.html" class="nav-back-btn">
    <span>←</span> Back to Blog
  </a>
  <div class="nav-brand">MBM Insights</div>
</nav>
'''
html = html.replace(floating_old, nav_bar_new)

# 2. Add the CSS for the nav bar
css_old = '/* FLOATING BACK BUTTON */'
css_new = '''/* FULL WIDTH TOP NAV BAR */
  .blog-master-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: rgba(11, 17, 33, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  .nav-brand {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #f8fafc;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .nav-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2));
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 8px;
    color: #f8fafc;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .nav-back-btn:hover {
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(6, 182, 212, 0.4));
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(6, 182, 212, 0.2);
  }
  
  /* Reset header margin to account for fixed nav */
  .blog-top-header {
    margin-top: 120px !important;
  }
'''
html = html.replace(css_old, css_new + '\n' + css_old)

# Let's remove the old floating back btn CSS so it doesn't clutter
html = re.sub(r'/\* FLOATING BACK BUTTON \*/.*?/\* BOTTOM BACK BUTTON \*/', '/* BOTTOM BACK BUTTON */', html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
