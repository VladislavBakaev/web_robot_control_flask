var mousePressed = false;
var lastX, lastY;
var ctx;
var eraser;

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
        ctx.strokeStyle = "red"
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

