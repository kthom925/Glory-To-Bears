function Block(x, y, xInd, yInd, ind, style)
{
	this.x = x;
	this.y = y;
	this.xIndex = xInd;
	this.yIndex = yInd;
	this.index = ind;
	this.pic = new Image();
	this.pic.src = "../assets/tiles/"+style+".png";

	this.width = 75;
	this.height = 75;

	this.style = style;
	this.picInd = style;
	this.draw = function()
	{
		graphics.save();
		graphics.translate(this.x, this.y);
		graphics.drawImage(this.pic, -this.width/2, -this.height/2, this.width, this.height);
		graphics.restore();
	}
	this.update = function()
	{
	}
	this.checkCollision = function(obj)
	{
		if(Math.abs(obj.x-this.x)<this.width/2+obj.width/2&&obj.y+obj.height/2<=this.y - this.height/2&&obj.floor>=this.y - this.height/2&&obj.onBlock!=this.index&&!obj.stacked)
		{
			obj.floor = this.y-this.height/2;
			obj.onBlock = this.index;
			console.log(obj.onBlock);
			return;
		}
		
		if(Math.abs(obj.x-this.x)>=this.width/2+obj.width/2&&obj.onBlock==ind && !obj.stacked)
		{
			var floorDiff = defaultFloor - obj.floor;
			setStackFloor(floorDiff, obj);
			obj.onBlock = -1;
			return;
		}

		if(Math.abs(obj.x-this.x)<this.width/2 + obj.width/2 - 10&& obj.y > this.y && obj.y - obj.height/2 < this.y + this.height/2 && !obj.onGround && !obj.stacked)
		{
			obj.y = this.y + this.height/2 +obj.height/2 + 1;
			obj.grav = 0;
		}

		if(obj.x < this.x && obj.x + obj.width/2 > this.x-this.width/2 && Math.abs(obj.y-this.y) < obj.height/2 + this.height/2 - 5)
		{
			setStackX(this.x-this.width/2-obj.width/2, obj, true);
			setStackX(this.x-this.width/2-obj.width/2, obj, false);
			return;
		}
		if(obj.x > this.x && obj.x - obj.width/2 < this.x+this.width/2 && Math.abs(obj.y-this.y) < obj.height/2 + this.height/2 - 5)
		{
			setStackX(this.x+this.width/2+obj.width/2, obj, true);
			setStackX(this.x+this.width/2+obj.width/2, obj, false);
			return;
		}
	}

	this.isLeftCorner = function() {
		return (map[this.xIndex - 1][this.yIndex] == 0 &&
			map[this.xIndex -1][this.yIndex -1] == 0 && 
			map[this.xIndex][this.yIndex-1] == 0);
	}

	this.isRightCorner = function() {
		return (map[this.xIndex + 1][this.yIndex] == 0 &&
			map[this.xIndex + 1][this.yIndex + 1] == 0 && 
			map[this.xIndex][this.yIndex + 1] == 0);
	}
}