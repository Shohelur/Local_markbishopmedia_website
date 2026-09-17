import re

file_path = 'd:/Agentic OS/agency-website/blog/post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace all CSS block starting from PREMIUM LIGHT THEME STYLES up to the end of style tag
html = re.sub(r'/\* PREMIUM LIGHT THEME STYLES \*/.*?</style>', '''{0}
</style>'''.format(r'''  /* PREMIUM NAVY THEME STYLES */
  body.blog-read-page, body {
    background-color: #0b1121 !important; /* Deep Navy background */
    color: #e2e8f0 !important;
    font-family: 'Inter', -apple-system, sans-serif;
  }
  
  .post-layout-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 60px;
    max-width: 1200px;
    margin: 60px auto 100px auto;
    padding: 0 40px;
  }
  
  .post-article {
    max-width: 800px;
    margin: 0; 
    flex: 1;
    min-width: 0;
    background: #111827; /* Slightly lighter navy for the card */
    padding: 50px 60px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0,0,0,0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  @media (max-width: 768px) {
    .post-layout-wrapper {
      flex-direction: column;
      padding: 0 20px;
      margin-top: 60px;
    }
    .post-article {
      padding: 30px 20px;
    }
  }

  .post-header {
    text-align: center;
    margin-bottom: 50px;
  }
  .post-meta {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    gap: 15px;
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
    color: #38bdf8; /* Light blue accent */
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  .post-header h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1.2;
    margin-bottom: 30px;
    color: #f8fafc;
    letter-spacing: -0.5px;
    font-weight: 700;
  }
  .post-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .post-author img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.1);
    background: #1e293b;
  }
  .post-author div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .post-author span:first-child { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 16px; color: #f8fafc; }
  .post-author span:last-child { color: #94a3b8; font-size: 14px; font-weight: 400; }
  
  .post-thumbnail {
    margin: -50px -60px 50px -60px;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  
  @media (max-width: 768px) {
    .post-thumbnail { margin: -30px -20px 40px -20px; }
  }

  .post-thumbnail img {
    width: 100%;
    height: auto;
    display: block;
  }
  .post-thumbnail figcaption {
    /* Hide visually for humans, keep in DOM for Google SEO */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
  
  .post-body {
    font-size: 19px;
    line-height: 1.8;
    color: #cbd5e1;
    font-weight: 400;
  }
  .post-body h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 28px;
    margin: 60px 0 24px 0;
    background: linear-gradient(135deg, #60a5fa 0%, #e879f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
    line-height: 1.3;
    font-weight: 700;
  }
  .post-body h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    margin: 40px 0 16px 0;
    background: linear-gradient(135deg, #fb923c 0%, #facc15 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }
  .post-body p {
    margin-bottom: 24px;
  }
  .post-body p:first-of-type {
    font-size: 22px;
    color: #f1f5f9;
    line-height: 1.7;
    margin-bottom: 40px;
    font-weight: 400;
  }
  .post-body a {
    color: #38bdf8;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    text-decoration-color: rgba(56, 189, 248, 0.3);
    transition: all 0.2s ease;
  }
  .post-body a:hover {
    text-decoration-color: #38bdf8;
    color: #7dd3fc;
  }
  .post-body hr {
    border: none;
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 60px 0;
  }
  .blog-cta-link {
    display: block;
    text-align: center;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    color: #fff !important;
    padding: 18px 36px;
    border-radius: 12px;
    text-decoration: none !important;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    margin: 50px auto 0 auto;
    max-width: 350px;
    box-shadow: 0 10px 25px rgba(79, 70, 229, 0.25);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .blog-cta-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(79, 70, 229, 0.4);
  }

  /* SIDEBAR TOC STYLES (Navy Theme) */
  .post-sidebar {
    width: 280px;
    flex-shrink: 0;
    position: sticky;
    top: 120px;
    order: -1;
  }
  
  .toc-container {
    background: transparent;
  }
  
  .toc-title {
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    font-weight: 600;
  }
  
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .toc-list li {
    margin-bottom: 14px;
    position: relative;
    padding-left: 16px;
  }
  
  .toc-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #475569;
    transition: all 0.2s;
  }
  
  .toc-list li:hover::before {
    background: #38bdf8;
  }
  
  .toc-list li.active::before {
    background: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
    transform: scale(1.2);
  }
  
  .toc-list a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 14.5px;
    line-height: 1.5;
    display: block;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }
  
  .toc-list a:hover {
    color: #f8fafc;
  }
  
  .toc-list a.active {
    color: #38bdf8;
    font-weight: 500;
  }
  
  @media (max-width: 1024px) {
    .post-sidebar {
      width: 100%;
      position: static;
      margin-bottom: 40px;
    }
  }'''), html, flags=re.DOTALL)

# Inject the Outfit font if it's not already there
if 'Outfit' not in html:
    html = html.replace('<head>', '<head>\n<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
