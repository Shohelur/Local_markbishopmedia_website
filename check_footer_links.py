import re

with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract footer HTML
footer_match = re.search(r'(<footer id="phase13-cyber-footer">.*?</footer>)', html, re.DOTALL)
if footer_match:
    footer = footer_match.group(1)
    links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', footer, re.DOTALL)
    for link in links:
        print(f"Link: {link[0]} - Text: {link[1].strip()}")
else:
    print("Footer not found")
