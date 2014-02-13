//
// Data class
//
function Data()
{
	this.player = new Player();
}

Data.prototype.toScreenX = function(x)
{
	return x - this.player.x + this.player.getScreenX();
}

Data.prototype.toScreenY = function(y)
{
	return y - this.player.y + this.player.getScreenY();
}

Data.prototype.toX = function(screenX)
{
	return screenX - this.player.getScreenX() + this.player.x;
}

Data.prototype.toY = function(screenY)
{
	return screenY - this.player.getScreenY() + this.player.y;
}

//
// Player class
//
function Player()
{
	this.x = this.y = this.destX = this.destY = 0;
	this.dir = 2;
	this.speed = 1;
}

Player.prototype.getScreenX = function()
{
	return getCanvasWidth() / 2;
}

Player.prototype.getScreenY = function()
{
	return getCanvasHeight() / 2;
}

Player.prototype.setDest = function(x, y)
{
	this.destX = x;
	this.destY = y;
}

Player.prototype.isMoving = function()
{
	return this.x != this.destX || this.y != this.destY;
}

Player.prototype.update = function(event)
{
	if (this.isMoving())
	{
		// dir
		var xDiff = this.destX - this.x;
		var yDiff = this.destY - this.y;
		if (Math.abs(xDiff) >= Math.abs(yDiff))
		{
			this.dir = xDiff > 0 ? 6 : 4;
		}
		else
		{
			this.dir = yDiff > 0 ? 2 : 8;
		}
		// move
		var dist = Math.sqrt((this.destX - this.x) * (this.destX - this.x) + (this.destY - this.y) * (this.destY - this.y));
		if (dist < this.speed)
		{
			this.x = this.destX;
			this.y = this.destY;
		}
		else
		{
			var mx = this.speed / dist * (this.destX - this.x);
			var my = this.speed / dist * (this.destY - this.y);
			this.x += mx;
			this.y += my;
		}
	}
}

// GroundText class

function GroundText(text, x, y, playerX, playerY)
{
	this.text = text;
	this.x = x;
	this.y = y;
	
	if (x > playerX)
	{
		if (y > playerY)
		{
			this.anchor = 7;
		}
		else
		{
			this.anchor = 1;
		}
	}
	else
	{
		if (y > playerY)
		{
			this.anchor = 9;
		}
		else
		{
			this.anchor = 3;
		}
	}
	
	
	
}





