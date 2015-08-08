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
    socket.emit("lobby_join", name);

    return false;
});

// Ready button
$("#ready-button").click(function (e) {
    socket.emit("player_ready");
});

// Get list of players
socket.on("lobby_players", function(players) {
    $("#name-form").hide();
    $("#lobby-wait").show();

    updateLobbyPlayers(players);
});
