function send_flag(route){
    $.ajax({
            type: "GET",  
            url: "http://127.0.0.1:8000/api/"+route,  
            cache: false,  
            success: function(text){  
                alert(text);  
            },
            error:function(xhr, status, errorThrown) { 
                alert(errorThrown+'\n'+status+'\n'+xhr.statusText); 
            }  
        });
}