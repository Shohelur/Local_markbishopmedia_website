import re

master_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(master_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add CSS
css_pattern = r'(\.p11-success-msg p \{[^}]*\}\s*)'
new_css = """
.p11-checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.p11-checkbox-group input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--cyan-glow);
}
.p11-checkbox-group label {
  color: #a0aec0;
  font-size: 14px;
  cursor: pointer;
}
"""
html = re.sub(css_pattern, r'\1' + new_css, html, flags=re.DOTALL)

# 2. Add Checkbox HTML
html_pattern = r'(<textarea class="p11-textarea" required placeholder="e\.g\., We rank #7 on Maps and competitors are getting all the calls\.\.\."></textarea>\s*</div>)'
new_html = """
          <div class="p11-checkbox-group">
            <input type="checkbox" id="skip-audit-check" onchange="toggleAuditCTA(this)">
            <label for="skip-audit-check">Skip the audit. I just want to talk to Mark directly.</label>
          </div>"""
html = re.sub(html_pattern, r'\1' + new_html, html, flags=re.DOTALL)

# 3. Add JS Function
js_pattern = r'(function handlePhase11Submit\(e\) \{)'
new_js = """function toggleAuditCTA(checkbox) {
  const btn = document.getElementById('p11-submit-btn');
  if(checkbox.checked) {
    btn.innerHTML = '📞 Request a Call';
  } else {
    btn.innerHTML = '⚡ Claim Free Audit';
  }
}

"""
html = re.sub(js_pattern, new_js + r'\1', html, flags=re.DOTALL)

with open(master_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Checkbox injected successfully!")
