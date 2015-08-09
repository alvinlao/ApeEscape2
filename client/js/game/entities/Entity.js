function Entity() {
    Phaser.Sprite.call(this);
}

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.constructor = Entity;
