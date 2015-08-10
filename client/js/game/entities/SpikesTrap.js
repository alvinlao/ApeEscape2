function SpikesTrap(game, x, y, key) {
    Trap.call(this, game, x, y, key);
}

SpikesTrap.prototype = Object.create(Trap.prototype);
SpikesTrap.constructor = SpikesTrap;
