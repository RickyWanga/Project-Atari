
const SCL = 5; // SCALA PIXEL DI OGNI RIQUADRO

var player1, player2;
var p1=prompt("Inserire il nome del Giocatore 1 : ");
var p2=prompt("Inserire il nome del Giocatore 2 : ");

function setup() {
  createCanvas(500, 500);

  frameRate(25);

	/* INIZIALIZZAZIONE GIOCATORI */
  player1 = new Bike(50 / SCL, height / 2 / SCL, 1, 0, color("#40E0D0"));
  player2 = new Bike((width - 50) / SCL, height / 2 / SCL, -1, 0, color("#FFA022"));
}

function draw() {
  background(51);

	handlePlayers();
}


// GESTISCE L'INPUT DEI GIOCATORI
//PLAYER 1 = W, A, S, & D          
//PLAYER 2 = UP, LEFT, DOWN, & RIGHT
 
function keyPressed() {

  switch (keyCode) {
    /*TASTI FRECCIA*/
    case 37:
      player2.setVelocity(createVector(-1, 0));
      break;

    case 38:
      player2.setVelocity(createVector(0, -1));
      break;

    case 39:
      player2.setVelocity(createVector(1, 0));
      break;

    case 40:
      player2.setVelocity(createVector(0, 1));
      break;
    /*TASTI WASD*/
    case 65:
      player1.setVelocity(createVector(-1, 0));
      break;

    case 87:
      player1.setVelocity(createVector(0, -1));
      break;

    case 68:
      player1.setVelocity(createVector(1, 0));
      break;

    case 83:
      player1.setVelocity(createVector(0, 1));
      break;

  }
}


/*FUNZIONI DI AGGIORNAMENTO, DISEGNO E CONTROLLO COLLISIONI*/

function handlePlayers() {

	/* AGGIORNA I GIOCATORI */
	player1.update();
	player2.update();

	/* DISEGNA I GIOCATORI */
	player1.draw();
	player2.draw();

	/* CONTROLLA COLLISIONE */
	if ((player1.collidesWith(player2.trail) && player2.collidesWith(player1.trail)) ||
		(player1.collidesWith(player1.trail) && player2.collidesWith(player2.trail)) ||
		(player1.collidesWithBounds() && player2.collidesWithBounds()))	{

		// ENTRAMBI I GIOCATORI MORTI ALLO STESSO TEMPO

		endGame("Pareggio! Premere F5 per ricominciare");
	} else if (player1.collidesWith(player2.trail) ||
		player1.collidesWithBounds() || player1.collidesWith(player1.trail)) {

		// SE IL GIOCATORE 1 COLPISCE IL GIOOCATORE 2 O IL LATO DELLO SCHERMO
		// O SE IL GIOCATORE 2 COLPISCE SE STESSO

		endGame(p2 + " VINCE! Premere F5 per ricominciare");
	} else if (player2.collidesWith(player1.trail) ||
		player2.collidesWithBounds() || player2.collidesWith(player2.trail)) {

		// SE IL GIOCATORE COLPISCE IL GIOCATORE 1 O IL LATO DELLO SCHERMO
		// O SE IL GIOCATORE 1 COLPISCE SE STESSO

		endGame(p1 + " VINCE! Premere F5 per ricominciare");
	}
}

//FINE GIOCO E COMUNICA IL VINCITORE
function endGame(winner) {
  noStroke();
  textAlign(CENTER);
  textSize(42);
  fill(255);
  text(winner, 12, 200, 480, 250);
  noLoop();

}
