// Init Code 
$(function () {
	socket = io.connect() ;
	socket.on('connect' , function () {
		console.log("Connected");
		initMouse();
	});
	socket.on('newUser', onNewUser);
	socket.on('mouseMove', onMouseMove);
});

function getRandomRGB() {
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	return "rgb("+r+","+g+","+b+")";
}

function initMouse() { 		
	$("#mouse").css("backgroundColor", getRandomRGB());
	document.onmousemove = function(e) {
		var x = e.pageX ;
		var y = e.pageY ;
		$("#mouse").css('top',y);
		$("#mouse").css('left',x);
	};
}

function onNewUser(data) {
	console.log(arguments);
	if(data.id != socket.socket.sessionid) { 
		var div = document.createElement("div"); 
		document.body.appendChild(div);
		$(div).addClass('dot');
		$(div).html(data.name);
		$(div).attr('id',data.id);
		$(div).css("backgroundColor", getRandomRGB());	
	}
}

function onMouseMove(data) {
	
}


