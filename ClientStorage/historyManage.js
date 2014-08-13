/// <reference path="jquery.js" />
/* History历史记录
 * author： xiaole（lianle.shi）
 * 坚持原生js
 */
xls = window.xls || {};

xls.HistoryManager = (function ($) {
    "use strict";

    /*
     * LocalStore 存储各种数据类型的数据到localStorage或cookie
     * 
     * name 存储名
     * notStr:存储值不是字符串的所有类型，Boolean Number Object Array
     */
    function LocalStore(name, notStr) {
        var storage = localStorage || new cookieStorage();//https://github.com/xiaole-s/extract-of-javascript-books/blob/master/ClientStorage/cookieStorage.js
        //注意动态改变local name值后要用getItem(name)或setItem(name,value)回置
        this.setItem = function (n, value) {//value能为空 name不能为空
            ((1 == arguments.length) && [value = n] || ((2 == arguments.length) && (name = n))) &&
            storage.setItem(name, (notStr ? JSON.stringify(value) : value), 360000);
        }
        this.getItem = function (n) {
            name = n || name;
            var val = storage.getItem(name);
            return notStr ? JSON.parse(val) : val;
        }
    }

    /*
     * before是条件 返回true/false，after是结论 执行操作
     * 
     * config:{
     *  name:"xlsHisManager",
     *  beforePush:fn, re:true
     *  afterPush:fn,
     *  beforeCallon:fn, re:true
     *  afterCallon:fn, 
     *  beforeClear:fn, re:true
     *  afterClear:fn
     * }
     */
    function HistoryManager(config) {
        this.vector = null;
        //this.name = config.name || "storeHis"
        this.storage = null;
        this.callback = {
            beforePush: config.beforePush || function () { return true; },
            afterPush: config.afterPush || function () { },
            beforeUpdate: config.beforeUpdate || function () { return true; },
            afterUpdate: config.afterUpdate || function () { },
            beforeClear: config.beforeClear || function () { return true; },
            afterClear: config.afterClear || function () { }
        };

        this.init(config.name ||  "storeHis", config.notStr)
    }

    HistoryManager.prototype = {
        init: function (name, noStr) {
            this.storage = new LocalStore(name, noStr);
            this.vector = this.storage.getItem() || {};
        },
        push:function (data) {
            if (this.callback.beforePush()) {
                this.vector[data.name] = data.value || "";
                this.storage.setItem(this.vector);

                this.callback.afterPush(this.vector);
            }
            return this.vector;
        },
        update:function(data){
            if (this.callback.beforeUpdate()) {
                delete this.vector[data.name];
                this.vector[data.name] = data.value || "";
                this.storage.setItem(this.vector);

                this.callback.afterUpdate(this.vector);
            }
        },
        clear: function () {
            this.callback.beforeClear() && (this.vector = {}) && [this.storage.setItem("")] && this.callback.afterClear();
            /*if (this.callback.beforeClear()) {
                this.vector = {};
                this.storage.setItem("");
                this.callback.afterClear();
            }*/
        },
        getHistory: function () {
            return this.vector;
        }
    }
    return HistoryManager;
}(jQuery));//window

jQuery.xlsHistory = function (option) {
    return new xls.HistoryManager(/*node,*/ option);
}
//this.each(function (i, node) {
    //    new xls.HistoryManager(node, option);
    //});
