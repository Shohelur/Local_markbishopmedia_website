import re

file_path = 'd:/Agentic OS/agency-website/blog/post-001-why-not-showing-on-google-maps.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Move sidebar to the left
# Current structure: <article class="post-article"> ... </article> \n <aside class="post-sidebar"> ... </aside>
# We need to swap their positions.
article_match = re.search(r'(<article class="post-article".*?</article>)', html, re.DOTALL)
sidebar_match = re.search(r'(<aside class="post-sidebar">.*?</aside>)', html, re.DOTALL)

if article_match and sidebar_match:
    article_html = article_match.group(1)
    sidebar_html = sidebar_match.group(1)
    
    # Remove both from their current places
    html = html.replace(article_html, '%%ARTICLE%%')
    html = html.replace(sidebar_html, '')
    
    # Re-insert with sidebar first
    html = html.replace('%%ARTICLE%%', f'{sidebar_html}\n{article_html}')

# 2. Add ScrollSpy CSS
css_injection = """
  .toc-list li.active::before {
    background: #00d4ff;
    box-shadow: 0 0 8px rgba(0,212,255,0.8);
    transform: scale(1.3);
  }
  .toc-list a.active {
    color: #ffffff;
    font-weight: 600;
  }
"""
html = html.replace('.toc-list a:hover {', css_injection + '\n  .toc-list a:hover {')

# 3. Add ScrollSpy JS at the end of the body
js_code = """
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.post-body h2[id]');
    const navLinks = document.querySelectorAll('.toc-list a');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      let activeId = null;
      
      // Find the currently intersecting section
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeId = entry.target.getAttribute('id');
        }
      });
      
      // If we found one, update the nav
      if (activeId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.parentElement.classList.remove('active');
          if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('active');
            link.parentElement.classList.add('active');
          }
        });
      }
    }, {
      rootMargin: '-20% 0px -60% 0px', // Trigger when heading is near the top
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
    
    // Also handle click for smooth scrolling manually if CSS scroll-behavior isn't enough
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 100, // Offset for sticky headers
            behavior: 'smooth'
          });
          // Update active state immediately on click
          navLinks.forEach(l => {
            l.classList.remove('active');
            l.parentElement.classList.remove('active');
          });
          this.classList.add('active');
          this.parentElement.classList.add('active');
        }
      });
    });
  });
</script>
</body>
"""

html = html.replace('</body>', js_code)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Sidebar moved left and ScrollSpy JS added.")
