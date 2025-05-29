import os
from PIL import Image

# Directory containing your images
IMAGE_DIR = 'public/Images'  # <-- change this to your directory

# Max width and height for resizing (adjust for your needs)
MAX_SIZE = (1024, 1024)  # max width and height in pixels

def resize_image(image_path):
    with Image.open(image_path) as img:
        # Preserve aspect ratio
        img.thumbnail(MAX_SIZE, Image.LANCZOS)
        
        # Save back with quality=85 (good balance, adjust if needed)
        img.save(image_path, quality=85, optimize=True)

def main():
    supported_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff')
    
    for filename in os.listdir(IMAGE_DIR):
        if filename.lower().endswith(supported_extensions):
            filepath = os.path.join(IMAGE_DIR, filename)
            print(f"Resizing {filename}...")
            try:
                resize_image(filepath)
            except Exception as e:
                print(f"Error processing {filename}: {e}")

    print("All done!")

if __name__ == "__main__":
    main()
