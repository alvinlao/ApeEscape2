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
    player.role = role;

    if (role === ROLE_APE) {
        game.state.start("play");
        updateLevelStart();
    }
}

// A new level started
function handleLevelStart(response) {
    console.log("The level is: " + response);
}

// Find out who I am
socket.on("me", handleMe);

// Lobby update
socket.on("lobby_state", handleLobbyUpdate);

// Find out what role I am
socket.on("player_role", handlePlayerRole);

// Find out a new level has started
socket.on("level_start", handleLevelStart);
