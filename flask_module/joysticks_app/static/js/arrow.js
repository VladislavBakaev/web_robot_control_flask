class Arrow{
    constructor(img_name, url_send, button_name){//, button){
        let img = document.getElementById(img_name);
        this.url_send = url_send;
        let button_v = document.getElementById(button_name);
        this.point1 = [0, 0];
        this.point2 = [0, 0];
        this.cliked = 0;
        this.flag_point = false;

        let self = this

        function image_click(e){
            if(!self.flag_point){
                return
            }
            if (self.cliked == 0){
                self.point1[0] = e.pageX - img.offsetLeft;
                self.point1[1] = img.height - (e.pageY - img.offsetTop);
                self.cliked = self.cliked+1;
            }
            else if(self.cliked == 1){
                self.point2[0] = e.pageX - img.offsetLeft;
                self.point2[1] = img.height - (e.pageY - img.offsetTop);
                self.cliked = 0;
                let angle = Math.atan2(self.point2[1]-self.point1[1], self.point2[0]-self.point1[0]);
                let w = self.point1[0]/img.width;
                let h = self.point1[1]/img.height;
                self.flag_point = false;
                $.ajax({
                    url: 'http://127.0.0.1:8000/api/'+self.url_send,
                    dataType: 'text',
                    cache: false,
                    contentType: 'application/json',
                    processData: false,
                    data: JSON.stringify({"x":w, "y":h, "angle":angle}),                         
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

        document.addEventListener('click', check_click)
        img.addEventListener('click', image_click);
    }
}