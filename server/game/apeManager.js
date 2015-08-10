var gameManager = require("../gameManager");

var setupEvents = function(player){
	/*
	 * Event: ape_move
	 */
	var apeMove = function(position){
		player.state.x = position.x;
		player.state.y = position.y;
		player.state.frame = position.frame;
		player.state.scale = position.scale;

		gameManager.updateGame();
	}

	/*
	 * Event: ape_shield
	 */
	var apeShield = function(){
		player.state.shield = true;
		setTimeout(function(){
			player.state.shield = false;
		}, 3000);
	}

	/*
	 * Event: ape_death
	 */
	var apeDeath = function(){
		player.state.isDead = true;
	}

	/*
	 * Event: ape_dash
	 */
	var apeDash = function(){
		player.state.dash = true;
		setTimeout(function(){
			player.state.dash = false;
		}, 3000);
	}

	//Set up the sockets
	player.socket.on("ape_move",apeMove);
	player.socket.on("ape_shield",apeShield);
	player.socket.on("ape_death",apeDeath);
	player.socket.on("ape_dash",apeDash);
}

exports.setupEvents = setupEvents;