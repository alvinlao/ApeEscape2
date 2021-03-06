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
    console.log("My role is: " + role);
    player.role = role;

    game.state.start("play");
    if (role === ROLE_APE) {
        updateLevelStart();
    } else {
        console.log("I AM A JAILER");
    }
}

// A new level started
function handleLevelStart(response) {
    console.log("The level is: " + response);
}

var lastUpdate = new Date();
//Ape position updated by server
function handleGameState(state){
    // Latency checking
    var currentUpdate = new Date();
    //console.log("Last update "+(currentUpdate - lastUpdate) + "ms ago");
    lastUpdate = currentUpdate;

    if (window.player.role === ROLE_JAILER){
        for(var player in state.players){
            switch(state.players[player].role){
                case ROLE_APE:
                    var xPos = state.players[player].state.x;
                    var yPos = state.players[player].state.y;
                    var scale = state.players[player].state.scale;

                    remoteApe.x = xPos;
                    remoteApe.y = yPos;
                    remoteApe.scale = scale;
                    remoteApe.frame = state.players[player].state.frame;
                    remoteApe.name = state.players[player].name;

                    if(apeName){
                        apeName.text = state.players[player].name;
                        var nameXPos = Math.floor(xPos + ape.width / 2) - ((scale.x === 1) ? ape.width : 0);
                        apeName.x = nameXPos;
                        apeName.y = yPos - 65;
                    }


                    //TWEEN DAT
                    if(ape.currentTween){
                        game.tweens.remove(ape.currentTween);
                    }

                    ape.currentTween = game.add.tween(ape).to({
                        x: [xPos],
                        y: [yPos]
                    },30).interpolation(Phaser.Math.bezierInterpolation).start();

                    ape.scale = scale;
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
