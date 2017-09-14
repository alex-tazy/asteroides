function Joueur(x, y, direction, vitesse) {
  this.x         = x;
  this.y         = y;
  this.direction = direction;
  this.vitesse   = vitesse;
  this.image     = graphics['img/vaisseau.png'];
  this.width     = this.image.width;
  this.height    = this.image.height;
  this.tir       = {
    intervalle : 250,
    dernierTir : null
  };
  this.vies      = 10;
  this.score     = 0;
}


Joueur.prototype.update = function() {

  // Game design :
  // On augmente successivement la cadence de tir du joueur pour qu'il puisse shooter tous les astéroïdes, qui eux aussi apparaissent de + en + vite
  // (avec tout de même une limitation maximale : 30 lasers par seconde)
  if (this.tir.intervalle > 1000/30)
    this.tir.intervalle -= 0.025;

  /*
   * Gestion des mouvements du joueur
   */

  if (clavier.haut)
    this.avance();

  if (clavier.droite)
    this.direction += 0.1;

  if (clavier.gauche)
    this.direction -= 0.1;

  // Si on appuie sur Espace et que l'intervalle de tir minimum est respectée, on peut créer un nouveau laser
  if (clavier.espace && Date.now() - this.tir.dernierTir > this.tir.intervalle) {
    // Dit au gestionnaire de lasers de créer un nouveau laser aux positions du joueur
    lasers.createOne(this.x, this.y, this.direction);
    this.tir.dernierTir = Date.now(); // Sauvegarde le moment où l'on a créé le dernier tir (pour calculer les prochaines intervalles)
    sons.laser.play(); // Son : "pew !"
  }

};


Joueur.prototype.avance = function() {
  // Avancement du joueur
  this.x += Math.cos(this.direction) * this.vitesse;
  this.y += Math.sin(this.direction) * this.vitesse;

  // Gestion des débordements hors-écran :
  if (this.x > canvas.width) // S'il y a un débordement à droite
    this.x = -this.width;
  if (this.x + this.width < 0) // S'il y a un débordement à gauche
    this.x = canvas.width;
  if (this.y + this.height < 0) // S'il y a un débordement en haut
    this.y = canvas.height;
  if (this.y > canvas.height) // S'il y a un débordement en bas
    this.y = -this.height;
};


Joueur.prototype.render = function() {
  // Dessin du joueur (avec la rotation)
  context.save();
  context.translate(this.x + this.width/2, this.y + this.height/2);
  context.rotate(this.direction);
  context.drawImage(this.image, -this.width/2, -this.height/2);
  context.restore();
};
