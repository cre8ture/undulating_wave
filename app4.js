let xoff = 0;
let yoff = 0;
let terrain = [];
let flying = 0;
let cols, rows;
let scl = 20;


var myFont;
function preload() {
  myFont = loadFont('assets/Roboto-Light.ttf');
}

function setup() {
  console.log("setup", myFont)
  textFont(myFont);
  frameRate(60);
  textSize(scl / 2); // Set the text size

  createCanvas(windowWidth, windowHeight); // Use 2D rendering
  const w = windowWidth;
  const h = windowHeight;
  let extraWidth = 200; // Extra width to extend beyond the visible area
  cols = Math.floor((windowWidth + extraWidth) / scl);
  rows = Math.floor(h / scl);
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
  background(220);
  translate(0, 20); // Adjust the second argument to move the terrain lower or higher
//   / Draw the clouds


// }

push()
// Draw the terrain
// Initialize noise parameters
let noiseScale = 0.1; // Adjust this value to change the scale of the noise
// Initialize a 2D array for the heights
let heights = Array(cols).fill().map(() => Array(rows).fill(0));

// Calculate the heights
for (let x = 0; x < cols; x++) {
  for (let y = 0; y < rows; y++) {
    let noiseVal = noise(x * noiseScale, y * noiseScale);
    heights[x][y] = map(noiseVal, 0, 1, -100, 100);
  }
}

for (let x = 0; x < cols - 1; x++) {
    for (let y = 0; y < rows - 1; y++) {
      let size = map(y, 0, rows, scl / 2, scl);
      let posX = x * size;
      let posY = map(y, 0, rows, height / 2, height);
  
      // Calculate the color based on the height
      let avgHeight = (heights[x][y] + heights[x+1][y] + heights[x][y+1] + heights[x+1][y+1]) / 4;
      let colorVal = map(avgHeight, -100, 100, 0, 255); // Map the height to a value between 0 and 255
  
      // Interpolate the heights
      let h1 = lerp(heights[x][y], heights[x+1][y], 0.5);
      let h2 = lerp(heights[x][y+1], heights[x+1][y+1], 0.5);
  
      // Set the color and draw two triangles to form a square
      fill(colorVal);
      triangle(posX, posY + size + h1, posX + size / 2, posY + heights[x+1][y], posX + size, posY + size + h2);
      triangle(posX, posY + size + h1, posX + size / 2, posY + heights[x+1][y], posX, posY + heights[x][y]);
    }
    pop()
  }
}
// for (let x = 0; x < cols - 1; x++) {
//     for (let y = 0; y < rows - 1; y++) {
//       let size = map(y, 0, rows, scl / 2, scl);
//       let posX = x * size;
//       let posY = map(y, 0, rows, height / 2, height);
  
//       // Calculate the color based on the height
//       let avgHeight = (heights[x][y] + heights[x+1][y] + heights[x][y+1] + heights[x+1][y+1]) / 4;
//       let colorVal = map(avgHeight, -100, 100, 0, 255); // Map the height to a value between 0 and 255
  
//       // Set the color and draw two triangles to form a square
//       fill(colorVal);
//       triangle(posX, posY + heights[x][y], posX + size / 2, posY + size + heights[x+1][y+1], posX + size, posY + heights[x+1][y]);
//       triangle(posX, posY + heights[x][y], posX + size / 2, posY + size + heights[x+1][y+1], posX, posY + size + heights[x][y+1]);
//     }
//   }
