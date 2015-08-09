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
