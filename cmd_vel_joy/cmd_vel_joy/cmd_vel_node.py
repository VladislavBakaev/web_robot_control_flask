import rclpy
from rclpy.node import Node

from std_msgs.msg import String
from geometry_msgs.msg import Twist


class CmdVelPublisher(Node):
    def __init__(self):
        super().__init__('cmd_vel_publisher')
        self.publisher_ = self.create_publisher(Twist, 'cmd_vel', 10)
        self.msg = Twist()
        self.max_lin = 0.25
        self.max_ang = 0.5

    def publish_vel(self, vel):
        self.msg.linear.x = -float(vel['y'])*self.max_lin
        self.msg.angular.z = -float(vel['x'])*self.max_ang
        self.publisher_.publish(self.msg)


def main(args=None):
    rclpy.init(args=args)

    minimal_publisher = MinimalPublisher()

    rclpy.spin(minimal_publisher)

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_publisher.destroy_node()
    rclpy.shutdown()