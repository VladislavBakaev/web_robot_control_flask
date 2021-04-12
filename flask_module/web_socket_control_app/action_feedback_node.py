import rclpy
from rclpy.node import Node

from std_msgs.msg import String


class ActionFeedback(Node):

    def __init__(self):
        super().__init__('action_feedback_node')
        self.subscription = self.create_subscription(String, '/navigate_feedback', self.listener_callback, 10)
        self.subscription  # prevent unused variable warning
        self.data = ""

    def listener_callback(self, msg):
        self.data = msg.data