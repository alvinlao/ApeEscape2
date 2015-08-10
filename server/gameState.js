var STATE       = require("./models/GameState");

exports.players = [];
exports.traps = [];
exports.state = STATE.LOBBY;

exports.getLobbyState = function(){
	var lobbyInfo = {};
	lobbyInfo.state = exports.state;
	lobbyInfo.players = [];

	for(var i=0;i<exports.players.length;i++){
		lobbyInfo.players.push(exports.players[i].getLobbyInfo());
	}

	return lobbyInfo;
}