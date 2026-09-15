import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Pattern to find the old Phase 12 block and replace it up to </body>
pattern = r"<!-- ==============================================\s*PHASE 12: FAQ SECTION \(CYBER ACCORDION\)\s*=============================================== -->.*?<!-- ==============================================\s*END PHASE 12\s*=============================================== -->"

new_phase12 = """<!-- ==============================================
     PHASE 12: HYBRID FOOTER & COMPACT FAQ
=============================================== -->
<style>
#phase12-footer {
  position: relative;
  width: 100%;
  padding: 80px 20px 40px;
  background: #02050f;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 10;
}

.p12-footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: start;
}

/* Left: Brand Details */
.p12-footer-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.p12-brand-logo {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.p12-brand-logo svg {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
}

.p12-tagline {
  color: #a0aec0;
  font-size: 16px;
  line-height: 1.6;
  max-width: 300px;
}

.p12-contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.p12-contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a0aec0;
  font-size: 15px;
}

.p12-contact-item svg {
  color: var(--cyan-glow);
}

.p12-copyright {
  margin-top: 40px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
}

/* Right: Compact FAQ */
.p12-footer-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.p12-faq-title {
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 600;
}

.p12-faq-item {
  background: rgba(16, 26, 48, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.p12-faq-item:hover {
  background: rgba(16, 26, 48, 0.8);
  border-color: rgba(0, 212, 255, 0.2);
}

.p12-faq-item.active {
  background: rgba(5, 10, 20, 0.9);
  border-color: rgba(0, 212, 255, 0.4);
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.05);
}

.p12-faq-question {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
  transition: color 0.3s ease;
}

.p12-faq-icon {
  width: 16px;
  height: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p12-faq-icon::before, .p12-faq-icon::after {
  content: '';
  position: absolute;
  background: var(--cyan-glow);
  transition: transform 0.3s ease;
}

.p12-faq-icon::before {
  width: 12px;
  height: 2px;
}

.p12-faq-icon::after {
  width: 2px;
  height: 12px;
}

.p12-faq-item.active .p12-faq-icon::after {
  transform: rotate(90deg) scale(0);
}

.p12-faq-item.active .p12-faq-question {
  color: var(--cyan-glow);
}

.p12-faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0 20px;
}

.p12-faq-item.active .p12-faq-answer {
  max-height: 300px;
}

.p12-faq-answer p {
  padding-bottom: 20px;
  color: #a0aec0;
  font-size: 14px;
  line-height: 1.6;
}

.p12-faq-answer p strong {
  color: #fff;
}

@media (max-width: 860px) {
  .p12-footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>

<footer id="phase12-footer">
  <div class="p12-footer-content">
    
    <!-- Left: Brand -->
    <div class="p12-footer-left">
      <div class="p12-brand-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan-glow)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        Mark Bishop Media
      </div>
      <div class="p12-tagline">
        The Local Visibility Operating System. <br>We build dominance for local businesses.
      </div>
      <div class="p12-contact-info">
        <div class="p12-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          Tucson, Arizona, USA
        </div>
        <div class="p12-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          mark@markbishopmedia.com
        </div>
      </div>
      <div class="p12-copyright">
        © 2026 Mark Bishop Media. All rights reserved.
      </div>
    </div>

    <!-- Right: Compact FAQ -->
    <div class="p12-footer-right">
      <div class="p12-faq-title">Frequently Asked Questions</div>
      
      <div class="p12-faq-item">
        <div class="p12-faq-question">
          What exactly is a "Local Visibility Audit"?
          <div class="p12-faq-icon"></div>
        </div>
        <div class="p12-faq-answer">
          <p>It's a deep-dive scan of your 9-mile radius. We don't just guess; we use raw geo-grid data to show exactly where you rank against local competitors on Google Maps and search. You'll see the exact leaks where you're losing phone calls and revenue.</p>
        </div>
      </div>

      <div class="p12-faq-item">
        <div class="p12-faq-question">
          How long does it take to see results?
          <div class="p12-faq-icon"></div>
        </div>
        <div class="p12-faq-answer">
          <p>Unlike typical SEO agencies that string you along for 6-12 months, our approach is designed for efficiency. Our clients usually see a noticeable surge in Google Business Profile rankings and incoming calls within <strong>1 to 3 months</strong>.</p>
        </div>
      </div>

      <div class="p12-faq-item">
        <div class="p12-faq-question">
          Do I need a completely new website?
          <div class="p12-faq-icon"></div>
        </div>
        <div class="p12-faq-answer">
          <p>Not necessarily. If your current site is fast and converts well, <strong>we will build a custom local Visibility strategy and go through our proven optimization process to maximize its potential.</strong> If your site is outdated and costing you customers, we'll recommend an upgrade. We only suggest what actually drives ROI.</p>
        </div>
      </div>

      <div class="p12-faq-item">
        <div class="p12-faq-question">
          Do I have to sign a long-term contract?
          <div class="p12-faq-icon"></div>
        </div>
        <div class="p12-faq-answer">
          <p>No. We don't trap local businesses in 12-month retainers. We believe in earning your business every single month through clear communication, hard data, and undeniable ROI.</p>
        </div>
      </div>

      <div class="p12-faq-item">
        <div class="p12-faq-question">
          What makes Mark Bishop Media different?
          <div class="p12-faq-icon"></div>
        </div>
        <div class="p12-faq-answer">
          <p>We are specialized local operators, not a massive faceless corporation. We use high-intent local math, and we strictly cap the number of clients we take per city. This ensures we never work with your direct competitors. It's an exclusive partnership.</p>
        </div>
      </div>

    </div>
  </div>
</footer>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.p12-faq-item');
  
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
</script>
<!-- ==============================================
     END PHASE 12
=============================================== -->"""

if re.search(pattern, html, flags=re.DOTALL):
    html = re.sub(pattern, new_phase12, html, flags=re.DOTALL)
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Old FAQ deleted and Hybrid Footer injected successfully!")
else:
    print("Error: Could not find the old Phase 12 block to replace.")
