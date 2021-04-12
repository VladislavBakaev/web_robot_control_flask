from flask import Flask
from flask_sockets import Sockets
from geventwebsocket.handler import WebSocketHandler
from gevent.pywsgi import WSGIServer
import sys
# from gevent import monkey
# monkey.patch_all()

server = Flask(__name__)

geventOpt = {'GATEWAY_INTERFACE': 'CGI/1.1',
                'SCRIPT_NAME': '',
                'wsgi.version': (1, 0),
                'wsgi.multithread': True, # XXX: Aren't we really, though?
                'wsgi.multiprocess': True,
                'wsgi.run_once': False}

def create_app():
    sockets = Sockets(server)
    http_server = WSGIServer(('',5000), server, handler_class=WebSocketHandler, environ=geventOpt)
    from web_socket_control_app.controllers import server as server_ws
    sockets.register_blueprint(server_ws)

    return http_server