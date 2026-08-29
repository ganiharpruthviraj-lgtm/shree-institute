import os
import cv2
import numpy as np
from PIL import Image

poster_path = 'd:/dadadaad/shree-institute/toppers-demo/public/poster.jpg'
out_dir = 'd:/dadadaad/shree-institute/toppers-demo/public/students'
os.makedirs(out_dir, exist_ok=True)

img = cv2.imread(poster_path)
h_img, w_img, _ = img.shape
print(f"Poster dimensions: {w_img}x{h_img}")

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Director Photo (Sridhar H.K.)
# Let's crop director: x=50..235, y=170..365
dir_img = img[170:365, 50:235]
cv2.imwrite(os.path.join(out_dir, 'director.jpg'), dir_img)

# SSLC Row 1 & Row 2 Bounding Boxes (6 columns)
# We will manually measure or detect each exact frame
sslc_boxes_r1 = [
    (328, 148, 80, 100),  # Shreya
    (434, 148, 80, 100),  # Basavaraj
    (540, 148, 80, 100),  # Janvi
    (646, 148, 80, 100),  # Sharanu
    (752, 148, 80, 100),  # Sukrith
    (858, 148, 80, 100),  # Aaditya
]

sslc_boxes_r2 = [
    (328, 290, 80, 100),  # Annapurna
    (434, 290, 80, 100),  # Aparna
    (540, 290, 80, 100),  # Bhavani
    (646, 290, 80, 100),  # Annapurna
    (752, 290, 80, 100),  # Chaitra
    (858, 290, 80, 100),  # Nivedita
]

for idx, (x, y, w, h) in enumerate(sslc_boxes_r1, 1):
    sub = img[y:y+h, x:x+w]
    gray = cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 3)
    if len(faces) > 0:
        fx, fy, fw, fh = max(faces, key=lambda b: b[2]*b[3])
        cx, cy = x + fx + fw//2, y + fy + fh//2
        crop_w, crop_h = 76, 95
        x1 = max(0, min(w_img - crop_w, cx - crop_w//2))
        y1 = max(0, min(h_img - crop_h, cy - crop_h//2))
        sub = img[y1:y1+crop_h, x1:x1+crop_w]
    cv2.imwrite(os.path.join(out_dir, f'sslc_{idx}.jpg'), sub)

for idx, (x, y, w, h) in enumerate(sslc_boxes_r2, 7):
    sub = img[y:y+h, x:x+w]
    gray = cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 3)
    if len(faces) > 0:
        fx, fy, fw, fh = max(faces, key=lambda b: b[2]*b[3])
        cx, cy = x + fx + fw//2, y + fy + fh//2
        crop_w, crop_h = 76, 95
        x1 = max(0, min(w_img - crop_w, cx - crop_w//2))
        y1 = max(0, min(h_img - crop_h, cy - crop_h//2))
        sub = img[y1:y1+crop_h, x1:x1+crop_w]
    cv2.imwrite(os.path.join(out_dir, f'sslc_{idx}.jpg'), sub)


# CBSE Row 1 & Row 2 precise individual X positions!
# Let's inspect CBSE x positions for all 9 columns in Row 1 and Row 2
# Row 1: y=432..512
# Row 2: y=544..624
cbse_r1_x = [74, 172, 270, 368, 466, 564, 664, 762, 862]
cbse_r2_x = [74, 172, 270, 368, 466, 564, 664, 774, 874] # Notice col 7 & 8 are shifted on poster!

for idx, x in enumerate(cbse_r1_x, 1):
    y = 432
    w, h = 64, 80
    sub = img[y:y+h, x:x+w]
    gray = cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.05, 2)
    if len(faces) > 0:
        fx, fy, fw, fh = max(faces, key=lambda b: b[2]*b[3])
        cx, cy = x + fx + fw//2, y + fy + fh//2
        crop_w, crop_h = 60, 75
        x1 = max(0, min(w_img - crop_w, cx - crop_w//2))
        y1 = max(0, min(h_img - crop_h, cy - crop_h//2))
        sub = img[y1:y1+crop_h, x1:x1+crop_w]
    cv2.imwrite(os.path.join(out_dir, f'cbse_{idx}.jpg'), sub)

for idx, x in enumerate(cbse_r2_x, 10):
    y = 544
    w, h = 64, 80
    sub = img[y:y+h, x:x+w]
    gray = cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.05, 2)
    if len(faces) > 0:
        fx, fy, fw, fh = max(faces, key=lambda b: b[2]*b[3])
        cx, cy = x + fx + fw//2, y + fy + fh//2
        crop_w, crop_h = 60, 75
        x1 = max(0, min(w_img - crop_w, cx - crop_w//2))
        y1 = max(0, min(h_img - crop_h, cy - crop_h//2))
        sub = img[y1:y1+crop_h, x1:x1+crop_w]
    cv2.imwrite(os.path.join(out_dir, f'cbse_{idx}.jpg'), sub)

print("Face-centered cropping complete!")
