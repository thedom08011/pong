var canvas = document.getElementById('monCanvas');
var ctx = canvas.getContext('2d');

var scorePlayer1 = 0; // Initialiser le score du joueur 1
var scorePlayer2 = 0; // Initialiser le score du joueur 2

// raquette gauche
var raquetteWidth1 = 10;
var raquetteHeight1 = 100;
var raquetteX = 50; // Position x de la raquette
var raquetteY = (canvas.height - raquetteHeight1) / 2; // Position y de la raquette, centrée sur le canvas

//raquette droite
var raquetteWidth2 = 10;
var raquetteHeight2 = 100;
var raquetteX2 = 650;
var raquetteY2 =  (canvas.height - raquetteHeight2) / 2;

var milieuX = canvas.width / 2;  // déterminer le point médian horizontal l'axe X


ctx.fillStyle = 'white'; // Définir la couleur de la raquette
ctx.fillRect(raquetteX, raquetteY, raquetteWidth1, raquetteHeight1);
ctx.fillRect(raquetteX2, raquetteY2, raquetteWidth2, raquetteHeight2);


ctx.font = '30px Arial'; // Taille et type de police
ctx.fillStyle = 'white'; // Couleur du texte
ctx.textAlign = 'center'; // Alignement du texte

ctx.fillText(scorePlayer1, canvas.width / 4, 50); // Pour le joueur 1
ctx.fillText(scorePlayer2, (canvas.width / 4) * 3, 50); // Pour le joueur 2


// Définir le motif de pointillés
ctx.setLineDash([20, 20]); // Par exemple, 5 pixels de ligne, 15 pixels d'espace

// Dessiner une ligne verticale
ctx.beginPath();
ctx.moveTo(milieuX, 0); // Départ du haut du canvas
ctx.lineTo(milieuX, canvas.height); // Jusqu'au bas du canvas
ctx.strokeStyle = 'white'; // Couleur de la ligne
ctx.lineWidth = 10; // Largeur de la ligne
ctx.stroke();