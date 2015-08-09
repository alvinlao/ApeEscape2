function preload() {
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('level1', 'js/game/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'js/game/tilesheet.png');
    game.load.image('player', 'js/game/phaser-dude.png');


}