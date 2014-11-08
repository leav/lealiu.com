//
// Background extends createjs.Container
//
function Background() {
	this.initialize();
}
Background.prototype = new createjs.Container();
Background.prototype.Container_initialize = Background.prototype.initialize;
Background.prototype.initialize = function() {
	this.Container_initialize();
	
	var back = new createjs.Container();
	this.addChild(back);
	
	var l3 = AsyncImage.get('Back-L3');
	back.addChild(l3);
	
	var l2 = AsyncImage.get('Back-L2');
	back.addChild(l2);
		
	var fullMask = new createjs.Shape();
	this.addChild(fullMask);
	fullMask.width = fullMask.height = 4;
	fullMask.graphics.beginFill("rgba(0,0,0,0.3)").drawRect(0, 0, fullMask.width, fullMask.height);
	fullMask.cache(0, 0, fullMask.width, fullMask.height);

	var buttons = [];
	
	var modeling = createButton('SL_3D');
	back.addChild(modeling);
	buttons.push(modeling);
	modeling.addEventListener('click', function(){
		$state.switch('Gallery', 'Modeling', 1);
	});
	modeling.dialogText = "Can't affor GK >.<";

	
	var autoplay = createButton('SL_autoplay');
	back.addChild(autoplay);
	buttons.push(autoplay);
	autoplay.dialogText = "Start browsing my portfolio";
	
	var fatloot = createButton('SL_fatloot');
	back.addChild(fatloot);
	buttons.push(fatloot);
	fatloot.addEventListener('click', function(){
		$state.switch('Works', 'Fatloot');
	});
	fatloot.dialogText = "A story about fat people pwning";
	
	var gallery = createButton('SL_gallery');
	back.addChild(gallery);
	buttons.push(gallery);
	gallery.addEventListener('click', function(){
		$state.switch('Gallery');
	});
	gallery.dialogText = "Many doodles";
	
	var honglou = createButton('SL_honglou');
	back.addChild(honglou);
	buttons.push(honglou);
	honglou.addEventListener('click', function(){
		$state.switch('Works', 'Honglou');
	});
	honglou.dialogText = "A big hole!";
	
	var honlougallery = createButton('SL_Honlougallery');
	back.addChild(honlougallery);
	buttons.push(honlougallery);
	honlougallery.addEventListener('click', function(){
		$state.switch('Gallery', 'Dream of the Red Chamber');
	});
	honlougallery.dialogText = "Nice scenes meow!";
	
	var leatest = createButton('SL_leatest');
	back.addChild(leatest);
	buttons.push(leatest);
	var a = document.createElement('a');
	a.setAttribute('target', '_blank');
	a.setAttribute('href', 'leatest.html');
	leatest.addEventListener('click', function(){
		a.click();
	});
	leatest.dialogText = "Don't click! Secret!";

	var works = createButton('SL_works');
	back.addChild(works);
	buttons.push(works);
	works.addEventListener('click', function(){
		$state.switch('Works');
	});
	works.dialogText = 'Back to work!';
	
	var autoSlideAssets = findAssetsByTags(['AutoSlides']);
	var autoSlideBack = new AsyncImage();
	var autoSlide = new AsyncImage();
	back.addChild(autoSlideBack);
	back.addChild(autoSlide);
	autoSlideBack.x = autoSlide.x = 1334;
	autoSlideBack.y = autoSlide.y = 403;

	var l1 = AsyncImage.get('Back-L1');
	back.addChild(l1);
	
	var self = this;
	var doLayout = function(){
		var scaleWidth = getWindowWidth() / l2.asset.width;
		var scaleHeight = getWindowHeight() / l2.asset.height;
		var scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;
		back.scaleX = back.scaleY = scale;
		
		self.width = l2.asset.width * scale;
		
		if ($state.state == 'Home') {
			fullMask.visible = false;
			buttons.forEach(function(v){v.visible = true;});
		}
		else {
			fullMask.visible = true;
			fullMask.scaleX = getWindowWidth() / fullMask.width;
			fullMask.scaleY = getWindowHeight() / fullMask.height;
			buttons.forEach(function(v){v.visible = false;});
		}
	};
	doLayout();
	
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);
	
	var doScroll = function(){
		var scroll = document.body.scrollLeft / (document.body.scrollWidth - document.body.clientWidth);
		l1.x = (l2.asset.width - l1.asset.width) * scroll;
		l3.x = (l2.asset.width - l3.asset.width) * scroll;
	};
	doScroll();
	window.addEventListener("scroll", doScroll);

	if (autoSlideAssets.length > 0)
	{
		autoSlide.setAsset(autoSlideAssets[0]);
		if (autoSlideAssets.length > 1)
		{
			var autoSlideInterval = 40;
			var autoSlideCount = 0;
			var autoSlideIndex = 1;
			var doAutoSlide = function(){
				autoSlideCount++;
				if (autoSlideCount > autoSlideInterval) {
					autoSlideCount = 0;
					autoSlideBack.setAsset(autoSlideAssets[autoSlideIndex]);
					fadeIn(autoSlideBack);
					fadeOut(autoSlide);
					var temp = autoSlideBack;
					autoSlideBack = autoSlide;
					autoSlide = temp;
					autoSlideIndex = (autoSlideIndex + 1) % autoSlideAssets.length;
				}
			};
			createjs.Ticker.addEventListener("tick", doAutoSlide);
		}
	}
}


function createBackground() {
	var background = new createjs.Container();
	
	
	return background;
}