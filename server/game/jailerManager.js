var lobby = require("../interface/lobby");

var setupEvents = function(player, socket){
	var jailer = player.gameState;
	/*
	 * Event: jailer_move
	 */

	var jailerMove = function(position){
		jailer.x = position.x;
		jailer.y = position.y;
	}

	/*
	 * Event: trap_click
	 */

	var trapClick = function(trapNumber){
		lobby.clickTrap(trapNumber);
	}

	/*
	 * Event: ape_death
	 */

	var apeDeath = function(){
		lobby.apeDeath;
	}

	socket.on("jailer_move",jailerMove);
	socket.on("trap_click",trapClick);
	socket.on("ape_death",apeDeath);
}

exports.setupEvents = setupEvents;