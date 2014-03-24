//停止事件传播 冒泡或捕捉
function stopPropagate(event) {
    var event = event || window.event;//用于IE

    //不让事件传到其他元素（冒泡或捕捉）
    if (event.stopPropagation) {
        event.stopPropagation();   //标准模式
    }
    else {
        event.cancleBubble = true; //IE
    }
}
