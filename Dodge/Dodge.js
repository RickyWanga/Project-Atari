var giocatore;
var proiettili = [];
var difficulty;
var difficolta; 

function setup() {

  createCanvas(600, 400); 

	do{
	difficolta = prompt("Inserisci la difficoltà. Tieni presente che più il valore è piccolo più sarà difficile.(5/50)");
	}while(difficolta < 1 || difficolta > 50);
	difficulty = 2;		//La velocità del giocatore.

	// inizializzo il giocatore
	giocatore = new Quadrato(width / 2, height / 2, 30 , color("#FFFFFF"), null, difficulty * 0.8);		//imposizioneizioneto la lunghezza, altezza, il colore,la posizione del giocatore, difficoltà 
	textAlign(CENTER);
	textSize(40);
}

// funzione di scrittura su schermo. Richiamo più funzioni.
function draw() {

  background(51);

    ControlloProiettili();
	ControlloGiocatore();
	Tasti();

	NuovoProiettile(frameCount);

  Punteggio();
}

function NuovoProiettile(frame) {

	if (frame % difficolta === 0) {
		// Il numero inserito nel prompt decide ogni quanto creare un proiettile.

    if (random(difficulty) > 1.25) {

			proiettili.push(GeneraQuad());
		}

		// Uscito dall' if incremento la velocità dei proietttili.
    difficulty += 0.05;
  }
}

function Tasti() {

	// giocatore è molto più veloce dei proiettili
	var velocita = difficulty * 0.8;

  if (keyIsDown(UP_ARROW))
    giocatore.move(0, -velocita);

	if (keyIsDown(DOWN_ARROW))
    giocatore.move(0, velocita);

  if (keyIsDown(LEFT_ARROW))
    giocatore.move(-velocita, 0);

  if (keyIsDown(RIGHT_ARROW))
    giocatore.move(velocita, 0);

}

function Punteggio() {

	noStroke();
	text(frameCount, width / 2, 60);
}

function ControlloProiettili() {

	for (var i = proiettili.length - 1; i >= 0; i--) {

    proiettili[i].update(false);
    proiettili[i].draw();

    if (proiettili[i].collidesWith(giocatore))
			//Controllo una eventuale collisione che porta alla fine del gioco
      endGame();

    if (proiettili[i].isOffscreen())
			// Quando un proiettile esce dallo schermo tolgo dall' array quest' ultimo.
      proiettili.splice(i, 1);

  }
}

function ControlloGiocatore() {

	giocatore.update(true);
	giocatore.draw();

  if (giocatore.isOffscreen()) {
    endGame();
  }
}

function endGame() {

  noLoop();
  textSize(70);
  fill(255);
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}

function GeneraQuad() {

  // Creo il quadrato del giocatore
  var plane = (random() > 0.5);		//plane e una booleana, true se è maggiore.

	//L' operatore ? restituisce 'random(width)' se plane è true, altrimenti restituisce '((random() > 0.5) ? 0 : width)'
  var x = (plane) ? random(width) : ((random() > 0.5) ? 0 : width);
  var y = (plane) ? ((random() > 0.5) ? 0 : height) : random(height);

  return new Quadrato(x, y, random(35), randomColor(), giocatore.position, difficulty);
}

function randomColor() {
  return color(random(255), random(255), random(255));
}
