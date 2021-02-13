with open("my_map.pgm","r", encoding='cp1251') as file:
    print(file.read())

from PIL import Image
Image.open("my_map.pgm").save("m.png")
