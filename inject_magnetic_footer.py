import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'

with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update CSS
css_injection = """
  /* =========================================
     PHASE 13: MAGNETIC SLIM FOOTER
     ========================================= */
  #phase13-cyber-footer {
    position: relative;
    width: 100%;
    min-height: auto;
    padding: 60px 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(0, 212, 255, 0.1);
    z-index: 10;
  }
  
  .p13-footer-content {
    width: 100%;
    max-width: 1300px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 60px;
    z-index: 10;
  }

  /* Brand Section */
  .p13-brand-col .p13-brand-logo {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -1px;
    margin-bottom: 20px;
    color: #ffffff;
  }

  .p13-brand-col .p13-brand-logo svg {
    width: 40px;
    height: 40px;
    stroke: var(--cyan-glow);
    filter: drop-shadow(0 0 10px var(--cyan-glow));
  }
  
  .p13-brand-col .p13-tagline {
    color: var(--text-muted);
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 350px;
  }

  /* Links Section */
  .p13-col-title {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-muted);
    margin-bottom: 25px;
    font-weight: 600;
  }
  
  .p13-links-col {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .p13-link-item {
    color: var(--text-main);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 400;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    width: fit-content;
  }
  
  .p13-link-item::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0%;
    height: 2px;
    background: var(--lime-glow);
    transition: width 0.3s ease;
  }
  
  .p13-link-item:hover {
    color: var(--lime-glow);
    text-shadow: 0 0 10px rgba(184, 255, 87, 0.5);
  }
  .p13-link-item:hover::after {
    width: 100%;
  }

  /* Magnetic Contact Buttons */
  .p13-contact-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .magnetic-wrap {
    display: inline-block;
    padding: 10px; 
    margin: -10px;
    cursor: pointer;
  }

  .magnetic-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 14px 24px;
    border-radius: 12px;
    color: var(--text-main);
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s, box-shadow 0.3s;
    will-change: transform; 
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .magnetic-btn svg {
    width: 20px;
    height: 20px;
    color: var(--cyan-glow);
    transition: all 0.3s;
  }

  .magnetic-wrap:hover .magnetic-btn {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0, 212, 255, 0.1);
  }
  
  .magnetic-wrap:hover .magnetic-btn svg {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px var(--cyan-glow));
  }

  /* Neon Horizon Bottom Bar */
  .p13-bottom-bar {
    position: relative;
    width: 100%;
    max-width: 1300px;
    margin: 40px auto 0;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(0, 212, 255, 0.1);
    z-index: 10;
  }

  @media (max-width: 960px) {
    .p13-footer-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .p13-bottom-bar {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
  }
"""

# Replace old CSS for Phase 13 using robust regex
html = re.sub(r'/\* =+[\s\S]*?PHASE 13: CYBER FOOTER[\s\S]*?</style>', css_injection + '\n</style>', html)

# 2. Update HTML for Phase 13
new_html = """<footer id="phase13-cyber-footer">
  <div class="p13-footer-content">
    
    <!-- Brand -->
    <div class="p13-brand-col">
      <div class="p13-brand-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
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

    <!-- Contact Nodes (Magnetic Buttons) -->
    <div class="p13-contact-col">
      <div class="p13-col-title">Connect</div>
      
      <div class="magnetic-wrap">
        <a href="#" class="magnetic-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          Tucson, Arizona, USA
        </a>
      </div>
      
      <div class="magnetic-wrap">
        <a href="#" class="magnetic-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          mark@markbishopmedia.com
        </a>
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
</footer>"""

# Ensure we replace ONLY the footer HTML up to its end tag
html = re.sub(r'<footer id="phase13-cyber-footer">.*?</footer>', new_html, html, flags=re.DOTALL)

# 3. Inject JS for Magnetic Physics
magnetic_js = """
// --- MAGNETIC BUTTON PHYSICS ---
document.addEventListener('DOMContentLoaded', () => {
  const magneticWrappers = document.querySelectorAll('.magnetic-wrap');
  
  magneticWrappers.forEach(wrap => {
    const btn = wrap.querySelector('.magnetic-btn');
    if (!btn) return;
    
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const pullX = x * 0.4;
      const pullY = y * 0.4;
      
      btn.style.transition = 'none';
      btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });
    
    wrap.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
});
"""

# Inject JS right before </script> of Phase 13
html = re.sub(r'</script>\s*<!-- =+[\s\S]*?END PHASE 13', magnetic_js + '\n</script>\n<!-- ==============================================\n     END PHASE 13', html)

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Magnetic Slim Footer injected successfully.")
