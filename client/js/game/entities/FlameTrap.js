function FlameTrap(game, x, y, key) {
    Trap.call(this, game, x, y, key);

    this.deploy = function(){
	    game.add.existing(this);
	    game.physics.arcade.enable(this);
	    this.body.moves = true;
    }
}

FlameTrap.prototype = Object.create(Trap.prototype);
FlameTrap.constructor = FlameTrap;
