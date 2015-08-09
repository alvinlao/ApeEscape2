function LaserTrap() {
    Trap.call(this);
}

LaserTrap.prototype = Object.create(Trap.prototype);
LaserTrap.constructor = LaserTrap;
