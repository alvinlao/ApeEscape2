//Load node modules
var express = require("express");
var fs      = require("fs");
var colors  = require("colors");
var http    = require("http");

//Our modules
var socketHandler = require("./server/socketHandler");

//Config
var config  = require("./server/config/config");

//Create App
var apeApp = express();

//Express Environment setup
apeApp.set()
apeApp.use(express.favicon()); //TODO Add favicon middleware
apeApp.use(express.logger("dev"));
apeApp.use(express.json());
apeApp.use(express.urlencoded());
apeApp.use(express.methodOverride());
apeApp.use(express.bodyParser());
apeApp.use(apeApp.router);

//Expose the client folder to the public
apeApp.use(express.static('client'));

//Set up the endpoints


//Setup socket.io
var httpServer = http.Server(apeApp)
socketHandler.setupIO(httpServer);

//Start server
httpServer.listen(config.APP_PORT, config.APP_IP, function() {
    console.log(""
        +"     _                 _____                            ____  \n".blue
        +"    / \\   _ __   ___  | ____|___  ___ __ _ _ __   ___  |___ \\ \n".blue
        +"   / _ \\ | '_ \\ / _ \\ |  _| / __|/ __/ _` | '_ \\ / _ \\   __) |\n".blue
        +"  / ___ \\| |_) |  __/ | |___\\__ \\ (_| (_| | |_) |  __/  / __/ \n".blue
        +" /_/   \\_\\ .__/ \\___| |_____|___/\\___\\__,_| .__/ \\___| |_____|\n".blue
        +"         |_|                              |_|                 ".blue
    );
    console.log('%s: Ape Escape 2 started on %s:%d ...',
        Date(Date.now() ), config.APP_IP, config.APP_PORT);
});