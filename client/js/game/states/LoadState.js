function LoadState() {
    State.call(this);

    this.preload = function () {
        console.log("Load: preload");
        this.game.load.tilemap('level1', 'js/game/levels/level1/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tilesheet.png');
        this.game.load.image('player', 'assets/phaser-dude.png');
        this.game.load.spritesheet("ape", "assets/ape_spritesheet.png", 50, 50, 6);
        this.game.load.spritesheet('flameTrap', 'assets/fire.png', 64, 64, 4);
        this.game.load.spritesheet('laserTrap', 'assets/beam.png', 64, 320, 6);
    }

    this.create = function () {
        console.log("Load: create");
        this.state.start("lobby");
    }
}

LoadState.prototype = Object.create(State.prototype);
LoadState.constructor = LoadState;
