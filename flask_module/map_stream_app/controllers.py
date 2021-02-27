from flask import (
    Blueprint,
    Response)

from map_stream_app.utils import map_stream_manager

module = Blueprint('html', __name__, url_prefix=r'/stream')

@module.route('/')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(map_stream_manager.get_map_stream(), mimetype='multipart/x-mixed-replace; boundary=frame')