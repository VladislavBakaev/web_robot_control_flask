import subprocess

class RosModuleManager():
    def __init__(self, name_modele):
        self.name_module = name_modele+".service"
        self.password = "1974"
        self.start_cmd = "sudo -S systemctl start"
        self.stop_cmd = "sudo -S systemctl stop"
        self.status = "sudo -S systemctl status"
        self.sudo_cmd = 'echo {} |'.format(self.password)
    
    def start(self):
        cmd = '{} {} {}'.format(self.sudo_cmd, self.start_cmd, self.name_module)
        start = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
        return start.wait()

    def stop(self):
        cmd = '{} {} {}'.format(self.sudo_cmd, self.stop_cmd, self.name_module)
        stop = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
        return stop.wait()

    def status(self):
        cmd = '{} {} {}'.format(self.sudo_cmd, self.status_cmd, self.name_module)
        status = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
        status.wait()
        return status.stdout.read().decode()