import cv2
import os
import numpy as np
import base64
import pathlib

from robot_control_app.ros_module_manager import RosModuleManager

def get_image_path(static_folder,name): 
    load_path =  os.path.join(pathlib.Path(__file__).parent.parent,"static",static_folder,name)
    return load_path

class MapManager():
    def __init__(self):
        self.map_shape = (100, 100)

    def get_map_png(self):
        im = cv2.imread(get_image_path('map', 'my_map.pgm'),-1) 
        self.map_shape = im.shape
        ret, buffer = cv2.imencode('.jpg', im)
        frame = buffer.tobytes()
        return frame

    def get_map_zone_png(self):
        with open(get_image_path('map', 'zone_map.png'), 'rb') as im:
            frame = im.read()
        return frame

    def save_map_zone(self, img):
        img = base64.b64decode(img)
        jpg_as_np = np.frombuffer(img, dtype=np.uint8)
        img = cv2.imdecode(jpg_as_np, cv2.IMREAD_UNCHANGED)
        cv2.imwrite(get_image_path('map', 'zone_map.png'), cv2.resize(img, self.map_shape))
        return True

class ModuleManager():
    def __init__(self):
        self.__slam_module_name = "slam"
        self.__navigation_module_name = "navigation"

        self.__slam_module = RosModuleManager(self.__slam_module_name)
        self.__navigation_module = RosModuleManager(self.__navigation_module_name)

        self.current_module = ''

    def slam(self, start):
        if start:
            self.__navigation_module.stop()
            #self.__remote_control_module.stop()

            self.__slam_module.start()
            self.current_module = 'slam'
        else:
            self.__slam_module.stop()
            self.current_module = ''
    
    def navigation(self, start):
        if start:
            #self.__remote_control_module.stop()
            self.__slam_module.stop()

            self.__navigation_module.start()
            self.current_module = 'navigation'
        else:
            self.__navigation_module.stop()
            self.current_module = ''

    def remote_control(self, start):
        if start:
            self.__slam_module.stop()
            self.__navigation_module.stop()

            #self.__remote_control_module.start()
            self.current_module = 'remote control'
        else:
            #self.__remote_control_module.stop()
            self.current_module = ''


module_manager = ModuleManager()
map_manager = MapManager()