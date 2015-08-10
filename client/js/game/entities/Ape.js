function Ape(game, x, y, key) {
    Entity.call(this, game, x, y, key);
    var self = this;

	this.powerUps = [];

    // Setup animations
    // Frames 1 and 2
    this.animations.add("walk", [0, 1], 10);
    this.animations.add("stand", [2, 3], 10);
    this.animations.add("jump", [4, 5], 10);

    // Methods
    this.walk = function(speed) {
        this.anchor.setTo(.5, 1); //so it flips around its middle

        this.animations.play("walk", 10, true);

        this.body.velocity.x = speed;

        if (speed > 0) {
            // Right
            this.scale.x = 1;
        } else if (speed < 0) {
            // Left
            this.scale.x = -1;
        } else {
            this.stop();
        }
    }

    this.stop = function() {
        this.animations.play("stand", 10, true);
    }

    this.jump = function() {
        //this.animations.stop();
        this.animations.play("jump", 10, true);
    }
}

Ape.prototype = Object.create(Entity.prototype);
Ape.constructor = Ape;
