function Bullet(start_position, angle) {
  this.position = createVector(start_position.x, start_position.y);
  this.kretanje = p5.Vector.fromAngle(angle);
  this.kretanje.mult(10);

  this.moving = function() {
    this.position.add(this.kretanje);
  };

  this.show = function() {
    push();
    stroke(0);
    strokeWeight(10);
    point(this.position.x, this.position.y);
    pop();
  };

  this.hits = function(bubble) {
    var distance = dist(
      /*distance=udaljenost izmedu "baloncica" i "bullets-a", kada je udaljenost manja od 
                            poluprecnika kruga(buuble) to znaci da su se buuble i bullet sudarili*/
      this.position.x,
      this.position.y,
      bubble.position.y,
      bubble.position.x
    );

    if (distance < bubble.radius) {
      return true;
    } else {
      false;
    }
  };
}
