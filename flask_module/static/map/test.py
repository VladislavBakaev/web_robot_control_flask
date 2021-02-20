import cv2
import numpy as np

# im = cv2.imread('zone_map.png')
# ret, buffer = cv2.imencode('.png', im)
# frame = buffer.tobytes()
with open('zone_map.png', 'rb') as im:
    frame = im.read()
print(frame)
jpg_as_np = np.frombuffer(frame, dtype=np.uint8)
img = cv2.imdecode(jpg_as_np, cv2.IMREAD_UNCHANGED)
cv2.imwrite('new_zone_map.png', img)