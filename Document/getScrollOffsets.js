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
