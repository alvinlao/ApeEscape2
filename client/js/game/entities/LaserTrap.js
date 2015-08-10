function LaserTrap(game, x, y, key) {
    Trap.call(this, game, x, y, key);
}

LaserTrap.prototype = Object.create(Trap.prototype);
LaserTrap.constructor = LaserTrap;
