from flask import (
    Blueprint,
    render_template,
    Response, 
    make_response,
    request)

from robot_control_app.utils import get_map_png, save_map_zone, get_map_zone_png

module = Blueprint('html', __name__, url_prefix=r'/api')

@module.route('/get_map', methods=['GET'])
def get_map():
    frame = get_map_png()
    response = make_response(frame)
    response.headers['Content-Type'] = 'image/jpeg'
    return response

@module.route('/get_zone_map', methods=['GET'])
def get_map_zone():
    frame = get_map_zone_png()
    response = make_response(frame)
    response.headers['Content-Type'] = 'image/png'
    return response

@module.route('/load_zone', methods=['POST'])
def load_zone():
    img = request.form.get('image')
    save_map_zone(img)
    return Response('Zone was saved')

@module.route('/load_slam_point', methods=['POST'])
def load_slam_point():
    data = request.json
    return Response('Slam point was saved')

@module.route('/load_nav_point', methods=['POST'])
def load_nav_point():
    return Response('Navigation point was saved')

@module.route('/load_pose', methods=['POST'])
def load_pose():
    return Response('Robot pose was saved')

@module.route('/start_nav', methods=['GET'])
def start_nav():
    return Response('Navigation is working')

@module.route('/stop_nav', methods=['GET'])
def stop_nav():
    return Response('Navigation is stoped')

@module.route('/start_slam', methods=['GET'])
def start_slam():
    return Response('Slam is working')

@module.route('/stop_slam', methods=['GET'])
def stop_slam():
    return Response('Slam is stoped')

@module.route('/save_map', methods=['GET'])
def save_map():
    return Response('Map was saved')

@module.route('/restart_sensors', methods=['GET'])
def restart_sensors():
    return Response('Sensors was restarted')

@module.route('/restart_chassis', methods=['GET'])
def restart_chassis():
    return Response('Chassis was restarted')

@module.route('/restart_system', methods=['GET'])
def restart_system():
    return Response('System was restarted')

@module.route('/remout_control', methods=['GET'])
def remout_control():
    return Response('Remout control was started')

@module.route('/get_states', methods=['GET'])
def get_status():
    return Response('Sensors, chassis and system status')
