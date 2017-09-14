function GUI() {
  // Pas grand chose à faire ici ... :)
}


GUI.prototype.render = function() {
  // On écrit en blanc, avec une police et une taille de police
  context.fillStyle = 'white';
  context.font = '28px monospace';

  // Nombre de vies (aligné en haut à gauche sur le canvas)
  context.textAlign = 'left';
  context.fillText('Vies : ' + joueur.vies, 30, 30);

  // Score (aligné en haut à droite sur le canvas)
  context.textAlign = 'right';
  context.fillText('Score : ' + joueur.score, canvas.width - 30, 30);
};


GUI.prototype.renderGameOver = function() {
  // Affichage d'un gros "Game Over" en plein milieu du canvas
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.font = '60px monospace';
  context.fillText('Game Over', canvas.width/2, canvas.height/2);
}