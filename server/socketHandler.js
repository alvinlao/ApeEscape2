var io		= require("socket.io");

io.on("connection",function(socket){
	console.log("Connection recieved.".green);
});

io.on("disconnect",function(socket){
	console.log("User Disconnected.".green);
});