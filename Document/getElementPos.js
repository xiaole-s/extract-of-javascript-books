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
