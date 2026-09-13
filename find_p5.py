import sys

file_path = r'D:\Agentic OS\agency-website\final-website-master.html'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'phase5' in line:
        print(f"Found at line {i}")
        start = max(0, i - 15)
        for j in range(start, i + 5):
            print(f"Line {j}: {lines[j].strip()}")
        break
