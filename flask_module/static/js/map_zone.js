var mousePressed = false;
var lastX, lastY;
var ctx;
var eraser;
var canv_h;
var canv_w;

function load_img_canvas(canvasName, map_api){
    var canvas = document.getElementById(canvasName);
    console.log('tyt')
    var ctx = canvas.getContext('2d');
    var map = new Image();
    map.src = '/api/'+map_api;

    if(canvasName == "canvasMap"){
        map.onload = draw_load_map
    }
    else{
        map.onload = draw_load_obv
    }

    function draw_load_map(){
        if(this.height < this.width){
            canv_w = canvas.parentNode.getBoundingClientRect().width*0.7;
            canv_h = this.height*(canv_w/this.width);
        }
        else{
            canv_h = canvas.parentNode.getBoundingClientRect().height*0.7;
            canv_w = this.width*(canv_h/this.height);
        }
        canvas.width = canv_w;
        canvas.height = canv_h;

        ctx.drawImage(this,0,0,canv_w,canv_h);

    };
    function draw_load_obv(){
        canvas.width = canv_w;
        canvas.height = canv_h;
        ctx.drawImage(this,0,0,canv_w,canv_h);
    }
};

function create_zone(){
    eraser = true;
};
function delete_zone(){
    eraser = false;
};
function clear_zone(){
    clearArea();
};
function save_zone(){
    var canvas = document.getElementById('canvasObv');
    var dataURL = canvas.toDataURL('image/png');
    dataURL = dataURL.replace('data:image/png;base64,', '');
    var form_data = new FormData();
    form_data.append('image', dataURL);
    $.ajax({
        url: '/api/load_zone',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(script_response){
            console.log(script_response);
        },
        error:function(xhr, status, errorThrown) { 
            console.log(errorThrown+'\n'+status+'\n'+xhr.statusText); 
            } 
 });
};

function InitThis(canvasName) {
    ctx = document.getElementById(canvasName).getContext("2d");

    $('#'+canvasName).mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#'+canvasName).mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#'+canvasName).mouseup(function (e) {
        mousePressed = false;
    });
        $('#'+canvasName).mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        if (eraser){
            ctx.globalCompositeOperation = 'source-over';
        }
        else{
            ctx.globalCompositeOperation = 'destination-out';
        }
        ctx.beginPath();
        ctx.strokeStyle = "black"
        ctx.lineWidth = "16"
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}
    
function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}