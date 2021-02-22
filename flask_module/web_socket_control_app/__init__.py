from flask import Flask
from flask_sockets import Sockets
from geventwebsocket.handler import WebSocketHandler
from gevent.pywsgi import WSGIServer

server = Flask(__name__)

def create_app():
    sockets = Sockets(server)
    http_server = WSGIServer(('',5000), server, handler_class=WebSocketHandler)
    from web_socket_control_app.controllers import server as server_ws
    sockets.register_blueprint(server_ws)

    return http_server