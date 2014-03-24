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
