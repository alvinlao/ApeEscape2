var playerID = 0;
var Ape = require("./Ape");
var Jailer = require("./Jailer");

module.exports = function Player(name) {
	//Upon creation, assign an ID
	this.id = playerID++;

	//Lobby data
	this.name = name;
	this.isReady = false;

	//Either a Jailer or Ape object
	this.gameState = {};

	//Call to get the basic information of a user in the lobby
	this.getLobbyInfo = function() {
		return {
			name: this.name,
			id: this.id,
			isReady: this.isReady
		};
	}

	//This data is sent every time the game state is updated
	this.getInGameInfo = function() {
		return {
			name: this.name,
			id: this.id,
			gameState: this.gameState
		};
	}

	//Set on game start
	this.isApe = function(){
		this.gameState = new Ape();
	}

	this.isJailer = function(){
		this.gameState = new Jailer();
	}
}