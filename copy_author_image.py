import os
import glob
import shutil

# Find newest file in .user_uploaded
upload_dir = r'C:\Users\DELL\.gemini\antigravity-ide\brain\8a4b63a6-00c3-468d-979a-10ef2dfd4a2c\.user_uploaded'
files = glob.glob(os.path.join(upload_dir, '*'))
if not files:
    print('No uploaded files found.')
else:
    newest_file = max(files, key=os.path.getmtime)
    print(f'Newest file: {newest_file}')
    
    # Target path
    target_dir = r'd:\Agentic OS\agency-website\assets\images'
    target_path = os.path.join(target_dir, 'mark-bishop-real.png')
    
    shutil.copy2(newest_file, target_path)
    print(f'Copied to: {target_path}')
