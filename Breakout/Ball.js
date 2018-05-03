function Ball(x, y, xVelocity, yVelocity, radius) {

	this.position = createVector(x, y);
	this.velocity = createVector(xVelocity, yVelocity);

	this.radius = radius;
}

Ball.prototype.draw = function() {


	var rand=255;
	fill(rand);


  ellipse(this.position.x, this.position.y, this.radius * 2);
};

Ball.prototype.update = function(blocks, staticBlocks, paddle) {

	this.position.add(this.velocity);

	/* controlla i rimbalzi sui blocchi ed eliminazione */
	var rebound = null;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].intact) { // se è stato eliminato

			rebound = this.collidesWith(blocks[i]);

      if (rebound.collision) {

        blocks[i].intact = false; //elimina blocchi
				score++;
				scoretot++;
        break;
      }
    }
	}

	/* collisioni del paddle*/
	if (rebound == null || !rebound.collision)
		rebound = ball.collidesWith(paddle);

	/* collisioni dei blocchi statici */
	if (rebound == null || !rebound.collision)
		for (var j = 0; j < staticBlocks.length; j++) {

			rebound = this.collidesWith(staticBlocks[j]);
		}

	if (rebound != null && rebound.collision) {
		// rimbalzo della palla

		this.velocity.x *= rebound.velocityChange.x;
		this.velocity.y *= rebound.velocityChange.y;
	} else {
		//controlla collisioni

		if (this.position.x < 0 || this.position.x > width) // collisione laterale d/s
			this.velocity.x *= -1;

		if (this.position.y < 0) // collisione alta
			this.velocity.y *= -1;
		else if (this.position.y > width) // altezza del blocco
			endGame(false);
	}
};

//restituisce oggetto di rimbalzo
Ball.prototype.collidesWith = function(block) {

	/* posizione prossima palla */
	var nextPosition = createVector(this.position.x + this.velocity.x,
		this.position.y + this.velocity.y);

	/* controlla y del piano */
	var upperYBlock = block.position.y; // lato alto del blocco
	var upperYBound = block.position.y - this.radius; //  lato alto del blocco rimbalzo

	var lowerYBlock = block.position.y + block.height; // block's bottom-most side
	var lowerYBound = block.position.y + block.height + this.radius; // block's bottom-most bound

	/* calcola rimbalzo */
	var withinTopBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= upperYBlock);
	var withinBottomBound = (nextPosition.y <= lowerYBound) && (nextPosition.y >= lowerYBlock);

	/* collisione y */
	var yBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= lowerYBound);

	/* controlla x del blocco */
	var leftXBlock = block.position.x; // lato sinistro
	var leftXBound = block.position.x - this.radius; // rimbalzo blocco sinistro

	var rightXBlock = block.position.x + block.width; // lato destro
	var rightXBound = block.position.x + block.width + this.radius; // lato destro rimbalzo

	/* calcola rimbalzo */
	var withinLeftBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= leftXBlock);
	var withinRightBound = (nextPosition.x <= rightXBound) && (nextPosition.x >= rightXBlock);

	/* rimbalza con x */
	var xBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= rightXBound);

	var xChange = 1; // rimbalzo X
	var yChange = 1; // rimbalzo Y

	var collided = (xBound && yBound);

	if (collided) {
		/* collisioni */

		xChange = (withinLeftBound || withinRightBound) ? -1 : 1;
		yChange = (withinTopBound || withinBottomBound) ? -1 : 1;

		this.velocity.mult(1.0175); //velocita+
	}

	return {
		collision: collided,
		velocityChange: createVector(xChange, yChange)
	};
};
