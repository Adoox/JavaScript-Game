function Shooter() {
  //this.x = width / 2;
  this.position = createVector(width / 2, height - 80);
  this.shooter_width = 50;
  this.height = 70;
  this.xdir = 0;
  preload();
  this.show = function() {
    fill(255);
    noStroke();
    rectMode(CENTER);
    //translate(this.position.x, this.position.y);
    //rect(this.position.x, this.position.y, this.shooter_width, 100);
    img = image(
      shooter_img,
      this.position.x - 75,
      this.position.y - 100,
      150,
      200
    );
  };

  this.hits = function(bubble) {
    /*Funkcija koja provjerava collision(dodir/sudar) izmedz+u shootera i loptice*/
    var distance = dist(
      this.position.x,
      this.position.y,
      bubble.position.y,
      bubble.position.x
    );
    if (
      distance < this.height + bubble.radius &&
      distance < this.shooter_width + bubble.radius
    ) {
      return true;
    } else {
      return false;
    }
  };

  this.setDir = function(dir) {
    this.xdir = dir;
  };

  this.move = function(dir) {
    /*Funkcija za kreanje shootera*/
    this.position.x += this.xdir * 5;
  };

  this.edges = function() {
    /*Funkcija kojom se omogucava da shooter moze prolaziti kroz stranice
                                canvasa i pojaviti se na drugoj strani, parametar koji se razmatra jese x-osa*/
    if (this.position.x > width + this.shooter_width) {
      this.position.x = -this.shooter_width;
    } else if (this.position.x < -this.shooter_width) {
      this.position.x = width + this.shooter_width;
    }
  };
}
