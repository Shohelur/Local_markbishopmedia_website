import re

target_file = r'D:\Agentic OS\agency-website\approved\final-website-master.html'
with open(target_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Fix src="..."
# Matches src="assets/..." or src="./assets/..." but NOT src="../assets/..."
html = re.sub(r'src="(?:\./)?assets/', 'src="../assets/', html)

# 2. Fix url('...')
# Matches url('assets/...'), url('./assets/...'), url("assets/..."), url(assets/...)
html = re.sub(r'url\([\'"]?(?:\./)?assets/', "url('../assets/", html)

# 3. Fix href="..."
html = re.sub(r'href="(?:\./)?assets/', 'href="../assets/', html)

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(html)
    
print("All broken relative asset paths (both assets/ and ./assets/) have been strictly fixed to ../assets/ without double-patching!")
