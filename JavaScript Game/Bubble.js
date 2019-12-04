function Bubble(pos, r_poluprecnik) {
  if (pos) {
    this.position = pos.copy();
  } else {
    this.position = createVector(
      random(width - 400),
      random(height)
    ); /*pozicija bubbles-a (ukoliko bi i za
      prvi parametar uzeli samo random(width) to bi znacilo da bi se baloncici stvarali na random pozciiji
      po x i y koordinati, u ovom slucaju koordinate su zamijenile mjesta jer se baloncici krecu samo po y-osi
      tako da smo ogranicili prvi parametar koji ustvari predstavlja visinu a ne sirinu, ogranicili smo ga na visinu
      citavog canvasa-400px sto znaci da ce baloncici stvarati neposredno uz gornju ivicu canvasa)*/
  }

  if (r_poluprecnik) {
    this.radius = r_poluprecnik * 0.5; //svaki put kad se bullet sudari sa kruzžićem(bubble) poluprecnik ce se smanjit
  } else {
    this.radius = random(20, 50);
  }
  this.kretanje = random();
  this.random_color_R = random(220, 250);
  this.random_color_G = random(10, 50);
  this.random_color_B = random(30, 80);
  if (mode == 3) {
    this.random_color_R = random(
      30,
      75
    ); /*definisanje random boja baloncica za određeni level*/
    this.random_color_G = random(75, 120);
    this.random_color_B = random(150, 220);
  }

  if (mode == 6) {
    this.random_color_R = random(
      200,
      237
    ); /*definisanje random boja baloncica za određeni level*/
    this.random_color_G = random(220, 250);
    this.random_color_B = random(60, 90);
  }

  this.show = function() {
    push();
    fill(this.random_color_R, this.random_color_G, this.random_color_B);
    stroke(255);
    strokeWeight(3);
    translate(this.position.y, this.position.x);
    ellipse(0, 0, this.radius * 2);
    pop();
  };

  this.moving = function() {
    this.position.add(
      this.kretanje + 0.5
    ); /*kretanje baloncica/loptica usmjereniih od vrha ka dnu po y-osi, sa brzinom od 
                                               0.5*/
  };

  this.breakup = function() {
    /*Funkcija kojom se stvara novi bubble nakon razbijanja vec postojeceg, 
                                 zavisno od poluprecnika kruga toliko ce se puta razbiti jedan bubble*/
    var newBubble = [];
    newBubble[0] = new Bubble(this.position, this.radius);
    newBubble[1] = new Bubble(this.position, this.radius);
    return newBubble;
  };

  this.edges = function() {
    /*Funkcija koja kao i kod shootera omogucava da baloncici nakon sto nije bilo kontakta izmedu
                                "bulletsa" i shootera, prolaze i pojavljuju se ponovo iz istog smijera*/
    if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
    } else if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
    }
    if (this.position.y > height + this.radius) {
      this.position.y = -this.radius;
    } else if (this.position.y < -this.radius) {
      this.position.y = height + this.radius;
    }
  };
}
