function PlayState(game) {
    State.call(this, game);

    this.create = function() {
        game.state.start("level1");
    }

}

PlayState.prototype = Object.create(State.prototype);
PlayState.constructor = PlayState;
