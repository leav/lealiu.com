//
// createLoadQueue
//
function createLoadQueue()
{
	return (new createjs.LoadQueue(!$local));
}

//
// createButton
//
function createButton(assetName)
{
	var container = new createjs.Container();
	container.name = assetName;
	
	container.off = AsyncImage.get(assetName + '_off');
	container.addChild(container.off);
	
	container.on = AsyncImage.get(assetName + '_on');
	container.addChild(container.on);
	container.on.visible = false;
	
	container.hitArea = container.off
	container.addEventListener("mouseover", function(event){
		container.on.visible = true;
		container.off.visible = false;
		if ($dialog && container.dialogText) {
			$dialog.setText(container.dialogText);
			$dialog.textOwner = container;
		}
	});
	
	container.mouseout = function(event){
		container.on.visible = false;
		container.off.visible = true;
		if ($dialog && $dialog.textOwner == container) {
			$dialog.setText();
			$dialog.textOwner = null;
		}
	};
	container.addEventListener("mouseout", container.mouseout);

	addCursorPointer(container);
	
	container.width = container.off.asset.width;
	container.height = container.off.asset.height;
	return container;
}

function addCursorPointer(container) {
	container.cursor = 'pointer';
	// container.addEventListener("mouseover", function(event){
		// document.body.style.cursor = 'pointer';
	// });
	
	// container.addEventListener("mouseout", function(event){
		// document.body.style.cursor = 'auto';
	// });
}

//
// findAsset
//
function findAsset(name, tags) {
	var index, indexTag1, indexTag2;
	tags = typeof tags !== 'undefined' ? tags : [];
	for (index = 0; index < $assets.length; ++index) {
		var asset = $assets[index];
		if (asset.name.indexOf(name) > -1 ) {
			var matched = true;
			for (indexTag1 = 0; indexTag1 < tags.length; ++indexTag1) {
				var expectedFound = false;
				var expectedTag = tags[indexTag1];
				for (indexTag2 = 0; indexTag2 < asset.tags.length; ++indexTag2) {
					var assetTag = asset.tags[indexTag2];
					if (expectedTag === assetTag) {
						expectedFound = true;
					}
				}
				if (!expectedFound) {
					matched = false;
					break;
				}
			}
			if (matched) {
				return asset;
			}
		}
	}
	return;
}

// find assets by matching all tags
function findAssetsByTags(tags) {
	var result = [];
	if (tags.length > 0) {
		for (var i = 0; i < $assets.length; i++) {
			var asset = $assets[i];
			var match = true;
			for (var j = 0; j < tags.length; j++) {
				if (asset.tags.indexOf(tags[j]) == -1) {
					match = false;
					break;
				}
			}
			if (match) {
				result.push(asset);
			}
		}
	}
	return result;
}

function sortAssets(assets) {
	var colors = [];
	var bws = [];
	var models = [];
	var result = [];
	assets.forEach(function(v){
		var c = v.name.charAt(0);
		if (c == '0')	{
			colors.push(v);
		}
		else if (c == '1') {
			bws.push(v);
		}
		else {
			models.push(v);
		}
	});
	colors = sortAssetsByTag(colors);
	bws = sortAssetsByTag(bws);
	models = sortAssetsByTag(models);
	colors.forEach(function(v) {result.push(v)});
	bws.forEach(function(v) {result.push(v)});
	models.forEach(function(v) {result.push(v)});
	return result;
}

function sortAssetsByTag(assets) {
	var result = [];
	var illustration = [];
	var Conception = [];
	var Design = [];
	var Practice = [];
	var Comic = [];
	var other = [];
	for (var i = 0; i < assets.length; i++) {
		var asset = assets[i];
		var tags = asset.tags;
		if (tags.indexOf('illustration') > -1) {
			illustration.push(asset);
		}
		else if (tags.indexOf('Practice') > -1) {
			Practice.push(asset);
		}
		else if (tags.indexOf('Conception') > -1) {
			Conception.push(asset);
		}
		else if (tags.indexOf('Design') > -1) {
			Design.push(asset);
		}
		else if (tags.indexOf('Comic') > -1) {
			Comic.push(asset);
		}
		else {
			other.push(asset);
		}
	}
	illustration.forEach(function(v) {result.push(v)});
	Practice.forEach(function(v) {result.push(v)});
	Conception.forEach(function(v) {result.push(v)});
	Design.forEach(function(v) {result.push(v)});
	Comic.forEach(function(v) {result.push(v)});
	other.forEach(function(v) {result.push(v)});
	return result;
}

//
// canvas width and height
//
var minWidth = 100;
var minHeight = 100;
var maxWidth = 2000;
var maxHeight = 2000;
var padding = 0;

// function getCanvasWidth()
// {
	// var	bgAsset = findAsset('Back-L2');
	// if (bgAsset)
	// {
		// return bgAsset.width;
	// }
	// else
	// {
		// return maxWidth;
	// }
// }

function getCanvasHeight()
{
	//return document.getElementById('main').offsetHeight;
	return getWindowHeight();
	
	
	// var	bgAsset = findAsset('Back-L2');
	// if (bgAsset)
	// {
		// return bgAsset.height;
	// }
	// else
	// {
		// return maxHeight;
	// }
}

function getWindowWidth()
{
	//return document.body.clientWidth;
	return window.innerWidth;
}

function getWindowHeight()
{
	//return document.body.clientHeight;
	return window.innerHeight;
}

function fadeIn(object) {
	createjs.Tween.get(object).to({alpha:1.0}, 400, createjs.Ease.get(1));
}

function fadeOut(object) {
	createjs.Tween.get(object).to({alpha:0.0}, 400, createjs.Ease.get(-1));
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};