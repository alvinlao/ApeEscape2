var express = require("express");

//Import custom endpoints
var highscore = require("./highscore");

/*
 * Sets up the endpoints for the server
 */
var routeHandler = function() {
    var self = this;

    self.routes = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {}
    };

    //Add the endpoints
    self.routes.GET["/leaderboards"] = highscore.getHighscores;
}

function setupEndpoints(server) {

    var handler = new routeHandler();

    //HTTP GET
    for (var endpoint in handler) {
        server.get(endpoint, handler.routes.GET[endpoint]);
    }

    //HTTP POST
    for (var endpoint in handler) {
        server.post(endpoint, handler.routes.POST[endpoint]);
    }

    //HTTP PUT
    for (var endpoint in handler) {
        server.put(endpoint, handler.routes.PUT[endpoint]);
    }

    //HTTP DELETE
    for (var endpoint in handler) {
        server.delete(endpoint, handler.routes.DELETE[endpoint]);
    }
}