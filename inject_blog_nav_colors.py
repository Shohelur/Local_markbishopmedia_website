with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

override_css = '''
  <style>
    /* BLOG PAGE LIGHT MODE NAVIGATION OVERRIDES */
    .nav-item, 
    .nav-contact-link,
    .mobile-menu-trigger {
      color: #0f172a !important; 
      font-weight: 700 !important;
    }
    .nav-item:hover, .nav-item.active {
      color: #00d4ff !important;
    }
    .nav-chevron {
      color: #0f172a !important;
    }
    
    /* Make the brand logo solid dark for light mode */
    .brand-logo-svg.brand-logo-full,
    .brand-logo-mobile-icon,
    .brand-logo-svg.brand-logo-mobile-icon {
      filter: brightness(0) !important;
    }

    /* Scrolled Navigation background needs to be light so dark text is still visible */
    body.is-scrolled .nav-capsule {
      background: rgba(255, 255, 255, 0.85) !important;
      border: 1.5px solid rgba(0, 0, 0, 0.05) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
    }
    
    /* Hover dropdown text */
    .dropdown-card-master h4,
    .dropdown-card-master p,
    .dropdown-card-master .resource-title {
      color: #0f172a !important;
    }
    .dropdown-master-layer {
      background: rgba(255, 255, 255, 0.95) !important;
      border: 1px solid rgba(0, 0, 0, 0.05) !important;
    }
    .dropdown-group-title {
      color: #64748b !important;
    }
    .mobile-drawer {
      background: rgba(255, 255, 255, 0.95) !important;
    }
    .mob-nav-item span {
      color: #0f172a !important;
    }
    .mob-direct-nav-link {
      color: #0f172a !important;
    }
  </style>
</head>
'''

html = html.replace('</head>', override_css)

with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Injected blog nav color overrides.')
