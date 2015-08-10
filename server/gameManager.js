var colors      = require("colors");
var STATE       = require("./models/GameState");
var lobbyManager = require("./interface/lobbyManager");
var apeManager = require("./game/apeManager");
var gameState = require("./gameState");
var ROLE        = require("./models/ROLE");

//Used to update the game/lobby on intervals
var updateInterval;

//Link to the current io instance
var io;

var linkIO = function(ioInstance){
    io = ioInstance;
}
exports.linkIO = linkIO;

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

var startLevel = function(levelData){
    if(gameState.state !== STATE.GAME){
        //First time
        gameState.state = STATE.GAME;
        clearInterval(updateInterval);
        updateInterval = setInterval(updateGame,100);

        //Let everyone know that the lobby is now in game.
        io.emit("lobby_state",gameState.getLobbyState());
    }
    console.log("Starting level ".cyan + levelData.levelNumber + "!".cyan);

    //Update the traps
    gameState.traps = levelData.traps;

    //Let everyone know the level started
    io.emit("level_start", levelData.levelNumber);
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