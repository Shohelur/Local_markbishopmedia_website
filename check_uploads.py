import os
import glob
import datetime

upload_dir = r'C:\Users\DELL\.gemini\antigravity-ide\brain\8a4b63a6-00c3-468d-979a-10ef2dfd4a2c\.user_uploaded'
files = glob.glob(os.path.join(upload_dir, '*'))
files.sort(key=os.path.getmtime, reverse=True)

for i, f in enumerate(files[:10]):
    mtime = datetime.datetime.fromtimestamp(os.path.getmtime(f))
    size = os.path.getsize(f)
    print(f"{i}: {os.path.basename(f)} - {mtime} - {size} bytes")
