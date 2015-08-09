// Our game
function Game() {
    Phaser.Game.call(this, 800, 600, Phaser.AUTO, "game", { preload: preload, create: create, update: update });
}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.constructor = Game;

var game = new Game();

function preload() {
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('level1', 'js/game/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilesheet.png');
    game.load.image('player', 'assets/phaser-dude.png');
    game.load.spritesheet("ape", "assets/ape_spritesheet.png", 50, 50, 6);
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#000000';

    map = game.add.tilemap('level1');

    map.addTilesetImage('tilesheet', 'tiles');

    //map.setCollisionBetween(0, 25);
    //map.setCollisionBetween(35, 80);
    //map.setCollisionBetween(27, 29);
    map.setCollision(5);
    map.setCollision(7);
    map.setCollision(14);
    
    layer1 = map.createLayer('Floor');
    layer2 = map.createLayer('Traps');
    layer3 = map.createLayer('FinishLine');

    // Un-comment this on to see the collision tiles
    layer1.debug = true;

    layer1.resizeWorld();

    ape = new Ape(game, 19, 1000, "ape");
    game.add.existing(ape);

    game.physics.enable(ape);

    game.physics.arcade.gravity.y = gravity;

    ape.body.bounce.y = 0.05;
    ape.body.linearDamping = 0;
    ape.body.collideWorldBounds = true;

    game.camera.follow(ape);

    cursors = game.input.keyboard.createCursorKeys();

    ape.inputEnabled = true;
    ape.input.useHandCursor = true; //if you want a hand cursor
    ape.events.onInputDown.add(yourFunction, this);

    function yourFunction(event, sprite)
    {
        ape.body.velocity.y -= 200;
    }

}

function update() {

    game.physics.arcade.collide(ape, layer1);

    move(ape);

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

    if (cursors.left.isDown && cursors.right.isDown && !cursors.up.isDown) {
        ape.stop();
    } 
}
