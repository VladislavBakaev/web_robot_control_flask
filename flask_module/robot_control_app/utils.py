import cv2
import os
import numpy as np
import base64
import pathlib

map_shape = (100, 100)

def get_image(static_folder,name): 
    load_path =  os.path.join(pathlib.Path(__file__).parent.parent,"static",static_folder,name)
    return load_path

def get_map_png():
    global map_shape
    im = cv2.imread(get_image('map', 'my_map.pgm'),-1) 
    map_shape = im.shape
    ret, buffer = cv2.imencode('.jpg', im)
    frame = buffer.tobytes()
    return frame

def get_map_zone_png():
    with open(get_image('map', 'zone_map.png'), 'rb') as im:
        frame = im.read()
    return frame

def save_map_zone(img):
    img = base64.b64decode(img)
    jpg_as_np = np.frombuffer(img, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, cv2.IMREAD_UNCHANGED)
    cv2.imwrite(get_image('map', 'zone_map.png'), cv2.resize(img, map_shape))
    return True
