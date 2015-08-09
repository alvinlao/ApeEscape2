var colors      = require("colors");
var STATE       = require("./models/GameState");
var lobbyManager = require("./interface/lobbyManager");
var apeManager = require("./game/apeManager");

//Used to update the game/lobby on intervals
var updateInterval;

var startGame = function() {
    var theApe = ParseInt(Math.random()*mainLobby.length);
    for(var i=0;i<mainLobby.length;i++){
        if(i === theApe){
            mainLobby[i].setApe();

            //Wait for the ape to give us level info
            mainLobby[i].socket.on("level_start",startLevel);
        } else {
            mainLobby[i].setJailer();
        }
    }
};

var startLevel = function(traps){
    if(gameState.state !== STATE.GAME){
        //First time
        gameState.state = STATE.GAME;
        clearInterval(updateInterval);
        updateInterval = setInterval(updateGame,100);
    }

    //Update the traps
    gameState.traps = traps;
    io.emit("level_start");
}

var endGame = function() {
    clearInterval(updateInterval);
    io.emit("game_end",true);
    for(var i=0;i<mainLobby.length;i++){
        mainLobby[i].isApe = false;
        mainLobby[i].gameState = {};
    }
};

var updateGame = function() {
    //Update only jailers
    for(var i=0;i<mainLobby.length;i++){
        if(!mainLobby[i].isApe){
            mainLobby[i].socket.emit("ape_state",{
                state: gameState.state,
                players: gameState.players
            });
        }
    }
};