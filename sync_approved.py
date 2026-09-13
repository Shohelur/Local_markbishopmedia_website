import os
import shutil

working_master = r"D:\Agentic OS\agency-website\final-website-master.html"
approved_master = r"D:\Agentic OS\agency-website\approved\final-website-master.html"

# Step 1: Copy the file
shutil.copy2(working_master, approved_master)

# Step 2: Read the approved file to fix paths
with open(approved_master, 'r', encoding='utf-8') as f:
    content = f.read()

# Step 3: Rewrite asset paths
# Replace src="assets/ with src="../assets/
content = content.replace('src="assets/', 'src="../assets/')
content = content.replace("src='assets/", "src='../assets/")

# Replace src="./assets/ with src="../assets/
content = content.replace('src="./assets/', 'src="../assets/')
content = content.replace("src='./assets/", "src='../assets/")

# Replace url('assets/ with url('../assets/
content = content.replace("url('assets/", "url('../assets/")
content = content.replace('url("assets/', 'url("../assets/')
content = content.replace("url(assets/", "url(../assets/")

# Same for ./assets/ inside url()
content = content.replace("url('./assets/", "url('../assets/")
content = content.replace('url("./assets/', 'url("../assets/')
content = content.replace("url(./assets/", "url(../assets/")

# Step 4: Write it back
with open(approved_master, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully synced to approved master and fixed asset paths.")
