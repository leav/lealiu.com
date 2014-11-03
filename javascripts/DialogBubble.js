//
// DialogBubble extends createjs.Container
//
function DialogBubble() {
	this.initialize();
}
DialogBubble.prototype = new createjs.Container();
DialogBubble.prototype.Container_initialize = DialogBubble.prototype.initialize;
DialogBubble.prototype.initialize = function() {
	this.Container_initialize();
	
	var top  = AsyncImage.get('Bubble-top');
	this.addChild(top);
	
	var back = AsyncImage.get('Bubble-back');
	this.addChild(back);
	
	var bottom  = AsyncImage.get('Bubble-top');
	this.addChild(bottom);
	
	
	
	var self = this;
	this.doLayout = function() {
		if (!self.text) {
			self.visible = false;
		}
		else {
			self.visible = true;
		}
	}
	
	this.doLayout();
}

DialogBubble.prototype.setText = function(text) {
	this.text = text;
	this.doLayout();
}