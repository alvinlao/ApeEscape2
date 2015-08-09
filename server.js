//Load node modules
var express = require("express");
var fs      = require("fs");
var colors  = require("colors");
var http    = require("http");

//Our modules
var socketHandler = require("./server/socketHandler");
var routeHandler = require("./server/routeHandler");

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
routeHandler.setupEndpoints(apeApp);

//Setup socket.io
var httpServer = http.Server(apeApp)
socketHandler.setupIO(httpServer);

//Start server
httpServer.listen(config.APP_PORT, config.APP_IP, function() {
    console.log(""
        +"     _                 _____                            ".blue.bold + "____  \n".red.bold
        +"    / \\   _ __   ___  | ____|___  ___ __ _ _ __   ___  ".blue.bold + "|___ \\ \n".red.bold
        +"   / _ \\ | '_ \\ / _ \\ |  _| / __|/ __/ _` | '_ \\ / _ \\   ".blue.bold + "__) |\n".red.bold
        +"  / ___ \\| |_) |  __/ | |___\\__ \\ (_| (_| | |_) |  __/  ".blue.bold + "/ __/ \n".red.bold
        +" /_/   \\_\\ .__/ \\___| |_____|___/\\___\\__,_| .__/ \\___| ".blue.bold + "|_____|\n".red.bold
        +"         |_|                              |_|                 ".blue.bold
    );
    console.log("Ape Escape 2 started on ".blue.bold + (config.APP_IP + ":" + config.APP_PORT).red.bold);
});


/*
 * Error handling
 */
process.on("exit",function() {
    terminator();
});
["SIGHUP", "SIGINT", "SIGQUIT", "SIGILL", "SIGTRAP", "SIGABRT","SIGBUS",
    "SIGFPE", "SIGUSR1", "SIGSEGV", "SIGUSR2", "SIGTERM"]
    .forEach(function(element,index,array){
        process.on(element, function() {
            terminator(element); 
        });
    });

function terminator(reason){
    if(typeof reason === "string"){
        console.log("\n\nApe Escape 2 Recieved: ".blue.bold + reason.red.bold);
        process.exit(1);
    }
    console.log("Ape Escape 2 Stopped.".blue.bold);
}