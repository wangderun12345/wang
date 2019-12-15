function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

var box = document.getElementById('box');
var NavList = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var number = 1;
var isMoving = false;

function forward()
{
    number++;
    navChange();
    animate(slider,{left:-1200*number},function()
    {
        if(number === 6)
        {
            slider.style.left="-1200px";
            number = 1;
        }
    });
}

 function back()
{
    number--;
    navChange();
    animate(slider,{left:-1200*number},function()
    {
        if(number === 0)
        {
            slider.style.left="-6000px";
            number = 5;
        }
    });
}

var timer = setInterval(forward,2000);

box.onmouseover = function()
{
    animate(left,{opacity:50});
    animate(right,{opacity:50});
    clearInterval(timer);
}
box.onmouseout = function()
{
    animate(left,{opacity:0});
    animate(right,{opacity:0});
    timer = setInterval(forward,2000);
}

right.onclick = forward;
left.onclick = back;

for(var i = 0 ; i < NavList.length ; i++)
{
    NavList[i].idx = i;
    NavList[i].onclick = function()
    {
        number = this.idx+1;
        navChange();
        animate(slider,{left:-1200*number});
       
    }
}

function navChange()
{
    for(var i = 0 ; i < NavList.length ; i++)
    {
        NavList[i].className='';
    }
    if(number === 6)
    {
        NavList[0].className = 'active';
    }
    else if(number === 0)
    {
        NavList[4].className = 'active';
    }
    else
    {
        NavList[number-1].className = 'active';
    }
    
}

function Scroll()
{
    var speed=50;
    var MyTest = null;
    var scroll_begin = document.getElementById("scroll_begin");
    var scroll_end = document.getElementById("scroll_end");
    var scroll_div = document.getElementById("scroll_div");
    scroll_end.innerHTML=scroll_begin.innerHTML;

    function Marquee()
    {
        if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0)
            scroll_div.scrollLeft-=scroll_begin.offsetWidth;
        else
            scroll_div.scrollLeft++;
    }
    MyTest=setInterval(Marquee,speed);
    scroll_div.onmouseover = function()
    {
        clearInterval(MyTest);
    }
    scroll_div.onmouseout = function()
    {
        MyTest = setInterval(Marquee,speed);
    }
}
Scroll();