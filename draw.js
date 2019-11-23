// Draw a specific spacecraft
function drawSpaceCraft(name) {
	var spacecraft = spacecrafts[name];
	var parts = spacecraft.parts;

	// To know where the craft will go
	var x = spacecraft["x"];
	var y = spacecraft["y"];

	// Draw parts of craft in order
	var nextXY = [x, y]; // X and Y for next part to be drawn
	for (var i = 0; i < parts.length; i++) {
		var currentPart = parts[i][0]; // Current part, with or without properties
		var partProp = partsProp[currentPart]; // To partsProp for current part
		var image = partProp["image"]; // The image to be drawn for the part

		// Custom part interaction controller
		if (parts[i].length > 1) {
			if (parts[i][1].open !== false) {
				var control = partProp.properties[parts[i][1].open];

				if (control[0] == "image") {
					image = control[1];
				}
			}	
		}

		var image = document.getElementById(image); // Load image from html document
		var center = (50 - partProp.height) / 2 / game.zoom; // Center elements smaller than 50

		// Draw rotated part
		drawPart(
			image, 
			nextXY[0] + (50 - partProp["width"]) / 2 / game.zoom, // Add offset for current part
			nextXY[1] + (50 - partProp["height"]) / 2 / game.zoom, 
			partProp.width / game.zoom, 
			partProp.height / game.zoom, 
			spacecraft["rotation"]
		);

		// // Rotating Box around part (for testing)
		// c.fillStyle = "white";
		// c.fillRect(
		// 	nextXY[0], 
		// 	nextXY[1], 
		// 	10, 
		// 	10, 
		// );

		// Calculate rotation formulas for the next part
		var nextSize = [];
		if (i !== parts.length - 2) {

			// Move parts up if the next one is smaller than 50,50
			var offsetX = 0;
			var offsetY = 0;
			if (i + 1 !== parts.length) {
				var width = partsProp[parts[i + 1]].width;
				var height = partsProp[parts[i + 1]].height;
				if (width !== 50) {
					offsetX = -(50 - width) / 2;
				}
				if (height !== 50) {
					offsetY = -(50 - height) / 2;
				}
			}

			// Move parts down if the previous one is smaller than 50,50
			if (i !== 0) {
				var width = partProp.width;
				var height = partProp.height;
				if (width !== 50) {
					offsetX = (50 - width) / 2;
				}
				if (height !== 50) {
					offsetY = (50 - height) / 2;
					if (partProp.width > partProp.height) {
						offsetY += (50 - partProp.height) / 2;
					}
				}
			}

			nextSize[0] = partProp.width + offsetX;
			nextSize[1] = partProp.height + offsetY;
		} else {
			var width = partsProp[parts[i + 1][0]].width;
			var height = partsProp[parts[i + 1][0]].height;

			nextSize[0] = width + (50 - width) / 2;
			nextSize[1] = height + (50 - height) / 2;
		}

		// Get where part should go with the rotation (formula name)
		dx = nextSize[0] / game.zoom * Math.cos((spacecraft["rotation"] + 90) * Math.PI / 180);
		dy = nextSize[1] / game.zoom * Math.sin((spacecraft["rotation"] + 90) * Math.PI / 180);

		// Tell next part to go before the last one
		nextXY[0] += dx;
		nextXY[1] += dy;
	}
}

// Draw part with properties, and test for mouse
function drawPart(img, x, y, w, h, rotation) {
	c.save();
	c.translate(x + w / 2, y + h / 2);
	c.rotate(rotation * Math.PI / 180);
	c.translate(-x - w / 2, -y - h / 2);
	c.drawImage(img, x, y, w, h);
	c.restore();

	var mouseOn = false;
	c.beginPath();
	c.rect(x, y, w, h);  // Set area for part
	if (c.isPointInPath(game.mx, game.my)) {
		drawRotated(x, y, w, h, rotation, function() {
			c.strokeStyle = "white";
			c.strokeRect(x, y, w, h);
		});
		mouseOn = true;
	}
	c.setTransform(1,0,0,1,0,0);  // Reset the transformation

	return {
		mouseOn: mouseOn
	}
}

// Function to draw a rotated thing.
//Use like: drawRotated(10, 10, 10, 10, 40, function() {drawImage(x, y, w, h)})
function drawRotated(x, y, w, h, rotation, code) {
	c.save();
	c.translate(x + w / 2, y + h / 2);
	c.rotate(rotation * Math.PI / 180);
	c.translate(-x - w / 2, -y - h / 2);
	code();
	c.restore();
}

function drawPlanets() {
	for (var i = 0; i < planets.length; i++) {
		// Draw sphere as whole
		c.beginPath;
		c.fillStyle = planets[i].color;
		c.arc(planets[i].x, planets[i].y, planets[i].radius / game.zoom, 0, 180 * Math.PI);
		c.fill();
	}
}