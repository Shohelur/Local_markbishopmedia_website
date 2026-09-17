import re

with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix Testimonials button
html = re.sub(
    r'<li class="nav-item" id="nav-item-testimonials">\s*<span>Testimonials</span>\s*</li>',
    '<li class="nav-item" id="nav-item-testimonials">\n        <a href="#phase8-testimonials" style="text-decoration: none; color: inherit; display: block; width: 100%; height: 100%;">Testimonials</a>\n      </li>',
    html
)

# Add Active State JS Logic
# We need to add a click listener to all .nav-item elements (except those with dropdowns if they just toggle, but here they can be active).
# Or better, we can inject a small script into the navigation controller.
# Let's see where to inject it. We can put it right after the SMART NAVIGATION LOGIC.

active_state_js = '''
    /* ACTIVE STATE CLICK LOGIC */
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navItems.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
      });
    });
'''
if '/* ACTIVE STATE CLICK LOGIC */' not in html:
    html = html.replace('/* SMART NAVIGATION LOGIC */', active_state_js + '\n    /* SMART NAVIGATION LOGIC */')

with open('d:/Agentic OS/agency-website/final-website-master.html', 'w', encoding='utf-8') as f:
    f.write(html)
