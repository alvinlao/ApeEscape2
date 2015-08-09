var io 				= require("socket.io");
var gameState 		= require("../gameState");
var gameManager 	= require("../gameManager");
var Player 			= require("../models/Player");

exports.addPlayer = function(playerName,socket){
	var newPlayer = new Player(playerName,socket);
	gameState.players.push(newPlayer);

	socket.emit("me",{
		"playerId": newPlayer.id,
		"ape_state": gameState
	});
	//EMIT STATE

	var playerReady = function(){
		//Make the player ready
		newPlayer.isReady = true;

		//Call start game if everyone is ready
		if(readyPlayerCount() === gameState.players.length){
			gameManager.startGame();
		}
	};

	var readyPlayerCount = function(){
	    var count = 0;
	    
	    for(var i=0;i<gameState.players.length;i++){
	        if(gameState.players[i].isReady){
	            count++;
	        }
	    }

	    return count;
	};

	//Attach lobby events
	socket.on("player_ready",playerReady);
};

exports.removePlayer = function(player) {
    for(var i=0;i<gameState.players.length;i++){
        if(gameState.players[i].name === player.name){
            gameState.players.splice(i,1);
            break;
        }
    }
};