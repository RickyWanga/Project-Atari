
var paddle;
var ball;

var blocks = []; 				// I BLOCCHI SULLO SCHERMO
var staticBlocks = []; 	// I BLOCCHI AI BORDI

var score;

function setup() {
  createCanvas(600, 400);

	ball = new Ball(width / 2, height / 2, random(-3, 3), random(2, 4), 10);

  paddle = new Block(width / 2 - 50, height - 40, 100, 10, "#FFFFF");

  populateBlocks(5, 5);

  score = 0;

  textSize(20);
  textAlign(CENTER);
  noStroke();
}

function draw() {

  background(51);

	/* CONTROOLLA PER LA VITTORIA */
  if (score === blocks.length)
    endGame(true);

	drawGame();
	handleKeys();

  /* GESTICE I MOVIMENTI */
	paddle.update();
	ball.update(blocks, staticBlocks, paddle);

	handleKeys();
}

/**
	* GESTISCE L'INPUT DELL'UTENTE
	*/
function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {

    paddle.move(-2);
  } else if (keyIsDown(RIGHT_ARROW)) {

    paddle.move(2);
  }
}

/**
	* DISEGNA IL PUNTEGGIO, LA PALLA , I BLOCCHI E IL PADDLE
	*/
function drawGame() {

  fill(255);
  text(score, 50, height - 50); // DISEGNA IL PUNTEGGIO

	paddle.draw(); // DISEGNA IL GIOCATORE
	ball.draw(); // DISEGNA LA PALLA

  for (var i = 0; i < blocks.length; i++) {
    /* DISEGNA I BLOCCHI */

    if (blocks[i].intact)
			blocks[i].draw();
  }

}

/**
	* FINE DEL GIOCO
	*/
function endGame(won) {

  fill(255);
  textSize(50);

  if (won) {
    text("You win!", width / 2, height / 2);
  } else {
    text("You lose!", width / 2, height / 2);
  }

  textSize(30);
  text("Press f5 to restart!", width / 2, height / 2 - 40);

  noLoop();
}

/**
	* RIEMPE LO SCHERMO CON I BLOCCHI
	*/
function populateBlocks(rows, cols) {

  blocks = [];

	var padding = 5; // SPAZIO TRAI BLOCCHI
  var w = (width / cols) - (padding * 2);
  var h = 10;

  var offset = (width - (w + padding) * cols) / 2;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {

      var x = (col * w) + (col * padding) + offset;
      var y = (row * h) + (row * padding);
      blocks.push(new Block(x, y, w, h, color(random(255), 0, random(255))));
    }
  }
}
