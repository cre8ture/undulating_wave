let xoff = 0;
let yoff = 0;
let cols, rows;
let scl = 20;
let cloudX = 0; // Initialize the x position of the clouds
let cloudSize = 100; // Reduced cloud size
let cloudDetail = 0.02;
// let heights = Array(cloudSize).fill().map(() => Array(cloudSize).fill(0));
let heights = new Float32Array(cloudSize * cloudSize);
let scl2 = scl / 2;
let ht2;
let t = 0; // Initialize a time variable at the top of your script
let h1 = 0;
let h2 = 0;
function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight); // Use 2D rendering
  ht2 = height / 2;

  const w = windowWidth;
  const h = windowHeight;
  let extraWidth = 200; // Extra width to extend beyond the visible area
  cols = Math.floor((windowWidth + extraWidth) / scl);
  rows = Math.floor(h / scl);
  // Calculate the heights ahead of time
  // Define these parameters at the top of your script
  let octaves = 4; // Number of layers of noise
  let persistence = 0.5; // Amount each octave contributes to the total

  // ...

  // Calculate the heights ahead of time
  for (let x = 0; x < cloudSize; x++) {
    for (let y = 0; y < cloudSize; y++) {
      let total = 0;
      let frequency = 1;
      let amplitude = 1;
      let maxValue = 0; // Used for normalizing result to 0.0 - 1.0
      for (let i = 0; i < octaves; i++) {
        total +=
          noise(x * cloudDetail * frequency, y * cloudDetail * frequency) *
          amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
      }
      // Now total is a value between 0 and maxValue, so normalize it:
      let noiseVal = total / maxValue;
      noiseVal = pow(noiseVal, 2); // Square the output
      let index = x * cloudSize + y;
      heights[index] = map(noiseVal, 0, 1, -300, 100);
    }
  }
}
let circleX = 0; // Initialize a variable for the circle's x position

function draw() {
  t += 0.01;
  background(220);
  translate(0, 35); // Adjust the second argument to move the terrain lower or higher

  push();
  // Draw the circle
  let circleY = height / 2 + sin(t) * 100; // Calculate the circle's y position based on a sine wave

  // Map circleY to a color value
  let colorVal = map(circleY, 0, height, 0, 255);

  // Use the color value to set the fill color
  fill(colorVal);
  noStroke();

  ellipse(circleX, circleY, 500); // Draw the circle

  circleX += 2; // Move the circle to the right
  if (circleX > width) {
    circleX = 0; // Reset the circle's x position when it moves off the canvas
  }
  pop();

  //   / Draw the clouds
  push(); // Save the current transformation matrix
  translate(cloudX, -50); // Move the clouds
  drawClouds();
  pop(); // Restore the transformation matrix

  cloudX += 0.0; // Adjust this value to change the speed of the clouds
  if (cloudX > width) {
    cloudX = -200; // Reset the position of the clouds when they move off the canvas
  }
  // }
}

function drawClouds() {
  // Draw the clouds as a grid of triangles
  beginShape(TRIANGLES);
  for (let x = 0; x < cloudSize; x++) {
    for (let y = 0; y < cloudSize; y++) {
      let size = map(y, 0, cloudSize, scl2, scl);
      let posX = x * size;
      let posY = map(y, 0, cloudSize, ht2, height);
      let noiseVal = noise(x * cloudDetail, y * cloudDetail, t);
      heights[x * cloudSize + y] = map(noiseVal, 0, 1, -300, 100);

      // Calculate the color based on the height
      let avgHeight =
        (heights[x * cloudSize + y] +
          heights[((x + 1) % cloudSize) * cloudSize + y] +
          heights[x * cloudSize + y + 1] +
          heights[((x + 1) % cloudSize) * cloudSize + (y + 1)]) /
        4;
      let colorVal = map(avgHeight, -100, 100, 255, 255);

      // Interpolate the heights
      if (heights[x * cloudSize + y])
        h1 = lerp(
          heights[x * cloudSize + y],
          heights[((x + 1) % cloudSize) * cloudSize + y],
          0.5
        );

      if (heights[x * cloudSize + y + 1])
        h2 = lerp(
          heights[x * cloudSize + y + 1],
          heights[((x + 1) % cloudSize) * cloudSize + y + 1],
          0.5
        );
      // Set the color and add vertices to the shape
      fill(colorVal);
      vertex(posX, posY + size + h1);
      vertex(posX + size / 2, posY + heights[(x + 1) * cloudSize + y]);
      vertex(posX + size, posY + size + h2);
      vertex(posX, posY + size + h1);
      vertex(posX + size / 2, posY + heights[(x + 1) * cloudSize + y]);
      vertex(posX, posY + heights[x * cloudSize + y]);
    }
  }
  endShape();
}
