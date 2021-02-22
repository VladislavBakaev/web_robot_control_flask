from flask import Flask

def create_app():
    app = Flask(__name__)

    import robot_control_app.controllers as robot_control

    app.register_blueprint(robot_control.module)

    return app