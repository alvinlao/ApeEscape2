var io          = require("socket.io");

var lobby       = require("./interface/lobby");
var highscores  = require("./interface/highscore");
var User        = require("./models/User");


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
        io.emit("lobby_players",lobby.getLobby());
    }

    /*
     * When a user disconnects
     */
    var onDisconnect = function(socket){
        if(user){
            lobby.removeUser(user);
        }

        //Update everyone else
        io.emit("lobby_players",lobby.getLobby());
        console.log("IO Connection Closed.".green);
    }

    /*
     * When a user clicks "ready"
     */
    var onReady = function(socket){
        lobby.playerReady(user,function(lobbyReady){
            if(lobbyReady){
                io.emit("game_start",true);
            }

            io.emit("lobby_players",lobby.getLobby());
        });
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