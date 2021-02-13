import cv2
from PIL import Image
import io
import os

def gen_frames():  # generate frame by frame from camera
    camera = cv2.VideoCapture(0)
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

def image_to_byte_array(image:Image):
    imgByteArr = io.BytesIO()
    image.save(imgByteArr, format=image.format)
    imgByteArr = imgByteArr.getvalue()
    return imgByteArr

def get_map_png():
    path_file = "joysticks_app/static/map/"
    Image.open(path_file+"my_map.pgm").save(path_file+"my_map.png")
    im = Image.open(path_file+"my_map.png")
    frame = image_to_byte_array(im)
    return (b'Content-Type: image/png\r\n\r\n' + frame + b'\r\n')
