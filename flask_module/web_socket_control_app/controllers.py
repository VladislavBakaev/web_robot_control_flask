from flask import Blueprint, request

from web_socket_control_app.utils import update_vel

server = Blueprint('ws', __name__, url_prefix=r'/ws')

@server.route('/joy')
def echo_socket(ws):
        while not ws.closed:
            message = ws.receive()
            if message:
                update_vel(message)
            if(ws.closed):
                print('close connect')