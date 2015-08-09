function FallingPlatformTrap() {
    Trap.call(this);
}

FallingPlatformTrap.prototype = Object.create(Trap.prototype);
FallingPlatformTrap.constructor = FallingPlatformTrap;
