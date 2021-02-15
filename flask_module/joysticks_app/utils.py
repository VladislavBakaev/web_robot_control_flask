import cv2
import os
import numpy as np
import base64

path_file = "joysticks_app/static/map/"

map_shape = (100, 100)

def gen_frames():  # generate frame by frame from camera
    camera = cv2.VideoCapture(0)
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

def get_map_png():
    global map_shape
    im = cv2.imread(path_file + 'my_map.pgm',-1) 
    map_shape = im.shape
    ret, buffer = cv2.imencode('.jpg', im)
    frame = buffer.tobytes()
    return frame

def get_map_zone_png():
    with open(path_file+'zone_map.png', 'rb') as im:
        frame = im.read()
    return frame

def save_map_zone(img):
    img = base64.b64decode(img)
    jpg_as_np = np.frombuffer(img, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, cv2.IMREAD_UNCHANGED)
    cv2.imwrite(path_file+'zone_map.png', cv2.resize(img, map_shape))
    return True
