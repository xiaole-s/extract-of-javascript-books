//函数节流
function throttle(fn, delay) {
    var timer;
    return function () {
        var self = this;
        //alert("timer: " + timer);
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(self, arguments);
        }, delay);
    }
}
//这个节流函数并不适用与更多场景，比如在web游戏中，键盘事件响应控制人物
//走动，同时更换播放行走的动画帧,上面这个函数用户的点一下走一下，
//如果用户想长按连续行走(已知浏览器响应按键事件重复执行的间隔远小于每一
//行走状态的动画时长即fn执行时间，ps:这里面还有异步的问题)，有一个处理方
//法是增加一个比动画时间稍长一点的延迟,也是就说在这个延迟之后必须执行下
//下一次调用执行动画，这里使用operatDelay表示操作(比实际多一点)所需要的时间
//函数节流改进版
function throttle2(fn, delay, operatDelay) {
    var timer,
        start;
    delay = operatDelay < delay ? delay : operatDelay;//必须让动画播放完
    //alert("start1: "+start);
    return function () {
        //alert("operatDelay: " + operatDelay);
        //alert("start2: " + start);
        var self = this, cur = new Date();
        clearTimeout(timer);
        start || (start = cur);
        //alert("start3: " + start);
        //超时后直接执行，使动画连贯
        if (operatDelay <= cur - start) {
            fn.apply(self, arguments);
            start = cur;
        }
        else {
            timer = setTimeout(function () {
                fn.apply(self, arguments)
            }, delay);
        }
    }
}
