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
	ape.events.onInputDown.add(destroy, this);

	function destroy (event, sprite) {
		event.kill();
	}

    // Diamond
    diamond = game.add.sprite(800, 100, 'diamond');

    game.physics.arcade.enable(diamond);
    diamond.body.allowGravity = false;
    diamond.body.collideWorldBounds = true;

}

function getDiamond (ape, diamond) {
    var scale = 2;

    game.stage.backgroundColor = '#000000';
    diamond.kill();

    ape.scale.set(scale);

}

function jumpControlGet (ape, powerUp) {
    powerUp.kill();

    gravityDecrease = 1000;
}

function die (ape, trap) {
    ape.kill();
}