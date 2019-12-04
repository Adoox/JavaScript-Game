var shooter;
var bubbles = [];
let pozadina;
let pozadina2;
let pozadina3;
let start_menu_bg;
let shooter_img;
let restart_img;
let restart2_img;
let restart3_img;
let level_up_img;
let finish_img;
var bullets = [];
var ctg;
var mode;
let number_of_bubbles = 15; /*startni broj baloncica u prvom levelu*/
let hit_sound;
let score_sound;
let level_up_sound;
let music;
let hit_sound2;
score = 0;

function preload() {
  /*jedna od p5. funkcija koja automatski "uploada" sve potrebne parametre
                       prije samog kreiranja glavnog canvasa, odnosno pokretanja glavne setp funkcije*/
  pozadina = loadImage("libraries/background_img.png");
  pozadina2 = loadImage("libraries/pozadina2.png");
  pozadina3 = loadImage("libraries/pozadina3.png");
  shooter_img = loadImage("libraries/shooter_img.png");
  start_menu_bg = loadImage("libraries/start_menu.png");
  restart_img = loadImage("libraries/restart.png");
  restart2_img = loadImage("libraries/restart2_img.png");
  restart3_img = loadImage("libraries/restart3_img.png");
  level_up_img = loadImage("libraries/level_up.png");
  level_up2_img = loadImage("libraries/level3_up.png");
  finish_img = loadImage("libraries/finish.png");
  hit_sound = loadSound("sounds/hit.mp3");
  score_sound = loadSound("sounds/score.mp3");
  level_up_sound = loadSound("sounds/level_up_sound.mp3");
  music = loadSound("sounds/music.mp3");
  hit_sound2 = loadSound("sounds/hit2.mp3");
}

function setup() {
  music.loop();

  if (!music.isPlaying()) {
    music.play();
  }
  mode = 0;
  createCanvas(450, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  shooter = new Shooter();
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(new Bubble());
  }
}

function resetSketch() {
  mode = 2;
  bubbles.length = 0;
  score = 0;
  number_of_bubbles = 15;
  createCanvas(450, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  shooter = new Shooter();
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(
      new Bubble()
    ); /*Regenrisanje baloncica na ekranu u zavo+isnosti od broja koji zelimo*/
  }
}

function resetSketch2() {
  mode = 5;
  bubbles.length = 0;
  score = 0;
  number_of_bubbles = 15;
  createCanvas(450, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  shooter = new Shooter();
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(
      new Bubble()
    ); /*Regenrisanje baloncica na ekranu u zavo+isnosti od broja koji zelimo*/
  }
}

function resetSketch3() {
  mode = 8;
  bubbles.length = 0;
  score = 0;
  number_of_bubbles = 15;
  createCanvas(450, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  shooter = new Shooter();
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(
      new Bubble()
    ); /*Regenrisanje baloncica na ekranu u zavo+isnosti od broja koji zelimo*/
  }
}

function Finish() {
  mode = 9;
  bubbles.length = 0;
  score = 0;
  number_of_bubbles = 15;
  createCanvas(450, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  shooter = new Shooter();
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(
      new Bubble()
    ); /*Regenrisanje baloncica na ekranu u zavo+isnosti od broja koji zelimo*/
  }
}

function LevelUp_1() {
  mode = 4;
  bubbles.length = 0;
  score = 0;
  number_of_bubbles = 20;
  createCanvas(450, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  shooter = new Shooter();
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(new Bubble());
  }
}

function LevelUp_2() {
  mode = 7;
  bubbles.length = 0;
  score = 0;
  number_of_bubbles = 30;
  createCanvas(450, 600);
  textSize(20);
  textAlign(CENTER, CENTER);
  shooter = new Shooter();
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(new Bubble());
  }
}

function level_up() {
  for (var i = 0; i < number_of_bubbles; i++) {
    bubbles.push(new Bubble());
  }
  bubbles[i].show();
  bubbles[i].moving();
  bubbles[i].edges();
}

function draw() {
  clear();
  if (mode == 0) {
    image(start_menu_bg, 0, 0);
  }
  if (mode == 2) {
    image(restart_img, 0, 0);
  }
  if (mode == 4) {
    image(level_up_img, 0, 0);
  }
  if (mode == 7) {
    image(level_up2_img, 0, 0);
  }
  if (mode == 8) {
    image(restart3_img, 0, 0);
  }
  if (mode == 9) {
    image(finish_img, 0, 0);
  }
  if (mode == 5) {
    image(restart2_img, 0, 0);
  }
  if (mode == 1) {
    image(pozadina, 0, 0);
    /*shooter.show();
  shooter.edges();
  shooter.move();*/

    for (var i = 0; i < bubbles.length; i++) {
      if (shooter.hits(bubbles[i])) {
        hit_sound2.play(); /*nacin za pokretanja odrednog zvuka na mjestu na kojem zelimo*/
        resetSketch();
        console.log("OOPS");
      }
      bubbles[i].show();
      bubbles[i].moving();
      bubbles[i].edges();
    }

    for (var i = bullets.length - 1; i >= 0; i--) {
      bullets[i].moving();
      bullets[i].show();

      for (var j = bubbles.length - 1; j >= 0; j--) {
        if (bullets[i].hits(bubbles[j])) {
          hit_sound.play();
          if (bubbles[j].radius > 20) {
            var newBubbles = bubbles[j].breakup();
            bubbles = bubbles.concat(newBubbles); /*spajanje dva niza u jedan*/
          } else {
            score += 1;
          }
          bubbles.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
    }

    if (score == 15) {
      level_up_sound.play();
      LevelUp_1();
    }

    fill(255);
    text("Score: " + score, 60, 30);
    textStyle(BOLD);
    shooter.show();
    shooter.edges();
    shooter.move();
  }

  if (mode == 3) {
    /*Formiranje novog canvasa koji predstavlja novi level sa novom pozadinom
                         i tezinom levela*/
    image(pozadina2, 0, 0);
    /*shooter.show();
  shooter.edges();
  shooter.move();*/

    for (var i = 0; i < bubbles.length; i++) {
      if (shooter.hits(bubbles[i])) {
        if (mode == 1) {
          /*odredivanje "restart-menu screena" u zavisnosti od levela na kojem se nalazimo*/
          hit_sound2.play();
          resetSketch();
          console.log("OOPS");
        }
        if (mode == 3) {
          hit_sound2.play();
          resetSketch2();
          console.log("OOPS");
        }
      }
      bubbles[i].moving();
      bubbles[i].edges();
      bubbles[i].show();
    }

    for (var i = bullets.length - 1; i >= 0; i--) {
      bullets[i].moving();
      bullets[i].show();

      for (var j = bubbles.length - 1; j >= 0; j--) {
        if (bullets[i].hits(bubbles[j])) {
          hit_sound.play();
          if (bubbles[j].radius > 20) {
            var newBubbles = bubbles[j].breakup();
            bubbles = bubbles.concat(newBubbles); /*spajanje dva niza u jedan*/
          } else {
            score += 1;
          }
          bubbles.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
    }

    if (score == 30) {
      level_up_sound.play();
      LevelUp_2(); /*kada score dostigne vrijednost 30, poziva se funkcija Level_Up1() koja 
                      simulise prelazak na novi level preko pozadinske slike*/
    }

    fill(255);
    text("Score: " + score, 60, 30);
    textStyle(BOLD);
    shooter.show();
    shooter.edges();
    shooter.move();
  }

  if (mode == 6) {
    /*Formiranje novog canvasa koji predstavlja novi level sa novom pozadinom
                         i tezinom levela*/
    image(pozadina3, 0, 0);
    /*shooter.show();
  shooter.edges();
  shooter.move();*/

    for (var i = 0; i < bubbles.length; i++) {
      if (shooter.hits(bubbles[i])) {
        if (mode == 1) {
          /*odredivanje "restart-menu screena" u zavisnosti od levela na kojem se nalazimo*/
          hit_sound2.play();
          resetSketch();
          console.log("OOPS");
        }
        if (mode == 3) {
          hit_sound2.play();
          resetSketch2();
          console.log("OOPS");
        }
        if (mode == 6) {
          hit_sound2.play();
          resetSketch3();
          console.log("OOPS");
        }
      }
      bubbles[i].show();
      bubbles[i].moving();
      bubbles[i].edges();
    }

    for (var i = bullets.length - 1; i >= 0; i--) {
      bullets[i].moving();
      bullets[i].show();

      for (var j = bubbles.length - 1; j >= 0; j--) {
        if (bullets[i].hits(bubbles[j])) {
          hit_sound.play();
          if (bubbles[j].radius > 20) {
            var newBubbles = bubbles[j].breakup();
            bubbles = bubbles.concat(newBubbles); /*spajanje dva niza u jedan*/
          } else {
            score += 1;
          }
          bubbles.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
    }

    if (score == 60) {
      Finish(); /*kada u trecem levelu score bude 50, zavrsava se igra.(Igra trenutno ima 3 levela, medutim 
        moguce je povecati broj levela kao i tezinu samog levela*/
    }

    fill(255);
    text("Score: " + score, 60, 30); /*Prikazivanje rezultata na ekranu*/
    textStyle(BOLD);
    shooter.show();
    shooter.edges();
    shooter.move();
  }
}

function keyReleased() {
  shooter.setDir(0);
}

function keyPressed() {
  /*funkcija za odredivanje radnji u zavisnosti od pritiska tipke na tastaturi*/
  if (keyCode === 69) {
    mode = 6;
  } else if (keyCode === ENTER || keyCode == 82) {
    mode = 1;
  } else if (keyCode === 65) {
    mode = 3;
  } else if (key == " ") {
    bullets.push(new Bullet(shooter.position, shooter.position.y)); //Kreiranje objekta Bullet()
  } else if (keyCode === RIGHT_ARROW) {
    shooter.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    shooter.setDir(-1);
  }
}
