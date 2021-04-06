class MapMoveManager{
    constructor(img_name, body_map){
        var img = document.getElementById(img_name);
        var map = document.getElementById(body_map);

        this.current_move = {x:0, y:0}
        this.last_point = {x:0, y:0}
        this.touch_point = {x:0, y:0}

        this.enable = false;
        img.style.transform = `scale(1)`

        this.wheel = 0
        let self = this

        const moveImg = () => {
            var x_tr = self.last_point.x + self.current_move.x
            var y_tr = self.last_point.y + self.current_move.y
        
            map.style.transform = `translate3d( ${x_tr}px, ${y_tr}px, 0 )`;
        }

        function handleMouseDown(e){
            if (self.enable){
                e.preventDefault()
                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseUp)
                self.touch_point.x = e.clientX;
                self.touch_point.y = e.clientY;
            }
         }
        
        function handleMouseMove(e){
            self.current_move.x = e.clientX - self.touch_point.x
            self.current_move.y = e.clientY - self.touch_point.y
            moveImg()
        }
        
        function handleMouseUp(e){
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            self.last_point.x = self.current_move.x + self.last_point.x;
            self.last_point.y = self.current_move.y + self.last_point.y;
            self.current_move.x = 0
            self.current_move.y = 0
        }
        
        function handleWheel(e){
            if(self.enable){
                self.wheel += e.deltaY;
                var cmd = Math.sqrt(Math.pow(2,self.wheel/500))
                img.style.transform = `scale(${cmd})`
            }
        }

        map.parentNode.addEventListener('mousedown', handleMouseDown);
        map.parentNode.addEventListener('wheel', handleWheel)
    }
}