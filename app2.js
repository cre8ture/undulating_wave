let cols, rows;
let scl = 20;
let xoff = 0;
let yoff = 0;
let terrain; // = []
let flying = 0

var myFont;
function preload() {
  myFont = loadFont('assets/Roboto-Light.ttf');
}   
function setup() {
    console.log("setup", myFont)
    textFont(myFont);
    frameRate(60); 
    textSize(scl / 2); // Set the text size

  createCanvas(windowWidth, windowHeight); // Enable WEBGL
  const w = windowWidth;
  const h = windowHeight;
  let extraWidth = 200; // Extra width to extend beyond the visible area
  cols = Math.floor((windowWidth + extraWidth) / scl);
  rows = Math.floor(h / scl);
//   perspective(PI / 3.0, width / height, 0.1, 10000); // Set perspective
  terrain = new Array(cols).fill().map(() => new Array(rows)); // Create 2D array
  for (let x = 0; x < cols; x++) {
    // beginShape(TRIANGLE_STRIP)
    for (let y = 0; y < rows; y++) {
        terrain[x][y] = map (noise(xoff, yoff), 0, 1, -100, 100) //random(-10,10); // Specify a default value for now
        xoff += 0.2    
    }
    yoff += 0.2
    }
}

function draw() {
  background(0);
  stroke(255);
  fill(0)



  // Adjust the camera
  camera(0, ((height / 2.0) / tan(PI / 6)), height / 2.0, 0, 0, 0, 0, 1, 0);

  // Translate to center of the canvas
  translate(-windowWidth / 2 - 100, -windowHeight / 2 +100, 0);
   push()
        // Draw the sun
        noStroke(); // No border for the sun
        fill(255, 204, 0); // Yellow color for the sun
        // ellipse(windowWidth / 2, 100, 200, 200); // Draw the sun at the top center of the window
        ellipse(frameCount % width, height / 2, 50, 50);
      pop()
  for (let x = 0; x < cols-1; x++) {
    // beginShape(TRIANGLE_STRIP)
    for (let y = 0; y < rows-1; y++) {
     
    //   push(); // Save the current transformation
    //   translate(x * scl, y * scl); // Move to the position of the box
    //   vertex(x * scl, (y+1) * scl); // Draw a vertex
    //   box(scl); // Draw a 3D box
    //   pop(); // Restore the transformation
    push(); // Save the current transformation
    translate(x * scl, y * scl); // Move to the position of the box

    // Draw two triangles to form a square
    beginShape();
    vertex(0, 0, terrain[x][y]);

    vertex(scl, 0, terrain[x + 1][y]);
    vertex(0, scl, terrain[x][y + 1]);
    endShape(CLOSE);
    
    beginShape();
    vertex(scl, 0, terrain[x + 1][y]);
    vertex(0, scl, terrain[x][y + 1]);
    vertex(scl, scl, terrain[x + 1][y + 1]);
      // Draw an ASCII character in the cell
      fill(255); // Set the text color
      text('#', scl / 2, scl / 2); // Draw the text in the center of the cell
  
    endShape(CLOSE);
    
    pop(); // Restore the transformation

    }
  }
}