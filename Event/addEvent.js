//可多次但不重复的时间注册方法
function addEvent(target, type, handler) {
    if (target.addEventListener)//对应removedEventListener()
        target.addEventListener(type, handler, false);
    else//对应detachEvent()
        //IE5-IE9
        target.attachEvent("on" + type, function (event) {
            return handler.call(target, event);
        });
}
