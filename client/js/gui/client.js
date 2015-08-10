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
    updateLobbyJoin(name);

    return false;
});

// Ready button
function readyUp(context) {
    if (playerState === PLAYER_STATE_WAITING) {
        console.log("Player ready");

        updatePlayerReady();
        playerState = PLAYER_STATE_READY;
    }
}

// AJAX
function getLeaderboard() {
    $.ajax("leaderboards", "GET")
        .done(function(response) {
            UILeaderboard(response);
        });
}
