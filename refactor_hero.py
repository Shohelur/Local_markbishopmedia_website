import re

file_path = r'd:\Agentic OS\agency-website\blog\post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Replace the blog-read-hero block
hero_match = re.search(r'(<header class="blog-read-hero">.*?</header>)', html, re.DOTALL)
if hero_match:
    hero_html = hero_match.group(1)
    
    # Extract the image src
    img_match = re.search(r'<img.*?src="(.*?)".*?>', hero_html)
    img_src = img_match.group(1) if img_match else '../assets/images/blog/post-001-google-maps-invisible.jpg'
    
    # Extract the text content (H1, post-meta, post-author)
    content_match = re.search(r'<div class="hero-text-content">(.*?)</div>\s*</div>\s*</header>', hero_html, re.DOTALL)
    content_inner = content_match.group(1) if content_match else ''
    
    new_hero_html = f'''
<header class="blog-top-header">
  <div class="blog-header-container">
    <div class="blog-header-image">
      <img src="{img_src}" alt="Blog Image">
    </div>
    <div class="blog-header-content">
      <div class="blog-header-nav">
        <a href="../blog.html" class="back-to-blog-btn">← Back to Blog</a>
      </div>
      <div class="blog-header-text">
        {content_inner}
      </div>
    </div>
  </div>
</header>
'''
    html = html.replace(hero_html, new_hero_html.strip())

# 2. Update the CSS for the new hero
# First remove old hero CSS
html = re.sub(r'/\* HERO REDESIGN STYLES \*/.*?/\* Reset layout wrapper margin since hero takes space \*/\s*\.post-layout-wrapper\s*{\s*margin-top:\s*0\s*!important;\s*}', '', html, flags=re.DOTALL)

# Inject new CSS
new_css = '''
  /* NEW TOP HEADER STYLES */
  .blog-top-header {
    width: 100%;
    max-width: 1200px;
    margin: 120px auto 0 auto;
    padding: 0 40px;
  }
  .blog-header-container {
    display: flex;
    gap: 50px;
    background: #111827;
    border-radius: 20px;
    padding: 40px;
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    align-items: center;
  }
  .blog-header-image {
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    max-width: 500px;
  }
  .blog-header-image img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
    object-fit: cover;
    aspect-ratio: 16/9;
  }
  .blog-header-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .blog-header-nav {
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-end;
  }
  .back-to-blog-btn {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background: rgba(255,255,255,0.05);
    color: #94a3b8;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .back-to-blog-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #f8fafc;
    transform: translateY(-2px);
  }
  
  .blog-header-text {
    text-align: left;
  }
  .blog-header-text .post-meta {
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .blog-header-text h1 {
    font-size: clamp(32px, 3.5vw, 44px);
    line-height: 1.2;
    margin-bottom: 24px;
    color: #f8fafc;
    font-weight: 700;
    text-shadow: none;
  }
  .blog-header-text .post-author {
    justify-content: flex-start;
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }
  
  @media (max-width: 900px) {
    .blog-header-container {
      flex-direction: column;
      padding: 24px;
      gap: 30px;
    }
    .blog-header-image {
      max-width: 100%;
    }
    .blog-header-nav {
      justify-content: flex-start;
    }
  }
'''
html = html.replace('/* GLASS TIP STYLES */', new_css + '\n  /* GLASS TIP STYLES */')

# Make sure post layout wrapper has spacing
html = html.replace('.post-layout-wrapper {', '.post-layout-wrapper {\n    margin-top: 60px !important;')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
