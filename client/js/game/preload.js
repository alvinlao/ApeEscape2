function preload() {
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('level1', 'js/game/levels/level1/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilesheet.png');
    game.load.image('player', 'assets/phaser-dude.png');

    //parseMap();
}