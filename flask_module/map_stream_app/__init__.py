from flask import Flask

def create_app():
    app = Flask(__name__)

    import map_stream_app.controllers as map_control

    app.register_blueprint(map_control.module)

    return app