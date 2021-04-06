var rate = 5

const chatSocket = new WebSocket(
    'ws://' + window.location.hostname + ':5000/ws/joy'
);

function update()
{
    if(currentPageName=="slam"){
        chatSocket.send(JSON.stringify({
                'value': JSON.stringify(joystick1.value)
            }));
    }

    if(currentPageName=="navigation"){
        chatSocket.send(JSON.stringify({
                'value': JSON.stringify(joystick2.value)
            }));
    }
    if(currentPageName=="control"){
        chatSocket.send(JSON.stringify({
                'value': JSON.stringify(joystick2.value)
            }));
    }
}

function loop()
{
    setTimeout(requestAnimationFrame, 1000/rate, loop);
    update();
}

function update_height(){
    $("#content-body").height($(window).height()*0.75+"px");
    $("#container-header").height($(window).height()*0.08+"px");
    $("#header").height($(window).height()*0.05+"px");
    $("#footer").height($(window).height()*0.1  +"px");
}