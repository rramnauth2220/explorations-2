// http://dianalange.tumblr.com/post/84504561091/ihaveitallfiguredout-long-lost-drawing

var y = 80;
var amplitude;
var steps = 3;
var timeSteps = 0.01;
var versatz = 10;
var sw;
var strokeAlpha;
var margin = 30;

var doReDraw = true;

function setup ()
{
    var canvas = createCanvas(window.innerWidth/2, window.innerHeight);
	canvas.parent('sketch-holder');
	height = window.innerHeight;
	width = window.innerWidth/2;
	amplitude = random(50, 80);
	sw = random(0.5, 2);
  smooth();
}

function draw ()
{
  if (doReDraw == true)
  {
    background (255);

    y = random(80, 150);

    while (y < height+70)
    {
      setRandomValues ();
      drawFilles();
      drawLines();

      y+= random(5, 70);
    }

    drawMargin();

    doReDraw = false;
  }
}

function setRandomValues ()
{
  noiseSeed (random(100000));

  sw = random(0.5, 2);

   steps = random(sw*2, 6);
  amplitude = random(40, 250);

  timeSteps = random(0.01, 0.05);

  versatz = random(-200, 200);

  strokeAlpha = random(50, 200);
}

function mousePressed ()
{
  doReDraw = true;
}


function time ()
{
  return (year () + month() + day() +hour() + minute () + second ()+frameCount);
}

function drawFilles ()
{
  fill(255);
  noStroke();

  var noiseValue;
  var x = -abs (versatz);
  var time = 0.0;

  beginShape ();

  vertex (-10, height+1);
  while (x < width )
  {
    noiseValue = y - noise (time)*amplitude;
    vertex (x, noiseValue);

    x+= steps;
    time += timeSteps;
  }
  vertex (width+10, height+1);
  endShape();
}

function drawLines ()
{
  noFill ();
  strokeWeight (sw);


  var noiseValue;
  var x = -abs (versatz);
  var time = 0.0;

  while (x < width + abs (versatz))
  {
    noiseValue = y - noise (time)*amplitude;
    strokeWeight (random(sw*0.5, sw*1.2));
    stroke (random(strokeAlpha*0.8, strokeAlpha));

    line (x, noiseValue+3, x + random(versatz*0.9, versatz), noiseValue+3+height);

    x+= steps;
    time += timeSteps;
  }
}


function drawMargin ()
{
  noStroke();
  fill (255);
  rect (0, 0, width, margin);
  rect (0, height, width, -margin);
  rect (0, 0, margin, height);
  rect (width, 0, -margin, height);
}