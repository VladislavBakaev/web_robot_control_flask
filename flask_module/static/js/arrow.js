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
            var img_box = img.getBoundingClientRect();
            var parent_img_box = img.parentNode.getBoundingClientRect();
            var img_pose = {x:img_box.left, y:img_box.top}

            if(!self.flag_point){
                return
            }
            if (self.cliked == 0){
                self.point1[0] = e.pageX - img_pose.x;
                self.point1[1] = e.pageY - img_pose.y;

                arrow.style.display = "block";
                arrow.style.transition = "0s";
                arrow.style.transform = `rotate(0deg)`;

                let h = (e.pageY - parent_img_box.top - arrow.getBoundingClientRect().height)/parent_img_box.height*100
                let w = (e.pageX - parent_img_box.left - arrow.getBoundingClientRect().width*0.5)/parent_img_box.width*100

                console.log(w + " " + h)

                arrow.style.left = w+"%";
                arrow.style.top = h+"%";
                self.cliked += 1;

            }
            else if(self.cliked == 1){
                arrow.style.display = "none";
                self.point2[0] = e.pageX - img_pose.x;
                self.point2[1] = e.pageY - img_pose.y;
                self.cliked = 0;
                let angle = -Math.atan2(self.point2[1]-self.point1[1], self.point2[0]-self.point1[0]);
                self.flag_point = false;

                var xhr = new XMLHttpRequest();
                xhr.open("GET", "/map/resolution", false);
                xhr.send(null);
                let resolution = JSON.parse(xhr.responseText)['resolution'];

                xhr.open("GET", "/map/origin", false);
                xhr.send(null);
                let origin = JSON.parse(xhr.responseText)

                var scale = parseFloat(img.style.transform.match(/[+-]?\d+(\.\d+)?/g)[0])

                let x = (1/scale)*self.point1[0]*resolution - origin['x'];
                let y = origin["y"] - self.point1[1]*resolution*(1/scale)

                //console.log(x + " " + y)

                $.ajax({
                    url: '/api/'+self.url_send,
                    dataType: 'text',
                    cache: false,
                    contentType: 'application/json',
                    processData: false,
                    data: JSON.stringify({"x":x, "y":y, "angle":angle}),                         
                    type: 'post',
                    success: function(script_response){
                        console.log(script_response);
                    },
                    error:function(xhr, status, errorThrown) { 
                        console.log(errorThrown+'\n'+status+'\n'+xhr.statusText); 
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
            var pose = img.getBoundingClientRect();
            pose = {x:pose.left, y:pose.top}
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

        //document.addEventListener('click', check_click);
        arrow.addEventListener("click", image_click)
        img.parentElement.parentElement.addEventListener('click', image_click);
        img.parentElement.parentElement.addEventListener('mousemove', handleMoveArrow, {passive: false});
        arrow.addEventListener('mousemove', handleMoveArrow, {passive: false});
    }
}