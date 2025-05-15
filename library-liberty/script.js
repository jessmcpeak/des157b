function sketch1(p) {
    let starCenterX = 420;
    let starCenterY = 250;
    const starRadius = 30;
    let starColor;
    let theta = 0;
    const thetaChange = 0.03;
    const haloRadius = starRadius + 10;
    let tailColor;

    p.setup = function() {
        const canvas1 = p.createCanvas(500, 500);
        canvas1.parent(`sketch1`);
    
        p.ellipseMode(p.RADIUS);
    
        starColor = p.color(220, 255, 255);
        tailColor = p.color(0, 255, 255);
    }

    p.draw = function() {
        p.background(0, 0, 0);
        starBackground(50);
        
        //draw tail
        drawTail(starCenterX, starCenterY, haloRadius, tailColor);
        
        //draw star
        p.fill(starColor);
        p.ellipse(starCenterX, starCenterY, starRadius + p.random(starRadius * -0.01, starRadius * 0.01), starRadius + p.random(starRadius * -0.01, starRadius * 0.01));
        
        //move star
        starCenterY = (p.height / 2) + (100 * p.sin(theta));
        theta = theta + thetaChange;
        
        //update colors
        tailColor = newColor(tailColor, 1);
    }

    function starBackground(starNumber) {
        p.fill(255, 255, 255);
        p.noStroke();
    
        let starCounter = 0;
        while (starCounter < starNumber) {
            p.ellipse(p.random(0, p.width), p.random(0, p.height), 1, 1);
            starCounter++;
        }
    }
    
    function drawTail(tailCenterX, tailCenterY, tailRadius, tailColor) {
        let tailTheta = theta;
        p.fill(tailColor);
        p.noStroke();
        while (tailRadius > 0) {
            p.ellipse(tailCenterX, tailCenterY, tailRadius, tailRadius);
            tailCenterX = tailCenterX - 9.5;
            tailCenterY = (p.height / 2) + (100 * p.sin(tailTheta - thetaChange));
            tailRadius = tailRadius - 1;
            tailTheta = tailTheta - thetaChange;
        }
    }
    
    function newColor(startColor, colorChangeSpeed) {
        //test if red, transition to yellow
        if (p.red(startColor) == 255 && p.green(startColor) < 255 && p.blue(startColor) == 0) {
            return p.color(p.red(startColor), p.green(startColor) + colorChangeSpeed, p.blue(startColor));
        }
        //test if yellow, transition to green
        else if (p.red(startColor) > 0 && p.green(startColor) == 255 && p.blue(startColor) == 0) {
            return p.color(p.red(startColor) - colorChangeSpeed, p.green(startColor), p.blue(startColor));
        }
        //test if green, transition to cyan
        else if (p.red(startColor) == 0 && p.green(startColor) == 255 && p.blue(startColor) < 255) {
            return p.color(p.red(startColor), p.green(startColor), p.blue(startColor) + colorChangeSpeed);
        }
        //test if cyan, transition to blue
        else if (p.red(startColor) == 0 && p.green(startColor) > 0 && p.blue(startColor) == 255) {
            return p.color(p.red(startColor), p.green(startColor) - colorChangeSpeed, p.blue(startColor));
        }
        //test if blue, transition to magenta
        else if (p.red(startColor) < 255 && p.green(startColor) == 0 && p.blue(startColor) == 255) {
            return p.color(p.red(startColor) + colorChangeSpeed, p.green(startColor), p.blue(startColor));
        }
        //test if magenta, transition to red
        else if (p.red(startColor) == 255 && p.green(startColor) == 0 && p.blue(startColor) > 0) {
            return p.color(p.red(startColor), p.green(startColor), p.blue(startColor) - colorChangeSpeed);
        }
        //return startColor
        else {
            return startColor;
        }
    }
}

new p5(sketch1);


function sketch2(p) {
     let theta = 0.0;
     let zoom = 100000.0;

    p.setup = function() {
        const canvas2 = p.createCanvas(500, 500);
        canvas2.parent(`sketch2`);
        
        p.ellipseMode(p.CENTER);
    }

    p.draw = function() {
        p.background(0, 0, 0);
        
        drawSpirals(zoom);
        drawSingularity(50);
        zoom = zoom * 0.99;
    }

    function drawSpirals(zoomFactor) {
        p.noFill();
        p.strokeWeight(5);
        p.stroke(255, 255, 255);
      
        while (theta < 500) {
            
            p.curve((p.width / 2.0) + ((theta - 0.1) * p.cos(theta - 0.1) * zoomFactor), (p.height / 2.0) + ((theta - 0.1) * p.sin(theta - 0.1) * zoomFactor),
            (p.width / 2.0) + ((theta + 0.0) * p.cos(theta + 0.0) * zoomFactor), (p.height / 2.0) + ((theta + 0.0) * p.sin(theta + 0.0) * zoomFactor),
            (p.width / 2.0) + ((theta + 0.1) * p.cos(theta + 0.1) * zoomFactor), (p.height / 2.0) + ((theta + 0.1) * p.sin(theta + 0.1) * zoomFactor),
            (p.width / 2.0) + ((theta + 0.2) * p.cos(theta + 0.2) * zoomFactor), (p.height / 2.0) + ((theta + 0.2) * p.sin(theta + 0.2) * zoomFactor));
            
            p.curve((p.width / 2.0) + ((theta - 0.1) * -p.cos(theta - 0.1) * zoomFactor), (p.height / 2.0) + ((theta - 0.1) * -p.sin(theta - 0.1) * zoomFactor),
            (p.width / 2.0) + ((theta + 0.0) * -p.cos(theta + 0.0) * zoomFactor), (p.height / 2.0) + ((theta + 0.0) * -p.sin(theta + 0.0) * zoomFactor),
            (p.width / 2.0) + ((theta + 0.1) * -p.cos(theta + 0.1) * zoomFactor), (p.height / 2.0) + ((theta + 0.1) * -p.sin(theta + 0.1) * zoomFactor),
            (p.width / 2.0) + ((theta + 0.2) * -p.cos(theta + 0.2) * zoomFactor), (p.height / 2.0) + ((theta + 0.2) * -p.sin(theta + 0.2) * zoomFactor));
        
            theta = theta + 0.1;
        }
      
      theta = 0;
    }

    function drawSingularity(radius) {
        p.fill(0, 0, 0);
        p.strokeWeight(2);
        p.stroke(255, 255, 255);
        
        p.ellipse(p.width/2.0, p.height/2.0, p.random(radius - 0.01, radius + 0.01), p.random(radius - 0.01, radius + 0.01));
    }
}

new p5(sketch2);


function sketch3(p) {
    let theta;

    p.setup = function() {
        const canvas3 = p.createCanvas(500, 500);
        canvas3.parent(`sketch3`);

        p.ellipseMode(p.RADIUS);

        theta = 200 * p.PI;
    }

    p.draw = function() {
        p.background(0, 0, 0);
        
        //Sun
        const sunRadiusX = 50;
        const sunRadiusY = 50;
        drawSun(sunRadiusX, sunRadiusY, p.color(255, 255, 255));
        
        //Mercury
        const orbitRadiusMercuryX = sunRadiusX + 2.576138462;
        const orbitRadiusMercuryY = sunRadiusY + 2.576138462;
        //drawOrbit(orbitRadiusMercuryX, orbitRadiusMercuryY);
        drawPlanet(orbitRadiusMercuryX, orbitRadiusMercuryY, 1, 4.152097306, p.color(255, 255, 255));
        
        //Venus
        const orbitRadiusVenusX = sunRadiusX + 4.814130943;
        const orbitRadiusVenusY = sunRadiusY + 4.814130943;
        //drawOrbit(orbitRadiusVenusX, orbitRadiusVenusY);
        drawPlanet(orbitRadiusVenusX, orbitRadiusVenusY, 1, 1.625545171, p.color(255, 255, 255));
        
        //Earth
        const orbitRadiusEarthX = sunRadiusX + 6.656136682;
        const orbitRadiusEarthY = sunRadiusY + 6.656136682;
        //drawOrbit(orbitRadiusEarthX, orbitRadiusEarthY);
        drawPlanet(orbitRadiusEarthX, orbitRadiusEarthY, 1, 1, p.color(255, 255, 255));
        
        //Mars
        const orbitRadiusMarsX = sunRadiusX + 10.13993015;
        const orbitRadiusMarsY = sunRadiusY + 10.13993015;
        //drawOrbit(orbitRadiusMarsX, orbitRadiusMarsY);
        drawPlanet(orbitRadiusMarsX, orbitRadiusMarsY, 1, 0.5319148936, p.color(255, 255, 255));
        
        //Jupiter
        const orbitRadiusJupiterX = sunRadiusX + 34.64216591;
        const orbitRadiusJupiterY = sunRadiusY + 34.64216591;
        //drawOrbit(orbitRadiusJupiterX, orbitRadiusJupiterY);
        drawPlanet(orbitRadiusJupiterX, orbitRadiusJupiterY, 5.138134253, 0.08431703204, p.color(255, 255, 255));
        
        //Saturn
        const orbitRadiusSaturnX = sunRadiusX + 63.78056106;
        const orbitRadiusSaturnY = sunRadiusY + 63.78056106;
        //drawOrbit(orbitRadiusSaturnX, orbitRadiusSaturnY);
        drawPlanet(orbitRadiusSaturnX, orbitRadiusSaturnY, 4.331464712, 0.0339443313, p.color(255, 255, 255));
        
        //Uranus
        const orbitRadiusUranusX = sunRadiusX + 127.805833;
        const orbitRadiusUranusY = sunRadiusY + 127.805833;
        //drawOrbit(orbitRadiusUranusX, orbitRadiusUranusY);
        drawPlanet(orbitRadiusUranusX, orbitRadiusUranusY, 1.836926836, 0.01190334484, p.color(255, 255, 255));
        
        //Neptune
        const orbitRadiusNeptuneX = sunRadiusX + 200;
        const orbitRadiusNeptuneY = sunRadiusY + 200;
        //drawOrbit(orbitRadiusNeptuneX, orbitRadiusNeptuneY);
        drawPlanet(orbitRadiusNeptuneX, orbitRadiusNeptuneY, 1.779790139, 0.006068329389, p.color(255, 255, 255));
        
        theta = theta + 0.01;
    }

    function drawSun(sunRadiusX, sunRadiusY, sunColor) {
        p.fill(sunColor);
        p.noStroke();
        
        p.ellipse(p.width / 2, p.height / 2, sunRadiusX + p.random(-0.25, 0.25), sunRadiusY + p.random(-0.25, 0.25));
    }

/*     function drawOrbit(orbitRadiusX, orbitRadiusY) {
        p.noFill();
        p.strokeWeight(1);
        p.stroke(255, 255, 255);
        
        p.ellipse(width / 2, height / 2, orbitRadiusX, orbitRadiusY);
    } */

    function drawPlanet(orbitRadiusX, orbitRadiusY, planetRadius, planetSpeed, planetColor) {
        p.fill(planetColor);
        p.noStroke();
        
        p.ellipse((p.width / 2) + (orbitRadiusX * p.cos(planetSpeed * theta)), (p.height / 2) + (orbitRadiusY * p.sin(planetSpeed * theta)), planetRadius + p.random(-0.25, 0.25), planetRadius + p.random(-0.25, 0.25));
    }
}

new p5(sketch3);


function sketch4(p) {
    let theta = 10;

    //cursor data
    let historyMouseX = [];
    let historyMouseY = [];
    let cursorColor;
    const cursorRadius = 5;

    //star data
    let starColor;
    let starRadius = 50;
    let superNovaSpeed = 3;

    //black hole data
    const blackHoleRadius = 25;

    p.setup = function() {
        const canvas4 = p.createCanvas(500, 500);
        canvas4.parent(`sketch4`);

        p.noCursor();
        p.ellipseMode(p.RADIUS);

        cursorColor = p.color(255, 0, 0);
        starColor = p.color(255, 255, 255);
    }

    p.draw = function() {
        p.background(0, 0, 0);
        drawCursor();
        
        //draw planets
        drawPlanet(75, 3, 2, p.color(255, 255, 255));
        drawPlanet(100, 1.5, 2, p.color(255, 255, 255));
        drawPlanet(125, 1, 3, p.color(255, 255, 255));
        drawPlanet(160, 0.8, 7, p.color(255, 255, 255));
        drawPlanet(200, 0.75, 5, p.color(255, 255, 255));
        drawPlanet(150, 0.5, 3, p.color(255, 255, 255));
        
        //draw star
        drawStar(starRadius, starColor);
        
        //if cursor touches star, supernova then black hole
        if (p.mouseX + cursorRadius >= (p.width / 2) - starRadius && //right of cursor touches left of star
            p.mouseX - cursorRadius <= (p.width / 2) + starRadius && //left of cursor right touches right of star
            p.mouseY + cursorRadius >= (p.height / 2) - starRadius && //bottom of cursor touches top of star
            p.mouseY - cursorRadius <= (p.height / 2) + starRadius) { //top of cursor touches bottom of star
            p.background(0, 0, 0);
            starColor = p.color(255, 0, 0);
            drawStar(starRadius, starColor);
            starRadius = starRadius + superNovaSpeed;
            if (starRadius >= p.sqrt(p.sq(p.width) + p.sq(p.height))) {
                superNovaSpeed = superNovaSpeed * -1;
            } else if (starRadius <= 25) {
                superNovaSpeed = 0;
                
                p.fill(0, 0, 0);
               p.stroke(255, 255, 255);
                p.strokeWeight(2);
                
                p.ellipse(p.width / 2, p.height / 2, 25 + p.random(-1, 1), 25 + p.random(-1, 1));
            }
        }
        
        theta = theta + 0.01;
    }

    function drawCursor() {
        p.fill(cursorColor);
        p.noStroke();
        
        //save cursor travel data
        historyMouseX = p.append(historyMouseX, p.mouseX);
        historyMouseY = p.append(historyMouseY, p.mouseY);
        if (historyMouseX.length > 10) {
            historyMouseX = removeIndexZero(historyMouseX);
        }
        if (historyMouseY.length > 10) {
            historyMouseY = removeIndexZero(historyMouseY);
        }
        
        //draw tail
        let tailRadius = cursorRadius;
        for (let i = historyMouseX.length - 1; i >= 0; i--) {
            p.ellipse(historyMouseX[i], historyMouseY[i], tailRadius - (cursorRadius / 10), tailRadius - (cursorRadius / 10));
            tailRadius = tailRadius - (cursorRadius / 10);
        }
        
        //draw cursor
        p.ellipse(p.mouseX, p.mouseY, cursorRadius + p.random(-(cursorRadius / 10), cursorRadius / 10), cursorRadius + p.random(-(cursorRadius / 10), cursorRadius / 10));
    }

    function drawStar(radius, starColor) {
        p.fill(starColor);
        p.stroke(0, 0, 0);
        
        p.ellipse(p.width / 2, p.height / 2, starRadius + p.random(-(radius / 50), radius / 50), radius + p.random(-(radius / 50), starRadius / 50));
    }

    function drawPlanet(orbitRadius, orbitSpeed, planetRadius, planetColor) {
        p.fill(planetColor);
        p.noStroke();
        p.ellipse((p.width / 2) + (orbitRadius * p.cos(orbitSpeed * theta)), (p.height / 2) + (orbitRadius * p.sin(orbitSpeed * theta)), planetRadius, planetRadius);
    }

    function removeIndexZero(arrayOriginal) {
        const arrayCopy = [];
        p.arrayCopy(arrayOriginal, 1, arrayCopy, 0, arrayOriginal.length - 1);
        return arrayCopy;
    }
}

new p5(sketch4);