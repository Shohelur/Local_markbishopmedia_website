import re
with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    html = f.read()

def find_blocks(pattern, name):
    for match in re.finditer(pattern, html, flags=re.DOTALL):
        start = html[:match.start()].count('\n') + 1
        end = html[:match.end()].count('\n') + 1
        print(f'{name}: Lines {start} - {end} (Len: {end - start})')

print("--- ABOUT.HTML ---")
find_blocks(r'/\*\s*-----------------------------------------------------------\s*CORE MASTER NAVIGATION CONTAINER.*?(?=</style>|/\*\s*-----------------------------------------------------------\s*STAGE 4|/\*\s*--- PHASE)', 'CSS')
find_blocks(r'<(div|nav)[^>]*class="master-nav-wrapper".*?</\1>', 'NAV HTML')
find_blocks(r'<div[^>]*class="mobile-drawer-sheet".*?</div>', 'DRAWER')
find_blocks(r'<div[^>]*id="faq-modal-overlay".*?</div>\s*(<style>.*?</style>)?', 'FAQ MODAL')
find_blocks(r'<div[^>]*id="audit-modal-overlay".*?</div>\s*(<style>.*?</style>)?', 'AUDIT MODAL')
find_blocks(r'/\*\s*--- 4\. APPROVED MASTER 3D NAVIGATION INTERACTION CONTROLLER --- \*/.*?(?=</script>|/\*\s*--- 5\.|/\*\s*PHASE 4)', 'JS')
find_blocks(r'<!DOCTYPE html>.*?</head>\s*<body[^>]*>', 'DUPLICATE HTML')

with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("\n--- BLOG.HTML ---")
find_blocks(r'/\*\s*-----------------------------------------------------------\s*CORE MASTER NAVIGATION CONTAINER.*?(?=</style>|/\*\s*-----------------------------------------------------------\s*STAGE 4|/\*\s*--- PHASE)', 'CSS')
find_blocks(r'<(div|nav)[^>]*class="master-nav-wrapper".*?</\1>', 'NAV HTML')
find_blocks(r'<div[^>]*class="mobile-drawer-sheet".*?</div>', 'DRAWER')
find_blocks(r'<div[^>]*id="faq-modal-overlay".*?</div>\s*(<style>.*?</style>)?', 'FAQ MODAL')
find_blocks(r'<div[^>]*id="audit-modal-overlay".*?</div>\s*(<style>.*?</style>)?', 'AUDIT MODAL')
find_blocks(r'/\*\s*--- 4\. APPROVED MASTER 3D NAVIGATION INTERACTION CONTROLLER --- \*/.*?(?=</script>|/\*\s*--- 5\.|/\*\s*PHASE 4)', 'JS')
find_blocks(r'/\*\s*BLOG SPECIFIC NAV OVERRIDES.*?(?=</style>)', 'BLOG NAV OVERRIDE CSS')
