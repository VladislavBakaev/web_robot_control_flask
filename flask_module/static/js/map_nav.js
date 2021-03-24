function send_flag(route){
    $.ajax({
            type: "GET",  
            url: "/api/"+route,  
            cache: false,  
            success: function(text){  
                alert(text);  
            },
            error:function(xhr, status, errorThrown) { 
                alert(errorThrown+'\n'+status+'\n'+xhr.statusText); 
            }  
        });
}
function get_feedback(list_name){

    $.ajax({
        type: "GET",  
        url: "/api/get_task_status",  
        cache: false,  
        success: function(text){
            var status_json = JSON.parse(text);
            $("#"+list_name).html(`<li>State:<span>${status_json["state"]}</span></li>
                                    <li>Number of recoveries:<span>${status_json["number_of_recoveries"]}</span></li>
                                    <li>Distance remaining:<span>${status_json["distance_remaining"]}</span></li>
                                    <li>Navigation time:<span>${status_json["navigation_time"]}</span></li>
                                    <li>Target point:<span>x: ${status_json["target"]["x"]}; y: ${status_json["target"]["y"]}; angle: ${status_json["target"]["angle"]}</span></li>
                                    <li>Current pose:<span>x: ${status_json["current_pose"]["x"]}; y: ${status_json["current_pose"]["y"]}; angle: ${status_json["current_pose"]["angle"]}</span></li>`)
        },
        error:function(xhr, status, errorThrown) { 
            alert(errorThrown+'\n'+status+'\n'+xhr.statusText); 
        }  
    });
}

function updatesize(stream, body, map){
    if (stream.offsetHeight > body.offsetHeight){
        stream.style.width = "auto";
        stream.style.height = "100%";
        map.style.height = "100%";
        map.style.width = "auto";
    }

    else if(stream.offsetWidth > body.offsetWidth){
        stream.style.width = "100%";
        stream.style.height = 'auto';
        map.style.width = "100%" 
        map.style.height = "auto";
    }
}

function start_slam(stream){
    $("#"+stream).attr('src', '/map/stream');
    send_flag("start_slam");
}

function stop_slam(stream){
    $("#"+stream).attr('src', '/static/images/slam_load.png');
    send_flag("stop_slam");
}

function start_nav(stream){
    $("#"+stream).attr('src', '/map/stream');
    send_flag("start_nav");
}

function stop_nav(stream){
    $("#"+stream).attr('src', '/static/images/nav_load.png');
    send_flag("stop_nav");
}
