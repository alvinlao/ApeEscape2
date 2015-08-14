function FlameTrap(game, x, y, key) {
    Trap.call(this, game, x, y, key);

    this.animations.add("ignite", [0, 1, 2, 3], 20);

    this.deploy = function(){
	    game.physics.arcade.enable(this);
	    this.body.moves = false;
        this.animations.play("ignite", 20, true);
    }
}

FlameTrap.prototype = Object.create(Trap.prototype);
FlameTrap.constructor = FlameTrap;


function FlameTrapActivator(game, x, y, key) {
	TrapActivator.call(this, game, x, y, key);
}

FlameTrapActivator.prototype = Object.create(TrapActivator.prototype);
FlameTrapActivator.constructor = FlameTrapActivator;