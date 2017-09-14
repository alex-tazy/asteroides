// Remplissage des valeurs par défaut de l'objet 'clavier'
clavier = {
  gauche : false,
  haut   : false,
  droite : false,
  bas    : false,
  espace : false
};

// Création des écouteurs d'évènement :
// - keydown => touche enfoncée
// - keyup   => touche relâchée
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(key) {
  if (key.keyCode === 37) { clavier.gauche = true; }
  if (key.keyCode === 38) { clavier.haut   = true; }
  if (key.keyCode === 39) { clavier.droite = true; }
  if (key.keyCode === 40) { clavier.bas    = true; }
  if (key.keyCode === 32) { clavier.espace = true; }
}

function keyUp(key) {
  if (key.keyCode === 37) { clavier.gauche = false; }
  if (key.keyCode === 38) { clavier.haut   = false; }
  if (key.keyCode === 39) { clavier.droite = false; }
  if (key.keyCode === 40) { clavier.bas    = false; }
  if (key.keyCode === 32) { clavier.espace = false; }
}