import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

p11_code = """
<!-- ==============================================
     PHASE 11: KINETIC CTA & DISCOVERY FORM
=============================================== -->
<style>
/* Phase 11 Specific Styles */
#phase11-booking {
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: radial-gradient(circle at center, rgba(0, 212, 255, 0.05) 0%, #030814 60%);
  overflow: hidden;
  z-index: 20;
}

.p11-container {
  width: min(1200px, 100%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* Left Column */
.p11-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.p11-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  color: #fff;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
}

.p11-title span {
  background: linear-gradient(90deg, #00d4ff, #b8ff57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.p11-subtitle {
  font-size: 18px;
  color: #a0aec0;
  line-height: 1.6;
  max-width: 85%;
}

.p11-contact-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.p11-contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
  width: fit-content;
}

.p11-contact-item:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.4);
  transform: translateX(10px);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);
}

.p11-contact-item svg {
  width: 24px;
  height: 24px;
  stroke: var(--cyan-glow);
  stroke-width: 2;
  fill: none;
}

/* Right Column (Form) */
.p11-right {
  position: relative;
}

/* Spinning Holographic Border */
.p11-right::before {
  content: '';
  position: absolute;
  top: -2%; left: -2%; width: 104%; height: 104%;
  background: conic-gradient(from 0deg, transparent 60%, var(--cyan-glow) 80%, var(--lime-glow) 100%);
  animation: p11-rotate-border 6s linear infinite;
  border-radius: 26px;
  z-index: 0;
  opacity: 0.5;
}

@keyframes p11-rotate-border {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.p11-form-glass {
  position: relative;
  background: linear-gradient(135deg, rgba(16, 26, 48, 0.8) 0%, rgba(5, 10, 20, 0.95) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  z-index: 1;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,212,255,0.05);
}

.p11-form-header {
  font-size: 24px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.p11-form-header span {
  color: var(--lime-glow);
}

.p11-input-group {
  margin-bottom: 20px;
}

.p11-input-group label {
  display: block;
  font-size: 13px;
  color: #a0aec0;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.p11-input, .p11-textarea {
  width: 100%;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 14px 16px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
}

.p11-textarea {
  resize: vertical;
  min-height: 100px;
}

.p11-input:focus, .p11-textarea:focus {
  border-color: var(--cyan-glow);
  background: rgba(0, 212, 255, 0.05);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
}

.p11-submit-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(90deg, #00d4ff, #b8ff57);
  border: none;
  border-radius: 8px;
  color: #030814;
  font-weight: 800;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.p11-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(184, 255, 87, 0.4);
}

.p11-submit-btn:active {
  transform: translateY(1px);
}

.p11-success-msg {
  display: none;
  text-align: center;
  padding: 40px 20px;
}

.p11-success-msg h3 {
  color: var(--lime-glow);
  font-size: 28px;
  margin-bottom: 10px;
}

.p11-success-msg p {
  color: #a0aec0;
  line-height: 1.6;
}

@media (max-width: 860px) {
  .p11-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .p11-left {
    text-align: center;
    align-items: center;
  }
  .p11-subtitle {
    max-width: 100%;
  }
  .p11-contact-box {
    width: 100%;
  }
  .p11-contact-item {
    width: 100%;
    justify-content: center;
  }
  .p11-form-glass {
    padding: 24px;
  }
}
</style>

<section id="phase11-booking" class="p11-section">
  <div class="p11-container">
    
    <!-- Left Column -->
    <div class="p11-left">
      <h2 class="p11-title">Ready to Dominate Your <span>9-Mile Radius?</span></h2>
      <p class="p11-subtitle">Claim your Free Local Visibility Audit. No pressure, just pure data-backed strategy. Let's see exactly where you're losing customers.</p>
      
      <div class="p11-contact-box">
        <a href="tel:+15203496378" class="p11-contact-item">
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          +1 (520) 349-6378
        </a>
        <a href="mailto:mark@markbishopmedia.com" class="p11-contact-item">
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          mark@markbishopmedia.com
        </a>
      </div>
    </div>

    <!-- Right Column (Form) -->
    <div class="p11-right">
      <div class="p11-form-glass" id="p11-form-container">
        <div class="p11-form-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-glow)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Discovery <span>Application</span>
        </div>
        
        <form id="p11-booking-form" onsubmit="handlePhase11Submit(event)">
          <div class="p11-input-group">
            <label>Full Name</label>
            <input type="text" class="p11-input" required placeholder="John Doe">
          </div>
          <div class="p11-input-group">
            <label>Business Name</label>
            <input type="text" class="p11-input" required placeholder="Doe Plumbing & HVAC">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="p11-input-group">
              <label>Phone Number</label>
              <input type="tel" class="p11-input" required placeholder="(555) 123-4567">
            </div>
            <div class="p11-input-group">
              <label>Email Address</label>
              <input type="email" class="p11-input" required placeholder="john@example.com">
            </div>
          </div>
          <div class="p11-input-group">
            <label>What is your biggest local visibility challenge?</label>
            <textarea class="p11-textarea" required placeholder="e.g., We rank #7 on Maps and competitors are getting all the calls..."></textarea>
          </div>
          <button type="submit" class="p11-submit-btn" id="p11-submit-btn">
            ⚡ Claim Free Audit
          </button>
        </form>

        <div class="p11-success-msg" id="p11-success-msg">
          <h3>Request Received!</h3>
          <p>We are analyzing your local market data. Mark Bishop or a top-class Local Visibility Expert will be in touch shortly.</p>
        </div>
      </div>
    </div>

  </div>
</section>

<script>
function handlePhase11Submit(e) {
  e.preventDefault();
  
  const btn = document.getElementById('p11-submit-btn');
  btn.innerHTML = 'Scanning Market... <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>';
  btn.style.opacity = '0.8';
  btn.style.pointerEvents = 'none';

  // Add a simple spin keyframe dynamically if not present
  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } } .spin-icon { animation: spin 1s linear infinite; }`;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    document.getElementById('p11-booking-form').style.display = 'none';
    const successMsg = document.getElementById('p11-success-msg');
    successMsg.style.display = 'block';
    
    // Trigger Confetti
    if (typeof confetti !== 'undefined') {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: 0.5, y: 0.5 },
          colors: ['#00d4ff', '#b8ff57', '#ffffff']
        }));
      }, 250);
    }
  }, 1500);
}
</script>
<!-- ==============================================
     END PHASE 11
=============================================== -->
"""

# Inject right before </body>
if "</body>" in html:
    html = html.replace("</body>", p11_code + "\n</body>")
    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Phase 11 successfully injected!")
else:
    print("Error: </body> not found.")
