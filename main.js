var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");

var fps = 0;
var currentFPS = 0;

// Start everything once the page has loaded
window.onload = function() {

	// Configure FPS counter
	setInterval(function() {
		currentFPS = Math.round(fps / 250 * 60);
		fps = 0;
	}, 1000);

	// Start a screen loop
	flight();
}

function spaceCraftEditor() {
	setInterval(function() {

		// Resize Canvas to page
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		// Clear page
		c.fillStyle = "lightblue";
		c.fillRect(0, 0, canvas.width, canvas.height);

		spacecrafts["Explorer"]["x"] = canvas.width / 2;
		spacecrafts["Explorer"]["y"] = canvas.height / 2;
		drawSpaceCraft("Explorer");
	}, 1)
}

// Show the flight screen
function flight() {
	setInterval(function() {

		// Resize Canvas to page
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Clear page
		c.fillStyle = "black";
		c.fillRect(0, 0, canvas.width, canvas.height);

		// Draw planets
		drawPlanets();

		// Default Spacecraft
		drawSpaceCraft("Explorer");

		// Physics Testing
		applyPhysics("Explorer");

		// Other background loops
		document.getElementById('ui').style.display = "block";
		document.getElementById('fps').innerHTML = currentFPS;
		document.getElementById('camerax').innerHTML = Math.round(game.cameraX);
		document.getElementById('cameray').innerHTML = Math.round(game.cameraY);
		document.getElementById('controlling').innerHTML = game.currentlyControlling;
		game.zoom = document.getElementById('zoom').value / 50;
		fps++
	}, 1);
}

function stabilize() {
	spacecrafts[game.currentlyControlling].xVel = 0;
	spacecrafts[game.currentlyControlling].yVel = 0;
	spacecrafts[game.currentlyControlling].rotateVel = 0;
}

// Document key detection
document.body.onkeydown = function(event) {
	var spacecraft = spacecrafts[game.currentlyControlling];
	if (event.key == "ArrowRight" || event.key == "d") {
		spacecraft.rotateVel += .05;
	} else if (event.key == "ArrowLeft" || event.key == "a") {
		spacecraft.rotateVel -= .05;
	} else if (event.key == "ArrowUp" || event.key == "w") {
		spacecraft.engineOn = true;
	} else {
		spacecraft.engineOn = false;
	}
}

// Stop Key down actions
document.body.onkeyup = function(event) {
	var spacecraft = spacecrafts[game.currentlyControlling];
	spacecraft.engineOn = false;
}

// Get height or width of a spacecraft
function getCraftDimensions(name, side) {
	var parts = spacecrafts[game.currentlyControlling].parts;

	var x = 0;
	for (var i = 0; i < parts.length; i++) {
		if (side == "width") {
			x += partsProp[parts[i]].width;
		} else if (side == "height") {
			x += partsProp[parts[i]].height;
		}
	}

	return x
}

// See if a spacecraft has a part with a certan category
function hasCategory(name, category) {
	var parts = spacecrafts[name].parts;

	var hasIt = false;
	for (var i = 0; i < parts.length; i++) {
		if (partsProp[parts[i][0]].category == category) {
			hasIt = true;
		}
	}
	return hasIt
}

function getMouse(event) {
	game.mx = event.clientX;
	game.my = event.clientY;
}