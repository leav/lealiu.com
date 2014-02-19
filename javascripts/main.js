//
// globals
//
var local;
var stage, slideshowData;

//
// init
//
function init()
{
	local = (window.location.protocol == 'file:');
	console.log('local = ' + local);
	
	// hashtag test
	console.log('hashtag: ' + window.location.hash);
	
	stage = new createjs.Stage("mainCanvas");
	createjs.Touch.enable(stage);

	slideshowData = {container: new createjs.Container(), bitmaps: [], index: -1, interval: 20, count: 0};
	slideshowData.container.x = 304;
	slideshowData.container.y = 159;
	slideshowData.container.scaleX = slideshowData.container.scaleY = 0.167;
	
	loadChamber();
	
	createjs.Ticker.setFPS(20);
	createjs.Ticker.addEventListener("tick", update);
}

function loadChamber()
{
	var preload = new createjs.LoadQueue(!local); // use tag loading if local
	preload.on("fileload", function(event){
		console.log(event.item.src + ' loaded!')
		var bitmap = new createjs.Bitmap(event.result);
		stage.addChild(bitmap);
		bitmap.alpha = 0.0;
		fadeIn(bitmap);
		stage.addChild(slideshowData.container); // so the slideshow is rendered after chamber
		loadSlideShow();
	});
	preload.loadFile('designs/chamber.jpg');
}

function loadSlideShow()
{
	var preload = new createjs.LoadQueue(!local); // use tag loading if local
	var folder = 'designs/'
	var manifest = [
		{src: folder + 'slideshow0.jpg', id:'slideshow0'},
		{src: folder + 'slideshow1.jpg', id:'slideshow1'},
		{src: folder + 'slideshow2.jpg', id:'slideshow2'},
		{src: folder + 'slideshow3.jpg', id:'slideshow3'},
		{src: folder + 'slideshow4.jpg', id:'slideshow4'},
		{src: folder + 'slideshow5.jpg', id:'slideshow5'},
	];
	preload.on("fileload", handleFileLoad);
	preload.on("complete", handleComplete);
	preload.loadManifest(manifest);
}

function handleFileLoad(event)
{
	console.log(event.item.src + ' loaded!')
	var bitmap = new createjs.Bitmap(event.result);
	bitmap.alpha = 0.0;
	slideshowData.bitmaps.push(bitmap);
	slideshowData.container.addChild(bitmap);
}

function handleComplete(event)
{
	console.log('load complete!')
}

//
// update
//
function update(event)
{
	if (slideshowData.bitmaps.length > 0)
	{
		if (slideshowData.index == -1)
		{
			slideshowData.index = 0;
			fadeIn(slideshowData.bitmaps[0]);
		}
		else
		{
			slideshowData.count++;
			if (slideshowData.count > slideshowData.interval)
			{
				slideshowData.count = 0;
				fadeOut(slideshowData.bitmaps[slideshowData.index]);
				slideshowData.index = (slideshowData.index + 1) % slideshowData.bitmaps.length;
				fadeIn(slideshowData.bitmaps[slideshowData.index]);
			}
		}
	}
	
	stage.update();
}

function fadeIn(object)
{
	createjs.Tween.get(object).to({alpha:1.0}, 200, createjs.Ease.get(1));
}

function fadeOut(object)
{
	createjs.Tween.get(object).to({alpha:0.0}, 200, createjs.Ease.get(-1));
}



		// createjs.Tween.get(circle, {loop:true}, true) // get a new tween targeting circle
			// .to({x:500,y:200,alpha:0.1},1000,createjs.Ease.get(1)) // tween x/y/alpha properties over 1s (1000ms) with ease out
			// .to({x:0},1000,createjs.Ease.get(-1)) // tween x over 0.5s with ease in
			// .to({y:400}) // jump to new y property (defaults to a duration of 0)
			// .call(console.log, ["wait..."], console) // call console.log("wait...")
			// .wait(800) // wait for 0.8s
			// .to({y:0,alpha:1},300) // tween y/alpha over 0.3s
			// .call(console.log, ["done!"],console) // call console.log("done!");
