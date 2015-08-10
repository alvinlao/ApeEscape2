function PlayState(game) {
    State.call(this, game);

    this.ape;
    this.map;
    this.currentStage;
    this.layer1;
    this.layer2;
    this.layer3;
    this.cursors;

    this.create = function() {
        State.create.call(this);
    }

    this.update = function() {
        State.update.call(this);

        /*
        this.game.physics.arcade.collide(ape, layer1);
        move(ape);
        checkTraps(activeTraps);
        */
    }
}

PlayState.prototype = Object.create(State.prototype);
PlayState.constructor = PlayState;
