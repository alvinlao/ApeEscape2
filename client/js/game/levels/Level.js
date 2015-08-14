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

        map.setTileIndexCallback(6, die, this);
        
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

        if (player.role === ROLE_JAILER) {
            ape.anchor.setTo(0.5,1);
            ape.body.gravity = false;
            apeName = game.add.text(0, 0, "", { font: "12px Arial", fill: "#000000", align: "center" });

            console.log(traps);

            traps.forEach(function (trap) {
                            
                var width = currentStage.width;

                var dx = currentStage.tilewidth;
                var dy = currentStage.tileheight;

                var i = trap.index;
                var trapType = trap.type;

                var x = dx * (i % width);
                var y = dy * (Math.floor(i / width));

                var expiryTime = 90;

                var newTrap; 

                switch (trapType) {
                    case 8:
                        newTrap = new FlameTrapActivator(game, x, y, 'flameTrapActivator');                        
                        break;
                    case 9:
                        newTrap = new FallingPlatformTrapActivator(game, x, y, 'fallingPlatformTrapActivator');
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                        newTrap = new LaserTrapActivator(game, x, y, 'laserTrapActivator', trapType);
                        break;
                }
                if (newTrap) {
                    game.add.existing(newTrap);
                    trapActivators.push(newTrap);
                }
            });
        }

        game.camera.follow(ape);

        cursors = game.input.keyboard.createCursorKeys();
    }

    this.update = function() {
        console.log("LEVEL: update");
        game.physics.arcade.collide(ape, layer1);

        if (player.role === ROLE_APE){
           move(ape);
        } else if (player.role === ROLE_JAILER){
            ape.x = remoteApe.x;
            ape.y = remoteApe.y;
            ape.scale = remoteApe.scale;
            ape.frame = remoteApe.frame;

            var xPos = remoteApe.x;
            var yPos = remoteApe.y;
            var scale = remoteApe.scale;

            if(apeName) {
                apeName.text = remoteApe.name;
                var nameXPos = Math.floor(xPos + ape.width / 2) - ((scale.x === 1) ? ape.width : 0);
                apeName.x = nameXPos;
                apeName.y = yPos - 65;
            }
        }

        checkTraps(activeTraps);
    }
}

Level.prototype = Object.create(State.prototype);
Level.constructor = Level;
