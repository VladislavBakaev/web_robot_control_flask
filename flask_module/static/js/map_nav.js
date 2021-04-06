var start_slam_btn;
var start_nav_btn;

function send_flag(route){
    $.ajax({
            type: "GET",  
            url: "/api/"+route,  
            cache: false,  
            success: function(text){  
                console.log(text);  
            },
            error:function(xhr, status, errorThrown) { 
                console.log(errorThrown+'\n'+status+'\n'+xhr.statusText); 
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
            console.log(errorThrown+'\n'+status+'\n'+xhr.statusText); 
        }  
    });
}

function start_slam(elem, stream, mapManager){
    $("#"+stream).attr('src', '/map/stream');
    send_flag("start_slam");
    var disabled = inputs_slam.find('.disabled')['prevObject'];
    disabled.removeClass('disabled');
    $(elem).addClass('disabled');
    start_slam_btn = elem;
    nav.find('a').addClass('disabled');

    mapManager.enable = true;
    $("#"+stream).width('auto')
    $("#"+stream).parent().parent().css("background-color" ,"rgb(200, 200, 200)");
}

function stop_slam(stream){
    $("#"+stream).attr('src', '/static/images/slam_load.png');
    send_flag("stop_slam");
    inputs_slam.addClass('disabled');
    $(start_slam_btn).removeClass('disabled')
    nav.find('a').removeClass('disabled')

    mapManager.enable = false;
    mapManager.wheel = 0;
    $("#"+stream).width('100%')
    $("#"+stream).parent().parent().css("background-color" ,"");
    $("#"+stream).css("transform","scale(1)");
    $("#"+stream).parent().css("transform","translate3d( 0px, 0px, 0 )")
}

function start_nav(elem, stream){
    $("#"+stream).attr('src', '/map/stream');
    send_flag("start_nav");
    var disabled = inputs_nav.find('.disabled')['prevObject'];
    disabled.removeClass('disabled');
    $(elem).addClass('disabled');
    start_nav_btn = elem;
    nav.find('a').addClass('disabled')

    mapManager_nav.enable = true;
    $("#"+stream).width('auto')
    $("#"+stream).parent().parent().css("background-color" ,"rgb(255, 255, 255)");
}

function stop_nav(stream){
    $("#"+stream).attr('src', '/static/images/nav_load.png');
    send_flag("stop_nav");
    inputs_nav.addClass('disabled')
    $(start_nav_btn).removeClass('disabled')
    nav.find('a').removeClass('disabled')

    mapManager_nav.enable = false;
    mapManager_nav.wheel = 0;
    $("#"+stream).width('100%')
    $("#"+stream).parent().parent().css("background-color" ,"");
    $("#"+stream).css("transform","scale(1)");
    $("#"+stream).parent().css("transform","translate3d( 0px, 0px, 0 )")
}
