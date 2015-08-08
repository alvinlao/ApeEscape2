var colors  = require("colors");
var User    = require("../models/User");


//Array of User objects
var mainLobby = [];

/*
 * Upon connecting to the lobby, add the user
 * @param user      User object to add to the lobby
 */
var addUser = function(user){
    mainLobby.push(user);
    console.log(user.name + " has joined the lobby. [".magenta + mainLobby.length + "]".magenta);
}

/*
 * Upon dropping connection, remove a user from the lobby
 * @param user      User object to remove from the lobby
 */
var removeUser = function(removeUser){
    for(var i=0;i<mainLobby.length;i++){
        if(mainLobby[i].name === removeUser.name){
            mainLobby.splice(i,1);
            break;
        }
    }
    console.log(removeUser.name + " has left the lobby. [".magenta + mainLobby.length + "]".magenta);
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
 * returns true if all users are ready.
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
 * Get a list of users currently in the lobby
 * @return lobby    Array of User objects
 */
var getLobby = function() {
    return mainLobby;
}

exports.addUser = addUser;
exports.removeUser = removeUser;
exports.getLobby = getLobby;
exports.playerReady = playerReady;