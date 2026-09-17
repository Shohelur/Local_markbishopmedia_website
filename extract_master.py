def extract_lines(filepath, start_line, end_line):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    # Lines are 1-indexed for the user, 0-indexed for python list slice
    return "".join(lines[start_line-1 : end_line])

filepath = "d:/Agentic OS/agency-website/final-website-master.html"

css = extract_lines(filepath, 227, 1780)
with open("d:/Agentic OS/nav_css.txt", "w", encoding="utf-8") as f:
    f.write(css)

html = extract_lines(filepath, 2205, 2644)
# fix relative links
html = html.replace('href="#', 'href="final-website-master.html#')
with open("d:/Agentic OS/nav_html.txt", "w", encoding="utf-8") as f:
    f.write(html)

js = extract_lines(filepath, 5945, 6671)
with open("d:/Agentic OS/nav_js.txt", "w", encoding="utf-8") as f:
    f.write(js)

print("Master components extracted successfully!")
