function Load(game) {
    State.call(this, game);
}

Load.prototype = Object.create(State.prototype);
Load.constructor = Load;
