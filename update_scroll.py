import glob
import os

files = glob.glob(r'd:\Agentic OS\agency-website\**\*.html', recursive=True)

search1 = '''        <a href="#" class="p13-brand-logo" style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px; text-decoration: none; cursor: pointer;">
          <img src="assets/logos/mbm-icon.svg"'''

replace1 = '''        <a href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;" class="p13-brand-logo" style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px; text-decoration: none; cursor: pointer;">
          <img src="assets/logos/mbm-icon.svg"'''

search2 = '''        <a href="#" class="p13-brand-logo" style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px; text-decoration: none; cursor: pointer;">
          <img src="../assets/logos/mbm-icon.svg"'''

replace2 = '''        <a href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;" class="p13-brand-logo" style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px; text-decoration: none; cursor: pointer;">
          <img src="../assets/logos/mbm-icon.svg"'''


count = 0
for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        if search1 in content:
            content = content.replace(search1, replace1)
            modified = True
        if search2 in content:
            content = content.replace(search2, replace2)
            modified = True
            
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f'Updated: {file_path}')
    except Exception as e:
        pass

print(f'Total updated: {count}')
