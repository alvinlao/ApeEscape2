function Entity(game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
}

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.constructor = Entity;
