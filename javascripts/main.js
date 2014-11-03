//
// globals
//
var $local;
var $stage, $slideshowData, $sceneManager, $log;
// assets.js: $assets, $tags

//
// init
//
function init() {
	$log = new ConsoleLogger();
	
	$local = (window.location.protocol == 'file:');
	$log.debug('$local = ' + $local);
	
	// create menu state
	// $menuStage = new createjs.Stage('menuCanvas');
	// $menuStage.enableMouseOver();
	
	// create stage
	$stage = new createjs.Stage('mainCanvas');
	$stage.enableMouseOver();
	
	// create layers
	createLayers();
	
	// create state machine
	$state = new StateMachine();
	defineState($state);
	
	// create background
	$background = new Background();
	$backgroundLayer.addChild($background);
	
	// create Menu
	$menuLayer.addChild(new Menu());
	
	// create Gallery
	$contentLayer.addChild(new Gallery());
	
	// create About
	$contentLayer.addChild(new About());

	// create Works
	$contentLayer.addChild(new Works());
	
	// create Contact
	$contentLayer.addChild(new Contact());

	// hashtag
	loadPageWithHash(window.location.hash);
	window.addEventListener('hashchange', onHashChange);
	
	// update
	createjs.Ticker.setFPS(20);
	createjs.Ticker.addEventListener("tick", onUpdate);
}

function createLayers() {
	$log.debug('createLayers()');
	$backgroundLayer = new createjs.Container();
	$stage.addChild($backgroundLayer);
	$imageLayer = new createjs.Container();
	$stage.addChild($imageLayer);
	$menuLayer = new createjs.Container();
	$stage.addChild($menuLayer);
	$contentLayer = new createjs.Container();
	$stage.addChild($contentLayer);
}

var $noReloading = false;

function setHashTagWithoutReloading() {
	var args = Array.prototype.slice.call(arguments, 0);
	var hash = "#!:" + args.join('/');
	if (window.location.hash != hash)
	{
		$noReloading = true;
		window.location.hash = hash;
	}
}

function onHashChange() {
	$log.debug('hash change');
	loadPageWithHash(window.location.hash)
}

function loadPageWithHash(hashtag) {
	if ($noReloading) {
		$log.debug('noReloading');
		$noReloading = false;
		return;
	}
	
	$log.debug('hashtag URL = ' + hashtag);
	var tags = hashtagSplit(window.location.hash);

	if (tags.length > 0) {
		// extract category and page
		var category = tags[0].toLocaleLowerCase();
		// call appropriate handler for each category
		if (category.localeCompare('gallery') === 0) {
			$state.switch('Gallery', tags[1], tags[2], tags[3]);
			return;
		}		
		if (category.localeCompare('about') === 0) {
			$state.switch('About');
			return;
		}
		if (category.localeCompare('works') === 0) {
			$state.switch('Works', tags[1]);
			return;
		}
		if (category.localeCompare('contact') === 0) {
			$state.switch('Contact');
			return;
		}
	}
	// default to home
	$state.switch('Home');
}

function defineState(state) {
	state.addEventListener('switch', function(event) {
		var state = event.newState;
		$log.debug('main state swith, state = ' + state);
		var tag, page, image;
		if (event.args) {
			tag = event.args[0];
			page = event.args[1];
			image = event.args[2];
		}
		if (state == 'Gallery') {
			if (!tag)	{
				tag = 'All';
			}
			page = parseInt(page, 10);
			if (isNaN(page)) {
				page = 1;
			}
			if (image) {
				setHashTagWithoutReloading('Gallery', tag, page.toString(), image);
			}
			else {
				setHashTagWithoutReloading('Gallery', tag, page.toString());
			}
		}
		else if (state == 'Works') {
			page = image = null;
			if (tag) {
				setHashTagWithoutReloading(state, tag);
			}
			else {
				setHashTagWithoutReloading(state);
			}
		}
		else {
			setHashTagWithoutReloading(state);
			tag = page = image = null;
		}
		$state.tag = tag;
		$state.page = page;
		$state.image = image;
	});
	
}

var $imageCache = {}
function getImage(asset) {
	if ($imageCache[asset]) {
		return $imageCache[asset];
	}
	else {
		var image = AsyncImage.get(asset);
		if (image) {
			$imageLayer.addChild(image);
		}
		return image;
	}
}

function showImage(asset)
{
	var image = getImage(asset);
	if (image) {
		image.visible = true;
	}
}

function hideImage(asset)
{
	var image = getImage(asset);
	if (image) {
		image.visible = false;
	}
}


//
// update, called every frame
//
function onUpdate(event) {
	// resize the canvas
	$stage.canvas.width = $background.width;
	$stage.canvas.height = getCanvasHeight();
	// update the stage
	$stage.update(event)
	

	// var bg = findAsset('Back-L2');
	// scale getCanvasHeight() / bg.height;
	// bg.width
	
	// $menuStage.canvas.width = getWindowWidth();
	// $menuStage.canvas.height = getWindowHeight();
	// $menuStage.update(event)
}

//
// split the hash tag by '/'
//
function hashtagSplit(hashtag) {
	var result = [];
	if (hashtag != undefined && hashtag.substring(0, 3) == '#!:') {
		result = hashtag.substring(3).split('/');
	}
	$log.debug('hashtagSplit(): ' + result.toString());
	return result;
}

function createBlackRect(width, height) {
	var image = new createjs.Shape();
	image.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, width, height);
	return image;
}

