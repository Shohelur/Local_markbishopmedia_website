import re

# 1. Get clean modal block from master
with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

modal_match = re.search(r'(<!-- FAQ MODAL OVERLAY -->.*?)</body>', master_html, re.DOTALL)
if not modal_match:
    print('Failed to find modals in master')
    exit()

clean_modals = modal_match.group(1)

# 2. Open about.html and remove the broken modals
with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

# Replace everything from <!-- FAQ MODAL OVERLAY --> to </body> with the clean modals + </body>
new_about_html = re.sub(r'<!-- FAQ MODAL OVERLAY -->.*?</body>', clean_modals + '</body>', about_html, flags=re.DOTALL)

with open('d:/Agentic OS/agency-website/about.html', 'w', encoding='utf-8') as f:
    f.write(new_about_html)

print('Successfully restored modals in about.html from master')
