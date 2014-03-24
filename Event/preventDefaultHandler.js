//事件取消
function preventDefaultHandler(event) {
    var event = event || window.event;//用于IE

    //处理事件代码

    //取消事件相关默认行为
    if (event.preventDefault) {
        event.preventDefault(); //标准模式
    }
    if (event.returnValue) {
        event.returnValue = false; //IE
    }
    return false;//用于处理适用对象属性注册的处理程序
}
