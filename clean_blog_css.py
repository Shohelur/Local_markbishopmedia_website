with open('d:/Agentic OS/agency-website/blog.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Verify the block to delete
start_idx = 78 # line 79
end_idx = 104   # line 104 (exclusive, so it deletes up to line 103)

print('First line to delete:', lines[start_idx].strip())
print('Last line to delete:', lines[end_idx-1].strip())
print('Line after deletion:', lines[end_idx].strip())

del lines[start_idx:end_idx]

with open('d:/Agentic OS/agency-website/blog.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('Deleted legacy nav CSS from blog.html.')
