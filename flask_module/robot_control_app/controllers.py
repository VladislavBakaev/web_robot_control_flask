from flask import (
    Blueprint,
    render_template,
    Response, 
    make_response,
    request)
import json

from robot_control_app.utils import map_manager, module_manager, point_manager

module = Blueprint('html', __name__, url_prefix=r'/api')

@module.route('/get_map', methods=['GET'])
def get_map():
    frame = map_manager.get_map_png()
    response = make_response(frame)
    response.headers['Content-Type'] = 'image/jpeg'
    return response

@module.route('/get_zone_map', methods=['GET'])
def get_map_zone():
    frame = map_manager.get_map_zone_png()
    response = make_response(frame)
    response.headers['Content-Type'] = 'image/png'
    return response

@module.route('/load_zone', methods=['POST'])
def load_zone():
    img = request.form.get('image')
    map_manager.save_map_zone(img)
    return Response('Zone was saved')

@module.route('/load_slam_point', methods=['POST'])
def load_slam_point():
    data = request.json
    point_manager.send_point(data['x'], data['y'], data['angle'])
    return Response('Slam point was saved')

@module.route('/load_nav_point', methods=['POST'])
def load_nav_point():
    data = request.json
    point_manager.send_point(data['x'], data['y'], data['angle'])
    return Response('Navigation point was saved')

@module.route('/load_pose', methods=['POST'])
def load_pose():
    data = request.json
    point_manager.set_pose(data['x'], data['y'], data['angle'])
    return Response('Robot pose was saved')

@module.route('/start_nav', methods=['GET'])
def start_nav():
    module_manager.navigation(True)
    return Response('Navigation is working')

@module.route('/stop_nav', methods=['GET'])
def stop_nav():
    module_manager.navigation(False)
    return Response('Navigation is stoped')

@module.route('/start_slam', methods=['GET'])
def start_slam():
    module_manager.slam(True)
    return Response('Slam is working')

@module.route('/stop_slam', methods=['GET'])
def stop_slam():
    module_manager.slam(False)
    return Response('Slam is stoped')

@module.route('/save_map', methods=['GET'])
def save_map():
    map_manager.save_map()
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
    module_manager.remote_control(True)
    return Response('Remout control was started')

@module.route('/get_states', methods=['GET'])
def get_status():
    return Response('Sensors, chassis and system status')

@module.route('/get_task_status', methods=["GET"])
def get_task_status():
    status = point_manager.get_feedback()
    status = json.dumps(status)
    return Response(status)