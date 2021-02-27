import cv2
import os
from threading import Thread

import sys
import pathlib

def load_module(module_name_list):
    ws_path = pathlib.Path(__file__).parent.parent.parent.absolute()
    for module_name in module_name_list:
        module_path = os.path.join(ws_path, module_name, module_name)
        sys.path.insert(0, module_path)
        
def get_image(static_folder,name): 
    load_path =  os.path.join(pathlib.Path(__file__).parent.parent,"static",static_folder,name)
    return load_path

class MapStreamManager():
    def __init__(self):
        self.load = cv2.imread(get_image("images","lazy-load.jpg"))
        
    def start_node(self, node):
        rclpy.spin(node)

    def get_map_stream(self):
        m_t_p = MapToPic(0.3)
        ros_th = Thread(target = self.start_node, args=(m_t_p, )).start()
        try:
            while True:
                map_ = m_t_p.get_map()
                if isinstance(map_, bool):
                    map_ = self.load
                ret, buffer = cv2.imencode('.jpg', map_)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        except KeyboardInterrupt:
            ros_th.join()

    def get_frames_cam(self):
        camera = cv2.VideoCapture(0)
        while True:
            success, frame = camera.read()
            if not success:
                break
            else:
                frame = cv2.resize(frame,(320,240))
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

module_names = ['map_to_pic']
load_module(module_names)

from map_to_pic import MapToPic, rclpy
rclpy.init()

map_stream_manager = MapStreamManager()