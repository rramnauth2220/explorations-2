// Nervous Waves 2
// Levente Sandor, 2014
//https://www.openprocessing.org/sketch/153224


function setup() {
  var canvas = createCanvas(window.innerWidth/2, window.innerHeight);
  canvas.parent('sketch-holder');
  height = window.innerHeight;
  width = window.innerWidth/2;
  fill(0);
  noStroke();
  rectMode(CENTER);
  frameRate(30);
  noiseDetail(2, 0.9);
}

function draw() {
  background(255);
  for (var x = 10; x < width; x += 20) { //x += 10
    for (var y = 10; y < height; y += 20) { //y += 10
      var n = noise(x * 0.005, y * 0.005, frameCount * 0.05);
      push();
      translate(x, y);
      rotate(TWO_PI * n);
      scale(25 * n);
      rect(0, 0, 1, 1);
      pop();
    }
  }
  
}