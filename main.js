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

	// Add initial items to builder GUI
	// Fill side menu with categories
	for (var i = 0; i < categories.length; i++) {
		document.getElementById('rocketBuilder').innerHTML += `
			<div class='category' category='` + categories[i] + `'>
				<p class='heading'>` + categories[i] + `:</p>
			</div>
		`
	}

	// Add images to the categories
	var parts = Object.entries(partsProp);
	for (var i = 0; i < parts.length; i++) {
		var current = parts[i][1];
		var category = document.querySelectorAll("[category='" + current.category + "']");

		// Add clickable image to the category
		category[0].innerHTML += `
			<img src="images/` + current.image + `.png" title="` + parts[i][0] + `" part="` + parts[i][0] + `">
		`;
	}

	// Start game
	updateRoom();
}

// Very simple function to change room from editor to flight. Not very good method, but will do for now
function switchRoom() {
	if (game.currentRoom == "flight") {
		game.currentRoom = "editor";
	} else if (game.currentRoom == "editor") {
		game.currentRoom = "flight";
	}

	updateRoom();
}

// Start a screen loop according to game.currentRoom. This method is also outdated, but will do for now
function updateRoom() {
	clearInterval(game.currentRoomLoop);
	eval(game.currentRoom)();
	if (game.currentRoom == "flight") {
		document.getElementById("switchRoom").innerHTML = "Edit Craft";
	} else if (game.currentRoom == "editor") {
		document.getElementById("switchRoom").innerHTML = "Lunch!"; // Yes, this is intentional
	}

	// Hide all GUI divs
	document.getElementById('rocketBuilder').style.display = "none";
	document.getElementById('stats').style.display = "none";
}

// Render a spacecraft builder
function editor() {
	game.currentRoomLoop = setInterval(function() {

		// Resize Canvas to page
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		document.getElementById('rocketBuilder').style.display = "block";
		
		// Clear page
		c.fillStyle = "lightblue";
		c.fillRect(0, 0, canvas.width, canvas.height);

		// Draw the current spacecraft
		spacecrafts[game.currentlyControlling]["x"] = 600;
		spacecrafts[game.currentlyControlling]["y"] = canvas.height / 2 - getCraftDimensions("Explorer", "height") / 2;
		drawSpaceCraft(game.currentlyControlling);
	}, 1);
}

// Show the flight screen
function flight() {
	game.currentRoomLoop = setInterval(function() {

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
		document.getElementById('stats').style.display = "block";
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