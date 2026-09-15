import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r"<!-- ==============================================\s*PHASE 12: HYBRID FOOTER & COMPACT FAQ\s*=============================================== -->.*?<!-- ==============================================\s*END PHASE 12\s*=============================================== -->"

new_code = """<!-- ==============================================
     PHASE 12: PREMIUM HOLOGRAPHIC FAQ
=============================================== -->
<style>
#phase12-premium-faq {
  position: relative;
  width: 100%;
  padding: 120px 20px;
  background: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.03) 0%, transparent 70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.p12-header {
  text-align: center;
  margin-bottom: 70px;
}

.p12-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  color: #fff;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.03em;
}

.p12-title span {
  background: linear-gradient(90deg, #00d4ff, #b8ff57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.p12-faq-container {
  width: min(900px, 100%);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.p12-faq-item {
  background: linear-gradient(135deg, rgba(16, 26, 48, 0.6) 0%, rgba(5, 10, 20, 0.8) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
}

.p12-faq-item:hover {
  background: linear-gradient(135deg, rgba(20, 32, 60, 0.8) 0%, rgba(10, 20, 40, 0.9) 100%);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.p12-faq-item.active {
  background: linear-gradient(135deg, rgba(16, 26, 48, 0.95) 0%, rgba(5, 10, 20, 0.98) 100%);
  border-color: var(--cyan-glow);
  box-shadow: 0 15px 40px rgba(0, 212, 255, 0.15), inset 0 2px 10px rgba(255, 255, 255, 0.05);
  transform: translateY(0);
}

.p12-faq-question {
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.p12-faq-icon {
  width: 28px;
  height: 28px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p12-faq-icon::before, .p12-faq-icon::after {
  content: '';
  position: absolute;
  background: var(--cyan-glow);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 2px;
}

.p12-faq-icon::before {
  width: 20px;
  height: 3px;
}

.p12-faq-icon::after {
  width: 3px;
  height: 20px;
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
  transition: max-height 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  padding: 0 40px;
}

.p12-faq-item.active .p12-faq-answer {
  max-height: 500px;
}

.p12-faq-answer p {
  padding-bottom: 35px;
  color: #a0aec0;
  font-size: 17px;
  line-height: 1.8;
}

.p12-faq-answer p strong {
  color: #fff;
}
</style>

<section id="phase12-premium-faq">
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
        What makes Mark Bishop Media different?
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
  const premiumFaqItems = document.querySelectorAll('.p12-faq-item');
  premiumFaqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      premiumFaqItems.forEach(faq => faq.classList.remove('active'));
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


<!-- ==============================================
     PHASE 13: CYBER FOOTER (ULTRA-PREMIUM)
=============================================== -->
<style>
#phase13-cyber-footer {
  position: relative;
  width: 100%;
  padding: 120px 40px 40px;
  background: #02050f;
  overflow: hidden;
  z-index: 5;
}

/* Massive Glowing Watermark */
.p13-footer-watermark {
  position: absolute;
  right: -5%;
  bottom: -15%;
  width: 600px;
  height: 600px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  color: #fff;
}

.p13-footer-watermark svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 50px rgba(0, 212, 255, 1));
}

.p13-footer-content {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 80px;
  z-index: 1;
}

.p13-brand-col {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.p13-brand-logo {
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  letter-spacing: -1.5px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.p13-brand-logo svg {
  width: 42px;
  height: 42px;
  filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.6));
}

.p13-tagline {
  color: #a0aec0;
  font-size: 18px;
  line-height: 1.8;
  max-width: 400px;
}

.p13-links-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.p13-col-title {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  opacity: 0.5;
}

.p13-link-item {
  color: #a0aec0;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: fit-content;
  position: relative;
}

.p13-link-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: var(--cyan-glow);
  transition: width 0.3s ease;
}

.p13-link-item:hover {
  color: #fff;
}

.p13-link-item:hover::after {
  width: 100%;
}

.p13-contact-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.p13-contact-node {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: #e2e8f0;
  font-size: 16px;
  transition: all 0.3s ease;
}

.p13-contact-node:hover {
  background: rgba(0, 212, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateX(5px);
}

.p13-contact-node svg {
  color: var(--cyan-glow);
}

/* Neon Horizon Bottom Bar */
.p13-bottom-bar {
  position: relative;
  max-width: 1300px;
  margin: 80px auto 0;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: inset 0 20px 20px -20px rgba(0, 212, 255, 0.1);
  z-index: 1;
}

.p13-copyright {
  color: rgba(255, 255, 255, 0.4);
  font-size: 15px;
}

.p13-status {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a0aec0;
  font-size: 14px;
}

.p13-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lime-glow);
  box-shadow: 0 0 10px var(--lime-glow);
  animation: p13-pulse 2s infinite alternate;
}

@keyframes p13-pulse {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

@media (max-width: 960px) {
  .p13-footer-content {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  .p13-bottom-bar {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>

<footer id="phase13-cyber-footer">
  <!-- Massive Background Watermark -->
  <div class="p13-footer-watermark">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  </div>

  <div class="p13-footer-content">
    
    <!-- Brand -->
    <div class="p13-brand-col">
      <div class="p13-brand-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan-glow)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        Mark Bishop Media
      </div>
      <div class="p13-tagline">
        The Local Visibility Operating System. <br>We build dominance for local businesses through data, strategy, and execution.
      </div>
    </div>

    <!-- Quick Links -->
    <div class="p13-links-col">
      <div class="p13-col-title">Navigation</div>
      <a href="#" class="p13-link-item">Free Audit</a>
      <a href="#" class="p13-link-item">Local SEO Strategy</a>
      <a href="#" class="p13-link-item">Client Results</a>
      <a href="#" class="p13-link-item">About Mark</a>
    </div>

    <!-- Contact Nodes -->
    <div class="p13-contact-col">
      <div class="p13-col-title">Connect</div>
      
      <div class="p13-contact-node">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        Tucson, Arizona, USA
      </div>
      
      <div class="p13-contact-node">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        mark@markbishopmedia.com
      </div>
    </div>

  </div>

  <div class="p13-bottom-bar">
    <div class="p13-copyright">
      © 2026 Mark Bishop Media. All rights reserved.
    </div>
    <div class="p13-status">
      <div class="p13-status-dot"></div>
      All systems operational
    </div>
  </div>
</footer>
<!-- ==============================================
     END PHASE 13
=============================================== -->"""

if re.search(pattern, html, flags=re.DOTALL):
    html = re.sub(pattern, new_code, html, flags=re.DOTALL)
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Ultra-Premium FAQ and Footer injected successfully!")
else:
    print("Error: Could not find the old Phase 12 Hybrid block to replace.")
