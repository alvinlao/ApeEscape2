var io          = require("socket.io");

var lobbyManager= require("./interface/lobbyManager");
var gameManager = require("./gameManager");


var onConnect = function(socket){
    var onLobbyJoin = function(playerName){
        lobbyManager.addPlayer(playerName,socket);
    }

    var onDisconnect = function(){
        lobbyManager.removePlayer(socket);
    }

    socket.on("lobby_join",onLobbyJoin);
    socket.on("disconnect",onDisconnect);
}

/*
 * Setup function,called from server.js
 */
var setupIO = function(server){
    console.log("Setting up sockets...");

    io = io(server);
    io.on("connection",onConnect);

    gameManager.linkIO(io);
}

exports.setupIO = setupIO;