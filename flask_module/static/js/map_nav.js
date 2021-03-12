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
