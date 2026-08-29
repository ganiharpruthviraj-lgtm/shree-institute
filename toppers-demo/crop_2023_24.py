import os
import cv2
import numpy as np

poster_path = 'd:/dadadaad/shree-institute/toppers-demo/public/poster_2023_24.jpg'
out_dir = 'd:/dadadaad/shree-institute/toppers-demo/public/students/2024'
os.makedirs(out_dir, exist_ok=True)

img = cv2.imread(poster_path)
h_img, w_img, _ = img.shape

# 1. Director 2024 photo (top right white shirt)
dir_crop = img[10:145, 895:1010]
cv2.imwrite(os.path.join(out_dir, 'director_2024.jpg'), dir_crop)

# 2. Ashish (Big left photo 94%)
ashish_crop = img[125:320, 28:170]
cv2.imwrite(os.path.join(out_dir, 'ashish.jpg'), ashish_crop)

# 3. Row 1 (7 CBSE Toppers) - y: 150 to 275
r1_students = [
    ("om", 200, 290, 150, 275),
    ("priyanka", 318, 408, 150, 275),
    ("kirtana", 432, 522, 150, 275),
    ("atalji", 548, 638, 150, 275),
    ("kartik", 662, 752, 150, 275),
    ("bhavani", 776, 866, 150, 275),
    ("aqsa", 890, 980, 150, 275),
]

for name, x1, x2, y1, y2 in r1_students:
    sub = img[y1:y2, x1:x2]
    cv2.imwrite(os.path.join(out_dir, f'{name}.jpg'), sub)

# 4. Row 2 (8 CBSE Toppers) - y: 310 to 430
r2_students = [
    ("srushti", 200, 275, 310, 430),
    ("yash", 295, 370, 310, 430),
    ("pavan", 388, 463, 310, 430),
    ("rashmi", 482, 557, 310, 430),
    ("sakshi_cbse", 576, 651, 310, 430),
    ("suhas", 670, 745, 310, 430),
    ("yashvanth", 764, 839, 310, 430),
    ("preetham", 858, 933, 310, 430),
]

for name, x1, x2, y1, y2 in r2_students:
    sub = img[y1:y2, x1:x2]
    cv2.imwrite(os.path.join(out_dir, f'{name}.jpg'), sub)

# 5. Row 3 (7 SSLC Toppers) - y: 448 to 555
r3_students = [
    ("prasad", 200, 275, 448, 555),
    ("shambhavi", 298, 373, 448, 555),
    ("muzamil", 395, 470, 448, 555),
    ("aman", 490, 565, 448, 555),
    ("sakshi_sslc", 583, 658, 448, 555),
    ("sandesh", 678, 753, 448, 555),
    ("aditya_2024", 772, 847, 448, 555),
]

for name, x1, x2, y1, y2 in r3_students:
    sub = img[y1:y2, x1:x2]
    cv2.imwrite(os.path.join(out_dir, f'{name}.jpg'), sub)

print("2023-24 Poster cropping complete!")
