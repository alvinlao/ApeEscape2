var colors      = require("colors");
var STATE       = require("./models/GameState");
var lobbyManager = require("./interface/lobbyManager");
var apeManager = require("./game/apeManager");
var gameState = require("./gameState");
var ROLE        = require("./models/ROLE");

//Used to update the game/lobby on intervals
var updateInterval;

var startGame = function() {
    var theApe = parseInt(Math.random()*gameState.players.length);
    for(var i=0;i<gameState.players.length;i++){
        if(i === theApe){
            gameState.players[i].setApe();
            gameState.players[i].socket.emit("player_role",ROLE.APE);

            //Wait for the ape to give us level info
            console.log("Game is ready, waiting for Ape.".cyan + " (" + gameState.players[i].name + ")");
            gameState.players[i].socket.on("level_start",startLevel);
        } else {
            gameState.players[i].setJailer();
            gameState.players[i].socket.emit("player_role",ROLE.JAILER);
        }
    }
};
exports.startGame = startGame;

var startLevel = function(levelNumber, traps){
    if(gameState.state !== STATE.GAME){
        //First time
        gameState.state = STATE.GAME;
        clearInterval(updateInterval);
        updateInterval = setInterval(updateGame,100);
    }
    console.log("Starting level!".cyan);

    //Update the traps
    gameState.traps = traps;
    io.emit("level_start", 1);
}
exports.startLevel = startLevel;

var endGame = function() {
    clearInterval(updateInterval);
    io.emit("game_end",true);
    for(var i=0;i<gameState.players.length;i++){
        gameState.players[i].role = ROLE.NONE;
        gameState.players[i].gameState = {};
    }
};
exports.endGame = endGame;

var updateGame = function() {
    //Update only jailers
    for(var i=0;i<gameState.players.length;i++){
        if(gameState.players[i].role === ROLE.JAILER){
            console.log("updating game");
            gameState.players[i].socket.emit("game_state",{
                state: gameState.state,
                players: gameState.players
            });
        }
    }
};
exports.updateGame = updateGame;