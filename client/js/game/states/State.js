function State() {
    Phaser.State.call(this);
}

State.prototype = Object.create(Phaser.State.prototype);
State.constructor = State;
