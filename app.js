// let yoff = 0.0; // 2nd dimension of perlin noise
// const waves = 50;
// const hills = 5; // Number of hills
// const wavesPerHill = 10; // Number of circles per hill
// let colors;  //Array.from({length: hills * wavesPerHill}, () => getRandomColor());
// let amplitudes;// = Array.from({length: hills * wavesPerHill}, () => random(20, 50)); // Decreased amplitude for more detail


// function getRandomColor() {
//     var r = Math.floor(Math.random() * 256); // Random between 0-255
//     var g = Math.floor(Math.random() * 256); // Random between 0-255
//     var b = Math.floor(Math.random() * 256); // Random between 0-255
//     return 'rgb(' + r + ',' + g + ',' + b + ')'; // Collect all to a rgb color string
// }


// function setup() {
//   createCanvas(windowWidth, windowHeight);
// //   colors  = Array.from({length: waves}, () => getRandomColor());
// //  colors = Array.from({length: waves}, (_, i) => 255 - i * 25); // Shades of gray that get lighter as they go farther away    
// //   amplitudes = Array.from({length: waves}, () => Math.random(100, 300)); // Increased amplitude for more extreme curves
//  colors = Array.from({length: hills * wavesPerHill}, () => getRandomColor());
//  amplitudes = Array.from({length: hills * wavesPerHill}, () => random(20, 50)); // Decreased amplitude for more detail
// }

// function draw() {
//     background(0);
//     noFill();

//     for (let h = 0; h < hills; h++) {
//       let hillCenterX = random(width);
//       let hillCenterY = random(height);
//       let hillYoff = yoff + h; // Separate Perlin noise offset for each hill

//       for (let i = 0; i < wavesPerHill; i++) {
//         stroke(colors[h * wavesPerHill + i]);
//         beginShape();
//         let xoff = 0;
//         for (let a = 0; a < TWO_PI; a += 0.1) { // Use angle instead of x position
//           let r = map(noise(xoff, hillYoff), 0, 1, 100 + i * 20, 150 + i * 20 + amplitudes[h * wavesPerHill + i]); // Adjusted range for more lines and detail
//           let x = hillCenterX + r * cos(a);
//           let y = hillCenterY + r * sin(a);
//           vertex(x, y);
//           xoff += 0.000005;
//         }
//         hillYoff += 0.000005; // Adjusted increment for slower animation
//         endShape(CLOSE);
//       }
//     }
//     yoff += 0.005;
//   }

var terrainValues = [];
var mult = 100;
var xoff = 0;
var yoff = 0;
var inc = 0.1;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);

    for (var y = 0; y < 60; y++) {
        terrainValues.push([]);
        xoff = 0;
        for (var x = 0; x < 60; x++) {
            terrainValues[y][x] = map(noise(xoff, yoff), 0, 1, -mult, mult);
            xoff = xoff + inc;
        }
        yoff = yoff + inc;
    }
}

function draw() {
    background(0);

    stroke(255);
    strokeWeight(0.5);
    noFill();

    rotateX(65);
    translate(-width / 2, -height / 2);
    for (var y = 0; y < 60; y++) {
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < 60; x++) {
            vertex(x * 10, y * 10, terrainValues[y][y]);
            vertex(x * 10, (y + 1) * 10, terrainValues[y][x]);
        }
        endShape();
    }
}
