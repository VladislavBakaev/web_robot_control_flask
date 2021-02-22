from flask import (
    Blueprint,
    Response)

from map_stream_app.utils import gen_frames, get_map_stream

module = Blueprint('html', __name__, url_prefix=r'/stream')

@module.route('/')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(get_map_stream(), mimetype='multipart/x-mixed-replace; boundary=frame')