import cv2
import os
from threading import Thread

import sys
import pathlib

modules_name = ['map_to_pic']

def load_module(module_name_list):
    ws_path = pathlib.Path(__file__).parent.parent.parent.absolute()
    for module_name in module_name_list:
        module_path = os.path.join(ws_path, module_name, module_name)
        sys.path.insert(0, module_path)
        
def get_image(static_folder,name): 
    load_path =  os.path.join(pathlib.Path(__file__).parent.parent,"static",static_folder,name)
    return load_path

load_module(modules_name)
from map_to_pic import MapToPic, rclpy
rclpy.init()

load = cv2.resize(cv2.imread(get_image("images","lazy-load.jpg")), (200, 200))

def get_map_stream():
    m_t_p = MapToPic(0.3)
    Thread(target = rclpy.spin, args=(m_t_p, )).start()
    while True:
        map_ = m_t_p.get_map()
        if map_ is bool:
            map_ = load
        ret, buffer = cv2.imencode('.jpg', map_)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


def gen_frames():  # generate frame by frame from camera
    camera = cv2.VideoCapture(0)
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            frame = cv2.resize(frame,(320,240))
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result