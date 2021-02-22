import os
from threading import Thread

import sys
import pathlib
import json

modules_name = ['cmd_vel_joy']

def load_module(module_name_list):
    ws_path = pathlib.Path(__file__).parent.parent.parent.absolute()
    for module_name in module_name_list:
        module_path = os.path.join(ws_path, module_name, module_name)
        sys.path.insert(0, module_path)

load_module(modules_name)
from cmd_vel_node import CmdVelPublisher, rclpy

rclpy.init()
cmd_vel_pub = CmdVelPublisher()
Thread(target = rclpy.spin, args=(cmd_vel_pub, )).start()

def update_vel(vel):
    vel = json.loads(vel)
    vel = json.loads(vel['value'])
    cmd_vel_pub.publish_vel(vel)