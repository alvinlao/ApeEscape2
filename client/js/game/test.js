var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('mario', 'js/game/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'js/game/super_mario.png');
    game.load.image('player', 'js/game/phaser-dude.png');
    game.load.image('diamond', 'js/game/diamond.png');


}

var gravity = 2000;
var gravityDecrease = 1000;
var jumpPower = 700;

var map;
var tileset;
var layer;
var ape;
var jumpPowerUp;
var cursors;
var diamond;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('mario');

    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(20, 25);
    map.setCollisionBetween(27, 29);
    map.setCollision(40);
    
    layer = map.createLayer('World1');

    // Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();

    ape = game.add.sprite(32, 32, 'player');

    game.physics.enable(ape);

    game.physics.arcade.gravity.y = gravity;

    ape.body.bounce.y = 0.05;
    ape.body.linearDamping = 0;
    ape.body.collideWorldBounds = false;

    game.camera.follow(ape);

    cursors = game.input.keyboard.createCursorKeys();

    ape.inputEnabled = true;
	ape.input.useHandCursor = true; //if you want a hand cursor
	ape.events.onInputDown.add(yourFunction, this);

	function yourFunction(event, sprite)
	{
		ape.body.velocity.y -= 200;
	}

    //  Diamond
    diamond = game.add.sprite(200, game.world.height - 150, 'diamond');
    game.physics.arcade.enable(diamond);
    diamond.body.collideWorldBounds = true;

}

function getDiamond (ape, diamond) {
    var scale = 2;

    game.stage.backgroundColor = '#000000';
    diamond.kill();

    ape.scale.set(scale);

}

function update() {

    game.physics.arcade.collide(ape, layer);


    game.physics.arcade.collide(ape, diamond, getDiamond, null, this);


    ape.body.velocity.x = 0;

    if (cursors.up.isDown) {
        if (ape.body.onFloor()) {
            ape.body.velocity.y = -jumpPower;
        } else {
            game.physics.arcade.gravity.y = gravity - gravityDecrease;
        }
    }
    else{
        game.physics.arcade.gravity.y = gravity;
    }
    if (cursors.down.isDown && !ape.body.onFloor()) {
        game.physics.arcade.gravity.y = gravity + gravityDecrease;
    }

    if (cursors.left.isDown) {
        ape.body.velocity.x = -350;
    } else if (cursors.right.isDown) {
        ape.body.velocity.x = 350;
    }

}

function render() {

    // game.debug.body(ape);
    // game.debug.bodyInfo(ape, 32, 320);

}
