import re
import os

blog_index_path = "d:/Agentic OS/agency-website/blog.html"
blog_post_path = "d:/Agentic OS/agency-website/blog/post-001-why-not-showing-on-google-maps.html"

with open(blog_index_path, "r", encoding="utf-8") as f:
    index_html = f.read()

with open(blog_post_path, "r", encoding="utf-8") as f:
    post_html = f.read()

# Extract fonts from index
fonts_match = re.search(r'(<link href="https://fonts.googleapis.com[^>]+>)', index_html)
fonts = fonts_match.group(1) if fonts_match else ''

# Extract styles from index
styles_match = re.search(r'<style>.*?</style>', index_html, re.DOTALL)
global_styles = styles_match.group(0) if styles_match else '<style></style>'

# Add specific blog post styles
post_styles = """
  /* POST SPECIFIC STYLES */
  .post-article {
    max-width: 800px;
    margin: 120px auto 80px auto;
    padding: 0 20px;
  }
  .post-header {
    text-align: center;
    margin-bottom: 60px;
  }
  .post-meta {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 15px;
    font-size: 14px;
    color: var(--accent-cyan);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .post-header h1 {
    font-family: var(--font-display);
    font-size: 48px;
    line-height: 1.2;
    margin-bottom: 30px;
    color: var(--text-main);
  }
  .post-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .post-author img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid var(--accent-cyan);
  }
  .post-author div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .post-author span:first-child { font-weight: bold; font-size: 16px; }
  .post-author span:last-child { color: var(--text-muted); font-size: 14px; }
  
  .post-thumbnail {
    margin-bottom: 60px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
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
    color: var(--text-muted);
    font-style: italic;
    background: rgba(255,255,255,0.02);
  }
  
  .post-body {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.85);
  }
  .post-body h2 {
    font-family: var(--font-display);
    font-size: 32px;
    color: var(--text-main);
    margin: 60px 0 25px 0;
  }
  .post-body h3 {
    font-family: var(--font-display);
    font-size: 24px;
    color: var(--text-main);
    margin: 40px 0 15px 0;
  }
  .post-body p {
    margin-bottom: 24px;
  }
  .post-body a {
    color: var(--accent-cyan);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .post-body hr {
    border: none;
    height: 1px;
    background: var(--glass-border);
    margin: 60px 0;
  }
  .blog-cta-link {
    display: inline-block;
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo));
    color: #fff !important;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none !important;
    font-weight: 700;
    margin-top: 20px;
    box-shadow: 0 10px 20px rgba(0,212,255,0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .blog-cta-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(0,212,255,0.4);
  }
"""
global_styles = global_styles.replace('</style>', post_styles + '\n</style>')

# Extract header from index
header_match = re.search(r'(<header class="nav-master[^>]*>.*?</header>)', index_html, re.DOTALL)
header = header_match.group(1) if header_match else ''
# Fix relative paths in header
header = re.sub(r'href="./', 'href="../', header)
header = re.sub(r'src="./', 'src="../', header)
# Ensure logo goes to home
header = header.replace('href="../index.html"', 'href="../index.html"')

# Extract footer from index
footer_match = re.search(r'(<footer class="site-footer[^>]*>.*?</footer>)', index_html, re.DOTALL)
footer = footer_match.group(1) if footer_match else ''
# Fix relative paths in footer
footer = re.sub(r'href="./', 'href="../', footer)
footer = re.sub(r'src="./', 'src="../', footer)

# Extract head and body from post
head_match = re.search(r'<head>(.*?)</head>', post_html, re.DOTALL)
head_content = head_match.group(1) if head_match else ''

# Extract body content (the article)
body_match = re.search(r'<article.*?</article>', post_html, re.DOTALL)
article_content = body_match.group(0) if body_match else ''

# Rewrite the article opening tag to add the new class
article_content = re.sub(r'<article([^>]*)>', r'<article\1 class="post-article">', article_content)

new_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
{head_content}
{fonts}
{global_styles}
</head>
<body class="dark-theme">
{header}

<main>
  {article_content}
</main>

{footer}
</body>
</html>
"""

with open(blog_post_path, "w", encoding="utf-8") as f:
    f.write(new_html)

print("Blog post styled successfully.")
