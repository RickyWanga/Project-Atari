function Ball(x, y, xVelocity, yVelocity, radius) {

	this.position = createVector(x, y);
	this.velocity = createVector(xVelocity, yVelocity);

	this.radius = radius;
}

Ball.prototype.draw = function() {

  fill("#999");
  ellipse(this.position.x, this.position.y, this.radius * 2);
};

Ball.prototype.update = function(blocks, staticBlocks, paddle) {

	this.position.add(this.velocity); // SI MUOVE

	/* CONTROLLA LE COLLISIONI DEI BLOCCHI SULLO SCHERMO */
	var rebound = null;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].intact) { // SE NON è SULLO SCHERMO

			rebound = this.collidesWith(blocks[i]);

      if (rebound.collision) {

        blocks[i].intact = false; // TOGLIE IL BLOCCO DALLO SCHERMO
				score++;
        break; // NIENTE PIU' LOOP
      }
    }
	}

	/* CONTROLLA LA COLLISIONE CON IL PADDLE */
	if (rebound == null || !rebound.collision)
		rebound = ball.collidesWith(paddle);

	/* CONTROLLA LA COLLISIONE DEI BLOCCHI STATICI */
	if (rebound == null || !rebound.collision)
		for (var j = 0; j < staticBlocks.length; j++) {

			rebound = this.collidesWith(staticBlocks[j]);
		}

	if (rebound != null && rebound.collision) {
		// RIMBALZO DELLA PALLA

		this.velocity.x *= rebound.velocityChange.x;
		this.velocity.y *= rebound.velocityChange.y;
	} else {
		// CONTROLLA LA COLLISIONE

		if (this.position.x < 0 || this.position.x > width) // SE COLPISCE A SINISTRA O A DESTRA
			this.velocity.x *= -1;

		if (this.position.y < 0) // SE COLPISCE SOPRA
			this.velocity.y *= -1;
		else if (this.position.y > width) // SE PASSA SOTTO
			endGame(false);
	}
};

/**
	* RITORNA L'OGGETTO RIMBALZATO
	*/
Ball.prototype.collidesWith = function(block) {

	/* POSIZIONE SUCCESSIVA DELLA PALLA */
	var nextPosition = createVector(this.position.x + this.velocity.x,
		this.position.y + this.velocity.y);

	/* CONTROLLA IL PIANO Y */
	var upperYBlock = block.position.y;
	var upperYBound = block.position.y - this.radius;

	var lowerYBlock = block.position.y + block.height;
	var lowerYBound = block.position.y + block.height + this.radius;

	/* CALCOLA IL RIMBALZO */
	var withinTopBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= upperYBlock);
	var withinBottomBound = (nextPosition.y <= lowerYBound) && (nextPosition.y >= lowerYBlock);

	/* COLLIDE CON Y */
	var yBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= lowerYBound);

	/* check x plane */
	var leftXBlock = block.position.x;
	var leftXBound = block.position.x - this.radius;

	var rightXBlock = block.position.x + block.width;
	var rightXBound = block.position.x + block.width + this.radius;

	/* CALCOLA IL RIMBALZO */
	var withinLeftBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= leftXBlock);
	var withinRightBound = (nextPosition.x <= rightXBound) && (nextPosition.x >= rightXBlock);

	/* COLLIDE SU X */
	var xBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= rightXBound);

	var xChange = 1; // RIMBALZO X
	var yChange = 1; // RIMBALZO Y

	var collided = (xBound && yBound);

	if (collided) {
		/* COLLISIONE */

		xChange = (withinLeftBound || withinRightBound) ? -1 : 1;
		yChange = (withinTopBound || withinBottomBound) ? -1 : 1;

		this.velocity.mult(1.0175); // AUMENTO DELLA VELOCITA'
	}

	return {
		collision: collided,
		velocityChange: createVector(xChange, yChange)
	};
};
