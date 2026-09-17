import re

file_path = r'd:\Agentic OS\agency-website\blog\post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract the post-thumbnail block
thumbnail_match = re.search(r'(<figure class="post-thumbnail">.*?</figure>)', html, re.DOTALL)
if not thumbnail_match:
    print("Thumbnail not found")
thumbnail_block = thumbnail_match.group(1) if thumbnail_match else ""

# 2. Extract the post-header block
header_match = re.search(r'(<header class="post-header">.*?</header>)', html, re.DOTALL)
if not header_match:
    print("Header not found")
header_block = header_match.group(1) if header_match else ""

# 3. Create the new Hero structure
hero_html = f'''
<header class="blog-read-hero">
  <div class="hero-image-wrapper">
    <!-- Image injected dynamically or from previous block -->
    {thumbnail_block.replace('<figure class="post-thumbnail">', '<div class="hero-image-inner">').replace('</figure>', '</div>')}
    <div class="hero-overlay-gradient"></div>
  </div>
  
  <div class="hero-content-wrapper">
    {header_block.replace('<header class="post-header">', '<div class="hero-text-content">').replace('</header>', '</div>')}
  </div>
</header>
'''

# Clean up classes in hero
hero_html = hero_html.replace('post-header', 'hero-header')

# 4. Remove original thumbnail and header from the post-article
html = html.replace(thumbnail_block, '')
html = html.replace(header_block, '')

# 5. Inject hero BEFORE main layout wrapper
html = html.replace('<main class="post-layout-wrapper">', f'{hero_html}\n<main class="post-layout-wrapper">')

# 6. Glass Tip Replacement (Reason 3 context)
tip_target = '<p>Check your business name, address, and phone number on Google, Yelp, Facebook, your website footer, and any other directory where your business appears. Make them identical. Every character counts, including "LLC," "Suite," and how you format your phone number.</p>'
glass_tip = f'''
<div class="glass-tip">
  <div class="glass-tip-icon">💡 <span>EXPERT TIP</span></div>
  <p>Check your business name, address, and phone number on Google, Yelp, Facebook, your website footer, and any other directory where your business appears. Make them identical. Every character counts, including "LLC," "Suite," and how you format your phone number.</p>
</div>
'''
html = html.replace(tip_target, glass_tip)

# Add another glass tip (Reason 5 context)
tip_target_2 = '<p>And here is the part most business owners miss: five genuine reviews posted in the last 30 days will outperform eighty reviews that are two years old. Recency matters as much as quantity. Start texting your current customers directly after each completed job. Send a direct link to your Google review page. That one habit changes everything.</p>'
glass_tip_2 = f'''
<div class="glass-tip highlight-orange">
  <div class="glass-tip-icon">🔥 <span>RANKING FACTOR</span></div>
  <p>And here is the part most business owners miss: <strong>five genuine reviews posted in the last 30 days will outperform eighty reviews that are two years old.</strong> Recency matters as much as quantity. Start texting your current customers directly after each completed job. Send a direct link to your Google review page. That one habit changes everything.</p>
</div>
'''
html = html.replace(tip_target_2, glass_tip_2)

# 7. FAQ Accordion Conversion
faq_section_match = re.search(r'(<section class="faq-section">.*?</section>)', html, re.DOTALL)
if faq_section_match:
    faq_html = faq_section_match.group(1)
    
    # Replace h3 and p with details and summary
    # Simple regex to catch h3 and the following p
    faq_items = re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>', faq_html, re.DOTALL)
    
    new_faq_html = '<section class="faq-section">\n  <h2 id="frequently-asked-questions">Frequently Asked Questions</h2>\n  <div class="faq-accordion-group">\n'
    
    for q, a in faq_items:
        new_faq_html += f'''
    <details class="faq-accordion">
      <summary>{q} <span class="icon">+</span></summary>
      <div class="faq-content">
        <p>{a}</p>
      </div>
    </details>
'''
    new_faq_html += '  </div>\n</section>'
    
    html = html.replace(faq_html, new_faq_html)

# 8. Inject New CSS
css_injection = '''
  /* HERO REDESIGN STYLES */
  .blog-read-hero {
    position: relative;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    min-height: 65vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 80px;
    margin-bottom: 60px;
    background: #020617;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  
  .hero-image-wrapper {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
  }
  
  .hero-image-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    transform: scale(1.05);
    filter: saturate(1.2);
  }
  
  .hero-overlay-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #0b1121 0%, rgba(11,17,33,0.8) 50%, rgba(11,17,33,0.3) 100%);
    z-index: 2;
  }
  
  .hero-content-wrapper {
    position: relative;
    z-index: 3;
    max-width: 900px;
    width: 100%;
    padding: 0 40px;
    text-align: center;
  }
  
  .hero-text-content .post-meta {
    margin-bottom: 24px;
  }
  
  .hero-text-content h1 {
    font-size: clamp(40px, 5vw, 64px);
    line-height: 1.15;
    margin-bottom: 32px;
    color: #ffffff;
    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  
  .hero-text-content .post-author {
    border-top: none;
    padding-top: 0;
  }
  
  /* Reset layout wrapper margin since hero takes space */
  .post-layout-wrapper {
    margin-top: 0 !important;
  }
  
  /* GLASS TIP STYLES */
  .glass-tip {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-left: 4px solid #38bdf8;
    border-radius: 12px;
    padding: 24px 30px;
    margin: 40px 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .glass-tip.highlight-orange {
    border: 1px solid rgba(251, 146, 60, 0.3);
    border-left: 4px solid #fb923c;
  }
  .glass-tip-icon {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #38bdf8;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }
  .glass-tip.highlight-orange .glass-tip-icon {
    color: #fb923c;
  }
  .glass-tip p {
    margin: 0 !important;
    font-size: 18px !important;
    color: #f1f5f9 !important;
    line-height: 1.7 !important;
  }
  
  /* FAQ ACCORDION STYLES */
  .faq-section {
    margin-top: 60px;
    padding-top: 60px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .faq-accordion-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 30px;
  }
  .faq-accordion {
    background: #1e293b;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .faq-accordion[open] {
    border-color: rgba(56, 189, 248, 0.3);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  .faq-accordion summary {
    padding: 20px 24px;
    font-family: 'Outfit', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #f8fafc;
    cursor: pointer;
    list-style: none; /* Hide default arrow */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .faq-accordion summary::-webkit-details-marker {
    display: none;
  }
  .faq-accordion summary .icon {
    color: #38bdf8;
    font-size: 24px;
    font-weight: 400;
    transition: transform 0.3s ease;
  }
  .faq-accordion[open] summary .icon {
    transform: rotate(45deg); /* Turns + into x */
  }
  .faq-content {
    padding: 0 24px 24px 24px;
    color: #cbd5e1;
    font-size: 17px;
    line-height: 1.7;
    animation: slideDown 0.3s ease-out;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
'''

html = html.replace('</style>', f'{css_injection}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
