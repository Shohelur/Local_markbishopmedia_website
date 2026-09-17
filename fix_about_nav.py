with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Ensure we are deleting the right chunk by checking content
start_idx = 3246  # 0-indexed line 3247
end_idx = 3496    # 0-indexed line 3497

print('First line to delete:', lines[start_idx].strip())
print('Last line to delete:', lines[end_idx-1].strip())
print('Line after deletion:', lines[end_idx].strip())

del lines[start_idx:end_idx]

with open('d:/Agentic OS/agency-website/about.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('Deleted orphaned nav block.')
