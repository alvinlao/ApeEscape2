function FlameTrap(game, x, y, key) {
    Trap.call(this, game, x, y, key);
}

FlameTrap.prototype = Object.create(Trap.prototype);
FlameTrap.constructor = FlameTrap;
