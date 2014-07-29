/*
每个元素都有
offsetWidth     clientWidth     scrollWidth
offsetHeight    clientHeight    scrollHeight
offsetLeft      clientLeft      scrollLeft
offsetTop       clientTop       scrollTop
offsetParent

//只包含内容和内边距 不包括边框和外边距
//（不包含滚动条：滚动条在内边距与边框之间）
//内联元素为零
clientWidth Height 
//包含上左的滚动条但不包括右下的
clientTop Left

//相对父级偏移量
offsetWidth Height 

//包括内边框+溢出内容尺寸 无溢出时=clientWidth Height
scrollWidth Height

//
scrollLeft Top

正常(document.documentElement.)或怪异(document.body.)或window.
+

//文档坐标
//document.docuemntElement.
scrollLeft  //chrome为0
scrollTop   //chrome为0
scrollWidth //chrome可滑动总宽 document宽
scrollHeight//chrome可滑动总高 document高

//document.body. 怪异模式 body并不局限与body元素，更是document体
//chrom正常 可用总宽而非仅是body+margin
scrollLeft  //chrom正常
scrollTop   //chrom正常
scrollWidth //chrome可滑动总宽 
scrollHeight//chrome可滑动总高

//window 滚动条可滚动的所有 //chrom正常
scrollX
scrollY
scrollBy(x, y)
scrollTo(x, y) = scroll(x, y)
scrollIntoView(true/false)//默认：true:top->top;false:bottom->bottom

pageXOffset
pageYOffset


//屏幕坐标window.
screen
//IE/chrome包含浏览器边框
screenX
screenY
//IE不包含浏览器边框，但chrome包含
screenLeft
screenTop


//视口/文档高宽,
//包含滚动条
window.innerWidth //chrome包含
window.innerHeight //chrome包含

//不包含滚动条
document.body.clientWidth //chrome视口
document.body.clientHeight //chrome总高度
document.documentElement.clientWidth //chrome视口
document.documentElement.clientHeight //chrome视口



//获取元素的位置
//视口
getBoundingClientRect(). //返回元素边界框不包含外边距margin
left, right, top, bottom

//计算元素的width height
getBoundingClientRect().
width height

//以数组形势返回组成元素的矩形边界框 如："<span>123<a>4</a>56</span>" 
//返回三个矩形框属性<span>123<a>,<a>4</a>,</a>56</span>
getClientRects()
left, right, top, bottom, width height



*/
//滚动条偏移量
function getScrollOffsets(w) {
    //使用指定窗口，默认当前窗口
    w = w || window;
    //>IE8
    if (null != w.pageXOffset)
        return { x: w.pageXOffset, y: pageYOffset };
    //standard
    var d = w.document;
    if ("CSS1Compat" == document.compatMode)
        return {
            x: d.documentElement.scrollLeft,
            y: d.documentElement.scrollTop
        };
    //strange
    return { x: d.body.scrollLeft, y: d.body.scrollTop };
}

//查询窗口的视口尺寸
function getViewportSize(w) {
    //使用指定窗口，默认当前窗口
    w = w || window;
    //>IE8
    if (null != w.innerWidth)
        return { w: w.innerWidth, h: w.innerHeight };
    //standard
    var d = w.document;
    if ("CSS1Compat" == document.compatMode)
        return {
            w: d.documentElement.clientWidth,
            h: d.documentElement.clientHeight
        };
    //strange
    return { w: d.body.clientWidth, h: d.body.clientHeight };
}

//获取元素的文档坐标 < IE8 低效 在不支持getBoundClientRect情况下使用
function getElementPos(elt) {
    var x = 0, y = 0;
    //循环累加偏移量
    for (var e = elt; null != e; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    //循环减去滚动偏移量
    for (var e = elt.parentNode; null != e && 1 == e.nodeType; e = e.parentNode) {
        x -= e.scrollLeft;
        x -= e.scrollTop;
    }
    return { x: x, y: y };
}


var ele=document.getElementById('fork');
var box = ele.getBoundingClientRect();
var offsets = getScrollOffsets();
//元素ele的当前文档坐标 = ele的视口坐标 + 当前文档偏移量;
var x = box.left + offsets.x; 
var y = box.top + offsets.y;

//计算元素的width height
var w = ele.width || (ele.right - ele.left);
var h = ele.height || (ele.bottom - ele.top);

//获得文档和视口的高度
var documentHeight = document.documentElement.offsetHeight;
var viewportHeight = getViewportSize();

window.scrollTo(0, documentHeight - viewportHeight);
