var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('mario', 'js/game/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'js/game/super_mario.png');
    game.load.image('player', 'js/game/phaser-dude.png');


}

var gravity = 700;
var gravityDecrease = 30;
var jumpPower = 500;

var map;
var tileset;
var layer;
var p;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('mario');

    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    //  14 = ? block
    map.setCollisionBetween(14, 15);

    map.setCollisionBetween(15, 16);
    map.setCollisionBetween(20, 25);
    map.setCollisionBetween(27, 29);
    map.setCollision(40);
    
    layer = map.createLayer('World1');

    // Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();

    p = game.add.sprite(32, 32, 'player');

    game.physics.enable(p);

    game.physics.arcade.gravity.y = gravity;

    p.body.bounce.y = 0.05;
    p.body.linearDamping = 0;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();

    p.inputEnabled = true;
	p.input.useHandCursor = true; //if you want a hand cursor
	p.events.onInputDown.add(yourFunction, this);

	function yourFunction(event, sprite)
	{
		p.body.velocity.y -= 200;
	}

}

function update() {

    game.physics.arcade.collide(p, layer);

    p.body.velocity.x = 0;

    if (cursors.up.isDown) {
        if (p.body.onFloor()) {
            p.body.velocity.y = -jumpPower;
        } else{
            game.physics.arcade.gravity.y = gravity - gravityDecrease;
        }
    }
    else{
        game.physics.arcade.gravity.y = gravity;
    }
    if (cursors.down.isDown && !p.body.onFloor()) {
        p.body.velocity.y += gravityDecrease;
    }

    if (cursors.left.isDown) {
        p.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        p.body.velocity.x = 150;
    }

}

function render() {

    // game.debug.body(p);
    // game.debug.bodyInfo(p, 32, 320);

}