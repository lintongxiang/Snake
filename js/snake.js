var x = [1, 2, 3];
var y = [1, 1, 1];
var x1;
var y1;
var direction = 0;
var time = null;
var dx, dy;
var k = 39;
var mapx = 40;
var mapy = 23;
var foodx, foody;
var score = 0;
var speed = 800;
var btn;

function changeSpeed() {
	speed = 800;
	speed = parseInt(speed / parseInt(document.getElementById("speed").value));
	clearInterval(time);
	if(btn.value == "重新开始")
		time = window.setInterval("move()", speed);
}
window.onload = function Control() {
	var html = [];

	html.push("<table id='map'>");
	for(var y = 0; y < mapy; y++) {

		html.push("<tr>");
		for(var x = 0; x < mapx; x++) {
			html.push('<td id="box_' + x + "_" + y + '"> </td>');
		}
		html.push("</tr>");
	}
	html.push("</table>");
	this.pannel = document.getElementById("sbody");
	this.pannel.innerHTML = html.join("");
};

function newSnake() {

	for(var i = 0; i < x.length - 1; i++) {
		for(var j = 0; j < y.length - 1; j++) {
			if(i == j) {
				document.getElementById("box_" + x[i] + "_" + y[j]).style.backgroundColor = "greenyellow";
			}
		}
	}
	if(x[x.length - 1] < mapx && y[y.length - 1] < mapy)
		document.getElementById("box_" + x[x.length - 1] + "_" + y[y.length - 1]).style.backgroundColor = "green";
}

function start() {
	newSnake();
	newFood();
	time = window.setInterval("move()", speed);
	btn = document.getElementById("btn");
	if(btn.value == "开始游戏")
		btn.value = "重新开始";
	else
		location.reload();

}

function move() {
	if(k == 37) { //左
		dx = x[x.length - 1] - 1;
		dy = y[y.length - 1];
	} else if(k == 38) { //上
		dx = x[x.length - 1];
		dy = y[y.length - 1] - 1;
	} else if(k == 39) { //右
		dx = x[x.length - 1] + 1;
		dy = y[y.length - 1];
	} else if(k == 40) { //下
		dx = x[x.length - 1];
		dy = y[y.length - 1] + 1;

	}
	x.push(dx);
	y.push(dy);
	//吃到食物
	if(x[x.length - 1] == foodx && y[y.length - 1] == foody) {
		score += 2;
		if(score < 10)
			document.getElementById("score").innerHTML = "Score：&nbsp;" + score + " 分";
		else
			document.getElementById("score").innerHTML = "Score：" + score + " 分";
		x1 = -1;
		y1 = -1;
		newFood();

	} else {
		x1 = x.shift();
		y1 = y.shift();
	}
	//还原地图颜色
	if(x1 != -1 && y1 != -1) {
		document.getElementById("box_" + x1 + "_" + y1).style.backgroundColor = "plum";
	}
	if(x[x.length - 1] < 0 || y[y.length - 1] < 0 || x[x.length - 1] > mapx - 1 || y[y.length - 1] > mapy - 1) {
		alert("撞墙了.......您的分数是：" + score);
		clearInterval(time);
		location.reload();
	}
	for(var i = 0; i < x.length - 1; i++) {
		for(var j = 0; j < x.length - 1; j++) {
			if(i == j) {
				if(x[x.length - 1] == x[i] && y[x.length - 1] == y[j]) {
					alert("吃到自己了。。。您的分数是：" + score);
					clearInterval(time);
					location.reload();
				}
			}
		}
	}
	newSnake();
}
window.onkeydown = function keydown() {
	var code = event.keyCode;
	if(code == 37 || code == 38 || code == 39 || code == 40)
		if(!(k == 37 && code == 39 || k == 38 && code == 40 || k == 39 && code == 37 || k == 40 && code == 38))
			k = code;
}

function newFood() {
	foodx = parseInt(Math.random() * (mapx - 1));
	foody = parseInt(Math.random() * (mapy - 1));
	document.getElementById("box_" + foodx + "_" + foody).style.backgroundColor = "deeppink";
}