var express = require("express");

//Import custom endpoints
var highscore = require("./interface/highscore");

var routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
};

/*
 * Sets up the endpoints for the server
 */
var routeHandler = function() {
    var self = this;

    //Add the endpoints
    routes.GET["/leaderboards"] = highscore.getHighscores;
}

function setupEndpoints(server) {
    //HTTP GET
    for (var endpoint in routes.GET) {
        console.log(endpoint);
        server.get(endpoint, routes.GET[endpoint]);
    }

    //HTTP POST
    for (var endpoint in routes.POST) {
        server.post(endpoint, routes.POST[endpoint]);
    }

    //HTTP PUT
    for (var endpoint in routes.PUT) {
        server.put(endpoint, routes.PUT[endpoint]);
    }

    //HTTP DELETE
    for (var endpoint in routes.DELETE) {
        server.delete(endpoint, routes.DELETE[endpoint]);
    }
}

exports.setupEndpoints = setupEndpoints;