let starCenterX = 420;
let starCenterY = 250;

const starRadius = 30;

let starColor;

let theta = 0;
const thetaChange = 0.03;

const haloRadius = starRadius + 10;

let tailColor;


function setup() {
    const canvas1 = createCanvas(500, 500);
    canvas1.parent(`sketch1`);

    starColor = color(220, 255, 255);

    tailColor = color(0, 255, 255);
}

function draw() {
    background(0, 0, 0);
    starBackground(50);
    
    //draw tail
    drawTail(starCenterX, starCenterY, haloRadius, tailColor);
    
    //draw star
    fill(starColor);
    ellipse(starCenterX, starCenterY, starRadius + random(starRadius * -0.01, starRadius * 0.01), starRadius + random (starRadius * -0.01, starRadius * 0.01));
    
    //move star
    starCenterY = (height / 2) + (100 * sin(theta));
    theta = theta + thetaChange;
    
    //update colors
    tailColor = newColor(tailColor, 1);
}
  
function starBackground(starNumber) {
    fill(255, 255, 255);
    noStroke();

    let starCounter = 0;
    while (starCounter < starNumber) {
        ellipse(random(0, width), random(0, height), 1, 1);
        starCounter++;
    }
}
  
function drawTail(tailCenterX, tailCenterY, tailRadius, tailColor) {
    let tailTheta = theta;
    fill(tailColor);
    noStroke();
    while (tailRadius > 0) {
        ellipse(tailCenterX, tailCenterY, tailRadius, tailRadius);
        tailCenterX = tailCenterX - 9.5;
        tailCenterY = (height / 2) + (100 * sin(tailTheta - thetaChange));
        tailRadius = tailRadius - 1;
        tailTheta = tailTheta - thetaChange;
    }
}
  
function newColor(startColor, colorChangeSpeed) {
    //test if red, transition to yellow
    if (red(startColor) == 255 && green(startColor) < 255 && blue(startColor) == 0) {
        return color(red(startColor), green(startColor) + colorChangeSpeed, blue(startColor));
    }
    //test if yellow, transition to green
    else if (red(startColor) > 0 && green(startColor) == 255 && blue(startColor) == 0) {
        return color(red(startColor) - colorChangeSpeed, green(startColor), blue(startColor));
    }
    //test if green, transition to cyan
    else if (red(startColor) == 0 && green(startColor) == 255 && blue(startColor) < 255) {
        return color(red(startColor), green(startColor), blue(startColor) + colorChangeSpeed);
    }
    //test if cyan, transition to blue
    else if (red(startColor) == 0 && green(startColor) > 0 && blue(startColor) == 255) {
        return color(red(startColor), green(startColor) - colorChangeSpeed, blue(startColor));
    }
    //test if blue, transition to magenta
    else if (red(startColor) < 255 && green(startColor) == 0 && blue(startColor) == 255) {
        return color(red(startColor) + colorChangeSpeed, green(startColor), blue(startColor));
    }
    //test if magenta, transition to red
    else if (red(startColor) == 255 && green(startColor) == 0 && blue(startColor) > 0) {
        return color(red(startColor), green(startColor), blue(startColor) - colorChangeSpeed);
    }
    //return startColor
    else {
        return startColor;
    }
}

/* float starCenterX = 420;
float starCenterY = 250;

float starRadius = 30;

color starColor = color(220, 255, 255);

float theta = 0;
float thetaChange = 0.03;

float haloRadius = starRadius + 10;

color tailColor = color(0, 255, 255);

void setup() {
  size(500, 500);
  ellipseMode(RADIUS);
}

void draw() {
  background(0, 0, 0);
  starBackground(50);
  
  //draw tail
  drawTail(starCenterX, starCenterY, haloRadius, tailColor);
  
  //draw star
  fill(starColor);
  ellipse(starCenterX, starCenterY, starRadius + random(starRadius * -0.01, starRadius * 0.01), starRadius + random (starRadius * -0.01, starRadius * 0.01));
  
  //move star
  starCenterY = (height / 2) + (100 * sin(theta));
  theta = theta + thetaChange;
  
  //update colors
  tailColor = newColor(tailColor, 1);
}

void starBackground(int starNumber) {
  fill(255, 255, 255);
  noStroke();
  
  int starCounter = 0;
  while (starCounter < starNumber) {
    ellipse(random(0, width), random(0, height), 1, 1);
    starCounter++;
  }
  
}

void drawTail(float tailCenterX, float tailCenterY, float tailRadius, color tailColor) {
  float tailTheta = theta;
  fill(tailColor);
  noStroke();
  while (tailRadius > 0) {
    ellipse(tailCenterX, tailCenterY, tailRadius, tailRadius);
    tailCenterX = tailCenterX - 9.5;
    tailCenterY = (height / 2) + (100 * sin(tailTheta - thetaChange));
    tailRadius = tailRadius - 1;
    tailTheta = tailTheta - thetaChange;
  }
}

color newColor(color startColor, float colorChangeSpeed) {
  //test if red, transition to yellow
  if (red(startColor) == 255 && green(startColor) < 255 && blue(startColor) == 0) {
    return color(red(startColor), green(startColor) + colorChangeSpeed, blue(startColor));
  }
  //test if yellow, transition to green
  else if (red(startColor) > 0 && green(startColor) == 255 && blue(startColor) == 0) {
    return color(red(startColor) - colorChangeSpeed, green(startColor), blue(startColor));
  }
  //test if green, transition to cyan
  else if (red(startColor) == 0 && green(startColor) == 255 && blue(startColor) < 255) {
    return color(red(startColor), green(startColor), blue(startColor) + colorChangeSpeed);
  }
  //test if cyan, transition to blue
  else if (red(startColor) == 0 && green(startColor) > 0 && blue(startColor) == 255) {
    return color(red(startColor), green(startColor) - colorChangeSpeed, blue(startColor));
  }
  //test if blue, transition to magenta
  else if (red(startColor) < 255 && green(startColor) == 0 && blue(startColor) == 255) {
    return color(red(startColor) + colorChangeSpeed, green(startColor), blue(startColor));
  }
  //test if magenta, transition to red
  else if (red(startColor) == 255 && green(startColor) == 0 && blue(startColor) > 0) {
    return color(red(startColor), green(startColor), blue(startColor) - colorChangeSpeed);
  }
  //return startColor
  else {
    return startColor;
  }
}

void keyPressed() {
if (keyCode == ENTER) {
saveFrame("####.tif");
}
} */