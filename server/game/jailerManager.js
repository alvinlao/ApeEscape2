var io = require("socket.io");

var traps = [];

var setupTraps = function(levelTraps){
    traps = levelTraps;
}

var setupEvents = function(player, socket){
    /*
     * Event: jailer_move
     */

    var jailerMove = function(position){
        player.gameState.x = position.x;
        player.gameState.y = position.y;
    }

    /*
     * Event: trap_click
     */

    var trapClick = function(trapNumber){
        if(traps[trapNumber].clicks > 0){
            traps[trapNumber]--;
            if(traps[trapNumber]){
                io.emit("trap_activated",trapNumber);
            }
        }
    }

    socket.on("jailer_move",jailerMove);
    socket.on("trap_click",trapClick);
    socket.on("ape_death",apeDeath);
}

exports.setupEvents = setupEvents;