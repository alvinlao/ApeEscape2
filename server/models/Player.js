var playerID = 1;
var Ape = require("./Ape");
var Jailer = require("./Jailer");

module.exports = function Player(name,socket) {
	//Upon creation, assign an ID
	this.id = playerID++;

	//IO socket to communicate with
	this.socket = socket;

	//Lobby data
	this.name = name;
	this.isReady = false;

	//Either a Jailer or Ape object
	this.isApe = false;
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
	this.setApe = function(){
		this.isApe = true;
		this.gameState = new Ape();
	}

	this.setJailer = function(){
		this.isApe = false;
		this.gameState = new Jailer();
	}
}