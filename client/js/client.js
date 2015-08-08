// Connect to the server
var socket = io.connect(document.URL, {
    "reconnect": false
});

// FUNCTIONS

// User submits their name
// Connect to the server
$("#name-form").on('submit', function (e) {
    var name = $("#name-input").val();
    console.log("Name: " + name);

    // Validate name
    if (!name) {
        alert("Please enter a name");
        return false;
    }

    // Tell the server our name
    state = STATE_LOBBY_WAITING;
    socket.emit("lobby_join", name);

    return false;
});

// Ready button
$("#ready-button").click(function (e) {
    if (state === STATE_LOBBY_WAITING) {
        console.log("Player ready");
        socket.emit("player_ready");
        state = STATE_LOBBY_READY;

        UIReadyButton(true);
    }
});

// Get list of players
socket.on("lobby_players", function(response) {
    if (state === STATE_LOBBY_WAITING || state === STATE_LOBBY_READY) {
        console.log("LOBBY UPDATE");
        UIHideAll();

        //if (response.isInGame) {
            // Game started already
         //   $("#game").show();
        //} else {
            // In lobby
            $("#lobby-wait").show();
        //}

        UIUpdateLobbyPlayers(response);
    }
});

// GAME IS STARTING...
socket.on("game_start", function() {
    if (state === STATE_LOBBY_READY) {
        console.log("GAME START");
        state = STATE_GAME;

        UIHideAll();
        $("#game").show();
    }
});
