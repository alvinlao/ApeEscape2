var gravity = 2000;
var gravityDecrease = 0;
var jumpPower = 800;

var map;
var tileset;
var layer;
var ape;
var cursors;
var diamond;
var trap;






var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });