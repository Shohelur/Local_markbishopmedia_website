"""
Precise surgical extraction of Theme 3 from glass-demos.html.
Reads the EXACT original file, keeps ALL CSS byte-for-byte,
only changes: body CSS, display:none, section class, removes ui-panel/mock-content,
and replaces the entire <script> block with Theme-3-only JS.
"""
import re

SRC = r'd:\Agentic OS\agency-website\mockup-studio\glass-demos.html'
DST = r'd:\Agentic OS\agency-website\sections\12-about-mark-master.html'

with open(SRC, 'r', encoding='utf-8') as f:
    html = f.read()

# ─── 1. Change <title> ───
html = html.replace(
    '<title>About Mark Bishop - MBM Glass Demos</title>',
    '<title>About Mark Bishop | Mark Bishop Media</title>'
)

# ─── 2. Change body CSS: overflow hidden → auto, bg #000 → gradient ───
html = html.replace(
    "body { font-family: 'Space Grotesk', system-ui, sans-serif; overflow: hidden; height: 100vh; background: #000; color: #fff; }",
    "body { font-family: 'Space Grotesk', system-ui, sans-serif; overflow-x: hidden; min-height: 100vh; background: linear-gradient(135deg, #e0f7fa, #b2ebf2); color: #0a192f; }"
)

# ─── 3. Remove #ui-panel CSS block ───
html = html.replace(
    """    /* UI PANEL */
    #ui-panel {
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 10px; z-index: 1000;
      background: rgba(255,255,255,0.1);
      padding: 10px 20px; border-radius: 30px;
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    }
    button {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      color: #fff; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;
      transition: all 0.3s; white-space: nowrap;
    }
    button.active { background: rgba(0, 212, 255, 0.2); border-color: #00d4ff; color: #00d4ff; box-shadow: 0 0 15px rgba(0, 212, 255, 0.4); }
    button:hover:not(.active) { background: rgba(255,255,255,0.1); }""",
    ""
)

# ─── 4. Remove mock-header CSS ───
html = html.replace(
    """    /* Header/Nav mock */
    .mock-header {
      position: absolute; top: 0; left: 0; right: 0; height: 80px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 40px; pointer-events: none;
    }
    h1 { font-size: 4rem; font-weight: 800; letter-spacing: -2px; margin-bottom: 10px; text-shadow: 0 5px 30px rgba(0,0,0,0.9); }
    h1 span { background: linear-gradient(135deg, #00d4ff, #b8ff57); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .mock-content p { font-size: 1.2rem; color: #e0e0e0; text-shadow: 0 2px 10px rgba(0,0,0,0.9); font-weight: 500; }""",
    ""
)

# ─── 5. Remove display: none from #about-mark ───
html = html.replace(
    """    #about-mark {
      display: none;
      position: relative;""",
    """    #about-mark {
      position: relative;"""
)

# ─── 6. Add class="theme-cyan" to the section tag ───
html = html.replace(
    '<section id="about-mark">',
    '<section id="about-mark" class="theme-cyan">'
)

# ─── 7. Remove ui-panel div (lines 531-538) ───
html = re.sub(
    r'\n  <div id="ui-panel">.*?</div>\n',
    '\n',
    html,
    flags=re.DOTALL
)

# ─── 8. Remove mock-content div (lines 540-543) ───
html = re.sub(
    r'\n  <div class="mock-content">.*?</div>\n',
    '\n',
    html,
    flags=re.DOTALL
)

# ─── 9. Replace the ENTIRE <script> block with Theme-3-only JS ───
NEW_SCRIPT = """  <script>
    // ═══════════ THEME 3: GLACIAL MINT — STANDALONE ═══════════
    let canvas = document.getElementById('glass-canvas');

    // Pre-render MBM logo SVG to 256x256 PNG data URL for glass face texture
    let mbmLogoDataUrl = null;
    (function preRenderLogo() {
      const svgText = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 76" fill="none" width="256" height="256">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d4ff"/><stop offset="60%" stop-color="#38ef7d"/><stop offset="100%" stop-color="#b8ff57"/>
        </linearGradient></defs>
        <g transform="translate(0,4)">
          <path d="M 12 56 L 12 18 L 26 36" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M 58 36 L 72 18 L 72 56" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M 42 57.6 C 34.3 47.1 27.3 40.1 27.3 31.7 A 14.7 14.7 0 1 1 56.7 31.7 C 56.7 40.1 49.7 47.1 42 57.6 Z" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M 33.6 40.8 L 39.2 34.5 L 44.1 39.4 L 51.1 28.2" stroke="url(#g)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M 44.8 27.5 L 51.8 27.5 L 51.8 34.5" stroke="url(#g)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </g>
      </svg>`;
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = function() {
        const c = document.createElement('canvas');
        c.width = 256; c.height = 256;
        const ctx = c.getContext('2d');
        ctx.filter = 'blur(3px)';
        ctx.drawImage(img, 0, 0, 256, 256);
        URL.revokeObjectURL(url);
        mbmLogoDataUrl = c.toDataURL('image/png');

        // Theme 3: Glacial Mint — EXACT config from glass-demos.html
        const config = {
          colors: ['#F8FAFC', '#F1F5F9', '#E2E8F0', '#0D9488'], 
          scale: 1.18, intensity: 0.15, paramA: 0.34, detail: 1.824, contrast: 1.0, brightness: 0.0, saturation: 1.0, grain: 0.032, seed: 5.0, oklab: 1.0,
          shadeBase: 0.9, shadeHighlight: 0.13, shadeShadow: 0.06,
          cursorEnabled: true, cursorEffect: 1.0, cursorStrength: 0.45, cursorRadius: 0.5, timeScale: 0.3,
          faceImage: mbmLogoDataUrl
        };

        NHGlass.mount(canvas, config);

        // Portrait reveal
        setTimeout(function() {
          var p = document.getElementById('am-portrait');
          if (p) p.classList.add('is-in');
        }, 400);

        initWordFlows();
      };
      img.src = url;
    })();

    // ═══════════ WORD FLOW-IN (Nathan Herk Style) ═══════════
    const aboutSection = document.getElementById('about-mark');
    let flowsInitialized = false;

    function wrapWords(el) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      let n;
      while ((n = walker.nextNode())) {
        if (n.nodeValue.trim() && !n.parentNode.closest('svg')) nodes.push(n);
      }
      let count = 0;
      nodes.forEach(function(node) {
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(\\s+)/).forEach(function(part) {
          if (!part) return;
          if (/^\\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span');
          w.className = 'fw';
          w.textContent = part;
          w.style.setProperty('--i', count++);
          frag.appendChild(w);
        });
        node.parentNode.replaceChild(frag, node);
      });
      return count;
    }

    function initWordFlows() {
      if (flowsInitialized) {
        aboutSection.querySelectorAll('[data-flow]').forEach(function(el) { el.classList.add('is-flowed'); });
        return;
      }
      flowsInitialized = true;

      const flowEls = aboutSection.querySelectorAll('[data-flow]');
      flowEls.forEach(function(el) {
        wrapWords(el);
        const delay = parseInt(el.getAttribute('data-flow-delay')) || 0;
        if (delay) el.style.setProperty('--flow-base-delay', delay + 'ms');
      });

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            const delay = parseInt(e.target.getAttribute('data-flow-delay')) || 0;
            setTimeout(function() { e.target.classList.add('is-flowed'); }, delay);
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

      flowEls.forEach(function(el) { observer.observe(el); });
    }
  </script>"""

# Use string slicing instead of re.sub to avoid escape issues in replacement
script_start = html.find('  <script>')
script_end = html.find('  </script>') + len('  </script>')
if script_start != -1 and script_end > script_start:
    html = html[:script_start] + NEW_SCRIPT + html[script_end:]
else:
    print("ERROR: Could not find <script> block!")
    exit(1)

# ─── 10. Update comment ───
html = html.replace(
    '<!-- ═══════════ ABOUT MARK — FULL PAGE SCROLL (Theme 1 Only) ═══════════ -->',
    '<!-- ═══════════ ABOUT MARK — MASTER (Theme 3: Glacial Mint) ═══════════ -->'
)

with open(DST, 'w', encoding='utf-8') as f:
    f.write(html)

print("SUCCESS — 12-about-mark-master.html created.")
print(f"File size: {len(html)} bytes")

# Verify critical elements
checks = [
    ('theme-cyan class', 'class="theme-cyan"' in html),
    ('No display:none', 'display: none' not in html),
    ('No ui-panel HTML', '<div id="ui-panel">' not in html),
    ('No mock-content HTML', '<div class="mock-content">' not in html),
    ('No loadTheme function', 'function loadTheme' not in html),
    ('No btn-1 reference', 'btn-1' not in html),
    ('Has Glacial Mint config', '#0D9488' in html),
    ('Has theme-cyan CSS', '.theme-cyan .am-label' in html),
    ('Has am-accent-box CSS', 'am-accent-box' in html),
    ('Has am-stats CSS', 'am-stats' in html),
    ('Has word flow CSS', '.fw' in html),
    ('Has responsive CSS', '@media (max-width: 860px)' in html),
    ('Has glass.js script', 'glass.js' in html),
    ('Body bg is gradient', 'linear-gradient(135deg, #e0f7fa, #b2ebf2)' in html),
]
print("\n--- VERIFICATION ---")
all_pass = True
for label, ok in checks:
    status = "PASS" if ok else "FAIL"
    if not ok: all_pass = False
    print(f"  [{status}] {label}")
print(f"\nAll checks passed: {all_pass}")
