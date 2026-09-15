import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

p12_code = """
<!-- ==============================================
     PHASE 12: FAQ SECTION (CYBER ACCORDION)
=============================================== -->
<style>
#phase12-faq {
  position: relative;
  width: 100%;
  padding: 100px 20px;
  background: #030814;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.p12-header {
  text-align: center;
  margin-bottom: 60px;
}

.p12-title {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 800;
  color: #fff;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
}

.p12-title span {
  background: linear-gradient(90deg, #00d4ff, #b8ff57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.p12-faq-container {
  width: min(800px, 100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.p12-faq-item {
  background: rgba(16, 26, 48, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.p12-faq-item:hover {
  background: rgba(16, 26, 48, 0.9);
  border-color: rgba(0, 212, 255, 0.3);
}

.p12-faq-item.active {
  background: rgba(5, 10, 20, 0.95);
  border-color: var(--cyan-glow);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
}

.p12-faq-question {
  padding: 24px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.p12-faq-icon {
  width: 24px;
  height: 24px;
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
  width: 16px;
  height: 2px;
}

.p12-faq-icon::after {
  width: 2px;
  height: 16px;
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
  padding: 0 30px;
}

.p12-faq-item.active .p12-faq-answer {
  max-height: 500px;
}

.p12-faq-answer p {
  padding-bottom: 30px;
  color: #a0aec0;
  font-size: 16px;
  line-height: 1.7;
}

.p12-faq-answer p strong {
  color: #fff;
}
</style>

<section id="phase12-faq">
  <div class="p12-header">
    <h2 class="p12-title">Frequently Asked <span>Questions</span></h2>
  </div>

  <div class="p12-faq-container">
    
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
        What makes Mark Bishop Media different from other agencies?
        <div class="p12-faq-icon"></div>
      </div>
      <div class="p12-faq-answer">
        <p>We are specialized local operators, not a massive faceless corporation. We use high-intent local math, and we strictly cap the number of clients we take per city. This ensures we never work with your direct competitors. It's an exclusive partnership.</p>
      </div>
    </div>

  </div>
</section>

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
=============================================== -->
"""

if "</body>" in html:
    html = html.replace("</body>", p12_code + "\n</body>")
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Phase 12 (FAQ) successfully injected!")
else:
    print("Error: </body> not found.")
