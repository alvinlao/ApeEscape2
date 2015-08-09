var colors      = require("colors");
var STATE       = require("./models/GameState");
var lobbyManager = require("./interface/lobbyManager");
var apeManager = require("./game/apeManager");
var gameState = require("./gameState");

//Used to update the game/lobby on intervals
var updateInterval;

var startGame = function() {
    var theApe = parseInt(Math.random()*gameState.players.length);
    for(var i=0;i<gameState.players.length;i++){
        if(i === theApe){
            gameState.players[i].setApe();

            //Wait for the ape to give us level info
            console.log("Game is ready, waiting for Ape.".cyan);
            gameState.players[i].socket.on("level_start",startLevel);
        } else {
            gameState.players[i].setJailer();
        }
    }
};
exports.startGame = startGame;

var startLevel = function(traps){
    if(gameState.state !== STATE.GAME){
        //First time
        gameState.state = STATE.GAME;
        clearInterval(updateInterval);
        updateInterval = setInterval(updateGame,100);
    }
    console.log("Starting level!".cyan);

    //Update the traps
    gameState.traps = traps;
    io.emit("level_start");
}
exports.startLevel = startLevel;

var endGame = function() {
    clearInterval(updateInterval);
    io.emit("game_end",true);
    for(var i=0;i<gameState.players.length;i++){
        gameState.players[i].isApe = false;
        gameState.players[i].gameState = {};
    }
};
exports.endGame = endGame;

var updateGame = function() {
    //Update only jailers
    for(var i=0;i<gameState.players.length;i++){
        if(!gameState.players[i].isApe){
            console.log("updating game");
            gameState.players[i].socket.emit("ape_state",{
                state: gameState.state,
                players: gameState.players
            });
        }
    }
};
exports.updateGame = updateGame;