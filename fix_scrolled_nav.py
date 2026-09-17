with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_css = '''    /* Scrolled Navigation background needs to be light so dark text is still visible */
    body.is-scrolled .nav-capsule {
      background: rgba(255, 255, 255, 0.85) !important;
      border: 1.5px solid rgba(0, 0, 0, 0.05) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
    }'''

new_css = '''    /* Scrolled Navigation: Restore text to white against the dark glass background */
    body.is-scrolled .nav-item, 
    body.is-scrolled .nav-contact-link,
    body.is-scrolled .mobile-menu-trigger {
      color: rgba(255, 255, 255, 0.75) !important; 
    }
    body.is-scrolled .nav-item:hover, 
    body.is-scrolled .nav-item.active {
      color: #00d4ff !important;
    }
    body.is-scrolled .nav-chevron {
      color: rgba(255, 255, 255, 0.45) !important;
    }'''

if old_css in html:
    html = html.replace(old_css, new_css)
    with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Successfully updated scrolled nav CSS.')
else:
    print('Failed to find old CSS.')
