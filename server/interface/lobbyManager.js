var gameState       = require("../gameState");
var gameManager     = require("../gameManager");
var Player          = require("../models/Player");
var colors          = require("colors");

var io;
exports.linkIO = function(ioLink){
    io = ioLink;
}

exports.addPlayer = function(playerName,socket){
    var newPlayer = new Player(playerName,socket);
    gameState.players.push(newPlayer);
    console.log(playerName + " has joined the lobby.".magenta);

    newPlayer.socket.emit("me",{
        "me": newPlayer.getLobbyInfo(),
        "lobby": gameState.getLobbyState()
    });

    //Let everyone else know
    io.emit("lobby_state",gameState.getLobbyState());

    var playerReady = function(){
        //Make the player ready
        newPlayer.isReady = true;
        console.log(newPlayer.name + " is ready. " + readyPlayerCount() + "/" + gameState.players.length);

        io.emit("lobby_state",gameState.getLobbyState());

        //Call start game if everyone is ready
        if(gameState.players.length > 0 && readyPlayerCount() === gameState.players.length){
            gameManager.startGame();
        }
    };


    //Attach lobby events
    socket.on("player_ready",playerReady);
};

exports.removePlayer = function(player) {
    for(var i=0;i<gameState.players.length;i++){
        if(gameState.players[i].name === player.name){
            gameState.players.splice(i,1);
            console.log(player.name + " has joined the lobby.".magenta);
            break;
        }
    }
};

var readyPlayerCount = function(){
    var count = 0;
    
    for(var i=0;i<gameState.players.length;i++){
        if(gameState.players[i].isReady){
            count++;
        }
    }

    return count;
};