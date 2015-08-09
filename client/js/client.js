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
    playerState = PLAYER_STATE_WAITING;
    socket.emit("lobby_join", name);

    return false;
});

// Ready button
$("#ready-button").click(function (e) {
    if (playerState === PLAYER_STATE_WAITING) {
        console.log("Player ready");

        socket.emit("player_ready");
        playerState = PLAYER_STATE_READY;

        UIReadyButton(true);
    }
});

// Find out who I am
socket.on("me", function(player) {
    myID = player.id;
});

// Game update
socket.on("ape_state", function(response) {
    if (!myID) {
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
    }
});

// AJAX
function getLeaderboard() {
    $.ajax("leaderboards", "GET")
        .done(function(response) {
            UILeaderboard(response);
        });
}
