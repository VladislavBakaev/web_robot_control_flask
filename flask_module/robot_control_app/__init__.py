import os
from flask import Flask

def create_app():
    app = Flask(__name__)
    #sockets = GeventWebSocket(app)

    import robot_control_app.controllers as robot_control

    app.register_blueprint(robot_control.module)
    #app.register_blueprint(joysticks_app.ws)

    return app