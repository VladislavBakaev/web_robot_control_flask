. $HOME/.bashrc
ros2 run nav2_map_server map_saver_cli -f $HOME//AR_HT/src/web_robot_control_flask/flask_module/static/map/map
cp $HOME/AR_HT/src/web_robot_control_flask/flask_module/static/map/map.pgm $HOME/AR_HT/src/web_robot_control_flask/flask_module/static/map/map_filter.pgm
cp $HOME/AR_HT/src/web_robot_control_flask/flask_module/static/map/map.yaml $HOME/AR_HT/src/web_robot_control_flask/flask_module/static/map/map_filter.yaml

