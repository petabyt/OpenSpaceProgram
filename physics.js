// Rocket Physics Engine
function applyPhysics(name) {
	var spacecraft = spacecrafts[name];
	var parts = spacecraft.parts;

	spacecraft.x = canvas.width/2;
	spacecraft.y = canvas.height/2.2;

	var hasComputer = hasCategory(name, "Computers");
	var hasEngine = hasCategory(name, "Engines");

	// Use 360 rotation only
	if (spacecraft.rotation > 360) {
		spacecraft.rotation = 0;
	} else if (spacecraft.rotation < -360) {
		spacecraft.rotation = 360;
	}

	// Use velocity or be stable
	if (hasComputer == false) {
		spacecraft.rotation += spacecraft.rotateVel;
	} else {
		// Calculate spacecraft weight/height (hasn't been done)
		spacecraft.rotation = spacecraft.rotateVel * 20;
	}

	if (hasEngine) {
		if (spacecraft.engineOn) {
			spacecraft.forwardVel += 5 / 1e5;

			spacecraft.xVel += spacecraft.forwardVel * Math.sin(spacecraft.rotation * Math.PI / 180);
			spacecraft.yVel += spacecraft.forwardVel * Math.cos(spacecraft.rotation * Math.PI / 180);
		}

		game.cameraX -= spacecraft.xVel
		game.cameraY += spacecraft.yVel;
	}
}

// Function to move spacecraft in a circle (for demonstration)
function move(name) {
	var spacecraft = spacecrafts[name];
	var r = 50; // Radius of orbit
	var a = 500; // X
	var b = 500; // Y

	var x = 90;
	var interval = setInterval(function() {
		x += (Math.PI * 180) + .01; // Change angle and increase x

		game.cameraX = a + r * Math.cos(x);
		game.cameraY = b + r * Math.sin(x);
		
	}, 10);
}