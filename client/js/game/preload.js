function preload() { 
	game.stage.backgroundColor = '#85b5e1';

    game.load.tilemap('mario', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/super_mario.png');
    game.load.image('player', 'assets/phaser-dude.png');
    game.load.image('diamond', 'assets/diamond.png');
}