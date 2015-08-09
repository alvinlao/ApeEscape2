function Ape() {
    Entity.call(this);

	this.position = {x: 0, y: 0};
	this.velocity = {x: 0, y: 0};
	this.powerUps = [];
}

Ape.prototype = Object.create(Entity.prototype);
Ape.constructor = Ape;
