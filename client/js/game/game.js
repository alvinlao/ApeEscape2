// Our game
function Game() {
    Phaser.Game.call(this, 800, 600, Phaser.AUTO, "game", { preload: preload, create: create, update: update });
}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.constructor = Game;

var game = new Game();

function preload() {
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('level1', 'js/game/levels/level1/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilesheet.png');
    game.load.image('player', 'assets/phaser-dude.png');
    game.load.spritesheet("ape", "assets/ape_spritesheet.png", 50, 50, 6);
    game.load.image('fireTrap', 'assets/diamond.png');
}

function create() {

    // TODO
    currentStage = STAGE_01;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = gravity;

    game.stage.backgroundColor = '#ffffff';

    map = game.add.tilemap('level1');

    map.addTilesetImage('tilesheet', 'tiles');

    map.setCollision(5);
    map.setCollision(7);
    map.setCollision(14);
    
    layer1 = map.createLayer('Floor');
    layer2 = map.createLayer('Traps');
    layer2.visible = player.role === ROLE_APE;
    //layer3 = map.createLayer('FinishLine');

    // Un-comment this on to see the collision tiles
    //layer1.debug = true;

    layer1.resizeWorld();

    ape = new Ape(game, 19, 1000, "ape");
    game.add.existing(ape);

    //add the traps
    parseMap(currentStage);

    game.camera.follow(ape);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    var self = this;

    game.physics.arcade.collide(ape, layer1);

    if (player.role === ROLE_APE){

       move(ape);

    } else if (player.role === ROLE_JAILER){



    }

    checkTraps(activeTraps);

}

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
