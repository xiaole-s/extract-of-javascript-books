//通过捕获DOMContentLoaded和readystatechange事件来确定文档加载完成时以开始其他操作
var whenReady = (function () {
    var funcs = [];//当获得事件时要运行的函数
    var ready = false;//当触发事件时设为true
    function handler(e) {
        if (ready) return;
        if (e.type === "readystatechange" &&
            document.readyState !== "complate")
            return;
        for (var i = 0; i < funcs.length; i++)
            funcs[i].call(document);
        ready = true;
        funcs = null;
    }
    //为接收到的时间注册处理函数
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }
    return function whenReady(f) {
        if (ready) f.call(document);
        else funcs.push(f);
    }
})();
