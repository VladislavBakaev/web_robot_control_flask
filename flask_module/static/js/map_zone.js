var mousePressed = false;
var lastX, lastY;
var ctx;
var eraser;

function load_img_canvas(canvasName, api_metod){
    canvas = document.getElementById(canvasName);
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = '/api/'+api_metod;
    img.onload = draw_load_img

    function draw_load_img(){
        ctx.drawImage(this,0,0,500,500);
    };
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
            alert(script_response);
        },
        error:function(xhr, status, errorThrown) { 
                alert(errorThrown+'\n'+status+'\n'+xhr.statusText); 
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