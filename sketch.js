let flower = 0;
let times = [];
let i = 0;
let myBee = null;
let myClock = null;
let spin = 0;
let leng = 18;
let num = 20;
var move = 0;
let color = 0;

let x = [];
let y = [];
// remember the last 20 for trail
for (let j = 0; j < num; j++) {
  x[j] = 0;
  y[j] = 0;
}

function setup() {
  canvas = createCanvas(720, 400);
  times[0] = new Time('#f19e33', 175);
  times[1] = new Time('#f2ef42', 170);
  times[2] = new Time('#725105', 165);
  myBee = new Bee();
  eyeL = new Eye(115, 380, 50);
  eyeR = new Eye(180, 380, 50);
}

function draw() {
  
  background(80, 180, 205);
  
  // purple flower
  push();
  stroke('#1daf0e');
  strokeWeight(7);
  line(585, 300, 590, 400);
  stroke('#6d0d9d');
  strokeWeight(2);
  fill('#8d0ecc');
  translate(580, 300);
  for (let k = 0; k < 10; k++) {
    ellipse(0, 30, 20, 80);
    rotate(PI/5);
  }
  fill('#dee32c');
  circle(0, 0, 20);
  pop();
  
  // red flower
  push();
  stroke('#1daf0e');
  strokeWeight(10);
  line(505, 530, 505, 400);
  
  stroke('#ab161f');
  strokeWeight(1.5);
  fill('#e91d29');
  translate(500, 350);
  for (let k = 0; k < 10; k++) {
    ellipse(0, 30, 20, 60);
    rotate(PI/5);
  }
  fill('#e87521');
  circle(0, 0, 15);
  pop();
  
  // blue flower
  push();
  stroke('#1daf0e');
  strokeWeight(7);
  line(345, 300, 342, 400);
  stroke('#1c24b3');
  strokeWeight(2);
  fill('#2b35ec');
  translate(350, 280);
  for (let k = 0; k < 10; k++) {
    ellipse(0, 30, 20, 80);
    rotate(PI/5);
  }
  fill('#edf10f');
  circle(0, 0, 20);
  pop();
  
  // light purple flower
  push();
  stroke('#1daf0e');
  strokeWeight(7);
  line(425, 335, 420, 400);
  
  stroke('#9850b5');
  strokeWeight(1.5);
  fill('#c76bec');
  translate(430, 335);
  for (let k = 0; k < 10; k++) {
    ellipse(0, 30, 20, 60);
    rotate(PI/5);
  }
  fill('#f08712');
  circle(0, 0, 15);
  pop();
  
  // create head
  fill('#F4A460');
  strokeWeight(2);
  ellipse(125, 400, 200, 225);  
  
  // create eyes
  eyeL.update(mouseX + 60, mouseY);
  eyeR.update(mouseX + 60, mouseY);
  eyeL.display();
  eyeR.display();
  
  // create eyebrows
  push();
  strokeWeight(4);
  curve(90, 375, 88, 350, 133, 345, 130, 375);
  curve(155, 380, 155, 345, 200, 350, 198, 375);
  pop();
  
  
  // draw clouds
  push();
  noStroke();
  fill(225);
  ellipse(45,50,70,50);
  ellipse(80,40,60,50);
  ellipse(130,45,60,50);
  ellipse(70,70,60,50);
  ellipse(110,65,60,50);
  
  ellipse(250,100,70,50);
  ellipse(300,90,60,50);
  ellipse(355,95,70,50);
  ellipse(280,125,60,50);
  ellipse(330,125,70,50);
  
  ellipse(550,60,60,60);
  ellipse(600,50,60,50);
  ellipse(655,55,75,60);
  ellipse(580,95,65,65);
  ellipse(630,95,65,60);
  pop();
  
  // Draw bee to follow curser
  push();
  myBee.createBee();
  if (mouseX > 225 && mouseY > 210) {
    myBee.smile();
  }
  else {
    myBee.frown();
  }
  strokeWeight(3);
  stroke(0, 130);
  drawTrail(0, mouseX + 105, mouseY);
  for (let j = 0; j < x.length - 1; j++) {
    drawTrail(j + 1, x[j], y[j]);
  }
  pop();
  
  push();
  if(mouseIsPressed ) {
      if(mouseX > 225 && mouseX < 375 && 
         mouseY > 210 && mouseY < 350) {
        flower = 0;
      }
      else if(mouseX > 310 && mouseX < 430 && 
              mouseY > 270 && mouseY < 400) {
        flower = 1;
      }
      else if(mouseX > 430 && mouseX < 510 && mouseY > 275) {
        flower = 2;
      }
      else if (mouseX > 510 && mouseX < 600 &&
               mouseY > 215 && mouseY < 360) {
       flower = 3; 
      }
      else {
        flower = 4;
      }
      pollen(flower);
    }
  pop();
  
  // Draw bee again so it is over the pollen
  push();
  myBee.createBee();
  if (mouseX > 225 && mouseY > 210) {
    myBee.smile();
  }
  else {
    myBee.frown();
  }
  strokeWeight(3);
  stroke(0, 130);
  drawTrail(0, mouseX + 105, mouseY);
  for (let j = 0; j < x.length - 1; j++) {
    drawTrail(j + 1, x[j], y[j]);
  }
  pop();
  
  
  // show time is running out only every so often
  if (frameCount % 40 === 0){
    i++;
  }
  // reset i at end of array
  if (i === times.length){
    i = -1;
  }
  
  if (i == 0) {
    times[i].show(); 
  }
  if (i == 1) {
    times[0].show();
    times[i].show();
  } 
  if (i == 2) {
    times[0].show();
    times[1].show();
    times[2].show();
  }
  
}

class Time {
  constructor(c, y) {
    this.c = c;
    this.y = y;
  }
  
  show() {
    textSize(30);
    fill(this.c);
    text('SAVE THE BEES', 350, this.y);
  }
}


class Bee {
  createBee() {
    push();
    // body
    fill('#FFFF00');
    ellipse(mouseX + 60, mouseY, 55, 40);
    
    // wings
    fill('#FFFFFF');
    ellipse(mouseX + 55, mouseY - 30, 20, 35);
    ellipse(mouseX + 70, mouseY - 30, 20, 35);

    // stinger, stripes and eye
    fill(0);
    triangle(mouseX + 87, mouseY - 5, mouseX + 87, 
             mouseY + 5, mouseX + 98, mouseY);
    strokeWeight(3);
    curve(mouseX + 50, mouseY - 11, mouseX + 70, mouseY - 11, 
          mouseX + 70, mouseY + 18, mouseX + 50, mouseY + 18);
    curve(mouseX + 40, mouseY - 11, mouseX + 57, mouseY - 11, 
          mouseX + 57, mouseY + 18, mouseX + 40, mouseY + 18);
    
    circle(mouseX + 45, mouseY - 5, 3);
    pop();
  }
  
  smile() {
    push();
    curve(mouseX + 37, mouseY + 5, mouseX + 37, mouseY + 10, 
          mouseX + 47, mouseY + 5, mouseX + 27, mouseY + 5);
    pop();
  }
  
  frown() {
    push();
    curve(mouseX + 35, mouseY + 3, mouseX + 35, mouseY + 4, 
          mouseX + 47, mouseY + 9, mouseX + 27, mouseY + 7);
    pop();   
  }
}

// make eyes
function Eye(ex, ey, d) {
  this.x = ex;
  this.y = ey;
  this.diam = d;
  this.look = 0;

  this.update = function(mx, my) {
    this.look = atan2(my - this.y, mx - this.x);
  };
  
  this.display = function() {
    push();
    translate(this.x, this.y);
    fill(225);
    ellipse(0, 0, this.diam, this.diam);
    rotate(this.look);
    fill(0);
    ellipse(this.diam / 4.0001, 0, this.diam / 4.0001, 
            this.diam / 4.0001);
    pop();
  };
}

function drawTrail(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx);
  // remember previous position for trail
  x[i] = xin - cos(angle) * leng;
  y[i] = yin - sin(angle) * leng;
  beeTrail(x[i], y[i], angle);
}

function beeTrail(x, y, rotation) {
  push();
  translate(x, y);
  rotate(rotation);
  // line(0, 0, leng, 0);
  fill(0)
  circle(0, 0, 2);
  pop();
}

function cloud(x, y, size) {
	fill(255, 255, 255);
	noStroke();
	arc(x, y, 25 * size, 20 * size, PI + TWO_PI, TWO_PI);
	arc(x + 10, y, 25 * size, 45 * size, PI + TWO_PI, TWO_PI);
	arc(x + 25, y, 25 * size, 35 * size, PI + TWO_PI, TWO_PI);
	arc(x + 40, y, 30 * size, 20 * size, PI + TWO_PI, TWO_PI);
}

function pollen(f) {
  push();
  noStroke();
  if (f == 0) {
    translate(350, 280);
    color = '#F3B31C';
    fill(color);
  }
  else if(f == 1) {
    translate(430, 335);
    color = '#F99C4B';
    fill(color);
  }
  else if(f == 2) {
    translate(500, 350);
    color = '#E19D28';
    fill(color);
  }
  else if(f == 3) {
    translate(580, 300);
    color = '#F3B31C';
    fill(color);
  }
  else {
    fill(51, 0);
  }
    circle(0, -50, 10);
    circle(-20, -25, 15);
    circle(-60, -20, 15);
    circle(-30, 20, 10);
    circle(-40, 50, 15);
    circle(5, 40, 10);
    circle(40, 20, 8);
    circle(35, 3, 15);
    circle(35, -30, 8);
    circle(50, -25, 10);
  pop();
}
