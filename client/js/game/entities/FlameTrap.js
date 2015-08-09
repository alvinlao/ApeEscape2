function FlameTrap() {
    Trap.call(this);
}

FlameTrap.prototype = Object.create(Trap.prototype);
FlameTrap.constructor = FlameTrap;
