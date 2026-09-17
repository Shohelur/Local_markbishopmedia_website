import re

file_path = 'd:/Agentic OS/agency-website/blog/post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add IDs to H2s so we can link them
h2_matches = re.finditer(r'<h2>(.*?)</h2>', html)
toc_items = []
offset = 0

for i, match in enumerate(h2_matches):
    title = match.group(1)
    # create a slug
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
    
    new_h2 = f'<h2 id="{slug}">{title}</h2>'
    # replace the exact h2, handling the fact that the string length changes
    
    # store for toc
    clean_title = re.sub(r'^Reason \d+:\s*', '', title) # Strip "Reason X:" if desired, or keep it. Let's keep it.
    toc_items.append(f'<li><a href="#{slug}">{title}</a></li>')

# Instead of complex offset math, just use sub with a function
def replace_h2(match):
    title = match.group(1)
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
    return f'<h2 id="{slug}">{title}</h2>'

html = re.sub(r'<h2>(.*?)</h2>', replace_h2, html)

# 2. Build the sidebar HTML
toc_html = f"""
    <aside class="post-sidebar">
      <div class="toc-container">
        <h4 class="toc-title">Contents</h4>
        <ul class="toc-list">
          {''.join(toc_items)}
        </ul>
      </div>
    </aside>
"""

# 3. Restructure the main article to have a wrapper
# The current structure has <article class="post-article"> which contains <div class="post-body">
# We want: 
# <div class="post-layout-wrapper">
#   <article class="post-article"> ... </article>
#   <aside class="post-sidebar"> ... </aside>
# </div>

# Let's find the main tag or the article tag
# It looks like: <main>\n  <article class="post-article">
# We want to change the CSS for main or add a wrapper.

html = html.replace('<main>', '<main class="post-layout-wrapper">')

# Inject the sidebar right before </main>
# But wait, </article> is before </main>
html = html.replace('</article>', '</article>\n' + toc_html)

# 4. Inject new CSS for the layout and sidebar
sidebar_css = """
  /* POST LAYOUT & SIDEBAR STYLES */
  .post-layout-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 60px;
    max-width: 1200px;
    margin: 140px auto 100px auto;
    padding: 0 40px;
  }
  
  /* Reset the post-article margin since the wrapper handles it */
  .post-article {
    max-width: 800px;
    margin: 0; 
    flex: 1;
    min-width: 0;
  }
  
  .post-sidebar {
    width: 300px;
    flex-shrink: 0;
    position: sticky;
    top: 120px;
  }
  
  .toc-container {
    background: transparent;
  }
  
  .toc-title {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .toc-list li {
    margin-bottom: 16px;
    position: relative;
    padding-left: 16px;
  }
  
  .toc-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #475569;
    transition: background 0.3s;
  }
  
  .toc-list li:hover::before {
    background: #00d4ff;
  }
  
  .toc-list a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 15px;
    line-height: 1.5;
    display: block;
    transition: color 0.2s ease;
  }
  
  .toc-list a:hover {
    color: #ffffff;
    text-shadow: none;
    border-bottom: none;
  }
  
  @media (max-width: 1024px) {
    .post-layout-wrapper {
      flex-direction: column;
      padding: 0 20px;
      margin-top: 100px;
    }
    .post-sidebar {
      width: 100%;
      position: static;
      order: -1; /* Move TOC above article on mobile */
      margin-bottom: 40px;
    }
  }
"""

html = html.replace('/* PREMIUM POST STYLES */', sidebar_css + '\n  /* PREMIUM POST STYLES */')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Sidebar added successfully.")
