var colors  = require("colors");
var Player    = require("../models/Player");


//Array of Player objects
var mainLobby = [];

/*
 * Upon connecting to the lobby, add the player
 * @param player      Player object to add to the lobby
 */
var addPlayer = function(player){
    mainLobby.push(player);
    console.log(player.name + " has joined the lobby. [".magenta + mainLobby.length + "]".magenta);
}

/*
 * Upon dropping connection, remove a player from the lobby
 * @param player      Player object to remove from the lobby
 */
var removePlayer = function(removePlayer){
    for(var i=0;i<mainLobby.length;i++){
        if(mainLobby[i].name === removePlayer.name){
            mainLobby.splice(i,1);
            break;
        }
    }
    console.log(removePlayer.name + " has left the lobby. [".magenta + mainLobby.length + "]".magenta);
}

/*
 * playerReady
 * @return true if the lobby is ready, false if it's not.
 */
var playerReady = function (readyPlayer,callback) {
    readyPlayer.isReady = true;
    console.log(readyPlayer.name + " is ready. ".magenta + "[" + readyPlayerCount() + "/" + mainLobby.length + "]");
    callback(isReady());
}

/*
 * readyPlayerCount
 * Counts the number of ready players, returns it
 */
var readyPlayerCount = function(){
    var count = 0;
    
    for(var i=0;i<mainLobby.length;i++){
        if(mainLobby[i].isReady){
            count++;
        }
    }

    return count;
}

/*
 * isReady
 * returns true if all players are ready.
 */
var isReady = function(){
    //Make sure we have at least 2 players
    if(mainLobby.length<2){
        return false;
    }

    //Make sure everyone is ready
    for(var i=0;i<mainLobby.length;i++){
        if(!mainLobby[i].isReady){
            return false;
        }
    }

    console.log("Lobby is ready!".magenta);
    //We're ready!
    return true;
}

/*
 * Get a list of players currently in the lobby
 * @return lobby    Array of Player objects
 */
var getLobby = function() {
    return mainLobby;
}

exports.addPlayer = addPlayer;
exports.removePlayer = removePlayer;
exports.getLobby = getLobby;
exports.playerReady = playerReady;