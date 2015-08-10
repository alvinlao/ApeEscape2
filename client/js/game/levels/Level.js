// Inherits from state
function Level() {
    State.call(this);

    this.create = function() {
        console.log("LEVEL: create");
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
        layer2.visible = false;
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

    this.update = function() {
        console.log("LEVEL: update");
        game.physics.arcade.collide(ape, layer1);
        move(ape);
        checkTraps(activeTraps);
    }
}

Level.prototype = Object.create(State.prototype);
Level.constructor = Level;
