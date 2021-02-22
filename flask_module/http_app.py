from flask import send_file
from robot_control_app import create_app

app = create_app()

@app.route('/')
def index():
    return send_file('../static/html/index.html')

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8000)