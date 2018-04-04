// 获取开始按钮和蛇身体元素
var start = document.getElementById('start');
var snakeWrap = document.getElementById('snakeWrap');
var block = document.getElementById('block');
var food = document.getElementById('food');
var score = document.getElementById('score');
//获取控制按钮
// var up = document.getElementById('up');
// var down = document.getElementById('down');
// var left = document.getElementById('left');
// var Tright = document.getElementById('right');


var intV; //移动定时器
var steps = 0; //已走步数
var food_num = 0 //已吃食物个数
var status = 0; //蛇头朝向，0,1,2,3 代表 前，左，右，后
var init_position = [[11,12],[11,13],[11,14]];//蛇初始位置
// 蛇身位置数组
var snake = new Array();
for (var i = 0; i < init_position.length; i++) {
	snake[i] = new Array(2);
	snake[i][0] = init_position[i][0];
	snake[i][1] = init_position[i][1];
}

var end_status; //游戏结束状态，true代表撞到墙，false代表撞到自己
var ie; 

/*----------------开始游戏及移动动画----------------*/

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
			end(true);
		}
	// 上移
	}else if(dir === 'top' && cal === '-'){
		if(top > 0){
			block.style.top = top-dis+'px';
			curr_postion();
		}else{
			end(true);
		}
	// 右移
	}else if(dir === 'left' && cal === '+'){
		if(left < 605){
			block.style.left = left+dis+'px';
			curr_postion();
		}else{
			end(true);
		}
	// 左移
	}else if(dir === 'left' && cal === '-'){
		if(left > 0){
			block.style.left = left-dis+'px';
			curr_postion();
		}else{
			end(true);
		}
	}
}

// 前进一步
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

// 判断输入的键值
function KeyPress(){
	var key;
	if (ie){
		key = event.keyCode;//ie获取键盘值
	}else{
		key = KeyPress.arguments[0].keyCode; //其它浏览器获取键盘值
	}
	document.body.style.overflow = 'hidden'; //按键时禁止页面滚动
	switch(key) { //输入的键值
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

//判断浏览器是否为IE
function if_IE(){
	if (document.all) {
		ie = true;
	} else {
		ie = false;
	} 
}

// 开始游戏事件绑定
start.onclick = function(){
	// 判断浏览器类型
	if_IE();
	// 设置监听键盘事件
	document.addEventListener('keydown',KeyPress,false);
	// 设置移动定时器
	intV = setInterval(function(){
		move();
	},200);
}
// up.onclick = function(){forward();}
// down.onclick = function(){backward();}
// left.onclick = function(){left_();}
// Tright.onclick = function(){right();}

/*-------------------函数处理区-------------------*/
 
// 更新食物位置
function updateFood(){
	var newFood_X = Math.ceil(Math.random()*25)+1;
	var newFood_Y = Math.ceil(Math.random()*25)+1;
	food.style.left = (newFood_X-1)*25+'px';
	food.style.top = (newFood_Y-1)*25+'px';
}

// 获取移动后的当前位置
function curr_postion(){
	// 蛇头位置
	var curr_X = parseInt(getStyle(block,'left'))/25+1;
	var curr_Y = parseInt(getStyle(block,'top'))/25+1;
	// 食物位置
	var block_X = parseInt(getStyle(food,'left'))/25+1;
	var block_Y = parseInt(getStyle(food,'top'))/25+1;
	// 判断是否撞到自己
	if(steps !== 0){
		for(var i=0; i < snake.length; i++){
			if(curr_X === snake[i][0] && curr_Y === snake[i][1]){
				end(false);
			}
		}
	}
	// 判断是否吃到食物
	if(curr_X === block_X && curr_Y === block_Y){
		var length = snake.length;
		snake[length] = new Array(2);
		snake[length][0] = block_X;
		snake[length][1] = block_Y;
		updateFood();
		food_num++;
		score.innerText = food_num;
	}
	// 更新蛇身位置
	for (var i = snake.length-1; i > 0; i--) {
		snake[i][0] = snake[i-1][0];
		snake[i][1] = snake[i-1][1];
	}
	snake[0][0] = curr_X;
	snake[0][1] = curr_Y;
	showSnake();

	steps++; //统计步数
}

/*----------------------移动方向区--------------------*/

// 转向上方
function forward(){
	if(status !== '3') {
		block.style.transform = 'rotate(0deg)';
		status = 0;
	}
}
// 转向左方
function left_(){
	if(status !== '2') {
		block.style.transform = 'rotate(270deg)';
		status = 1;
	}
}
// 转向右方
function right(){
	if(status !== '1') {
		block.style.transform = 'rotate(90deg)';
		status = 2;
	}
}
// 转向下方
function backward(){
	if(status !== '0') {
		block.style.transform = 'rotate(180deg)';
		status = 3;
	}
}	


/*--------------------------游戏初始化----------------------------*/

//获取style属性方法，不能直接.style
function getStyle (obj,attr) {
    return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

// 游戏结束处理
function end(end_status){
	end_status?alert(food_num+'分，撞到墙啦～爱你么么哒'):alert(food_num+'分，撞到自己啦～爱你么么哒');
	clearInterval(intV);//取消定时器
	document.removeEventListener('keydown',KeyPress,false);// 取消监听键盘事件
}

//清空上次的蛇身位置
function swipe_footPath(){
	for (var i = snakeWrap.childNodes.length; i > 0; i--) {
		snakeWrap.removeChild(snakeWrap.childNodes[0]);
	}
}
//刷新蛇身位置
function showSnake(){
	// 清除原有位置
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

// 画出两侧坐标轴
function drawAxis(){
	var block_num = 650/25;
	var col = document.getElementById('col');
	var row = document.getElementById('row');
	var li_list = new Array(block_num);
	// 横轴
	for(var i = 0; i < block_num; i++){
		li_list[i] = document.createElement('li');
		li_list[i].innerText = i+1;
		row.appendChild(li_list[i]);
	}
	// 纵轴
	for(var i = 0; i < block_num; i++){
		li_list[i] = document.createElement('li');
		li_list[i].innerText = i+1;
		col.appendChild(li_list[i]);
	}
}

// 初始化加载
window.onload = function(){
	// 生成坐标轴
	drawAxis();
	// 生成蛇身
	showSnake();
}