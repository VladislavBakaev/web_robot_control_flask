import os
from threading import Thread

import sys
import pathlib
import json

from web_socket_control_app.action_feedback_node import ActionFeedback

modules_name = ['cmd_vel_joy']

def load_module(module_name_list):
    ws_path = pathlib.Path(__file__).parent.parent.parent.absolute()
    for module_name in module_name_list:
        module_path = os.path.join(ws_path, module_name, module_name)
        sys.path.insert(0, module_path)

def update_vel(vel):
    vel = json.loads(vel)
    vel = json.loads(vel['value'])
    cmd_vel_pub.publish_vel(vel)

class ActionFeedbackManager():
    def __init__(self):
        self.a_f = ActionFeedback()
        self.rate = 10
        self.ros_th = Thread(target = self.start_node, args=(self.a_f, )).start()
    
    def start_node(self, node):
        rclpy.spin(node)
    
    def get_feedback(self):
        return self.a_f.data

load_module(modules_name)
from cmd_vel_node import CmdVelPublisher, rclpy

rclpy.init()
cmd_vel_pub = CmdVelPublisher()
# Thread(target = rclpy.spin, args=(cmd_vel_pub, )).start()

action_feedback_manager = ActionFeedbackManager() 