var setupEvents = function(player,socket){
	console.log(socket);
	/*
	 * Event: ape_move
	 */
	var apeMove = function(){

	}

	/*
	 * Event: ape_shield
	 */
	var apeShield = function(){

	}

	/*
	 * Event: ape_death
	 */
	var apeDeath = function(){

	}

	/*
	 * Event: ape_dash
	 */
	var apeDash = function(){

	}

	//Set up the sockets
	socket.on("ape_move",apeMove);
	socket.on("ape_shield",apeShield);
	socket.on("ape_death",apeDeath);
	socket.on("ape_dash",apeDash);
}

exports.setupEvents = setupEvents;