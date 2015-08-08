var io          = require("socket.io");

var lobby       = require("./interface/lobby");
var highscores  = require("./interface/highscore");
var Player        = require("./models/Player");


/*
 * On Establishing a connection with socket.io from client
 */
var onConnect = function(socket) {
    console.log("Connection Recieved.".green);
    var self = this;

    //Player object
    var player;

    /*
     * When a player joins the lobby
     */
    var onLobbyJoin = function(playerName){
        player = new Player(playerName);
        lobby.addPlayer(player);

        if(lobby.isInGame){
            socket.emit("lobby_players", {
                players: lobby.getLobby(),
                isInGame: lobby.isInGame
            })
        } else {
            //Still waiting in lobby, tell everyone who joined
            io.emit("lobby_players",{
                players: lobby.getLobby(),
                isInGame: lobby.isInGame
            });
        }
    }

    /*
     * When a player disconnects
     */
    var onDisconnect = function(socket){
        if(player){
            lobby.removePlayer(player);
        }

        //Update everyone else
        io.emit("lobby_players",{
            players: lobby.getLobby(),
            isInGame: lobby.isInGame
        });
        console.log("IO Connection Closed.".green);
    }

    /*
     * When a player clicks "ready"
     */
    var onReady = function(socket){
        lobby.playerReady(player,function(lobbyReady){
            if(lobbyReady){
                lobby.isInGame = true;
                io.emit("game_start",true);
            }

            io.emit("lobby_players",{
                players: lobby.getLobby(),
                isInGame: lobby.isInGame
            });
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