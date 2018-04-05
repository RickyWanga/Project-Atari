$(document).ready(function(){
	$("#TronPage").hide();
	$("#PongPage").hide();
	$("#SnakePage").hide();
	//$("#TronPage").hide();
    $(".nav1").click(function(){
    	$("#PongPage").hide();
    	$("#SnakePage").hide();
        $("#TronPage").fadeToggle("slow");
    });
    $(".nav2").click(function(){
    	$("#TronPage").hide();
    	$("#SnakePage").hide();
        $("#PongPage").fadeToggle("slow");
    });
    $(".nav3").click(function(){
    	$("#TronPage").hide();
    	$("#PongPage").hide();
        $("#SnakePage").fadeToggle("slow");
    });

});

function openTron(){
	window.open("../Tron/index.html");
}
function openPong(){
    window.open("../Pong/index.html");
}