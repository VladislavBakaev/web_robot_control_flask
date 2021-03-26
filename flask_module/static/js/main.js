var name_arr = ["mapping","map_zone","navigation","control"]
var current_page = "";

const chatSocket = new WebSocket(
    'ws://' + window.location.hostname + ':5000/ws/joy'
);

function update()
{
    if(current_page=="mapping"){
        chatSocket.send(JSON.stringify({
                'value': JSON.stringify(joystick1.value)
            }));
    }

    if(current_page=="navigation"){
        chatSocket.send(JSON.stringify({
                'value': JSON.stringify(joystick2.value)
            }));
    }
    if(current_page=="control"){
        chatSocket.send(JSON.stringify({
                'value': JSON.stringify(joystick2.value)
            }));
    }
}

function loop()
{
    requestAnimationFrame(loop);
    //update();
}

function update_height(){
    $("#content-body").height($(window).height()*0.75+"px");
    $("#container-header").height($(window).height()*0.08+"px");
    $("#header").height($(window).height()*0.05+"px");
    $("#footer").height($(window).height()*0.1  +"px");
}