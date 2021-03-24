var name_arr = ["mapping","map_zone","navigation","control"]
var current_page = "";

const chatSocket = new WebSocket(
    'ws://' + window.location.hostname + ':5000/ws/joy'
);

function load_content(page){
    $("#"+page).html($("#loading").html());
    $.ajax({
        type: "GET",  
        url: "/static/html/"+page+'.html',  
        cache: false,  
        success: function(html){  
            $("#"+page).html(html);  
        },
        error:function(xhr, status, errorThrown) { 
            alert(errorThrown+'\n'+status+'\n'+xhr.statusText); 
        }  
    });
};

function visible(page){
    if(current_page == page){
        return;
    }
    unvisible();
    var div = document.getElementById(page);
    div.style.display = 'block';
    current_page = page;
};

function unvisible(){
    for(id in name_arr){
        var div = document.getElementById(name_arr[id]);
        div.style.display = "none";
    }
};

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
    update();
}

function update_height(){
    document.getElementById("content-body").style.height = $(window).height()*0.75+"px";
    document.getElementById("container-header").style.height = $(window).height()*0.05+"px";
    document.getElementById("header").style.height = $(window).height()*0.05+"px";
    document.getElementById("footer").style.height = $(window).height()*0.1+"px";
}