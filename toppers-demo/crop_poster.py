import os
from PIL import Image

poster_path = 'd:/dadadaad/shree-institute/toppers-demo/public/poster.jpg'
out_dir = 'd:/dadadaad/shree-institute/toppers-demo/public/students'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(poster_path)

# Director Photo (Sridhar H.K.)
# x: 15 to 265, y: 155 to 395
director_crop = img.crop((15, 155, 265, 395))
director_crop.save(os.path.join(out_dir, 'director.jpg'), quality=95)

# SSLC Row 1 (6 students)
sslc_row1_y = (142, 262)
sslc_r1_x = [
    (312, 412),  # Shreya
    (422, 522),  # Basavaraj
    (530, 628),  # Janvi
    (634, 734),  # Sharanu
    (740, 842),  # Sukrith
    (850, 952),  # Aaditya
]

for idx, (x1, x2) in enumerate(sslc_r1_x, 1):
    c = img.crop((x1, sslc_row1_y[0], x2, sslc_row1_y[1]))
    c.save(os.path.join(out_dir, f'sslc_{idx}.jpg'), quality=95)

# SSLC Row 2 (6 students)
sslc_row2_y = (286, 398)
sslc_r2_x = [
    (312, 412),  # Annapurna
    (422, 522),  # Aparna
    (530, 628),  # Bhavani
    (634, 734),  # Annapurna
    (740, 842),  # Chaitra
    (850, 952),  # Nivedita
]

for idx, (x1, x2) in enumerate(sslc_r2_x, 7):
    c = img.crop((x1, sslc_row2_y[0], x2, sslc_row2_y[1]))
    c.save(os.path.join(out_dir, f'sslc_{idx}.jpg'), quality=95)

# CBSE Row 1 (9 students)
cbse_row1_y = (428, 515)
cbse_r1_x = [
    (72, 160),   # Ritu
    (172, 260),  # Ambanna
    (270, 358),  # Shreesh
    (372, 460),  # Supriya S.G
    (472, 560),  # Md. Saheel
    (572, 660),  # Bhoomika
    (670, 760),  # Spoorthi
    (770, 860),  # Punitraj
    (868, 960),  # Rohini
]

for idx, (x1, x2) in enumerate(cbse_r1_x, 1):
    c = img.crop((x1, cbse_row1_y[0], x2, cbse_row1_y[1]))
    c.save(os.path.join(out_dir, f'cbse_{idx}.jpg'), quality=95)

# CBSE Row 2 (9 students)
cbse_row2_y = (542, 628)
cbse_r2_x = [
    (72, 160),   # Preetham
    (172, 260),  # Poorvika
    (270, 358),  # Supriya S
    (372, 460),  # Navya
    (472, 560),  # Adrash
    (572, 660),  # Bhagyashree
    (670, 760),  # Shreyas Nayak
    (770, 860),  # Lakshmi S.M
    (868, 960),  # Sukanya
]

for idx, (x1, x2) in enumerate(cbse_r2_x, 10):
    c = img.crop((x1, cbse_row2_y[0], x2, cbse_row2_y[1]))
    c.save(os.path.join(out_dir, f'cbse_{idx}.jpg'), quality=95)

print("Successfully cropped all 30 student photos + Director photo!")
