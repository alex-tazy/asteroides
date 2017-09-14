/**
 * Variables globales du jeu
 */
var canvas = document.querySelector('#game'); // Récupération de l'élément DOM <canvas>
var context = canvas.getContext('2d'); // Récupération du contexte de dessin (stylo permettant d'écrire sur le Canvas HTML5)
var graphics; // Contiendra les informations sur les images chargées en phase d'initialisation
var joueur; // Contiendra le joueur
var clavier; // Contiendra les informations sur les états des touches clavier utiles pour le jeu
var lasers; // Contiendra le gestionnaire de lasers
// Création des sons (via la librairie Howler.js)
var sons = {
  laser     : new Howl({ urls: ['sons/laser.mp3', 'sons/laser.ogg'] }),
  asteroide : new Howl({ urls: ['sons/explosion_asteroid.mp3', 'sons/explosion_asteroid.ogg'] }),
  dommage   : new Howl({ urls: ['sons/dommage.mp3', 'sons/dommage.ogg'] })
};
var asteroides; // Contiendra le gestionnaire d'astéroïdes
var gui; // Contiendra le gestionnaire d'interface
var gameover = false; // Etat du game over

function init() {
  /** INITIALISATION DU JEU **/
  chargerImages(
    [
      'img/vaisseau.png',
      'img/laser.png',
      'img/asteroide.png'
    ],
    function (imagesInfos) {
      // Récupération des images chargées et stockage dans une variable globale appelée : 'graphics'
      graphics = imagesInfos;

      // Adapte le canvas à la taille de l'écran
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Création d'un gestionnaire de lasers
      lasers = new Lasers();

      // Création d'un nouveau joueur
      joueur = new Joueur(canvas.width/2, canvas.height/2, 0, 10); // (x, y, direction, vitesse)

      // Creation d'un gestionnaire d'astéroïdes
      asteroides = new Asteroides();

      // Création d'un gestionnaire d'interface
      gui = new GUI();

      gameloop(); // Lancement de la game loop
    }
  ); // fin de 'chargerImages()'
}

function update() {
  /** ICI SERONT PLACÉES TOUTES LES PHASES DE CALCUL DE POSITIONS ... ETC **/
  if (!gameover) {
    joueur.update();
    lasers.update();
    asteroides.update();
  }
}

function render() {
  /** ICI SERONT PLACÉES TOUTES LES PHASES DE DESSIN SUR LE CANVAS **/
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameover) {
    joueur.render();
    lasers.render();
    asteroides.render();
  }

  gui.render();
  if (gameover)
    gui.renderGameOver();
}

// Boucle de jeu principale => tourne indéfiniment à environ 60fps grâce à requestAnimationFrame()
function gameloop() {
  requestAnimationFrame(gameloop);
  update();
  render();
}

// Point d'entrée du jeu : Lancement de la phase d'initialisation
init();
