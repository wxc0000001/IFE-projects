var col = document.getElementById('col');
var row = document.getElementById('row');
var new_li = new Array(26);
for(var i = 0; i < 26; i++){
	new_li[i] = document.createElement('li');
	new_li[i].innerText = i+1;
	row.appendChild(new_li[i]);
}
for(var i = 0; i < 26; i++){
	new_li[i] = document.createElement('li');
	new_li[i].innerText = i+1;
	col.appendChild(new_li[i]);
}
var start = document.getElementById('start');
var turn_l = document.getElementById('turn_l');
var turn_r = document.getElementById('turn_r');
// var turn_b = document.getElementById('turn_b');
var move_f = document.getElementById('move_f');
var snakeWrap = document.getElementById('snakeWrap');
var block = document.getElementById('block');
var b_head = document.getElementById('b_head');
var status = 0; //0,1,2,3 代表 正，左，右，后
var food = document.getElementById('food');

var snake = new Array();
var init_position = [[10,12],[10,13],[10,14]];//蛇初始位置

for (var i = 0; i < init_position.length; i++) {
	snake[i] = new Array(2);
	snake[i][0] = init_position[i][0];
	snake[i][1] = init_position[i][1];
}

var ie;
if (document.all) ie = true; else ie = false; //判断是否IE
document.onkeydown = KeyPress; //设置键盘事件函数

function KeyPress(){
  var key;
  if (ie) key = event.keyCode; //ie获取键盘值
  else key = KeyPress.arguments[0].keyCode; //其它浏览器获取键盘值
  
  switch(key) {
  	case 38:
  		forward();
  		break;
  	case 37:
  		left_();
  		break;
  	case 40:
  		backward();
  		break;
  	case 39:
  		right();
  		break;
  	default:
  		break;
  }
}
var intV;
window.onload = function(){
	showSnake();
	
}
start.onclick = function(){
	intV = setInterval(function(){
		move();
	},200);
}
function showSnake(){
	swipe_footPath();
	
	// 头部位置
	block.style.left = (snake[0][0]-1)*25+'px';
	block.style.top = (snake[0][1]-1)*25+'px';
	snakeWrap.appendChild(block);
	// 身子位置
	var snakeBody = new Array();
	for (var i = 1; i < snake.length; i++) {
		snakeBody[i] = document.createElement('div');
		snakeBody[i].className = 'snakeBody';
		snakeBody[i].style.left = (snake[i][0]-1)*25+'px';
		snakeBody[i].style.top = (snake[i][1]-1)*25+'px';
		snakeWrap.appendChild(snakeBody[i]);
	}
}


turn_l.onclick = function(){
	switch(status) {
		case '0':
			left_();
			break;
		case '1':
			backward();
			break;
		case '2':
			forward();
			break;
		case '3':
			right();
			break;
	}
}
turn_r.onclick = function(){
	switch(status) {
		case '0':
			right();
			break;
		case '1':
			forward();
			break;
		case '2':
			backward();
			break;
		case '3':
			left_();
			break;
	}
}
//前进一步事件绑定
move_f.onclick = function(){
	move();
}
function move(){
	switch(status) {
		case '0':
			move_ani('top', '-');
			break;
		case '1':
			move_ani('left', '-');
			break;
		case '2':
			move_ani('left', '+');
			break;
		case '3':
			move_ani('top', '+');
			break;
	}
}
var steps = 0;
function curr_postion(){

	var curr_X = parseInt(getStyle(block,'left'))/25+1;
	var curr_Y = parseInt(getStyle(block,'top'))/25+1;
	// console.log(curr_X+''+curr_Y);
	for (var i = snake.length-1; i > 0; i--) {
		snake[i][0] = snake[i-1][0];
		snake[i][1] = snake[i-1][1];
	}
	
	if(steps !== 0){
		for(var i=0; i < snake.length; i++){
			if(curr_X === snake[i][0] && curr_Y === snake[i][1]){
				alert('撞到自己啦～爱你么么哒');
				// console.log(snake[i][0]+’‘+snake[i][1]);
				// console.log(curr_X+''+curr_Y);
				clearInterval(intV);
			}
		}
	}
	steps++;
	snake[0][0] = curr_X;
	snake[0][1] = curr_Y;
	showSnake();

	
	var block_X = parseInt(getStyle(food,'left'))/25+1;
	var block_Y = parseInt(getStyle(food,'top'))/25+1;
	

	if(curr_X === block_X && curr_Y === block_Y){
		var length = snake.length;
		snake[length] = new Array(2);
		snake[length][0] = block_X;
		snake[length][1] = block_Y;
		updateFood();
	}

}
function updateFood(){
	var newFood_X = Math.ceil(Math.random()*25)+1;
	var newFood_Y = Math.ceil(Math.random()*25)+1;
	food.style.left = (newFood_X-1)*25+'px';
	food.style.top = (newFood_Y-1)*25+'px';

	// console.log(newFood_X+''+newFood_Y);
}

function swipe_footPath(){
	for (var i = snakeWrap.childNodes.length; i > 0; i--) {
		snakeWrap.removeChild(snakeWrap.childNodes[0]);
	}
}

//获取style方法，不能直接.style
function getStyle (obj,attr) {
    return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//四种状态
// 正向
function forward(){
	block.style.transform = 'rotate(0deg)';
	status = 0;
}
// 左向
function left_(){
	block.style.transform = 'rotate(270deg)';
	status = 1;
}
// 右向
function right(){
	block.style.transform = 'rotate(90deg)';
	status = 2;
}
// 反向
function backward(){
	block.style.transform = 'rotate(180deg)';
	status = 3;
}	
//移动动画
function move_ani(dir, cal){
	var top = parseInt(getStyle(block, 'top'));
	var left = parseInt(getStyle(block, 'left'));	
	var dis = 25;
	var ani;
	//下移
	if(dir === 'top' && cal === '+'){
		if(top < 605){
			block.style.top = top+dis+'px';
			curr_postion();
		}else{
			alert('撞到墙啦～爱你么么哒');
			clearInterval(intV);
		}
	// 上移
	}else if(dir === 'top' && cal === '-'){
		if(top > 0){
			block.style.top = top-dis+'px';
			curr_postion();
		}else{
			alert('撞到墙啦～爱你么么哒');
			clearInterval(intV);
		}
	// 右移
	}else if(dir === 'left' && cal === '+'){
		if(left < 605){
			block.style.left = left+dis+'px';
			curr_postion();
		}else{
			alert('撞到墙啦～爱你么么哒');
			clearInterval(intV);
		}
	// 左移
	}else if(dir === 'left' && cal === '-'){
		if(left > 0){
			block.style.left = left-dis+'px';
			curr_postion();
		}else{
			alert('撞到墙啦～爱你么么哒');
			clearInterval(intV);
		}
	}
}