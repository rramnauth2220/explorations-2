/* @pjs preload="emma.jpg", "obama.jpg", "clvar.jpg"; */

/*
Art gallery pavarer

Maps the image's brightness to determine the stroke's direction and the color's hue.

Controls:
  - Mouse click to switch to the next image.

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

var maxTime = 400;
var strokesPerFrame = 25;

// Add your image here and on line 1 to preload it properly.
// Works best with images that don't exceed 700px.
var imgNames = ["images/faces/pic1.jpg"];
var img;
var imgIndex = 0;
var brightnessShift;
var pixelColor;
var canvas;

function setup() {
	
    canvas = createCanvas(window.innerWidth/2, window.innerHeight);
	canvas.parent('sketch-holder');
	height = window.innerHeight;
	width = window.innerWidth/2;
	/*for (var i = 1; i < 6; i++){
		imgNames.push("images/faces/pic" + i + ".jpg");
	}*/
    colorMode(HSB, 255);
	pixelColor = color(255);
	//loadPixels();
    nextImage();
	console.log(imgNames[0].width);
}

function draw() {
	//image(img, 500, 500);
	
	  image(img, 0, 0);
  translate(width/2, height/2);
  //loadPixels();
	for (var i = 0; i < strokesPerFrame; i++) {
		// Pick a random pixel.
		
		var index = round(random(img.width*img.height));
		// Get pixel's color and coordinates.
		var pix = img.pixels[index];
		//pixelColor = get(pixel);
		
		pixelColor = color(random(0, red(pix)), random(0, green(pix)), random(0, blue(pix)), random(0, 255));
		//pixelColor = color(0);

		var x = index%img.width;
		var y = index/img.width;
		
		// Move image to center canvas.
		push();
		translate(x-img.width/2, y-img.height/2);
		
		if (frameCount % 5 == 0) {
			// Pavar big dots once in a while.
			pavarDot(pixelColor, random(2, 20)*map(frameCount, 0, maxTime, 1, 0.5));
		} else {
			// Pavar a stroke.
			pavarStroke(random(150, 250), pixelColor, random(2, 8)*map(frameCount, 0, maxTime, 1, 0.1), map(frameCount, 0, maxTime, 40, 5));
		}

		pop();
	}
	
	// Stop drawing once it exceeds the time.
  /*if (frameCount > maxTime) {
    noLoop();
  }*/
}


function mousePressed() {
  nextImage();
}


function nextImage() {
	// Reset values.
  background(255);
  //loop();
  frameCount = 0;
	
	// Make shift random so hues aren't always the same.
  brightnessShift = random(255);
	
	// Load the next image.

  if (imgIndex >= imgNames.length) {
    imgIndex = 0;
  }
	
  img = loadImage(imgNames[imgIndex]);
  img.loadPixels();  
  imgIndex++;
}


function pavarStroke(strokeLength, strokeColor, strokeThickness, length) {
	var b = brightness(strokeColor);
	
	var bShift = b+brightnessShift;
	if (bShift > 255) {
		bShift -= 255;
	}
	
	push();
	// Map pixel's brightness to determine the stroke's direction.
	rotate(radians(map(b, 0, 255, -180, 180)));
	
	// Draw a dark stroke.
	stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 0, 100), 50);
	line(-length, 1, length, 1);
	
	// Draw a normal stroke.
	stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 0, 255));
  strokeWeight(strokeThickness);
	line(-length, 0, length, 0);
	
	// Draw a lighter stroke.
	stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 150, 255), 20);
	line(-length, 2, length, 2);
	
	pop();
}


function pavarDot(strokeColor, strokeThickness) {
	var b = brightness(strokeColor);
	
	var bShift = b+brightnessShift;
	if (bShift > 255) {
		bShift -= 255;
	}
	
	push();
	// Map pixel's brightness to determine the stroke's direction.
	rotate(radians(random(-180, 180)));
	
	// Draw a stroke with short length.
	stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 0, 255));
	strokeWeight(strokeThickness);
	line(0, 0, 5, 0);
	
	pop();
}