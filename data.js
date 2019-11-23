// Game variables
var game = {
	zoom: 1, // Zoom level of the game
	currentlyControlling: "Explorer", // Name of spacecraft currently controlling,
	currentRoom: "editor",
	currentRoomLoop: null, // current SetInterval for the room loop
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
		"rx": 200, // Real X + Y, in the world
		"ry": 200,
		"rotation": 0,
		"rotateVel": 0,
		"xVel": 0, // Rotation for this rocket
		"yVel": 0,
		"forwardVel": 0,
		parts: [
			["module"],
			["engine"],
			["seperator"],
			["engine"],
			["seperator"],
			["engine"],
			["seperator"],
			["engine"]
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
		"rx": -500,
		"ry": -500,
		"x": 0,
		"y": 0
	}
];

// Update location relative to camera
setInterval(function() {
		planets[0].x = planets[0].rx + game.cameraX;
		planets[0].y = planets[0].ry + game.cameraY;
}, 1);

// Dimensions and stuff for each part
var partsProp = {
	"fueltank": {
		"width": 50,
		"height": 50,
		"category": "Fuel Tanks",
		"image": "tank",
		"properties": {
			"capacity": 100
		},
		"desc":"A big box with fuel in it."
	},
	"engine": {
		"width": 25,
		"height": 25,
		"category": "Engines",
		"image": "engine",
		"properties": {
			"power": 5
		},
		"desc":"An engine powerful enough to lift a rocket info space, and beyond."
	},
	"module": {
		"width": 50,
		"height": 50,
		"category": "Modules",
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
		"category": "Computers",
		"image": "roboModule",
		"properties": {
			"charge": 100,
		},
		"desc": "A simple computer designed to communicate with earth."
	},
	"seperator": {
		"width": 50,
		"height": 10,
		"category": "Seperators",
		"image": "seperator",
		"properties": {
			"explosion": 5,
		},
		"desc": "A connector that uses a small explosion to detach two peices of a spacecraft."
	},
	"solarpanel": {
		"width": 50,
		"height": 50,
		"category": "Solar Panels",
		"image": "solarpanel",
		"properties": {
			"onOpen": ["image", "solarpanel-open"]
		}
	}
};

var categories = [
	"Fuel Tanks",
	"Engines",
	"Modules",
	"Computers",
	"Seperators",
	"Solar Panels"
];