
const INITIAL_BALL_SPEED = 3;
const BALL_RADIUS = 20;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

var player1Position, player2Position;
var player1Velocity, player2Velocity;
var player1Score, player2Score;

var ball, ballVelocity;

function setup() {

  createCanvas(600, 400);

  player1Position = player2Position = height / 2 - 50; // INIZIALIZZA LA POSIZIONE DEL GIOCATORE IN MEZZO ALLO SCHERMO

  player1Velocity = player2Velocity = 0;
  player1Score = player2Score = 0;

  ball = createVector(width / 2, height / 2); // INIZILIZZA LA PALLA NEL CENTRO
  ballVelocity = createVector(random(-1, 1), random(-1, 1)); // DA ALLA PALLA UNA TRAIETTORIA RANDOM
  ballVelocity.setMag(INITIAL_BALL_SPEED); // SETTO LA VELOCITA' DELLA PALLA A 3

  textAlign(CENTER);
  textSize(30);
  fill(255);
}

function draw() {

  background(51);

  /* DISEGNO I PADDLE */
  rect(PADDLE_WIDTH * 2, player1Position, PADDLE_WIDTH, PADDLE_HEIGHT);
  rect(width - (PADDLE_WIDTH * 3), player2Position, PADDLE_WIDTH, PADDLE_HEIGHT);

  /* DISEGNO LA PALLA */
  ellipse(ball.x, ball.y, BALL_RADIUS);

  /* DISEGNO LO SCOREBOARD */
  text(player1Score + "  |  " + player2Score, width / 2, 50);

  handlePaddles();

  handleBall();
}

function handleBall() {

  ball.x += ballVelocity.x;
  ball.y += ballVelocity.y;

  /* COLLISIONI SUPERIORI ED INFERIORI */
  if (ball.y > height || ball.y < 0)
    ballVelocity.y *= -1; // INVERTE LA VELOCITA' Y

  /* COLLISIONE CON I PADDLE */
  if (ball.x <= PADDLE_WIDTH * 3) { // DENTRO LA PARTE SINISTRA

    if (ball.x <= PADDLE_WIDTH) { // FUORI DAI LIMITI

      player2Score++;
      reset();
      return;
    }

    // CONTROLLO COLLISIONE CON IL PADDLE DI SINISTRA
    if (ball.y > player1Position && ball.y < player1Position + PADDLE_HEIGHT) {

      if (ballVelocity.x < 0) { //PREVIENE LA PALLA DI RIMANARE INCASTRATA

        ballVelocity.x *= -1;
        ballVelocity.mult(random(1, 1.1));
      }
    }

  } else if (ball.x >= width - (PADDLE_WIDTH * 3)) { // PADDLE DESTRO

    if (ball.x >= width - PADDLE_WIDTH) { // FUORI DAI LIMITI

      player1Score++;
      reset();
      return;
    }

    // CONTROLLO COLLISIONI CON IL PADDLE DESTRO
    if (ball.y > player2Position && ball.y < player2Position + PADDLE_HEIGHT) {

      if (ballVelocity.x > 0) { // PREVIENE LA PALLA DI RIMANERE INCASTRATA

        ballVelocity.x *= -1;
        ballVelocity.mult(random(1, 1.1));
      }
    }

  }

}

function reset() {

  ballVelocity.setMag(INITIAL_BALL_SPEED); // SETTO ALLA VELOCITA' DI DEFAULT
  ball = createVector(width / 2, height / 2); // CENTRO
}

function handlePaddles() {

  /* CONTROLLI GIOCATORE 1 */
  if (keyIsDown(87)) {
    /* SOPRA */

    player1Velocity -= 5;
  } else if (keyIsDown(83)) {
    /* SOTTO */

    player1Velocity += 5;
  }

  /* CONTROLLI GIOCATORE 2 */
  if (keyIsDown(UP_ARROW)) {
    /* SOPRA */

    player2Velocity -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    /* SOTTO */

    player2Velocity += 5;
  }

	/* CAMBIA POSIZIONE */
  player1Position += player1Velocity;
  player2Position += player2Velocity;

  /* FRIZIONE */
  player1Velocity *= 0.4;
  player2Velocity *= 0.4;

  /* LIMITA LA POSIZIONE DEI PADDLE ALL'INTERNO DELLO SCHERMO */
  player1Position = constrain(player1Position, 0, height - PADDLE_HEIGHT);
  player2Position = constrain(player2Position, 0, height - PADDLE_HEIGHT);
}
