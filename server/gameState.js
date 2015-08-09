var STATE       = require("./models/GameState");

var players = [];
var traps = [];
var state = STATE.LOBBY;

exports.getLobbyState = function(){
	var lobbyInfo = {};
	lobbyInfo.state = state;
	lobbyInfo.players = [];

	for(var i=0;i<players.length;i++){
		lobbyInfo.players.push(players[i].getLobbyInfo());
	}

	return lobbyInfo;
}


exports.state = state;
exports.traps = traps;
exports.players = players;