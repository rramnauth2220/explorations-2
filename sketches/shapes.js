//https://www.openprocessing.org/sketch/418971

var iris = [];
var niris = 1000;
// noise factors
var noiseScale, noiseStrength;

// noise display factors
var overlayAlpha = 40,
  irisAlpha = 255,
  strokeWidth = .3;

// main circle parameters
var radius,minradius=50,maxradius=300;

// animation related variables
var nInsideIris = 0,
  timer = 0;

// colors
var bckg = 0x000000,
  c1 = 0xffffff;

function setup() {
    var canvas = createCanvas(window.innerWidth/2, window.innerHeight);
	canvas.parent('sketch-holder');
	height = window.innerHeight;
	width = window.innerWidth/2;
  smooth();
  background(bckg);
  initiate();
}

function initiate() {
  background(bckg);
  timer = 0;
    // radius change for every cycle
  radius = random(minradius,maxradius);
  nInsideIris = niris;
  // new noise
  noiseScale = int(random(300,1500));
  noiseStrength = int(random(25, 100));
  noiseDetail(int(random(1, 10)), 0.5);
  for (var i = 0; i < niris; i++) {
    iris[i] = new Iris();
  }
}

function draw() {

  if (nInsideIris == 0) {
    if (timer == 40) {
      initiate();
    } else {
      // this is for that quick fade at the end of a cycle
      fill(bckg, 40);
      rect(-5, -5, width + 10, height + 10);
      timer++;
    }
  } else {
    // Animate Iris
    for (var i = 0; i < niris; i++) {
      if (iris[i].isInside) iris[i].drawIris();
    }
  }
}


///////////////////////


function Iris() {
  // x,y    = the current position
  // ox,oy  = the position, but slightly back in time
  // sx,sy  = start positions
  this.isInside = true;
  this.angle = 0;
  this.step = 5;
  this.NDo = int(random(360));
  this.sx = width / 2 + radius * cos(this.NDo);
  this.sy = height / 2 + radius * sin(this.NDo);
  this.ox = this.x = this.sx;
  this.oy = this.y = this.sy;
}

Iris.prototype.drawIris = function() {
  // calculate angle which is based on noise
  // and then use it for x and y positions
  this.angle = noise(this.x / noiseScale, this.y / noiseScale) * noiseStrength;

  // write in the last value of x,y into ox,oy >> old x, old y
  // i need these values to display the line();
  this.ox = this.x;
  this.oy = this.y;

  // calculate new x and y position
  this.x += cos(this.angle) * this.step;
  this.y += sin(this.angle) * this.step;

  // what happens when x and y hit the outside
  this.isInside = (this.x > 0 && this.x < width && this.y > 0 && this.y < height);

  if (this.isInside) {
    // display it
    noFill();
    stroke(c1, irisAlpha);
    strokeWeight(strokeWidth);
    line(this.ox, this.oy, this.x, this.y);
  } else nInsideIris--; //decrease number of Iris inside
}