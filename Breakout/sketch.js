
var paddle;
var ball;
var scoretot = 0;
var blocks = [];
var staticBlocks = [];
var liv1=5;
var livello=1;
var score=0;

function setup() {
  createCanvas(800, 600);

	ball = new Ball(width / 2, height / 2, random(-4, 4), random(2, 4), 10);

  paddle = new Block(width / 2 -50, height - 40, 100, 10, "#FFFFFF");

  creablocchi(liv1,5);
  textAlign(CENTER);
}

function draw() {

  background(0);

	/* controlla vittoria*/
  if (score === blocks.length)
    endGame(true);

	drawGame();
	handleKeys();

  /* movimenti */
	paddle.update(ball); //?
	ball.update(blocks, staticBlocks, paddle);

	handleKeys();
}


	 //comandi

function handleKeys() {
  if (keyIsDown(LEFT_ARROW)) {
paddle.move(-2);
  } else if (keyIsDown(RIGHT_ARROW)) {
paddle.move(2);
  }
}
// punteggio palla blocchi paddle
function drawGame() {
  textSize(20);
  fill(255);
  text("score: " + scoretot, 50, height - 50);
  text("livello: " + livello,50, height - 70);

	paddle.draw();
	ball.draw();

  for (var i = 0; i < blocks.length; i++) {

    if (blocks[i].intact)
			blocks[i].draw();
  }

}
var vinto=true;

	 //finale

function endGame(vinto) {

  fill(255);
  textSize(30);
  var stringaVittoria="Hai finito il gioco";
  if (vinto) {
  //  text(stringaVittoria, width / 2, height / 2);
    livello++;
    if(livello===6)
    {
      delete Ball;
      delete Paddle;
      text(stringaVittoria, width / 2, height / 2);
      noLoop();
    }else{

    score=0;
    delete Ball;
    delete Paddle;
    setup();
    drawGame();
    creablocchi(liv1++,5);
    }
  } else {
    text("Hai perso ", width / 2, height / 2);
    textSize(20);
    text("Aggiorna la pagina per rincominciare", width / 2, height / 2 - 40);

  }
}

function creablocchi(rows, cols) {

  blocks = [];

	var padding = 10; // space between blocks
  var w = (width / cols) - (padding * 2);
  var h = 16;

  var Masx = (width - (w + padding) * cols) / 2;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {

      var x = (col * w) + (col * padding) + Masx;
      var y = (row * h) + (row * padding);
      blocks.push(new Block(x, y, w, h, color(random(255), random(255),255)));
    }
  }
}
