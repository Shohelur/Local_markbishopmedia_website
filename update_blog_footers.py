import glob
import os

files = glob.glob(r'd:\Agentic OS\agency-website\**\*.html', recursive=True)

search_str2 = '''        <!-- 1. Local Mark Bishop Media + Logo -->
        <div class="p13-brand-logo" style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <img src="../assets/logos/mbm-icon.svg" alt="Local MBM Icon" style="width: 35px; height: 35px; filter: drop-shadow(0 0 10px var(--cyan-glow));">
          <span class="live-neon-text">Local Mark Bishop Media</span>
        </div>'''

replace_str2 = '''        <!-- 1. Local Mark Bishop Media + Logo -->
        <a href="#" class="p13-brand-logo" style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px; text-decoration: none; cursor: pointer;">
          <img src="../assets/logos/mbm-icon.svg" alt="Local MBM Icon" style="width: 35px; height: 35px; filter: drop-shadow(0 0 10px var(--cyan-glow));">
          <span class="live-neon-text">Local Mark Bishop Media</span>
        </a>'''

count = 0
for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        if search_str2 in content:
            content = content.replace(search_str2, replace_str2)
            modified = True
            
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f'Updated: {file_path}')
    except Exception as e:
        pass

print(f'Total updated: {count}')
