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
