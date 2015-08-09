(function UIInit() {
    UIHideAll();
    $("#askName").show();
})();

// Hide all UI screens
function UIHideAll() {
    $("#askName").hide();
    $("#lobby").hide();
    $("#game").hide();
    $("#leaderboard").hide();
}

/*
 * Update the UI
 *
 * Displays all players in lobby
 */
function UIUpdateLobbyPlayers(players) {
    var uiPlayers = $("#lobby-players");
    var uiPlayer = "<li><div class='lobby-indicator circle { isReady }'></div><span>{ playerName }</span></li>";
    var uiMe = "<li id='lobby-player-me'><div class='lobby-indicator circle { isReady }'></div><span>{ playerName }</span><button id='ready-button' onclick='readyUp(this)'>READY</button></li>";

    uiPlayers.empty();

    // Make sure the current player is at the top of the list
    players.sort(function(a, b) {
        if (a.id === player.id) {
            return -1;
        }
        if (b.id === player.id) {
            return 1;
        }
        return 0;
    });

    players.forEach(function(other) {
        var template;

        if (other.id === player.id) {
            template = uiMe;
        } else {
            template = uiPlayer;
        }

        li = template.replace("{ playerName }", other.name)
        .replace("{ isReady }", other.isReady ? "indicator-ready" : "indicator-wait");

        uiPlayers.append(li);
    });
}

function UILeaderboard(entries) {
    entries.forEach(function(entry) {
        console.log(entry);
        entry.player;
        entry.score;
        entry.time;
    });
}
