$(document).ready(function(){
	$("#TronPage").hide();
	$("#PongPage").hide();
	$("#BreakoutPage").hide();
    $("#DodgePage").hide();
    $("#Crediti").hide();
	//$("#TronPage").hide();
    $(".nav1").click(function(){
    	$("#PongPage").hide();
    	$("#BreakoutPage").hide();
        $("#DodgePage").hide();
        $("#Crediti").hide();
        $("#TronPage").fadeToggle("slow");
    });
    $(".nav2").click(function(){
    	$("#TronPage").hide();
    	$("#BreakoutPage").hide();
        $("#DodgePage").hide();
        $("#Crediti").hide();
        $("#PongPage").fadeToggle("slow");
    });
    $(".nav3").click(function(){
    	$("#TronPage").hide();
    	$("#PongPage").hide();
        $("#DodgePage").hide();
        $("#Crediti").hide();
        $("#BreakoutPage").fadeToggle("slow");
    });
    $(".nav4").click(function(){
        $("#TronPage").hide();
        $("#PongPage").hide();
        $("#BreakoutPage").hide();
        $("#Crediti").hide();
        $("#DodgePage").fadeToggle("slow");
    });
    $(".nav5").click(function(){
        $("#TronPage").hide();
        $("#PongPage").hide();
        $("#BreakoutPage").hide();
        $("#DodgePage").hide();
        $("#Crediti").fadeToggle("slow");
    });
});

function openTron(){
	window.open("../Tron/index.html");
}
function openPong(){
    window.open("../Pong/index.html");
}
function openBreakout(){
    window.open("../Breakout/index.html");
}
function openDodge(){
    window.open("../Dodge/index.html");
}