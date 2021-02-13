from flask import (
    Blueprint,
    render_template,
    Response)

import json
from threading import Thread, Event

from joysticks_app.utils import gen_frames, get_map_png
from joysticks_app.test_class import MinimalPublisher, rclpy

module = Blueprint('html', __name__, url_prefix=r'/api')
#ws = Blueprint('ws', __name__, url_prefix=r'/')
data = 0
event = Event()

def update_field(pub):
    while True:
        event.wait()
        event.clear()
        pub.timer_callback(data)

def ros_init():
    rclpy.init()

    minimal_publisher = MinimalPublisher()
    update_field(minimal_publisher)

Thread(target=ros_init).start()

@module.route(r'/', methods=['GET'])
def index():
    return render_template('index.html')

#@ws.route('/test')
def api(socket):
    global data 
    print('Client connect')
    try:
        while True:
            message = socket.receive()
            data = json.loads(message)
            print(data)
            event.set()
    except TypeError:
        print("client disconect")

@module.route('/video_feed')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@module.route('/<path:path>')
def static_file(path):
    return render_template(path)

@module.route('/get_map', methods=['GET'])
def get_map():
    return Response(get_map_png(), mimetype='multipart/x-mixed-replace; boundary=frame')
