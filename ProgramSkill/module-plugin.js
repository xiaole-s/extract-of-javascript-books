/// <reference path="jquery.js" />

var xls = {};

//揭示模块化
xls.SLIDE = (function ($) {//修改关闭扩展开放
    "use strict"; //IIFE中保证只在显示调用中执行
    //Slide ... 私有静态区

    //
    function Slide(dom, option) {

    }

    Slide.prototype = {

    }

    return Slide;
}(jQuery));//IIFE 模块化 并向jQuery开放 或 Zepto ...

jQuery.fn.xlsSlide = function (option) {
    this.each(function (i, node) {
        new xls.SLIDE(node, option);
    })
}

$().xlsSlide({});
