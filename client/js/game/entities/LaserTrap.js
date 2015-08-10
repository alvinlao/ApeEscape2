function LaserTrap(game, x, y, key, direction) {
    Trap.call(this, game, x, y, key);

    this.direction = 'up';

    this.animations.add("blaze", [0, 1, 2, 3, 4, 5], 10);

    this.position.y -= 64;

    this.anchor.setTo(0.5, 1.1);

    switch (direction){
    	case 11:
    		this.direction = 'right';
    		this.rotation = Math.PI/2;
    		break;
    	case 12:
    		this.direction = 'left';
    		this.rotation = 3*Math.PI/2
    		break;
    	case 13:
    		this.direction = 'down';
    		this.rotation = Math.PI;
    		break;
    }

    this.deploy = function(){
	    game.physics.arcade.enable(this);
	    this.body.moves = false;
        this.animations.play("blaze", 10, true);
    }
}

LaserTrap.prototype = Object.create(Trap.prototype);
LaserTrap.constructor = LaserTrap;
