import re

file_path = r'd:\Agentic OS\agency-website\blog\post-001-why-not-showing-on-google-maps.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title and Meta
html = re.sub(r'<title>.*?</title>', '<title>Why Your Competitor Ranks Higher on Google Maps - MBM</title>', html, count=1)
html = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="Is a competitor with fewer reviews and worse service outranking you on Google Maps? Here are the 5 exact signals Google uses to rank them over you.">', html, count=1)

# 2. Update Thumbnail and Header Background
html = html.replace('post-001-google-maps-invisible.jpg', 'post-002-thumbnail.jpg')
html = re.sub(r'linear-gradient\(135deg, #1e40af 0%, #0369a1 50%, #0d9488 100%\)', 'linear-gradient(135deg, #b91c1c 0%, #9333ea 50%, #4f46e5 100%)', html)

# 3. Update Title Tag in Header
html = re.sub(r'<h1>.*?</h1>', '<h1>Why Your Competitor (With Worse Service) Ranks Higher on Google Maps.</h1>', html, count=1)
html = html.replace('Sep 17, 2026', 'Sep 18, 2026')
html = html.replace('GOOGLE MAPS RANKING', 'COMPETITOR ANALYSIS')

# 4. Generate the new Article Content
article_content = '''<article data-category="competitor-analysis" data-post-id="002" data-slug="competitor-ranks-higher-google-maps" class="post-article">

  <div class="post-body">

    <p>Last Thursday, an HVAC owner in Phoenix called me. He was furious. He has been in business for 15 years, has four fully wrapped trucks, and an impeccable reputation. But when he searches "AC repair near me" from his own office, a guy who works out of his garage with terrible reviews shows up first.</p>

    <p>"Mark, how is this possible?" he asked. "I provide better service. I have more reviews. Why does this guy rank higher on Google Maps?"</p>

    <p>It is the most frustrating situation a local business owner can face. You know your business is superior, but Google is sending all the high-intent local traffic to an inferior competitor. To understand why this happens, you have to accept one hard truth: Google does not know who provides the best service.</p>

    <p>Google only knows who sends the best digital signals. If a bad competitor is outranking you, it is because their signals align with what the algorithm wants, and yours do not. Here are the 5 hidden reasons your competitor dominates local search, and exactly how you can take that position back.</p>

    <h2 id="reason-1-primary-category">Why Does My Competitor Rank Higher on Google Maps?</h2>
    
    <p><strong>Your competitor ranks higher because their Google Business Profile and local citations match Google's relevance, proximity, and prominence algorithms better than yours do.</strong></p>

    <p>It is rarely about having the most reviews. Local rankings are determined by a complex mix of signals. Let's break down the 5 specific areas where your competitor is likely beating you.</p>

    <h2 id="reason-2-review-velocity">1. They Have Consistent Review Velocity (Not Just Total Reviews)</h2>

    <p><strong>Google cares more about when you got your last review than how many total reviews you have. This is called review velocity.</strong></p>

    <p>You might have 150 reviews, but if your last review was six months ago, Google views your business as stagnant. Your competitor might only have 40 reviews, but if they get a new 5-star review every single week, they are demonstrating active, ongoing relevance to the local market.</p>

    <p>Consistent, recent reviews tell the algorithm that a business is currently popular and actively serving customers. If your review acquisition is entirely random, you will lose to a competitor who has a system for asking for reviews every week.</p>

    <div class="glass-tip">
      <div class="tip-icon">
        <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
      </div>
      <div class="tip-content">
        <h4>The Fix</h4>
        <p>Implement an automated or strict manual process to ask for a review immediately after every successful job. Stop focusing on the total number and start focusing on getting at least two new reviews every week.</p>
      </div>
    </div>

    <h2 id="reason-3-name-stuffing">2. They Are Keyword Stuffing Their Business Name</h2>

    <p><strong>Adding exact-match keywords to a Google Business Profile name gives an unfair, massive boost in local rankings.</strong></p>

    <p>If your business is named "Smith Brothers," and your competitor is named "Dave's Plumbing," Dave has a natural advantage for the keyword "plumbing." However, many competitors take this further and illegally change their Google name to "Dave's Plumbing & Drain Cleaning Tucson."</p>

    <p>This violates Google's guidelines, but the algorithm still heavily rewards it in the short term. If you see a competitor ranking above you with a ridiculous, keyword-stuffed name, this is exactly why they are winning.</p>

    <p>Do not change your name to match their spam tactic. Instead, you can report their listing through Google's "Suggest an Edit" feature. If they are repeatedly reported for name spam, Google will suspend their profile entirely, instantly removing them from the map.</p>

    <h2 id="reason-4-primary-category">3. They Chose a More Specific Primary Category</h2>

    <p><strong>The primary category on your Google Business Profile dictates 80% of your ranking potential for specific services.</strong></p>

    <p>Many business owners select a broad primary category like "Contractor" or "Home Improvement." If your competitor selected "Kitchen Remodeler" as their primary category, they will outrank you for all kitchen-related searches in your area, regardless of how many reviews you have.</p>

    <p>You can only have one primary category. It must perfectly align with the highest-intent, most profitable service you offer. Everything else should be listed as a secondary category.</p>

    <h2 id="reason-5-local-citations">4. Their Citation Network Is Flawless</h2>

    <p><strong>A citation network is every place your business Name, Address, and Phone number (NAP) appears across the internet.</strong></p>

    <p>Google cross-references your business information with directories like Yelp, Angi, the Better Business Bureau, and Apple Maps to verify your legitimacy. If your competitor has their exact NAP listed perfectly across 50 top-tier directories, Google trusts them implicitly.</p>

    <p>If you have moved locations in the last five years, changed phone numbers, or use different tracking numbers on different sites, your citation network is fractured. When Google sees conflicting information about your business across the web, it lowers your trust score and drops your ranking.</p>

    <h2 id="reason-6-proximity">5. Proximity to the Searcher (The Geography Problem)</h2>

    <p><strong>Google Maps is ultimately a local tool. The physical distance between the searcher and your business address is the strongest ranking factor.</strong></p>

    <p>If a potential customer is standing one mile away from your competitor's office, and five miles away from yours, the competitor will usually show up first on mobile searches. You cannot beat proximity directly.</p>

    <p>However, you can expand your "radius of dominance" by strengthening the other four signals. A highly optimized, authoritative profile can outrank a closer, poorly optimized competitor. If you only rank when someone is standing in your parking lot, your signals are too weak.</p>

    <hr>

    <h2 id="faq-section">Frequently Asked Questions</h2>

    <details class="faq-accordion">
      <summary>Why does a business with bad reviews rank higher than me?</summary>
      <div class="faq-content">
        <p>Google does not filter out businesses based on star rating unless they are catastrophically low. A business with a 3.5-star average can easily outrank a 5-star business if they have better citation consistency, a more accurate primary category, or closer physical proximity to the searcher.</p>
      </div>
    </details>

    <details class="faq-accordion">
      <summary>How do I report a competitor for keyword stuffing on Google Maps?</summary>
      <div class="faq-content">
        <p>Go to their Google Business Profile on Maps, click "Suggest an edit," and select "Change name or other details." Update their name to match their exact legal business name (removing the extra keywords) and submit. Google reviews these edits and frequently applies them.</p>
      </div>
    </details>

    <details class="faq-accordion">
      <summary>How often should I get new Google reviews?</summary>
      <div class="faq-content">
        <p>You should aim for steady, consistent review velocity rather than massive spikes. For most local service businesses, acquiring 1 to 3 new authentic Google reviews every week is the perfect signal to show active, ongoing business operations.</p>
      </div>
    </details>

    <details class="faq-accordion">
      <summary>Does having a tracking phone number hurt my Google Maps ranking?</summary>
      <div class="faq-content">
        <p>Yes, if implemented incorrectly. If you use different phone numbers on Yelp, Facebook, and your website, you destroy your NAP consistency. If you must use tracking numbers, ensure your main local phone number is always listed as the primary number on your Google Business Profile.</p>
      </div>
    </details>

    <hr>

    <p>If you are tired of watching a weaker competitor steal your local traffic, it is time to look at the math. We offer a free 9-mile visibility scan that shows exactly how you stack up against your top competitor across the entire city. No guesswork. Just data.</p>

    <p><a href="../final-website-master.html#phase11-booking" class="blog-cta-link">Get Your Free Visibility Scan</a></p>

    <div class="bottom-back-wrapper">
      <a href="../blog.html" class="bottom-back-btn">← Back to Blog</a>
    </div>

  </div>
</article>'''

# 5. Generate the new TOC
toc_content = '''<aside class="post-sidebar">
      <div class="toc-container">
        <h4 class="toc-title">ON THIS PAGE</h4>
        <ul class="toc-list">
          <li><a href="#reason-1-primary-category">Why Does My Competitor Rank Higher?</a></li>
          <li><a href="#reason-2-review-velocity">1. Review Velocity</a></li>
          <li><a href="#reason-3-name-stuffing">2. Keyword Stuffing Name</a></li>
          <li><a href="#reason-4-primary-category">3. Specific Primary Category</a></li>
          <li><a href="#reason-5-local-citations">4. Flawless Citation Network</a></li>
          <li><a href="#reason-6-proximity">5. Proximity & Geography</a></li>
          <li><a href="#faq-section">Frequently Asked Questions</a></li>
        </ul>
      </div>
    </aside>'''

# Replace article
article_pattern = re.compile(r'<article.*?</article>', re.DOTALL)
html = article_pattern.sub(article_content, html)

# Replace aside
aside_pattern = re.compile(r'<aside class="post-sidebar">.*?</aside>', re.DOTALL)
html = aside_pattern.sub(toc_content, html)

# Write to new file
output_path = r'd:\Agentic OS\agency-website\blog\post-002-competitor-ranks-higher.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)
