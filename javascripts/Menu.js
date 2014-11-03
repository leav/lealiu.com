//
// Menu extends createjs.Container
//
function Menu() {
	this.initialize();
}
Menu.prototype = new createjs.Container();
Menu.prototype.Container_initialize = Menu.prototype.initialize;
Menu.prototype.initialize = function() {
	this.Container_initialize();
	
	// masks
	
	var maskTop = AsyncImage.get('Mask-top');
	//var maskHeight = this.maskTop.asset.height - 2;
	this.addChild(maskTop);
	
	var maskBottom = AsyncImage.get('Mask-bottom');
	this.addChild(maskBottom);
	
	var socialMedia = new SocialMedia();
	this.addChild(socialMedia);
	
	var character = AsyncImage.get('Character');
	this.addChild(character);
	
	var eyeWhite = AsyncImage.get('ani_eyes_white');
	character.addChild(eyeWhite);
	eyeWhite.x = 295;
	eyeWhite.y = 137;
	
	var eyeBall = AsyncImage.get('ani_eyes_ball');
	character.addChild(eyeBall);
	var eyeBallXMin = 295 + 9;
	var eyeBallXRange = 4;
	var eyeBallYMin = 137 + 5;
	var eyeBallYRange = 3;
	eyeBall.x = eyeBallXMin + eyeBallXRange / 2;
	eyeBall.y = eyeBallYMin + eyeBallYRange / 2;
	
	document.addEventListener('mousemove', function (event) {
		var dot, eventDoc, doc, body, pageX, pageY;

		event = event || window.event; // IE-ism

		// If pageX/Y aren't available and clientX/Y are,
		// calculate pageX/Y - logic taken from jQuery.
		// (This is to support old IE)
		if (event.pageX == null && event.clientX != null) {
				eventDoc = (event.target && event.target.ownerDocument) || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = event.clientX +
					(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
					(doc && doc.clientLeft || body && body.clientLeft || 0);
				event.pageY = event.clientY +
					(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
					(doc && doc.clientTop  || body && body.clientTop  || 0 );
		}
		
		eyeBall.x = event.pageX / getWindowWidth() * eyeBallXRange + eyeBallXMin;
		eyeBall.y = event.pageY / getWindowHeight() * eyeBallYRange + eyeBallYMin;		
	});
	
	
	// buttons
	
	var top = new createjs.Container();
	this.addChild(top);
	var button;
	
	button = createButton('Button_Home');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('Home');
	});
	
	button = createButton('Button_About');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('About');
	});
	
	button = createButton('Button_Works');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('Works');
	});
	
	button = createButton('Button_Gallery');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('Gallery', 'All', 1);
	});
	
	button = createButton('Button_Contact');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('Contact');
	});

	// logo
	
	var logo = AsyncImage.get('Logo');
	this.addChild(logo);
	
	// prev / next buttons
	
	var prevButton = createButton('Button_Prev');
	this.addChild(prevButton);
	prevButton.addEventListener('click', function(event){
		if ($state.prevState) {
			$state.switch($state.prevState, $state.prevTag, $state.prevPage);
		}
	});
	
	var nextButton = createButton('Button_Next');
	this.addChild(nextButton);
	nextButton.addEventListener('click', function(event){
		if ($state.nextState) {
			$state.switch($state.nextState, $state.nextTag, $state.nextPage);
		}
	});	
	
	// doLayout()
	
	var doLayout = function() {
		var padding = 16;
		
		if ($state.state == 'Home') {
			maskTop.visible = maskBottom.visible = character.visible = logo.visible = socialMedia.visible = true;

			maskTop.scaleY = 0.1 * getWindowHeight() / maskTop.asset.height;
			maskTop.scaleX = getWindowWidth() / maskTop.asset.width;
			
			maskBottom.regY = maskBottom.asset.height;
			maskBottom.y = getWindowHeight();
			maskBottom.scaleX = getWindowWidth() / maskBottom.asset.width;
			maskBottom.scaleY = 0.05 * getWindowHeight() / maskBottom.asset.height;
			
			character.regY = character.asset.height;
			character.x = 0.05 * getWindowWidth();
			character.y = getWindowHeight();
			character.scaleX = character.scaleY = 0.8 * getWindowHeight() / character.asset.height;

			logo.regX = logo.asset.width + padding * 4;
			logo.x = getWindowWidth();
			logo.y = getWindowHeight() * 0.007;
			logo.scaleX = logo.scaleY = getWindowHeight() / maskTop.asset.height * 0.1;
			
			socialMedia.scaleX = socialMedia.scaleY = getWindowHeight() * 0.04 / socialMedia.height;
			socialMedia.regX = socialMedia.width + padding * 4;
			socialMedia.x = getWindowWidth();
			socialMedia.y = getWindowHeight() * 0.96;
		}
		else {
			maskTop.visible = maskBottom.visible = character.visible = logo.visible = socialMedia.visible = false;
		}
		
		// buttons
		top.regX = getWindowWidth();
		top.x = getWindowWidth();
		if ($state.state == 'Home') {
			top.y = 0.1 * getWindowHeight();
		}
		else {
			top.y = 0;
		}
		top.scaleX = top.scaleY = getWindowHeight() / maskTop.asset.height * 0.1;
		
		var x = getWindowWidth() - padding * 2;
		for (var i = top.children.length - 1; i >= 0; i--) {
			var button = top.children[i];
			x -= button.width;
			button.x = x;
			x -= padding;
		}
		
		prevButton.visible = ($state.state != 'Home' && $state.state != 'About');
		nextButton.visible = ($state.state != 'Home' && $state.state != 'Contact');
		prevButton.regX = prevButton.width / 2;
		prevButton.regY = prevButton.height / 2;
		nextButton.regX = nextButton.width / 2;
		nextButton.regY = nextButton.height / 2;
		prevButton.x = getWindowWidth() * 0.05;
		nextButton.x = getWindowWidth() * 0.95;
		prevButton.y = nextButton.y = getWindowHeight() / 2;
		prevButton.scaleX = prevButton.scaleY = getWindowHeight() * 0.12 / prevButton.height;
		nextButton.scaleX = nextButton.scaleY = getWindowHeight() * 0.12 / nextButton.height;

		
	};
	
	$state.addEventListener('switch', doLayout);
	window.addEventListener("resize", doLayout);
	
	doLayout();
};




