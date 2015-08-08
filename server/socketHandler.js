var io      = require("socket.io");

/*
 * On Establishing a connection with socket.io from client
 */
var onConnect = function(socket) {
    console.log("Connection Recieved.".green);
}

/*
 * When a user disconnects
 */
var onDisconnect = function(socket){
    console.log("IO Connection Closed.".green);
}

/*
 * Setup function,called from server.js
 */
var setupIO = function(server){
    console.log("Setting up sockets...");

    io = io(server);
    io.on("connection",onConnect);
    io.on("disconnect",onDisconnect);
}

exports.setupIO = setupIO;