import re

file_path = 'd:/Agentic OS/agency-website/blog/post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the old POST SPECIFIC STYLES block with the new premium ones
html = re.sub(r'/\* POST SPECIFIC STYLES \*/.*?</style>', '''{0}
</style>'''.format(r'''  /* PREMIUM POST STYLES */
  body.dark-theme {
    background-color: #010308;
    color: #e2e8f0;
    font-family: 'Inter', -apple-system, sans-serif;
  }
  
  .post-article {
    max-width: 860px;
    margin: 140px auto 100px auto;
    padding: 60px 80px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  
  @media (max-width: 768px) {
    .post-article {
      padding: 30px 20px;
      margin-top: 100px;
    }
  }

  .post-header {
    text-align: center;
    margin-bottom: 60px;
  }
  .post-meta {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    gap: 15px;
    font-size: 15px;
    font-family: 'Space Grotesk', sans-serif;
    color: #00e5ff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .post-header h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1.15;
    margin-bottom: 30px;
    background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
  }
  .post-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 40px;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .post-author img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid #00e5ff;
    padding: 2px;
    background: #000;
  }
  .post-author div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .post-author span:first-child { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
  .post-author span:last-child { color: #94a3b8; font-size: 14px; font-weight: 500; }
  
  .post-thumbnail {
    margin: -60px -80px 60px -80px;
    border-radius: 24px 24px 0 0;
    overflow: hidden;
    position: relative;
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
    text-align: center;
    padding: 15px;
    font-size: 14px;
    color: #94a3b8;
    background: rgba(0,0,0,0.4);
    position: absolute;
    bottom: 0;
    width: 100%;
    backdrop-filter: blur(5px);
  }
  
  .post-body {
    font-size: 20px;
    line-height: 1.85;
    color: #cbd5e1;
    font-weight: 400;
  }
  .post-body h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    margin: 80px 0 30px 0;
    background: linear-gradient(135deg, #00d4ff 0%, #b8ff57 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
    line-height: 1.3;
  }
  .post-body h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px;
    margin: 50px 0 20px 0;
    background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .post-body p {
    margin-bottom: 28px;
  }
  .post-body p:first-of-type {
    font-size: 24px;
    color: #fff;
    line-height: 1.7;
    margin-bottom: 40px;
  }
  .post-body a {
    color: #00d4ff;
    text-decoration: none;
    border-bottom: 1px solid rgba(0,212,255,0.3);
    transition: all 0.3s ease;
  }
  .post-body a:hover {
    border-bottom-color: #00d4ff;
    text-shadow: 0 0 10px rgba(0,212,255,0.5);
  }
  .post-body hr {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    margin: 80px 0;
  }
  .blog-cta-link {
    display: block;
    text-align: center;
    background: linear-gradient(135deg, #00d4ff, #4f46e5);
    color: #fff !important;
    padding: 20px 40px;
    border-radius: 12px;
    text-decoration: none !important;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 1px;
    margin: 60px auto 0 auto;
    max-width: 400px;
    border: none !important;
    box-shadow: 0 10px 30px rgba(0,212,255,0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .blog-cta-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0,212,255,0.5);
  }'''), html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
