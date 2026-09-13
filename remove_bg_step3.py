import sys
from PIL import Image

def remove_background(input_path, output_path, tolerance=30):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        bg_color = data[0]
        new_data = []
        for item in data:
            if abs(item[0]-bg_color[0]) < tolerance and abs(item[1]-bg_color[1]) < tolerance and abs(item[2]-bg_color[2]) < tolerance:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

remove_background(r"D:\Agentic OS\agency-website\assets\images\step3-citation.jpg", r"D:\Agentic OS\agency-website\assets\images\step3-citation.png", 40)
