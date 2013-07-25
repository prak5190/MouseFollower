// Init Code 
$(function () {
	socket = io.connect() ;
	socket.on('connect' , function () {
		console.log("Connected");
		initMouse();
	});
	socket.on('userChange', onUserChange);
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
		
		socket.emit('mouseMove', {x:x , y :y});
	};
}

// UserList Block
var userMap = {};
var nameCounter = 0;
// Create dot for ID 
function dot(id) {
	if(!userMap[id] && id != socket.socket.sessionid) {
		console.log("DOt For Id : ",id);
		var div = document.createElement("div"); 
		document.body.appendChild(div);
		$(div).addClass('dot');
		$(div).html(nameCounter++);
		$(div).attr('id',id);
		$(div).css("backgroundColor", getRandomRGB());		
		userMap[id] = div ;
		// Place it Randomly 
		$(div).css('top',Math.random() * 600);
		$(div).css('left',Math.random() * 600);
	}
}

function onUserChange(data) {
	console.log(arguments);
	var ids = data.idList;
	// Get All from array and add to userMap & create dot
	for ( var i =0 ; i< ids.length; i++) {
		dot(ids[i]);
	}	
	for (var e in userMap ) {
		if ( ids.indexOf(e) == -1 && e !== socket.socket.sessionId ) {
			// Delete the dot
			$(userMap[e]).remove();
			userMap[e] = false;
		}
	}
}

function onMouseMove(data) {
	if(data.id != socket.socket.sessionid) {
		$(userMap[data.id]).css({
			left : data.x ,
			top : data.y 
		});
	}
}


