function Trap(game, x, y, key) {
    Entity.call(this, game, x, y, key);

    this.expiryTime = -1;
    this.remainingClicks = 0;
    this.isActive = false;

    this.effect = function() {
    	ape.kill();
    }

    this.deploy = function() {
	    game.physics.arcade.enable(this);
	    this.body.moves = false;
    }
}

Trap.prototype = Object.create(Entity.prototype);
Trap.constructor = Trap;


function TrapActivator(game, x, y, key) {
    Entity.call(this, game, x, y, key);

    this.remainingClicks = -1;

    this.inputEnabled = true;
    this.input.useHandCursor = true;

    
}

TrapActivator.prototype = Object.create(Entity.prototype);
TrapActivator.constructor = TrapActivator;