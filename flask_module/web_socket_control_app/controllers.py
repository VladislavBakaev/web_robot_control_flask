from flask import Blueprint, request
import time
import gevent

from web_socket_control_app.utils import update_vel, action_feedback_manager

server = Blueprint('ws', __name__, url_prefix=r'/ws')

@server.route('/joy')
def echo_socket(ws):
    while not ws.closed:
        message = ws.receive()
        gevent.sleep(0)
        if message:          
            update_vel(message)
        if(ws.closed):
            print('close connect')

@server.route('/action_feedback')
def action_feedback(ws):
    while not ws.closed:
        ws.send(action_feedback_manager.get_feedback())
        gevent.sleep(1/action_feedback_manager.rate)
