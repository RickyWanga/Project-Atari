function Quadrato(x, y, Dim, colore, giocatore, velocita) {

  this.position = createVector(x, y);

	this.velocita = velocita;

  this.vel = this.setvel(this.position, giocatore);

  this.Dim = Dim; // dimensions
  this.colore = colore;
}

Quadrato.prototype.update = function(X) {

  this.position.add(this.vel);

  if (X) {
    this.vel.x *= 0.5;
    this.vel.y *= 0.5;
  }
};

Quadrato.prototype.draw = function() {

  fill(this.colore);
  stroke(255);
  strokeWeight(3);

  rect(this.position.x, this.position.y, this.Dim, this.Dim);
};

Quadrato.prototype.isOffscreen = function() {

  return (this.position.x < 0 || this.position.x + this.Dim > width ||
      this.position.y < 0 || this.position.y + this.Dim > height);
}

Quadrato.prototype.collidesWith = function(Quadrato) {

	// Calcolo la posizione del quadrato
  var cX = this.position.x + this.Dim / 2;
  var cY = this.position.y + this.Dim / 2;
	var center = createVector(cX, cY); // Calcolo il centro del quadrato

	var rX = Quadrato.position.x + Quadrato.Dim;
	var rY = Quadrato.position.y + Quadrato.Dim;
	var rightBound = createVector(rX, rY);

  return !(center.x < Quadrato.position.x || center.x > rightBound.x ||
      center.y < Quadrato.position.y || center.y > rightBound.y);
};

Quadrato.prototype.move = function(xAcceleration, yAcceleration) {

  this.vel.add(createVector(xAcceleration, yAcceleration));
};


Quadrato.prototype.setvel = function(vel1, vel2) {

	if (vel1 != null && vel2 != null) {
		// both vectors exist

		// point vel1 toward vel2
		var vel = createVector(vel2.x - vel1.x, vel2.y - vel1.y);
		vel.setMag(this.velocita); // limit the velocita

		return vel;
	}

	return createVector(1, 0);
}
