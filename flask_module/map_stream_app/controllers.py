from flask import (
    Blueprint,
    Response)
import json

from map_stream_app.utils import map_stream_manager

module = Blueprint('html', __name__, url_prefix=r'/map')

@module.route('/stream')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(map_stream_manager.get_map_stream(), mimetype='multipart/x-mixed-replace; boundary=frame')

@module.route('/resolution')
def get_resolution():
    resolution = map_stream_manager.get_resolution()
    response = {'resolution':resolution}
    return Response(json.dumps(response))

@module.route('/origin')
def get_map_origin():
    x_origin, y_origin = map_stream_manager.get_origin()
    response = {'x':x_origin, 'y':y_origin}
    return Response(json.dumps(response))