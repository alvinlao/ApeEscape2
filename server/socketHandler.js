var io          = require("socket.io");

var lobby       = require("./interface/lobby");
var highscores  = require("./interface/highscore");
var Player      = require("./models/Player");
var STATE       = require("./models/GameState");


/*
 * On Establishing a connection with socket.io from client
 */
var onConnect = function(socket) {
    console.log("Connection Recieved.".green);
    var self = this;

    //Player object (Unique to this connection)
    var player;

    /*
     * When a player joins the lobby
     */
    var onLobbyJoin = function(playerName){
        player = new Player(playerName);
        lobby.addPlayer(player);

        //Let the player know who they are
        socket.emit("me",player);

        updateState();
    }

    /*
     * When a player disconnects
     */
    var onDisconnect = function(socket){
        if(player){
            lobby.removePlayer(player);
            updateState();
        }

        console.log("IO Connection Closed.".green);
    }

    /*
     * When a player clicks "ready"
     */
    var onReady = function(socket) {
        lobby.playerReady(player);
        updateState();
    }

    /*
     * Called when anything happens
     */
    var updateState = function() {
        io.emit("ape_state",lobby.getGameState());
    }


    socket.on("lobby_join",onLobbyJoin);
    socket.on("disconnect",onDisconnect);
    socket.on("player_ready",onReady);
}

/*
 * Setup function,called from server.js
 */
var setupIO = function(server){
    console.log("Setting up sockets...");

    io = io(server);
    io.on("connection",onConnect);
}

exports.setupIO = setupIO;