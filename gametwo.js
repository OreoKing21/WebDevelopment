var ctx = document.getElementById("ctx").getContext("2d");

var brightRed = "#FF0000";
var brightGreen = "#00FF00";
var brightBlue = "#0000FF";
var myBlack = "#000000";
var myYellow = "#FFFF00";
var myCustomRGBA = "rgba(255, 0, 0, 0.75)";

var gameHeight = 500;
var gameWidth = 900;
var rtSpacing = 30;
var topSpacing = 30;

var enemyList = {};

var timeWhenGameStarted = Date.now();

// player as an "Object"
var player = {
	x : 50,
	spdX : 7,
	y : 250,
	spdY : 3,
	name : "P",
	color : "#000000",
	highPoints : 10,
	w : 30,
	h : 30,
};

Enemy = function(id, passX, passY, passspdX, passspdY, passName, passFont, passWallFont, passTopBottomFont, passColor, passWidth, passHeight) {

	var enemy = {
		id : id,
		x : passX,
		spdX : passspdX,
		y : passY,
		spdY : passspdY,
		name : passName,
		myFont : passFont,
		wallFont : passWallFont,
		topBottomFont : passTopBottomFont,
		color : passColor,
		w : passWidth,
		h : passHeight
	};
	enemyList[id] = enemy;
};
// end of constructor

getDistanceBetweenEntity = function(entity1, entity2) {
	var dx = entity1.x - entity2.x;
	var dy = entity1.y - entity2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

testCollisionEntity = function(entity1, entity2) {
	var distance = getDistanceBetweenEntity(entity1, entity2);
	return distance < 70;
	// Boolean true or false
};
winDetection = function() {
	if (player.x >= 850){
		alert('YOU WIN');
		return;
	}
};
document.onmousemove = function(mouse) {
	var mouseX = mouse.clientX;
	var mouseY = mouse.clientY;
	console.log('mouse x,y: ', mouseX, ', ', mouseY);
	player.x = mouseX - 20;
	player.y = mouseY - 200;
};

entityUpdate = function(something) {
	updateEntityPosition(something);
	drawEnemy(something);
};
// end of entityUpdate

updateEntityPosition = function(something) {
	something.x += something.spdX;
	something.y += something.spdY;
	// wall bounce
	if (something.x >= gameWidth - rtSpacing || something.x <= 0) {
		//spdX = -spdX;
		//spdX = spdX * -1;
		something.spdX *= -1;
		something.color = myBlack;
	}
	// ceiling or floor bounce
	if (something.y >= gameHeight || something.y <= topSpacing) {
		something.spdY *= -1;
		something.color = myCustomRGBA;
	}

};

drawPlayer = function(something) {
	ctx.save();
	ctx.font = something.font;
	ctx.fillStyle = something.color;
	ctx.fillRect(something.x, something.y, something.w, something.h);
	ctx.restore();
};

drawGoal = function(something) {
	ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
	ctx.fillRect(850, 50, 50, 400);
}
drawEnemy = function(something) {
	ctx.save();
	ctx.font = something.font;
	ctx.fillStyle = something.color;
	//ctx.fillText(something.name, something.x, something.y);
	ctx.fillRect(something.x, something.y, something.w, something.h);
	ctx.restore();
};

update = function() {
	ctx.clearRect(0, 0, gameWidth, gameHeight);
	//entityUpdate(player);
	drawPlayer(player);
	winDetection();
	drawGoal();

	for (var i in enemyList) {
		entityUpdate(enemyList[i]);

		var isColliding = testCollisionEntity(player, enemyList[i]);
		if (isColliding) {
			player.highPoints -= 1;
			if (player.highPoints < 0) {
				var timeSurvived = Date.now() - timeWhenGameStarted;
				alert('Oh Nooo Game is OVER!!! time = ' + timeSurvived / 1000);
				player.highPoints = 10;
				timeWhenGameStarted = Date.now();
			}
		}
	}
	// display the high point or points remaining on the upper left
	ctx.font = '30px Arial';
	ctx.fillStyle = '#FF0000';
	ctx.fillText('Points: ' + player.highPoints, 10, 30);
	var gameTime = Date.now() - timeWhenGameStarted;
	ctx.fillText('Seconds: ' + gameTime / 1000, 250, 30);
};
// end of update()

Enemy('E01', 50, 50, 4, 7, 'E01', '30px Arial', '60px Arial', '40px Arial', "#FF2700", 30, 30);
Enemy('E02', 50, 50, 5, 6, 'E02', '60px Arial', '30px Arial', '20px Arial', "#FF9100", 30, 60);
Enemy('E03', 50, 50, 6, 5, 'E03', '90px Arial', '20px Arial', '20px Arial', "#FFF800", 60, 30);
Enemy('E04', 50, 50, 7, 4, 'E02', '60px Arial', '30px Arial', '20px Arial', "#24FF00", 50, 50);
Enemy('E05', 50, 50, 8, 3, 'E03', '90px Arial', '20px Arial', '20px Arial', "#00D5FF", 50, 60);

setInterval(update, 25);
