// Get my id, update lobby state
function handleMe(response) {
    player.id = response.me.id;
    handleLobbyUpdate(response.lobby);
}

// Change UI [lobby, game, leaderboard]
function handleLobbyUpdate(response) {
    // Only worry about response once we get our id
    if (!player.id) {
        return;
    }

    // Update state
    state = response.state;

    UIHideAll();
    if (state === STATE_LOBBY) {
        $("#lobby").show();
        UIUpdateLobbyPlayers(response.players);
    } else if (state === STATE_GAME) {
        $("#game").show();
    } else if (state === STATE_GAME_OVER) {
        $("#leaderboard").show();
    }
}

// Role is a enum (see roles.js)
function handlePlayerRole(role) {
    console.log("My role is: "+role);
    player.role = role;

    switch(player.role){
        case ROLE_APE:
            updateLevelStart();
            break;
        case ROLE_JAILER:
            ape.anchor.setTo(0.5,1);
            ape.body.gravity = false;
            break;
    }
}

// A new level started
function handleLevelStart(response) {
    console.log("The level is: " + response);
}

//Ape position updated by server
function handleGameState(state){
    if (window.player.role === ROLE_JAILER){
        for(var player in state.players){
            switch(state.players[player].role){
                case ROLE_APE:
                    ape.x = state.players[player].state.x;
                    ape.y = state.players[player].state.y;
                    ape.scale = state.players[player].state.scale;
                    ape.frame = state.players[player].state.frame;
                    break;
                case ROLE_JAILER:
                    break;
            }
        }
    }
}

// Find out who I am
socket.on("me", handleMe);

// Lobby update
socket.on("lobby_state", handleLobbyUpdate);

// Find out what role I am
socket.on("player_role", handlePlayerRole);

// Find out a new level has started
socket.on("level_start", handleLevelStart);

// Find out the game's state
socket.on("game_state", handleGameState);