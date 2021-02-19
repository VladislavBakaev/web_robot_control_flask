import rclpy
from rclpy.node import Node

from std_msgs.msg import String


class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)

    def timer_callback(self, field):
        msg = String()
        msg.data = 'Hello World: %s' % field
        self.publisher_.publish(msg)