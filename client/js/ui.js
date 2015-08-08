(function init() {
    $("#name-form").show();
    $("#lobby-wait").hide();
})();


/*
 * Update the UI
 *
 * Displays all players in lobby
 */
function updateLobbyPlayers(players) {
    var uiPlayers = $("#lobby-players");
    var uiPlayer = "<li><div class='lobby-indicator circle { isReady }'></div><span>{ playerName }</span></li>";

    uiPlayers.empty();

    players.forEach(function(player) {
        player.isReady = true;

        var li = uiPlayer.replace("{ playerName }", player.name)
            .replace("{ isReady }", player.isReady ? "indicator-ready" : "indicator-wait");

        uiPlayers.append(li);
    });
}
