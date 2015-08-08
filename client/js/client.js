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
socket.on("lobby_players", function(players) {
    if (state === STATE_LOBBY_WAITING || state === STATE_LOBBY_READY) {
        UIHideAll();
        $("#lobby-wait").show();

        UIUpdateLobbyPlayers(players);
    }
});
