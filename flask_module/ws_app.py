from web_socket_control_app import create_app

server = create_app()

if __name__ == "__main__":
    server.serve_forever()