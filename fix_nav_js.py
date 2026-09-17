import re

with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    html = f.read()

active_state_js = '''
/* ACTIVE STATE CLICK LOGIC */
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    this.classList.add('active');
  });
});
'''

html = html.replace('let lastScrollTop = window.scrollY || document.documentElement.scrollTop;', active_state_js + '\nlet lastScrollTop = window.scrollY || document.documentElement.scrollTop;')

with open('d:/Agentic OS/agency-website/final-website-master.html', 'w', encoding='utf-8') as f:
    f.write(html)
