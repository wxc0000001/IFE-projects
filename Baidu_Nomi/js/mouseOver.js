//获取元素
var bg_pic = document.getElementById('bg_pic');
var floatLayer = document.getElementById('floatLayer');
var content = document.getElementById('content');
// 触发事件
bg_pic.onmouseover = function(){
	// bg_pic.style.animation = 'blur_in 2s';
	// bg_pic.style.filter = 'blur(5px)';
	// content.style.animation = 'blur_in 2s';
	// floatLayer.style.display = 'block';
	
}
bg_pic.onmouseout = function(){
	// bg_pic.style.animation = 'blur_out 2s';
	// bg_pic.style.filter = 'blur(0px)';
	// floatLayer.style.display = 'none';
}
floatLayer.onmouseover = function(e){
	// stopBubble(e);
	// console.log('test1');
}
floatLayer.onmouseout = function(e){
	// stopBubble(e);
	// console.log('test3');
}

// //阻止事件冒泡
// function stopBubble(e) {
// //如果提供了事件对象，则这是一个非IE浏览器
// if ( e && e.stopPropagation )
//     //因此它支持W3C的stopPropagation()方法
//     e.stopPropagation();
// else
//     //否则，我们需要使用IE的方式来取消事件冒泡
//     window.event.cancelBubble = true;
// }