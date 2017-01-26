var ctx = document.getElementById("ctx").getContext("2d");
//ctx = canvas
ctx.font = '60px Arial';
ctx.globalAlpha = 0.5;
ctx.fillStyle = "#000000";
//50X , 75Y on canvas
ctx.fillText('Hello', 50, 75);
ctx.fillStyle = "#FFFFFFF";
ctx.fillRect(50, 50, 100, 100);
ctx.clearRect(75, 75, 50, 50);
