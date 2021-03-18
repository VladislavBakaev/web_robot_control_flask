class Arrow{
    constructor(img_name, url_send, button_name, arrow_name){//, button){
        let img = document.getElementById(img_name);
        this.url_send = url_send;
        let button_v = document.getElementById(button_name);
        let arrow = document.getElementById(arrow_name);
        this.point1 = [0, 0];
        this.point2 = [0, 0];
        this.cliked = 0;
        this.flag_point = false;

        let self = this

        function image_click(e){
            var img_pose = getScreenCordinates(img);
            if(!self.flag_point){
                return
            }
            if (self.cliked == 0){
                self.point1[0] = e.pageX - img_pose.x;
                self.point1[1] = e.pageY - img_pose.y;

                arrow.style.display = "block";
                arrow.style.transition = "0s";
                arrow.style.transform = `rotate(0deg)`;
                
                let h = (e.pageY - img_pose.y - arrow.getBoundingClientRect().height)/img.height*100;
                let w = (e.pageX - img_pose.x - arrow.getBoundingClientRect().width*0.5)/img.width*100;

                arrow.style.left = w+"%";
                arrow.style.top = h+"%";
                self.cliked = self.cliked+1;
            }
            else if(self.cliked == 1){
                self.point2[0] = e.pageX - img_pose.x;
                self.point2[1] = e.pageY - img_pose.y;
                self.cliked = 0;
                let angle = -Math.atan2(self.point2[1]-self.point1[1], self.point2[0]-self.point1[0]);
                let w = self.point1[0]/img.width;
                let h = self.point1[1]/img.height;
                self.flag_point = false;

                var xhr = new XMLHttpRequest();
                xhr.open("GET", "/map/resolution", false);
                xhr.send(null);
                let resolution = JSON.parse(xhr.responseText)['resolution'];

                xhr.open("GET", "/map/origin", false);
                xhr.send(null);
                let origin = JSON.parse(xhr.responseText)

                let x = img.naturalWidth*w*resolution - origin['x'];
                let y = origin["y"] - img.naturalHeight*h*resolution

                $.ajax({
                    url: '/api/'+self.url_send,
                    dataType: 'text',
                    cache: false,
                    contentType: 'application/json',
                    processData: false,
                    data: JSON.stringify({"x":x, "y":y, "angle":angle}),                         
                    type: 'post',
                    success: function(script_response){
                        alert(script_response);
                    },
                    error:function(xhr, status, errorThrown) { 
                            alert(errorThrown+'\n'+status+'\n'+xhr.statusText); 
                        } 
                });
            }
        }
        function check_click(e){
            if(e.target != button_v && e.target != img){
                self.flag_point = false;
                self.cliked = 0;
            }
        }

        function handleMoveArrow(e){
            if(self.cliked !=1){return}
            var pose = getScreenCordinates(img);
            pose.x = e.pageX - pose.x;
            pose.y = e.pageY - pose.y;
            var angle = Math.atan2(pose.y-self.point1[1],pose.x-self.point1[0])*57.3 + 90;
            arrow.style.transform = `rotate(${angle}deg)`;
        }

        function getScreenCordinates(obj) {
            var p = {};
            p.x = obj.offsetLeft;
            p.y = obj.offsetTop;
            while (obj.offsetParent) {
                p.x = p.x + obj.offsetParent.offsetLeft;
                p.y = p.y + obj.offsetParent.offsetTop;
                if (obj == document.getElementsByTagName("body")[0]) {
                    break;
                }
                else {
                    obj = obj.offsetParent;
                }
            }
            return p;
        }

        document.addEventListener('click', check_click)
        img.addEventListener('click', image_click);
        img.addEventListener('mousemove', handleMoveArrow, {passive: false});
    }
}