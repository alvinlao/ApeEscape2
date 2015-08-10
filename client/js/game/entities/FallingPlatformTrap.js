function FallingPlatformTrap(game, x, y, key) {
    Trap.call(this, game, x, y, key);
}

FallingPlatformTrap.prototype = Object.create(Trap.prototype);
FallingPlatformTrap.constructor = FallingPlatformTrap;
