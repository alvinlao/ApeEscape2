var io      = require("socket.io");

var lobby   = require("./lobby");
var User    = require("./User");

/*
 * On Establishing a connection with socket.io from client
 */
var onConnect = function(socket) {
    console.log("Connection Recieved.".green);
    var self = this;

    //User object
    var user;

    /*
     * When a user joins the lobby
     */
    var onLobbyJoin = function(userName){
        user = new User(userName);
        lobby.addUser(user);

        //Update everyone else that they joined
        io.emit("lobby_players",lobby.getLobby);
    }

    /*
     * When a user disconnects
     */
    var onDisconnect = function(socket){
        lobby.removeUser(user)
        console.log("IO Connection Closed.".green);
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
}

exports.setupIO = setupIO;