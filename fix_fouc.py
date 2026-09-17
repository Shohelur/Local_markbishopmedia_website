with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    html = f.read()

fouc_style = '''
  <style>
    /* PREVENT NAV FLASH BEFORE GSAP INIT */
    #master-nav-wrapper { opacity: 0; pointer-events: none; transform: translateY(-20px); }
  </style>
</head>'''

html = html.replace('</head>', fouc_style)

with open('d:/Agentic OS/agency-website/final-website-master.html', 'w', encoding='utf-8') as f:
    f.write(html)
