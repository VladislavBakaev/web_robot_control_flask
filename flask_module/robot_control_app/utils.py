import cv2
import os
import numpy as np
import base64
import subprocess
from threading import Thread

import sys
import pathlib

from robot_control_app.ros_module_manager import RosModuleManager

def load_module(module_name_list):
    ws_path = pathlib.Path(__file__).parent.parent.parent.parent.absolute()
    for module_name in module_name_list:
        module_path = os.path.join(ws_path, module_name, module_name)
        sys.path.insert(0, module_path)

def get_image_path(static_folder,name): 
    load_path =  os.path.join(pathlib.Path(__file__).parent.parent,"static",static_folder,name)
    return load_path

class MapManager():
    def __init__(self):
        self.map_shape = [100, 100]

    def get_map_png(self):
        im = cv2.imread(get_image_path('map', 'map.pgm'),-1) 
        self.map_shape = list(im.shape)
        ret, buffer = cv2.imencode('.jpg', im)
        frame = buffer.tobytes()
        return frame

    def get_map_zone_png(self):
        with open(get_image_path('map', 'map_zone.png'), 'rb') as im:
            frame = im.read()
        return frame

    def save_map_zone(self, img):
        img = base64.b64decode(img)
        jpg_as_np = np.frombuffer(img, dtype=np.uint8)
        img = cv2.imdecode(jpg_as_np, cv2.IMREAD_UNCHANGED)
        img = cv2.resize(img, (self.map_shape[1],self.map_shape[0]))
        cv2.imwrite(get_image_path('map', 'map_zone.png'), img)
        self.zone_to_map_filter(img)
        return True

    def zone_to_map_filter(self, zone):
        map_ = cv2.imread(get_image_path('map', 'map.pgm'), cv2.IMREAD_COLOR)
        filter_map = self.blend_transparent(map_, zone)
        filter_map = cv2.cvtColor(filter_map, cv2.COLOR_BGR2GRAY)
        cv2.imwrite(get_image_path('map', 'map_filter.pgm'), filter_map)
        
    def blend_transparent(self, face_img, overlay_t_img):
        overlay_img = overlay_t_img[:,:,:3]
        overlay_mask = overlay_t_img[:,:,3:]

        background_mask = 255 - overlay_mask

        overlay_mask = cv2.cvtColor(overlay_mask, cv2.COLOR_GRAY2BGR)
        background_mask = cv2.cvtColor(background_mask, cv2.COLOR_GRAY2BGR)

        face_part = (face_img * (1 / 255.0)) * (background_mask * (1 / 255.0))
        overlay_part = (overlay_img * (1 / 255.0)) * (overlay_mask * (1 / 255.0))
    
        return np.uint8(cv2.addWeighted(face_part, 255.0, overlay_part, 255.0, 0.0))
    
    def save_map(self):
        dir_path = os.path.join(pathlib.Path(__file__).parent.parent.parent, 'sh_scripts', "run_map_server.sh")
        p = subprocess.call(['sh', dir_path])

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

class PointClientManager():
    def __init__(self):
        self.t_p_c = ToPoseClient('')
        self.ros_th = Thread(target = self.start_node, args=(self.t_p_c, )).start()
    
    def start_node(self, node):
        rclpy.spin(node)
    
    def send_point(self, x, y, angle):
        self.t_p_c.send_goal(x, y, angle)
    
    def set_pose(self, x, y, angle):
        self.t_p_c.set_pose(x, y, angle)
    
    def get_feedback(self):
        return self.t_p_c.get_feedback()

module_names = ['map_to_pic']
load_module(module_names)

from nav_action import ToPoseClient, rclpy
rclpy.init()

module_manager = ModuleManager()
map_manager = MapManager()
point_manager = PointClientManager()
