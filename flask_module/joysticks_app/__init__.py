import os
from flask import Flask
from flask_uwsgi_websocket import GeventWebSocket

def create_app():
    app = Flask(__name__)
    #sockets = GeventWebSocket(app)

    import joysticks_app.controllers as joysticks_app

    app.register_blueprint(joysticks_app.module)
    #app.register_blueprint(joysticks_app.ws)

    return app