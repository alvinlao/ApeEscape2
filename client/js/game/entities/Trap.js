function Trap(game, x, y, key) {
    Entity.call(this, game, x, y, key);

    this.expiryTime = 0;
    this.remainingClicks = 0;
    this.isActive = false;
}

Trap.prototype = Object.create(Entity.prototype);
Trap.constructor = Trap;
