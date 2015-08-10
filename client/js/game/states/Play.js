function Play(game) {
    State.call(this, game);
}

Play.prototype = Object.create(State.prototype);
Play.constructor = Play;
