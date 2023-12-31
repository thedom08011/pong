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

 // verifier que la balle a bien touché la raquette
 if (balle.x < raquette1.x + raquette1.width &&
    balle.x + balle.width > raquette1.x &&
    balle.y < raquette1.y + raquette1.height &&
    balle.y + balle.height > raquette1.y) {
    // Collision détectée, changer la direction de la balle
    balle.vx = -balle.vx;
}
}

// Génère un nombre aléatoire entre -2 et 2
function randomVerticalSpeed() {
    return Math.random() * 4 - 2; // Cette formule donne un nombre entre -2 et 2
}


//redessiner les canvas après que la balle est traversé un de murs
function restartGame() {
    // Si la balle a dépassé le mur de droite
    if (balle.x + balle.width > canvas.width) {
        // Réinitialiser la position de la balle à droite de la ligne médiane
        balle.x = canvas.width / 2 + balle.width; // Juste à droite de la ligne médiane
        balle.y = canvas.height / 2; // Au milieu verticalement
        balle.vx = -4; // Faire en sorte que la balle se déplace vers la gauche
        balle.vy = randomVerticalSpeed(); // Réinitialiser le mouvement vertical
        scorePlayer1 += 1;
        console.log("score joueur1 + 1");
    }

    // Si la balle a dépassé le mur de gauche
    if (balle.x < 0) {
        // Réinitialiser la position de la balle à gauche, près de la ligne médiane
        balle.x = canvas.width / 2 - balle.width; // Juste à gauche de la ligne médiane
        balle.y = canvas.height / 2; // Au milieu verticalement
        balle.vx = 4; // Faire en sorte que la balle se déplace vers la droite
        balle.vy = randomVerticalSpeed(); // Réinitialiser le mouvement vertical
        scorePlayer2 += 1;
        console.log("score IA + 1");
    }

    // Redessiner les éléments du jeu 
    dessinTerrain();
    dessinerBalle();
    dessinerRaquette();
    dessinerRaquetteIA(); 
    //dessinerScore() 
}

// quand la balle passe le mur gauche ou droite. une seconde passe avant que la partie reprend
function waitTime() {
    if (balle.x + balle.width > canvas.width || balle.x < 0) {
        // Planifiez le redémarrage du jeu après un délai
        setTimeout(restartGame, 1000);
    }
}


function winnerGame(){
if (scorePlayer1 === 5){
    alert("Vous avez gagné " + scorePlayer1 + " à " + scorePlayer2 );
    return true;
}
if (scorePlayer2 === 5){
    alert("l'IA a gagné " + scorePlayer2 + " à " + scorePlayer1);
    return true;
}
    return false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    if (winnerGame()){
        setTimeout(resetGame,2000);
        return;
    }
    
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

function resetGame(){
    scorePlayer1 = 0; // Initialiser le score du joueur 1
    scorePlayer2 = 0; // Initialiser le score du joueur 2

    raquette1.x = 50;
    raquette1.y = (canvas.height - 100) / 2,
    raquetteIA.x = 650;
    raquetteIA.y = (canvas.height - 100) /2;


     // Réinitialiser la balle à son état initial
     balle.x = canvas.width / 2;
     balle.y = canvas.height / 2;
     balle.vx = 4; // Vitesse initiale sur l'axe x
     balle.vy = 4; // Vitesse initiale sur l'axe y

    updateRaquetteIA;
    dessinTerrain();
    dessinerBalle();
    dessinerRaquette();
    dessinerRaquetteIA(); 
    gameLoop();
}





