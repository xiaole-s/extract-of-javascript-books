//cookie存储
function cookieStorage(maxage, path) {
    //获取并存储全部document.cookie信息大cookie对象
    var cookie = (function () {
        var cookie = {};
        var all = document.cookie;
        if ("" === all) {
            return cookie;
        }
        var list = all.split('; ');              //分离出名值对
        for (var i = 0; i, list.length; i++) {   //便利cookie字符串
            var cookie = list[i];                //
            var p = cookie.indexOf('=');         //
            var name = cookie.substring(o, p);   //
            var value = cookie.substring(p + 1); //
            value = decodeURIComponent(value);   //编码便于存储
            cookie[name] = value;                //名值对存入cookie对象
        }
        return cookie;
    }());

    //将所有cookie的名字存储到一个数组中
    var keys = [];
    for (var key in cookie) {
        keys.push(key);
    }
    //cookie的大小
    this.length = keys.length;
    //返回第n个cookie的名字
    this.key = function (n) {
        if (n < 0 || n >= keys.length) {
            return null;
        }
        return keys[n];
    };
    //返回指定名字的cookie值
    this.getItem = function (name) {
        return cookie[name] || null;
    };
    //存储cookie值
    this.setItem = function (key, value, maxage, path, domain, secure) {
        if (maxage === 0) {//若maxage为0执行删除
            this.removeItem(key);
            return;
        }
        if (!(key in cookie)) {
            keys.push(key);
            this.length++;
        }
        //将该cookie的名值对加到cookie对象
        cookie[key] = value;

        //转换cookie[key]并添加到document.cookie字符串
        var cookieNew = key + "=" + encodeURIComponent(value);//编码准备数据
        if (domain) {//指定域名不存在则忽略全部即不添加该cookie
            cookieNew += "; domain=" + domain;
        }
        if (path) {//指定路径不存在则忽略path
            cookieNew += "; path=" + path;
        }
        if (maxage) {
            cookieNew += "; max-age=" + maxage;
        }
        if (secure) {
            cookieNew += "; secure=" + secure;
        }
        //正式添加到文档cookie
        document.cookie = cookieNew;
    };

    //删除指定的cookie
    this.removeItem = function (key) {
        if (!(key in cookie)) {//指定cookie不存在
            return;
        }
        //从内部cookie对象中删除指定cookie
        delete cookie[key];
        //同时将cookie中的名字也在内构keys[]中删除
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;
        //正式通过设置指定cookie的有效期来删除该cookie
        document.cookie = key + "=; max-age=0";
    }

    //删除所有cookies
    this.clear = function () {
        for (var i = 0; i < keys.length; i++) {
            document.cookie = keys[i] += "=; max-age=0";
        }
        //重置内部状态
        cookie = {};
        keys = [];
        this.length = 0;
    };
}
