// Our game
function Game() {
    Phaser.Game.call(this, 800, 600, Phaser.AUTO, "game");
}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.constructor = Game;

var game = new Game();
game.state.add("boot", BootState, true);
game.state.add("load", LoadState, true);
game.state.add("lobby", LobbyState, true);
game.state.add("play", PlayState, true);
game.state.add("end", EndState, true);
game.state.add("level1", Level, true);

game.state.start("boot");


function checkTraps(activeTraps) {
    activeTraps.forEach(function (trap){
        if (trap.expiryTime === 0){
            trap.kill();
            var index = activeTraps.indexOf(trap);
            activeTraps.splice(index, 1);
        } else if (trap.expiryTime > 0) {
            trap.expiryTime--;
        }

        game.physics.arcade.collide(ape, trap, trap.effect, null, self);
    });
}

var die = function die(){
    ape.kill();
}

function activateTrap(trap) {

    var width = currentStage.width;

    var dx = currentStage.tilewidth;
    var dy = currentStage.tileheight;

    var i = trap.index;
    var trapType = trap.type;

    var x = dx * (i % width);
    var y = dy * (Math.floor(i / width));

    var expiryTime = 90;

    var newTrap; 

    switch (trapType){
        case 8:
            newTrap = new FlameTrap(game, x, y, 'flameTrap');
            break;
        case 9:
            newTrap = new FallingPlatformTrap(game, x, y, 'fallingPlatformTrap');
            break;
        case 10:
        case 11:
        case 12:
        case 13:
            newTrap = new LaserTrap(game, x, y, 'laserTrap', trapType);
            break;
    }

    newTrap.expiryTime = expiryTime;
    
    game.add.existing(newTrap);
    newTrap.deploy();

    activeTraps.push(newTrap);
}

function move(ape) {
	ape.body.velocity.x = 0;

    if (cursors.left.isDown) {
        ape.walk(-speed);
    } else if (cursors.right.isDown) {
        ape.walk(speed);
    } else {
        ape.stop();
    }

    if (cursors.up.isDown) {
        ape.jump();

        if (ape.body.onFloor()) {
            ape.body.velocity.y = -jumpPower;
        }
    }

    // If they push both left and right, stop them.
    if (cursors.left.isDown && cursors.right.isDown && !cursors.up.isDown) {
        ape.stop();
    } 
}

function setObjectPosition(object,position){
    object.x = position.x;
    object.y = position.y;
}
