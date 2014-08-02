; (function ($) {
    $.extend($.fn, {
        method: function (opt) {
            //通过源对象扩展目标对象的属性，源对象属性将覆盖目标对象属性。
            //这样就实现了传入参数与默认值的模拟
            //默认情况下复制为浅复制。如果第一个参数为true表示深度复制。
            opt = $.extend({
                //放类对象属性的默认值
                attr1: 1,
                //attr...
                attrn: "n",
                //init: function () { },//初始化方法 [1]
                callback: function () { }//回调方法等
            }, opt);
            //这样写可能有点挤 我们拆开来看
            /*
            var deft = {//默认值
                attr1: 1,
                //attr...
                attrn: "n",
            }
            //deft是目标对象 是被传入参数 opt对象扩展的,属性相同被覆盖
            var opt = $.extend(deft, opt);
            */
            //*可选配置
            opt = $.extend(opt, {
                //添加必要的更改受保护的属性方法
                init: function () {   //更新位置 改@1  
                    //初始化
                }//,
                //...
            })
            //*/

            //第一种：$.each(collection, function(index, item){ ... }) collection
            //遍历数组元素或以key-value值对方式遍历对象。回调函数返回 false 时停止遍历。
            //第二种：$(selector).each(function(index, item){ ... }) self(this)
            //遍历一个$(selector)集合对象，为每一个匹配元素执行一个函数。this关键字指向
            //当前item(作为函数的第二个参数传递)。如果函数返回 false，遍历结束。
            //两种不一样这里使用的是第二种，this在这里的上下文环境是$(selector)，及当前选中
            return this.each(function () {
                //实现代码
                var self = $(this);
                opt.init.call(this);


                //处理事件...
            });
        }
    })
})(zepto)//jQuery
