function Jailer() {
    Entity.call(this, game, x, y, key);
}

Jailer.prototype = Object.create(Entity.prototype);
Jailer.constructor = Jailer;
