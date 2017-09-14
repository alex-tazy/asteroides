function Lasers() {
  this.lasers  = [];
  this.vitesse = 50;
  this.image   = graphics['img/laser.png'];
}


Lasers.prototype.createOne = function(x, y, direction) {
  // Création d'un nouveau laser aux positions et à la direction spécifiés
  this.lasers.push({
    x         : x,
    y         : y,
    width     : this.image.width,
    height    : this.image.height,
    direction : direction
  });
};


Lasers.prototype.update = function() {
  // Parcours du tableau de lasers
  for (var i = 0, laser; i < this.lasers.length; i++) {
    laser = this.lasers[i];

    // Avancement du laser
    laser.x += Math.cos(laser.direction) * this.vitesse;
    laser.y += Math.sin(laser.direction) * this.vitesse;

    // Si le laser sort de la caméra, on le supprime en mémoire
    if (laser.x + laser.width < 0 || laser.y + laser.height < 0 || laser.x > canvas.width || laser.y > canvas.height)
      this.lasers.splice(i, 1);

    // Pour vérifier si un laser entre en collision avec un astéroïde, il faut tester tous les astéroïdes sur chaque laser, d'où cette nouvelle boucle dans la boucle au dessus
    for (var j = 0, astero; j < asteroides.asteroides.length; j++) {
      astero = asteroides.asteroides[j];
      // Collision : si le laser touche un astéroïde
      if (collision(laser, astero)) {
        this.lasers.splice(i, 1); // Suppression du laser (index 'i')
        asteroides.asteroides.splice(j, 1); // Suppression de l'astéroïde (index 'j')
        sons.asteroide.play(); // Son : "booom !"
        joueur.score += 10; // Le joueur augmente son score
        break; // Puisqu'on a détecté une collision, inutile de continuer cette sous-boucle. On l'arrête.
      }
    } // fin du 2ème for
  } // fin du 1er for
};


Lasers.prototype.render = function() {
  // Parcours du tableau de lasers
  for (var i = 0, laser; i < this.lasers.length; i++) {
    laser = this.lasers[i];

    // Dessin du laser (avec la rotation)
    context.save();
    context.translate(laser.x + laser.width/2, laser.y + laser.height/2);
    context.rotate(laser.direction);
    context.drawImage(this.image, -laser.width/2, -laser.height/2);
    context.restore();
  }
};