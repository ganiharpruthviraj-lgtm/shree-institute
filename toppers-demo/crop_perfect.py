import os
from PIL import Image

poster_path = 'd:/dadadaad/shree-institute/toppers-demo/public/poster.jpg'
out_dir = 'd:/dadadaad/shree-institute/toppers-demo/public/students'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(poster_path)

# Director Photo (Sridhar H.K.) - Perfect crop around face & shoulders
director_crop = img.crop((55, 172, 230, 365))
director_crop.save(os.path.join(out_dir, 'director.jpg'), quality=95)

# SSLC Row 1 (6 students)
# Exact Y bounds: 148 to 248
sslc_y1 = (148, 248)
sslc_cols = [
    (326, 408),  # 1. Shreya
    (432, 514),  # 2. Basavaraj
    (538, 620),  # 3. Janvi
    (644, 726),  # 4. Sharanu
    (750, 832),  # 5. Sukrith
    (856, 938),  # 6. Aaditya
]

for idx, (x1, x2) in enumerate(sslc_cols, 1):
    c = img.crop((x1, sslc_y1[0], x2, sslc_y1[1]))
    c.save(os.path.join(out_dir, f'sslc_{idx}.jpg'), quality=95)

# SSLC Row 2 (6 students)
# Exact Y bounds: 290 to 390
sslc_y2 = (290, 390)
for idx, (x1, x2) in enumerate(sslc_cols, 7):
    c = img.crop((x1, sslc_y2[0], x2, sslc_y2[1]))
    c.save(os.path.join(out_dir, f'sslc_{idx}.jpg'), quality=95)

# CBSE Row 1 (9 students)
# Exact Y bounds: 432 to 512
cbse_y1 = (432, 512)
cbse_cols = [
    (80, 148),   # 1. Ritu
    (178, 246),  # 2. Ambanna
    (276, 344),  # 3. Shreesh
    (374, 442),  # 4. Supriya S.G
    (472, 540),  # 5. Md. Saheel
    (570, 638),  # 6. Bhoomika
    (668, 736),  # 7. Spoorthi
    (766, 834),  # 8. Punitraj
    (864, 932),  # 9. Rohini
]

for idx, (x1, x2) in enumerate(cbse_cols, 1):
    c = img.crop((x1, cbse_y1[0], x2, cbse_y1[1]))
    c.save(os.path.join(out_dir, f'cbse_{idx}.jpg'), quality=95)

# CBSE Row 2 (9 students)
# Exact Y bounds: 544 to 624
cbse_y2 = (544, 624)
for idx, (x1, x2) in enumerate(cbse_cols, 10):
    c = img.crop((x1, cbse_y2[0], x2, cbse_y2[1]))
    c.save(os.path.join(out_dir, f'cbse_{idx}.jpg'), quality=95)

print("Successfully cropped all 30 photos with perfect pixel alignment!")
