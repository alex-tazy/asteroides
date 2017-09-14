/** FICHIER DE FONCTIONS UTILES POUR NOTRE JEU **/

// Pré-charge une liste de fichiers images et exécute une fonction de rappel (callback) lorsque toute la liste est chargée
function chargerImages(listeFichiers, quandToutEstCharge) {
  var nombreImagesChargees = 0,
      image,
      images = {};

  for (var i = 0; i < listeFichiers.length; i++) {
    image        = new Image();
    image.src    = listeFichiers[i];
    image.onload = onLoad;
    images[listeFichiers[i]] = image;
  }

  function onLoad(evt) {
    nombreImagesChargees++;
    if (nombreImagesChargees === listeFichiers.length) {
      quandToutEstCharge(images);
    }
  }
}

// Renvoie une valeur numérique à virgule au hasard entre 'min' et 'max'
function hasard(min, max) {
  return Math.random() * (max - min) + min;
}

// Renvoie true si une collision est détectée entre 2 objets a et b.
// Les objets a et b doivent avoir des propriétés .x .y .width et .height
function collision(a, b) {
  if (a === undefined || b === undefined)
    return false;

  if(typeof a.width === "undefined" || typeof a.height === "undefined" || typeof b.width === "undefined" || typeof b.height === "undefined")
    return false;

  return !(b.x >= a.x + a.width // Trop à droite
      || b.x + b.width <= a.x // Trop à gauche
      || b.y >= a.y + a.height // Trop en bas
      || b.y + b.height <= a.y) // Trop en haut
}
