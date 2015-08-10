// Tell server we joined the lobby
function updateLobbyJoin(name) {
    socket.emit("lobby_join", name);
}

// Tell the server the player is ready
function updatePlayerReady() {
    socket.emit("player_ready");
}

// Level change, tell the server
function updateLevelStart() {
    var data = {
        "levelNumber": 0,
        "traps": []
    }

    socket.emit("level_start", data);
}

//Update the ape's position (only if you're the ape)
function updateApePosition(apeCharacter){
	if(window.player.role === ROLE_APE){
		var position = {
			"x": apeCharacter.x,
			"y": apeCharacter.y,
			"frame": apeCharacter.frame,
			"scale": apeCharacter.scale
		}
		socket.emit("ape_move",position);
	}
}