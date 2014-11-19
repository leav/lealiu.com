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
	
	var character = new createjs.Container();
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
	
	var characterBody = AsyncImage.get('Character');
	character.addChild(characterBody);
	
	var eyeBlink2 = AsyncImage.get('ani_eyes_blink2');
	character.addChild(eyeBlink2);
	eyeBlink2.x = 295;
	eyeBlink2.y = 137;
	eyeBlink2.visible = false;
	
	var eyeBlink3 = AsyncImage.get('ani_eyes_blink3');
	character.addChild(eyeBlink3);
	eyeBlink3.x = 295;
	eyeBlink3.y = 137;
	eyeBlink3.visible = false;
	
	// create Dialog
	$dialog = new DialogBubble();
	character.addChild($dialog);
	$dialog.x = characterBody.asset.width * 0.7;
	$dialog.y = 120;
	
	document.addEventListener('mousemove', function (event) {
		if ($state.state != 'Home') {
			return;
		}
		var x = getMousePageX() / getWindowWidth() * eyeBallXRange + eyeBallXMin;
		var y = getMousePageY() / getWindowHeight() * eyeBallYRange + eyeBallYMin;
		if (x != eyeBall.x || y != eyeBall.y) {
			eyeBall.x	= x;
			eyeBall.y	= y;
			$stage.needUpdate = true;
		}
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
	button.dialogText = 'Want to know about me?';
	
	button = createButton('Button_Works');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('Works');
	});
	button.dialogText = 'Holes';
	
	button = createButton('Button_Gallery');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('Gallery', 'All', 1);
	});
	button.dialogText = 'Doodles';
	
	button = createButton('Button_Contact');
	top.addChild(button);
	button.addEventListener('click', function(){
		$state.switch('Contact');
	});
	button.dialogText = 'Ways to catch me';

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
			
			character.regY = characterBody.asset.height;
			character.x = 0.05 * getWindowWidth();
			character.y = getWindowHeight();
			character.scaleX = character.scaleY = 0.8 * getWindowHeight() / characterBody.asset.height;
			
			

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
	
	
	var blinkTimeoutMin = 3;
	var blinkTimeoutMax = 6;
	var blinkTimeout = blinkTimeoutMin + Math.random() * (blinkTimeoutMax - blinkTimeoutMin);
	var blinkNumberCount = 1 + Math.floor(Math.random() * 2);
	var blink2Timeout = 0.05;
	var blink3Timeout = 0.05;
	var blinkCount = 0;
	var blinkState = 'waiting';
	createjs.Ticker.addEventListener("tick", function(event){
		if ($state.state != 'Home') {
			return;
		}
		blinkCount += event.delta / 1000;
		if (blinkState == 'waiting') {
			if (blinkCount >= blinkTimeout) {
				blinkState = 'blink2';
				eyeBlink2.visible = true;
				$stage.needUpdate = true;
				blinkCount = 0;
				blinkTimeout = blinkTimeoutMin + Math.random() * (blinkTimeoutMax - blinkTimeoutMin);;
			}
		}
		else if (blinkState == 'blink2') {
			if (blinkCount >= blink2Timeout) {
				blinkState = 'blink3';
				eyeBlink2.visible = false;
				eyeBlink3.visible = true;
				$stage.needUpdate = true;
				blinkCount = 0;
			}
		}
		else if (blinkState == 'blink3') {
			if (blinkCount >= blink3Timeout) {
				eyeBlink3.visible = false;
				$stage.needUpdate = true;
				blinkCount = 0;
				blinkNumberCount--;
				if (blinkNumberCount > 0) {
					blinkState = 'blink2';
				}
				else {
					blinkState = 'waiting';
					blinkNumberCount = 1 + Math.floor(Math.random() * 2);
				}
			}
		}
	});

};




