function BootState() {
    State.call(this);

    this.preload = function () {
        console.log("Boot: preload");

        this.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.input.maxPointers = 1;
    }

    this.create = function () {
        console.log("Boot: create");

        this.state.start("load");
    }
}

BootState.prototype = Object.create(State.prototype);
BootState.constructor = BootState;
