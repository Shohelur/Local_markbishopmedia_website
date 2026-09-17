import re

with open("d:/Agentic OS/agency-website/blog.html", "r", encoding="utf-8") as f:
    html = f.read()

# Remove old cards that have NO data-category attribute (the leftover duplicates)
html = re.sub(r'\n    <article class="blog-card card-featured">\n.*?</article>', '', html, flags=re.DOTALL)
html = re.sub(r'\n    <article class="blog-card card-standard">\n.*?</article>', '', html, flags=re.DOTALL)

with open("d:/Agentic OS/agency-website/blog.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Done. Old cards removed.")
