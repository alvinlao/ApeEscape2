var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var gravity = 2000;
var gravityDecrease = 1000;
var jumpPower = 700;

var map;
var tileset;
var layer1;
var layer2;
var layer3;
var ape;
var cursors;