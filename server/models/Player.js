module.exports = function Player(name) {
	//Upon creation, assign an ID
	this.id = Math.random()*3000;

	//Lobby data
	this.name = name;
	this.isReady = false;

	//In-Game data
	this.isPlaying = false;
	this.state = 0;

	//Call to get the basic information of a user in the lobby
	this.getLobbyInfo = function() {
		return {
			name: this.name,
			id: this.id,
			isReady: this.isReady
		};
	}

	this.getInGameInfo = function() {
		return {
			name: this.name,
			id: this.id,
			isPlaying: this.isPlaying
		};
	}
}