function drag(elementToDrag, event) {
    //转化鼠标坐标为文档坐标
    var scroll = getScrollOffsets();
    var startX = event.clientX + scroll.x;
    var startY = event.clientY + scroll.y;

    //在文档坐标下待拖动元素的初始位置
    //因为elementToDrag是相对于body绝对定位的
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;
    //计算mousedown事件和元素左上角之间的距离
    var deltaX = startX - origX;
    var deltaY = startY - origY;
    //事件处理程序
    if (document.addEventListener) {
        document.addEventListener("mousemove",moveHandler, true); //时间捕捉型
        document.addEventListener("mouseup", upHandler, true);
    }
    else if (document.attachEvent) {
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);
        elementToDrag.attachEvent("onlosecapture", upHandler);
    }
    //同时不让时间传到其他元素（冒泡或捕捉）
    stopPropagate(event);
    //阻止默认行为
    cancelHandler(event);

    function moveHandler(e) {
        if (!e) {
            e = window.event;
        }
        //移动拖动元素到当前鼠标位置
        var scroll = getScrollOffset();
        elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
        elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
        //同时不让时间传到其他元素（冒泡或捕捉）
        stopPropagate(e);
    }

    function upHandler(e) {
        if (!e) {
            e = window.event;
        }
        //注销事件
        if (document.removeElementListener) {
            document.removeElementListener("mouseup", upHandler, true);
            document.removeElementListener("mousemove", moveHandler, true);
        }
        else if (document.detachEvent) {
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }
        //同时不让时间传到其他元素（冒泡或捕捉）
        stopPropagate(e);
    }
}
