with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_code = '''  tl.to('#hero-left', { opacity: 1, visibility: 'visible', x: 0, y: 0, filter: 'blur(0px)', duration: 0.6, ease: "power3.out" }, 2.6);
}'''

new_code = '''  tl.to('#hero-left', { opacity: 1, visibility: 'visible', x: 0, y: 0, filter: 'blur(0px)', duration: 0.6, ease: "power3.out" }, 2.6);

  // BYPASS INTRO IF USER CAME FROM ANOTHER PAGE VIA ANCHOR LINK
  if (window.location.hash) {
    tl.progress(1);
  }
}'''

if old_code in html:
    html = html.replace(old_code, new_code)
    with open('d:/Agentic OS/agency-website/final-website-master.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully injected GSAP bypass logic.")
else:
    print("Failed to find the exact injection point.")
