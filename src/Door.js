function Door(x, y, xInd, yInd, ind)
{
	this.x = x;
	this.y = y;
	this.index = ind;
	this.xIndex = xInd;
	this.yIndex = yInd;
	this.width = 75;
	this.height = 75;
	this.isDoor = true;

	this.hidden = false;

	this.pic = new Image();
	this.pic.src = "../assets/door.png";

	this.draw = function()
	{
		if(!this.hidden)
		{
			graphics.save();
			graphics.scale(camera.scale, camera.scale);
			graphics.translate(this.x-this.width/2-camera.x+screenWH* 1/camera.scale,this.y-this.height/2-camera.y+screenHH* 1/camera.scale);
			graphics.shadowBlur = 10;
			graphics.shadowColor = "black";
			graphics.drawImage(this.pic, 0,0, this.width, this.height);
			graphics.shadowBlur = 0;
			graphics.restore();
		}
	}
	this.update = function()
	{

	}
	this.unlock = function()
	{
		blocks.splice(this.index, 1);
		for(var i = this.index;i<blocks.length; i++)
			blocks[i].index--;
		map[this.yIndex][this.xIndex] = 0;
		for(var b = 0; b<bears.length;b++)
			if(bears[b].onBlock == this.index)
			{
				bears[b].onBlock = -1;
				bears[b].floor = defaultFloor;
			}
		//Particle effects if there's time
	}
	this.checkCollision = function(obj)
	{
		if(!this.hidden)
		{
			if(Math.abs(obj.x-this.x)<this.width/2+obj.width/2&&obj.y+obj.height/2<=this.y - this.height/2&&obj.floor>=this.y - this.height/2&&obj.onBlock!=this.index&&!obj.stacked)
			{
				obj.floor = this.y-this.height/2;
				obj.onBlock = this.index;
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
	}

	this.isLeftCorner = function() {
		if(this.xIndex == 0 || this.xIndex == map[0].length-1)
			return true;
		if(this.yIndex == 0)
			return true;
		return (map[this.yIndex][this.xIndex - 1] == 0 &&
			map[this.yIndex -1][this.xIndex -1] == 0 && 
			map[this.yIndex-1][this.xIndex] == 0);
	}

	this.isRightCorner = function() {
		if(this.yIndex == 0 || this.yIndex == map.length-1)
			return true;
		if(this.xIndex == 0 || this.xIndex == map[0].length-1)
			return true;
		return (map[this.yIndex][this.xIndex + 1] == 0 &&
			map[this.yIndex - 1][this.xIndex + 1] == 0 && 
			map[this.yIndex - 1][this.xIndex] == 0);
	}
}