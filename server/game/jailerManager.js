var setupEvents = function(socket){
	/*
	 * Event: jailer_move
	 */

	var jailerMove = function(){

	}

	/*
	 * Event: trap_click
	 */

	var trapClick = function(){

	}

	/*
	 * Event: ape_death
	 */

	var apeDeath = function(){

	}

	socket.on("jailer_move",jailerMove);
	socket.on("trap_click",trapClick);
	socket.on("ape_death",apeDeath);
}

exports.setupEvents = setupEvents;