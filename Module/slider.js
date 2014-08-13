
/// <reference path="jquery.js" />
/* Slider滑动
 * author： xiaole（lianle.shi）
 * 坚持原生js
 */
var xls = {};
/* 
 *---------------------------Slide Interface---------------------------------
 * 
 * 滑动页是否已经打开            ｜pageIsOpen     |bool         |
 * 异步加载的内容是否已经加载    ｜asyncIsLoaded  |bool         |
 * 滑动持续时间                  ｜duration       |number       |
 * 滑入动画方式                  ｜effectIn       |string       |
 * 滑出动画方式                  ｜effectOut      |string       |
 * 滑动进入的方向                ｜direction      |string       |r2l, t2b, b2t, l2r
 * 滑动停止位置的偏移值          ｜offset         |object{x, y} |
 * 滑动页内容是否需要异步载入    ｜ndAsyncLoad    |bool         |
 * 是否对异步加载的内容开启缓存  ｜cacheAsnyc     |bool         |
 * 支持在滑动中执行其他操作的回调｜callback       |function     |
 * 初始化接口可以绑定一些外部使用的事件      
 * 能处理外部链接或直接点及返回物理按键返回滑动前页面（可能URL不变）
 */
//揭示模块化
xls.Slider = (function ($) {
    "use strict";
    //Slider ... 私有静态区
    function Slider(node, config) {
        this.node = $(node);
        this.config = {//所有默认值相同放在prototype
            //pageIsOpen: false,
            duration: 300,
            effectIn: "linear",
            effectOut: "linear",
            direction: "r_l",
            offset: 0,
            inDom: "",
            outDom: "",
            asyncIsLoaded: false,
            ndAsyncLoad: false,
            asyncFunc: function () { },
            callback: {
                inBefore: function () { },
                inDone: function () { },
                outBefore: function () { },
                outDone: function () { }
            }
        }
        this.init(config);
    }

    Slider.prototype = {
        init: function (config) {
            config.inDom = config.inDom || this.node.children(".in-clk");
            config.outDom = config.outDom || this.node.children(".out-clk");
            $.extend(true, this.config, config);

            //包一层外壳防止滑动覆盖
            //var wrap = $('<div style="width:100%;height:100%;overflow:hidden;position:relative;"></div>');
            //this.node.wrap(wrap);

            var self = this,
                cfig = this.config,
                parent = this.node.parent(),
                nodeOffset = this.node.offset(),
                nLeft = nodeOffset.left,
                nTop = nodeOffset.top,
                nWidth = this.node.width(),
                nHeight = this.node.height(),
                pWidth = parent.width(),
                pHeight = parent.height(),
                parentOffset = parent.offset(),
                pLeft = parentOffset.left,
                pTop = parentOffset.top,
                map = {
                    l_r: {
                        inn: { left: nLeft + cfig.offset, top: nTop },
                        out: { left: -(nLeft - pLeft + nWidth), top: nTop }
                    },
                    r_l: {
                        inn: { left: nLeft + cfig.offset, top: nTop },
                        out: { left: pWidth - (nLeft - pLeft), top: nTop }
                    },
                    t_b: {
                        inn: { left: nLeft + cfig.offset, top: nTop },
                        out: { left: nLeft, top: -(nTop - pTop + nHeight) }
                    },
                    b_t: {
                        inn: { left: nLeft + cfig.offset, top: nTop },
                        out: { left: nLeft, top: pHeight - (nTop - pTop) }
                    }
                };

            this.slideDirection = map[this.config.direction];
            
            $(this.config.inDom).bind("click", function () {
                self.slideIn();
            })
            $(this.config.outDom).bind("click", function () {
                self.slideOut();
            })
        },
        slideIn: function () {
            var d = this.slideDirection,
                c = this.config;
            this.node.offset({ left: d.out.left, top: d.out.top })

            c.callback.inBefore && c.callback.inBefore();

            if (c.ndAsyncLoad) {
                setTimeout(c.asyncFunc, 0);
            }
            
            this.node.css({
                display: "block",
                "z-index":1000
            });

            this.node.animate({
                left: d.inn.left,
                top: d.inn.top
            },
            {
                duration: c.duration,
                easing: c.effectIn,
                queue: false,
                //complete: c.callback.inDone && c.callback.inDone()
                done: c.callback.inDone && c.callback.inDone()
            });
        },
        slideOut: function () {
            var self = this,
                d = this.slideDirection,
                c = this.config;
            //this.node.offset({ left: d.inn.left, top: d.inn.top })
            c.callback.outBefore && c.callback.outBefore();

            this.node.animate({
                left: d.out.left,
                top: d.out.top
            },
            {
                duration: c.duration,
                easing: c.effectIn,
                queue: false,
                complete: function () {
                    if (self.config.offset == 0) {
                        self.node.css({
                            "z-index": 0,
                            display: "none"
                        });
                    }
                },
                done: c.callback.outDone && c.callback.outDone()
            });
        }
    }
    
    return Slider;
}(jQuery));

jQuery.fn.xlsSlider = function (config) {
    this.each(function (i, node) {
        new xls.Slider(node, config);
    });
}

//$.xlsHistory({});

