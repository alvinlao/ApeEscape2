function FallingPlatformTrap(game, x, y, key) {
    Trap.call(this, game, x, y, key);
}

FallingPlatformTrap.prototype = Object.create(Trap.prototype);
FallingPlatformTrap.constructor = FallingPlatformTrap;

function FallingPlatformTrapActivator(game, x, y, key) {
	TrapActivator.call(this, game, x, y, key);
}

FallingPlatformTrapActivator.prototype = Object.create(TrapActivator.prototype);
FallingPlatformTrapActivator.constructor = FallingPlatformTrapActivator;