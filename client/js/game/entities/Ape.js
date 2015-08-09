function Ape() {
	this.position = {x: 0, y: 0};
	this.velocity = {x: 0, y: 0};
	this.powerUps = [];
}

Ape.prototype = Entity;
