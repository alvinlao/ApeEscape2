(function UIInit() {
    $("#name-form").show();
    $("#lobby-wait").hide();
})();

// Hide all UI screens
function UIHideAll() {
    $("#name-form").hide();
    $("#lobby-wait").hide();
}

/*
 * Update the UI
 *
 * Displays all players in lobby
 */
function UIUpdateLobbyPlayers(players) {
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

// Toggle ready button
function UIReadyButton(disable) {
    // Change button to wait
    $("#ready-button").prop("disabled", disable);
}
