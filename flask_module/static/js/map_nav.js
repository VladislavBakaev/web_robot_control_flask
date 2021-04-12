var start_slam_btn;
var start_nav_btn;

var action_feedback = new WebSocket('ws://' + window.location.hostname + ':5000/ws/action_feedback');
action_feedback.onmessage = function(event){
    display_feedback(event.data, "status_list");
    display_feedback(event.data, "status_list_nav");
};

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
function display_feedback(text,list_name){

    var status_json = JSON.parse(text);
    $("#"+list_name).html(`<li>State:<span>${status_json["state"]}</span></li>
                            <li>Number of recoveries:<span>${status_json["number_of_recoveries"]}</span></li>
                            <li>Distance remaining:<span>${status_json["distance_remaining"]}</span></li>
                            <li>Navigation time:<span>${status_json["navigation_time"]}</span></li>
                            <li>Target point:<span>x: ${status_json["target"]["x"]}; y: ${status_json["target"]["y"]}; angle: ${status_json["target"]["angle"]}</span></li>
                            <li>Current pose:<span>x: ${status_json["current_pose"]["x"]}; y: ${status_json["current_pose"]["y"]}; angle: ${status_json["current_pose"]["angle"]}</span></li>`)
}

function start_slam(elem, stream, mapManager){
    $("#"+stream).attr('src', '/map/stream');
    send_flag("start_slam");
    var disabled = inputs_slam.find('.disabled')['prevObject'];
    disabled.removeClass('disabled');
    $(elem).addClass('disabled');
    start_slam_btn = elem;
    nav.find('a').addClass('disabled');

    mapManager.enable(true, "200, 200, 200");
}

function stop_slam(stream){
    $("#"+stream).attr('src', '/static/images/slam_load.png');
    send_flag("stop_slam");
    inputs_slam.addClass('disabled');
    $(start_slam_btn).removeClass('disabled')
    nav.find('a').removeClass('disabled')

    mapManager.enable(false);
}

function start_nav(elem, stream){
    $("#"+stream).attr('src', '/map/stream');
    send_flag("start_nav");
    var disabled = inputs_nav.find('.disabled')['prevObject'];
    disabled.removeClass('disabled');
    $(elem).addClass('disabled');
    start_nav_btn = elem;
    nav.find('a').addClass('disabled')

    mapManager_nav.enable(true,  "254, 254, 254");
}

function stop_nav(stream){
    $("#"+stream).attr('src', '/static/images/nav_load.png');
    send_flag("stop_nav");
    inputs_nav.addClass('disabled')
    $("#lift").removeClass('disabled')
    $(start_nav_btn).removeClass('disabled')
    nav.find('a').removeClass('disabled')

    mapManager_nav.enable(false);
}

function lift_cmd(input){
    let key = $(input).val()[0]
    if (key === "П"){
        $(input).val("Опустить паллету")
        $.get( "/api/lift", { lift: "true"} );
    }
    else{
        $(input).val("Поднять паллету")
        $.get( "/api/lift", { lift: "false"} );
    }

}