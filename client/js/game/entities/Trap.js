function Trap() {
    Entity.call(this);

    this.remainingClicks = 0;
    this.isActive = false;
}

Trap.prototype = Object.create(Entity.prototype);
Trap.constructor = Trap;
