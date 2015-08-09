var setupEvents = function(player,socket){
	/*
	 * Event: ape_move
	 */
	var apeMove = function(position){
		player.gameState.x = position.x;
		player.gameState.y = position.y;
	}

	/*
	 * Event: ape_shield
	 */
	var apeShield = function(){
		player.gameState.shield = true;
		setTimeout(function(){
			player.gameState.shield = false;
		}, 3000);
	}

	/*
	 * Event: ape_death
	 */
	var apeDeath = function(){
		player.gameState.isDead = true;
	}

	/*
	 * Event: ape_dash
	 */
	var apeDash = function(){
		player.gameState.dash = true;
		setTimeout(function(){
			player.gameState.dash = false;
		}, 3000);
	}

	//Set up the sockets
	socket.on("ape_move",apeMove);
	socket.on("ape_shield",apeShield);
	socket.on("ape_death",apeDeath);
	socket.on("ape_dash",apeDash);
}

exports.setupEvents = setupEvents;