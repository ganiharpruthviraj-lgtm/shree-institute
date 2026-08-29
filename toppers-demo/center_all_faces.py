import os
import cv2
import numpy as np

poster_path = 'd:/dadadaad/shree-institute/toppers-demo/public/poster.jpg'
out_dir = 'd:/dadadaad/shree-institute/toppers-demo/public/students'
os.makedirs(out_dir, exist_ok=True)

img = cv2.imread(poster_path)
h_img, w_img, _ = img.shape

def get_face_center(sub_img, default_cx, default_cy):
    hsv = cv2.cvtColor(sub_img, cv2.COLOR_BGR2HSV)
    # Skin color range in HSV
    lower_skin1 = np.array([0, 20, 70], dtype=np.uint8)
    upper_skin1 = np.array([25, 220, 255], dtype=np.uint8)
    lower_skin2 = np.array([170, 20, 70], dtype=np.uint8)
    upper_skin2 = np.array([180, 220, 255], dtype=np.uint8)
    
    mask1 = cv2.inRange(hsv, lower_skin1, upper_skin1)
    mask2 = cv2.inRange(hsv, lower_skin2, upper_skin2)
    mask = cv2.bitwise_or(mask1, mask2)
    
    # Calculate moments of skin mask
    M = cv2.moments(mask)
    if M["m00"] > 50:
        mcx = int(M["m10"] / M["m00"])
        mcy = int(M["m01"] / M["m00"])
        return mcx, mcy
    return default_cx, default_cy

# SSLC Students (12)
sslc_regions = [
    # (search_x, search_y, search_w, search_h)
    (320, 140, 96, 115),  # 1. Shreya
    (426, 140, 96, 115),  # 2. Basavaraj
    (532, 140, 96, 115),  # 3. Janvi
    (638, 140, 96, 115),  # 4. Sharanu
    (744, 140, 96, 115),  # 5. Sukrith
    (850, 140, 96, 115),  # 6. Aaditya
    (320, 280, 96, 115),  # 7. Annapurna
    (426, 280, 96, 115),  # 8. Aparna
    (532, 280, 96, 115),  # 9. Bhavani
    (638, 280, 96, 115),  # 10. Annapurna
    (744, 280, 96, 115),  # 11. Chaitra
    (850, 280, 96, 115),  # 12. Nivedita
]

crop_w, crop_h = 70, 88

for idx, (sx, sy, sw, sh) in enumerate(sslc_regions, 1):
    sub = img[sy:sy+sh, sx:sx+sw]
    cx_rel, cy_rel = get_face_center(sub, sw//2, sh//2)
    abs_cx = sx + cx_rel
    abs_cy = sy + cy_rel
    
    # Keep crop inside poster bounds
    x1 = max(0, min(w_img - crop_w, abs_cx - crop_w//2))
    y1 = max(0, min(h_img - crop_h, abs_cy - crop_h//2 + 4)) # shift slightly down for hair
    
    cropped = img[y1:y1+crop_h, x1:x1+crop_w]
    cv2.imwrite(os.path.join(out_dir, f'sslc_{idx}.jpg'), cropped)

# CBSE Students (18)
cbse_regions_r1 = [
    (65, 420, 85, 95),   # 1. Ritu
    (163, 420, 85, 95),  # 2. Ambanna
    (261, 420, 85, 95),  # 3. Shreesh
    (359, 420, 85, 95),  # 4. Supriya S.G
    (457, 420, 85, 95),  # 5. Md. Saheel
    (555, 420, 85, 95),  # 6. Bhoomika
    (653, 420, 85, 95),  # 7. Spoorthi
    (751, 420, 85, 95),  # 8. Punitraj
    (849, 420, 85, 95),  # 9. Rohini
]

cbse_regions_r2 = [
    (65, 532, 85, 95),   # 10. Preetham
    (163, 532, 85, 95),  # 11. Poorvika
    (261, 532, 85, 95),  # 12. Supriya S
    (359, 532, 85, 95),  # 13. Navya
    (457, 532, 85, 95),  # 14. Adrash
    (555, 532, 85, 95),  # 15. Bhagyashree
    (653, 532, 85, 95),  # 16. Shreyas Nayak
    (758, 532, 85, 95),  # 17. Lakshmi S.M (shifted right on poster)
    (856, 532, 85, 95),  # 18. Sukanya (shifted right on poster)
]

cbse_crop_w, cbse_crop_h = 58, 72

for idx, (sx, sy, sw, sh) in enumerate(cbse_regions_r1, 1):
    sub = img[sy:sy+sh, sx:sx+sw]
    cx_rel, cy_rel = get_face_center(sub, sw//2, sh//2)
    abs_cx = sx + cx_rel
    abs_cy = sy + cy_rel
    
    x1 = max(0, min(w_img - cbse_crop_w, abs_cx - cbse_crop_w//2))
    y1 = max(0, min(h_img - cbse_crop_h, abs_cy - cbse_crop_h//2 + 2))
    
    cropped = img[y1:y1+cbse_crop_h, x1:x1+cbse_crop_w]
    cv2.imwrite(os.path.join(out_dir, f'cbse_{idx}.jpg'), cropped)

for idx, (sx, sy, sw, sh) in enumerate(cbse_regions_r2, 10):
    sub = img[sy:sy+sh, sx:sx+sw]
    cx_rel, cy_rel = get_face_center(sub, sw//2, sh//2)
    abs_cx = sx + cx_rel
    abs_cy = sy + cy_rel
    
    x1 = max(0, min(w_img - cbse_crop_w, abs_cx - cbse_crop_w//2))
    y1 = max(0, min(h_img - cbse_crop_h, abs_cy - cbse_crop_h//2 + 2))
    
    cropped = img[y1:y1+cbse_crop_h, x1:x1+cbse_crop_w]
    cv2.imwrite(os.path.join(out_dir, f'cbse_{idx}.jpg'), cropped)

print("All 30 faces mathematically centered on skin centroids!")
