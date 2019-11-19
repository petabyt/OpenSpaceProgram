// Game variables
var game = {
	zoom: 1, // Zoom level of the game
	currentlyControlling: "Explorer", // Name of spacecraft currently controlling,
	cameraX: 0,
	cameraY: 0,
	mx: 0, // Mouse X and Y
	my: 0
}

// Current spacecrafts
var spacecrafts = {
	"Explorer": {
		"x": 0, // Where the rocket is drawn on the screen, not the whole universe
		"y": 0,
		"rotation": 40,
		"rotateVel": 0,
		"xVel": 0, // Rotation for this rocket
		"yVel": 0,
		"forwardVel": 0,
		parts: [
			["module"],
			["fueltank"],
			["engine"],
			["seperator"],
			["fueltank"],
			["engine"]
		]
	},
	"Sat": {
		"x": 400, // Where the rocket is drawn on the screen, not the whole universe
		"y": 400,
		"rotation": 0,
		"rotateVel": 0,
		"xVel": 0, // Rotation for this rocket
		"yVel": 0,
		"forwardVel": 0,
		parts: [
			["roboModule"],
			["solarpanel", {
				"open": "onOpen"
			}]
		]
	}
};

// Planets to render
var planets = [
	{
		"name": "Earth",
		"color": "green", // Temporary, will use images later
		"gravity": -0.7,
		"radius": 500,
		"x": -500 + game.cameraX,
		"y": -500 + game.cameraY
	}
];

// Update location relative to camera
setInterval(function() {
		planets[0].x = -500 + game.cameraX;
		planets[0].y = -500 + game.cameraY;
		spacecrafts["Sat"].x = 200 + game.cameraX;
		spacecrafts["Sat"].y = 200 + game.cameraY;
}, 1)

// Dimensions and stuff for each part
var partsProp = {
	"fueltank": {
		"width": 50,
		"height": 50,
		"category": "tanks",
		"image": "tank",
		"properties": {
			"capacity": 100
		},
		"desc":"A big box with fuel in it."
	},
	"engine": {
		"width": 25,
		"height": 25,
		"category": "engines",
		"image": "engine",
		"properties": {
			"power": 5
		},
		"desc":"An engine powerful enough to lift a rocket info space, and beyond."
	},
	"module": {
		"width": 50,
		"height": 50,
		"category": "command",
		"image": "module",
		"properties": {
			"people": 1,
			"charge": 100
		},
		"desc":"A command module for astronauts."
	},
	"roboModule": {
		"width": 50,
		"height": 50,
		"category": "computer",
		"image": "roboModule",
		"properties": {
			"charge": 100,
		},
		"desc": "A simple computer designed to communicate with earth."
	},
	"seperator": {
		"width": 50,
		"height": 10,
		"category": "seperators",
		"image": "seperator",
		"properties": {
			"explosion": 5,
		},
		"desc": "A connector that uses a small explosion to detach two peices of a spacecraft."
	},
	"solarpanel": {
		"width": 50,
		"height": 50,
		"category": "solarpanels",
		"image": "solarpanel",
		"properties": {
			"onOpen": ["image", "solarpanel-open"]
		}
	}
}