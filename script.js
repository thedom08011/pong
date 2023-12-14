var canvas = document.getElementById('monCanvas');
var ctx = canvas.getContext('2d');

var scorePlayer1 = 0; // Initialiser le score du joueur 1
var scorePlayer2 = 0; // Initialiser le score du joueur 2

let isMovingUp = false;
let isMovingDown = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


/*-----------------------------dessin balle--------------------------------*/


var balle = {
    width : 10,
    height :10,
    x : 300,
    y: (canvas.height - 100) / 2,
    vx : 4, // vitesse initiale sur l'axe x
    vy : 4, // vitesse initiale sur l'axe y
    speedMax : 5 // vitesse maximale de la balle pour l'impact sur la raquette
}

function dessinerBalle(){
    ctx.fillStyle = 'white';
    ctx.fillRect(balle.x, balle.y, balle.width, balle.height);

}
//-----------------------------------------les raquettes -------------------------------------

var raquette1 = {
    width : 10,
    height : 100,
    x : 50,
    y : (canvas.height - 100) / 2, 
    speed :5,
    speedY : 0,
    maxSpeed : 4,
    }

    // sans la fonction et sans fillRect. la raquette n'apparait pas.
    function dessinerRaquette() {
        ctx.fillStyle = 'white'; // Choisissez la couleur de remplissage
        ctx.fillRect(raquette1.x, raquette1.y, raquette1.width, raquette1.height);
    }
    



var raquetteIA = {
    width : 10, 
    height : 100,
    x :650,
    y : (canvas.height - 100) /2,
 
}

function dessinerRaquetteIA(){
    ctx.fillStyle ='white';
    ctx.fillRect(raquetteIA.x, raquetteIA.y, raquetteIA.width, raquetteIA.height);
}



//---------------------------------- fin RAQUETTE --------------------------------


function updateBalle() {
    // Mise à jour de la position de la balle
    balle.x += balle.vx;
    balle.y += balle.vy;

    // Détection des collisions avec les bords du canvas
    if (balle.y + balle.height > canvas.height || balle.y < 0) {
        balle.vy *= -1; // Inverser la vitesse verticale
    }

    // Détection de collision avec la raquette
    if (balle.x > raquette1.x && 
        balle.x < raquette1.x + raquette1.width &&
        balle.y + balle.height > raquette1.y &&
        balle.y < raquette1.y + raquette1.height) {
        
        balle.vy = -balle.vy; // Inverser la direction verticale de la balle

        // Ajuster la vitesse horizontale en fonction de l'endroit où la balle frappe la raquette
        let impactPoint = (balle.x - (raquette1.x + raquette1.width / 2)) / (raquette1.width / 2);
        balle.vx = impactPoint * balle.speedMax;
    }

    // Détection de collision avec les bords gauche et droit
   /* if (balle.x + balle.width > canvas.width || balle.x < 0) {
        balle.vx *= -1; // Inverser la vitesse horizontale
    }*/
    if (balle.x > raquetteIA.x && 
        balle.x < raquetteIA.x + raquetteIA.width &&
        balle.y + balle.height > raquetteIA.y &&
        balle.y < raquetteIA.y + raquetteIA.height) {
        
        balle.vy = -balle.vy; // Inverser la direction verticale de la balle

        // Ajuster la vitesse horizontale en fonction de l'endroit où la balle frappe la raquette
        let impactPoint = (balle.x - (raquetteIA.x + raquetteIA.width / 2)) / (raquetteIA.width / 2);
        balle.vx = impactPoint * balle.speedMax;
    }

    // Dans votre fonction de détection de collision avec la raquette
if (balle.x > raquette1.x && 
    balle.x < raquette1.x + raquette1.width &&
    balle.y + balle.height > raquette1.y &&
    balle.y < raquette1.y + raquette1.height) {

    // Inverser la direction verticale de la balle
    balle.vy = -balle.vy;

    // Ajuster la direction en fonction de l'endroit où la balle frappe la raquette
    let impactPoint = (balle.y + (balle.height / 2)) - (raquette1.y + (raquette1.height / 2));
    let normalisedImpactPoint = impactPoint / (raquette1.height / 2);
    let bounceAngle = normalisedImpactPoint * Math.PI / 4; // Angle de rebond maximum de 45 degrés

    // Ajuster la vitesse verticale et horizontale en fonction de l'angle de rebond
    balle.vx = balle.speedMax * Math.sin(bounceAngle);
    balle.vy = balle.speedMax * Math.cos(bounceAngle) * Math.sign(balle.vy);
}

}

// Appelez la fonction updateBalle dans votre boucle de jeu

/*--------------------------------------------------------------------------------*/

function updateRaquetteIA() {
    var centerRaquetteIA = raquetteIA.y + raquetteIA.height / 2;
    var speedIA = 3; // Ajustez pour modifier la difficulté

    if (centerRaquetteIA < balle.y) {
        raquetteIA.y += Math.min(speedIA, balle.y - centerRaquetteIA);
    } else {
        raquetteIA.y -= Math.min(speedIA, centerRaquetteIA - balle.y);
    }

    // Empêcher la raquette IA de sortir du canvas
    raquetteIA.y = Math.max(0, Math.min(canvas.height - raquetteIA.height, raquetteIA.y));

 
}

/*-------------------------------- Inclure updateRaquetteIA dans la boucle de jeu-------------------------*/




var milieuX = canvas.width / 2;  // déterminer le point médian horizontal l'axe X



function dessinTerrain(){
    ctx.setLineDash([20, 20]); // Par exemple, 5 pixels de ligne, 15 pixels d'espace

    // Dessiner une ligne verticale
    ctx.beginPath();
    ctx.moveTo(milieuX, 0); // Départ du haut du canvas
    ctx.lineTo(milieuX, canvas.height); // Jusqu'au bas du canvas
    ctx.strokeStyle = 'white'; // Couleur de la ligne
    ctx.lineWidth = 10; // Largeur de la ligne
    ctx.stroke();
}


function dessinerScore(){
    ctx.font = '30px Arial'; // Taille et type de police
    ctx.fillStyle = 'white'; // Couleur du texte
    ctx.textAlign = 'center'; // Alignement du texte
    
    ctx.fillText(scorePlayer1, canvas.width / 4, 50); // Pour le joueur 1
    ctx.fillText(scorePlayer2, (canvas.width / 4) * 3, 50); // Pour le joueur 2
}

// Function to handle key presses
function keyDownHandler(e) {
    console.log(e.key);
if (e.key == "ArrowUp") {
    isMovingUp = true;
 } else if (e.key == "ArrowDown") {
    isMovingDown = true;
    }
}


// Function to handle key releases
 function keyUpHandler(e) {
 if (e.key == "ArrowUp") {
    isMovingUp = false;
 } else if (e.key == "ArrowDown") {
     isMovingDown = false;
    }
 }


 // Update the game state
function updateGame() {
if (isMovingUp && raquette1.y > 0) {
 raquette1.speedY = -1;
raquette1.y -= raquette1.speed;
 }
if (isMovingDown && raquette1.y < canvas.height - raquette1.height) {
raquette1.speedY = 1;
 raquette1.y += raquette1.speed;
 }
}

//redessiner les canvas après que la balle est traversé un de murs
function restartGame(){
    balle.x = canvas.width / 2; // Positionne la balle au centre du canvas
    balle.y = canvas.height / 2;
    balle.vx = 4; // Définit une vitesse initiale sur l'axe x
    balle.vy = 4; // Définit une vitesse initiale sur l'axe y  

    // redessiner les elements du jeu
    dessinTerrain();
    dessinerBalle();
    dessinerRaquette();
    dessinerRaquetteIA();  
    }

function waitTime() {
    if (balle.x + balle.width > canvas.width || balle.x < 0) {
        // Planifiez le redémarrage du jeu après un délai
        setTimeout(restartGame, 1000);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    updateGame();
    dessinerRaquette();
    dessinerRaquetteIA();
    dessinTerrain();
    dessinerScore();
    updateBalle();
    updateRaquetteIA()
    dessinerBalle();
    waitTime();
    requestAnimationFrame(gameLoop);
}

// Démarrer la boucle de jeu
gameLoop();

