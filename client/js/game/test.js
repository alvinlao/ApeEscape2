var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('level1', 'js/game/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'js/game/tilesheet.png');
    game.load.image('player', 'js/game/phaser-dude.png');


}

var gravity = 2000;
var gravityDecrease = 1000;
var jumpPower = 700;

var map;
var tileset;
var layer1;
var layer2;
var layer3;
var ape;
var cursors;

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

    ape = game.add.sprite(19, 1000, 'player');


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

    ape.body.velocity.x = 0;

    if (cursors.up.isDown) {
        if (ape.body.onFloor()) {
            ape.body.velocity.y = -jumpPower;
        } else{
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
        ape.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        ape.body.velocity.x = 150;
    }

}

function render() {

    // game.debug.body(ape);
    // game.debug.bodyInfo(ape, 32, 320);

}