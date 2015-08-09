function SpikesTrap() {
    Trap.call(this);
}

SpikesTrap.prototype = Object.create(Trap.prototype);
SpikesTrap.constructor = SpikesTrap;
