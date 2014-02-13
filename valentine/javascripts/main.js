//
// global variables
//

var minWidth = 100;
var minHeight = 100;
var maxWidth = 2000;
var maxHeight = 2000;

var lightOutterRadius = 128.0;
var maskRadius = maxWidth;

var loader, stage, data;

//
// canvas width and height
//

function getCanvasWidth()
{
	if (window.innerWidth < minWidth)
		return minWidth;
	if (window.innerWidth > maxWidth)
		return maxWidth
	return window.innerWidth;
}

function getCanvasHeight()
{
	if (window.innerHeight < minHeight)
		return minHeight;
	if (window.innerHeight > maxHeight)
		return maxHeight
	return window.innerHeight;
}

//
// entry point
//

function init() {
	stage = new createjs.Stage("gameCanvas");
	
	manifest = [
		{src:"valentine/images/player.png", id:"player"},
	];
	loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
	
	data = new Data();
	initInput();
}

function initInput()
{
	stage.on("stagemousedown", function(event)
		{
			console.log("the canvas was clicked at " + data.toX(event.stageX) +","+ data.toY(event.stageY) + " player(" + data.player.x + ',' + data.player.y + ')');
			data.player.setDest(data.toX(event.stageX), data.toY(event.stageY));
		}
	);
}

function handleComplete()
{
	createText();
	createPlayer();
	createLightMask();
	
	createjs.Ticker.on("tick", update);
	createjs.Ticker.setFPS(60);
}

function createText()
{
	var text = new createjs.Text("亲爱的大狸子", "bold 20px Arial, 微软雅黑, sans-serif", "#ff7700");
	text.x = data.player.getScreenX();
	text.y = data.player.getScreenY();
	stage.addChild(text);
}

function createPlayer()
{
	var walkSpeed = 0.05;
	var spritesheet = new createjs.SpriteSheet({
		"images": [loader.getResult("player")],
		"frames": {'width' : 32, 'height' : 32, regX : 16, regY : 16},
		"animations": {
			"walk2": {
				frames : [1, 0, 1, 2],
				next : "walk2",
				speed : walkSpeed
			},
			"walk4": {
				frames : [4, 3, 4, 5],
				next : "walk4",
				speed : walkSpeed
			},
			"walk6": {
				frames : [7, 6, 7, 8],
				next : "walk6",
				speed : walkSpeed
			},
			"walk8": {
				frames : [10, 9, 10, 11],
				next : "walk8",
				speed : walkSpeed
			},
			"stand2" : { frames : [1]},
			"stand4" : { frames : [4]},
			"stand6" : { frames : [7]},
			"stand8" : { frames : [10]},
		}
	});
	var player = new createjs.Sprite(spritesheet, "stand2");
	player.name = 'player';
	
	stage.addChild(player);
}

function createLightMask()
{
	var lightMask = new createjs.Shape();
	lightMask.name = 'lightMask';
	lightMask.graphics.beginRadialGradientFill(
		["rgba(0,0,0,0.0)", "rgba(0,0,0,1.0)", "rgba(0,0,0,1.0)"],
		[0.0, lightOutterRadius / maskRadius, 1],
		0, 0, 0,
		0, 0, maskRadius
	);
	lightMask.graphics.drawCircle(0, 0, maskRadius);
	stage.addChild(lightMask);
}

function circleSample()
{
	circle = new createjs.Shape();
	//circle.graphics.beginFill("rgba(0,0,0,1.0)").drawRect(-200, -200, 400, 400);
	//circle.graphics.beginFill("rgba(255,0,0,0.5)").drawCircle(0, 0, 40);
	circle.graphics.beginRadialGradientFill(
		["rgba(0,0,0,0.0)", "rgba(0,0,0,1.0)"],
		[0, 1],
		0, 0, 0,
		0, 0, 40
	);
	circle.graphics.drawCircle(0, 0, 40);
	circle.y = 50;
	circle.compositeOperation = 'XOR';
	stage.addChild(circle);

}

//
// update on every frame
//

function update(event) {
	// update data
	data.player.update();
	
	// resize the canvas
	stage.canvas.width  = getCanvasWidth();
	stage.canvas.height = getCanvasHeight();

	// circle.x = circle.x + 5;
	// if (circle.x > stage.canvas.width) { circle.x = 0; }
	var player = stage.getChildByName('player');
	var lightMask = stage.getChildByName('lightMask');
	var updateAnimation = false;
	player.x = lightMask.x = data.player.getScreenX();
	player.y = lightMask.y = data.player.getScreenY();
	if (data.player.dir != player.dir)
	{
		updateAnimation = true;
		player.dir = data.player.dir;
	}
	if (player.isMoving != data.player.isMoving())
	{
		updateAnimation = true;
		player.isMoving = data.player.isMoving();
	}
	if (updateAnimation)
	{
		var animationName = player.isMoving ? 'walk' : 'stand';
		animationName += player.dir;
		player.gotoAndPlay(animationName);
	}
	
	stage.update(event); // important!!
}

