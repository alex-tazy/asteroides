function Asteroides() {
  this.asteroides  = [];
  this.intervalle  = 1000;
  this.dernierCree = null;
  this.image       = graphics['img/asteroide.png'];
}


Asteroides.prototype.createOne = function() {

  // Permet de choisir un emplacement au hasard pour la création d'un nouvel astéroïde (sur n'importe quel côté à l'extérieur de l'écran)
  var cote = hasard(0, 4);
  var x;
  var y;

  if (cote < 1) { // en haut
    x = hasard(-this.image.width, canvas.width);
    y = -this.image.height;
  }
  else if (cote < 2) { // a droite
    x = canvas.width;
    y = hasard(-this.image.height, canvas.height);
  }
  else if (cote < 3) { // en bas
    x = hasard(-this.image.width, canvas.width);
    y = canvas.height;
  }
  else if (cote < 4) { // a gauche
    x = -this.image.width;
    y = hasard(-this.image.height, canvas.height);
  }

  // Ajout du nouvel astéroïde dans le tableau
  this.asteroides.push({
    x               : x,
    y               : y,
    width           : this.image.width,
    height          : this.image.height,
    direction       : Math.atan2(joueur.y - y, joueur.x - x), // L'astéroïde ira en direction du joueur
    rotation        : 0,
    vitesseRotation : hasard(-0.2, 0.2),
    vitesse         : hasard(1, 4)
  });
}


Asteroides.prototype.update = function() {

  // Augmentation de la difficulté :
  // Au fur et à mesure que le temps passe, l'intervalle d'apparition des astéroïdes devient de plus en plus petite
  // (avec tout de même une limitation maximale : pas plus de 20 nouveaux astéroïdes par seconde)
  if (this.intervalle > 1000/20)
    this.intervalle -= 0.2;

  // À chaque période de l'intervalle définie en haut, on crée un nouvel astéroide dans le tableau
  if (Date.now() - this.dernierCree > this.intervalle) {
    this.createOne();
    this.dernierCree = Date.now();
  }

  // Parcours du tableau d'astéroïdes
  for (var i = 0, astero; i < this.asteroides.length; i++) {
    astero = this.asteroides[i];

    // Avancement de l'astéroïde
    astero.x += Math.cos(astero.direction) * astero.vitesse;
    astero.y += Math.sin(astero.direction) * astero.vitesse;
    // Rotation de l'astéroïde
    astero.rotation += astero.vitesseRotation;

    // Gestion des débordements hors-écran :
    if (astero.x > canvas.width) // S'il y a un débordement à droite
      astero.x = -astero.width;
    if (astero.x + astero.width < 0) // S'il y a un débordement à gauche
      astero.x = canvas.width;
    if (astero.y + astero.height < 0) // S'il y a un débordement en haut
      astero.y = canvas.height;
    if (astero.y > canvas.height) // S'il y a un débordement en bas
      astero.y = -astero.height;

    // Collision : si le joueur touche l'astéroïde
    if (collision(joueur, astero)) {
      this.asteroides.splice(i, 1); // Suppression de l'astéroïde
      sons.dommage.play(); // Son : "ouch !"
      joueur.vies -= 1; // Le joueur perd une vie
      if (joueur.vies === 0) { // Si le nombre de vies vaut 0, c'est game over !
        gameover = true;
      }
    }

  } // fin boucle for
};


Asteroides.prototype.render = function() {
  // Parcours du tableau d'astéroïdes
  for (var i = 0, astero; i < this.asteroides.length; i++) {
    astero = this.asteroides[i];

    // Dessin de l'astéroïde (avec la rotation)
    context.save();
    context.translate(astero.x + astero.width/2, astero.y + astero.height/2);
    context.rotate(astero.rotation);
    context.drawImage(this.image, -astero.width/2, -astero.height/2);
    context.restore();
  }
};
