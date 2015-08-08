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
    var uiPlayer = "<li>{ playerName }</li>";

    uiPlayers.empty();

    players.forEach(function(player) {
        uiPlayers.append(uiPlayer.replace("{ playerName }", player.name));
    });
}
