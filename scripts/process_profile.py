"""
Profile Image Dithering Script
Transforms profile photos into high-contrast retro dithered bitmap portraits,
matching the Bayer matrix ordered dithering aesthetic.
"""

import os
import shutil
from PIL import Image, ImageOps, ImageEnhance, ImageFilter, ImageDraw

def process_profile():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_img_dir = os.path.join(base_dir, "public", "images")
    
    orig_path = os.path.join(public_img_dir, "profile-original.png")
    current_path = os.path.join(public_img_dir, "profile.png")
    
    # Preserve original file if not backed up yet
    if not os.path.exists(orig_path):
        if os.path.exists(current_path):
            shutil.copy2(current_path, orig_path)
            print(f"Backed up original image to {orig_path}")
    
    input_path = orig_path if os.path.exists(orig_path) else current_path
    img_orig = Image.open(input_path)
    w_orig, h_orig = img_orig.size
    print(f"Loaded source image: {w_orig}x{h_orig}")
    
    # 1. Framing: Crop subject with portrait ratio
    # Subject head is centered roughly at x=420, y=320 in the 1536x1024 original
    crop_box = (30, 15, 890, 975)
    crop = img_orig.crop(crop_box)
    cw, ch = crop.size
    
    # 2. Background lighting adjustment:
    # Soften the bright beam in the background so the dark hair and silhouette
    # have a clean, dark backdrop with subtle atmospheric halo/rim-light.
    mask = Image.new('L', (cw, ch), 0)
    draw = ImageDraw.Draw(mask)
    poly_beam = [
        (480, 0),
        (cw, 0),
        (cw, 650),
        (750, 650),
        (520, 520),
        (460, 420),
        (520, 320),
        (520, 180),
        (490, 80),
        (450, 0)
    ]
    draw.polygon(poly_beam, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(25))
    
    bg_dark = Image.new('RGB', (cw, ch), (10, 10, 12))
    img_blended = Image.composite(bg_dark, crop, mask)
    
    # 3. Tone curve & shadow lift:
    # Brings out the suit lapels, tie folds, and collar texture in dither dots
    gray = img_blended.convert('L')
    lut = []
    for i in range(256):
        if i < 45:
            val = int(i * 1.7 + 14)
        elif i < 165:
            val = int(45 * 1.7 + 14 + (i - 45) * 1.08)
        else:
            val = i
        lut.append(min(255, max(0, val)))
    gray = gray.point(lut)
    
    # Micro-sharpening to ensure crisp dither edges
    gray = gray.filter(ImageFilter.UnsharpMask(radius=2, percent=140, threshold=2))
    
    # 4. Standard 8x8 Bayer matrix
    b8 = [
        [ 0, 32,  8, 40,  2, 34, 10, 42],
        [48, 16, 56, 24, 50, 18, 58, 26],
        [12, 44,  4, 36, 14, 46,  6, 38],
        [60, 28, 52, 20, 62, 30, 54, 22],
        [ 3, 35, 11, 43,  1, 33,  9, 41],
        [51, 19, 59, 27, 49, 17, 57, 25],
        [15, 47,  7, 39, 13, 45,  5, 37],
        [63, 31, 55, 23, 61, 29, 53, 21]
    ]
    
    # Render at 600px width for optimal fidelity on both standard and 2x retina screens
    out_w = 600
    out_h = int(out_w * ch / cw)
    scaled = gray.resize((out_w, out_h), Image.Resampling.LANCZOS)
    
    out = Image.new('L', (out_w, out_h))
    levels = 4
    step = 255.0 / (levels - 1)
    for y in range(out_h):
        for x in range(out_w):
            val = scaled.getpixel((x, y))
            b_offset = (b8[y % 8][x % 8] / 64.0 - 0.5) * step
            quant = int(round((val + b_offset) / step)) * step
            out.putpixel((x, y), max(0, min(255, int(quant))))
    
    # Save the output to public/images/profile.png
    out.save(current_path, "PNG", optimize=True)
    print(f"Successfully generated textured profile image: {current_path} ({out_w}x{out_h})")

if __name__ == "__main__":
    process_profile()
