//cookie存储
function cookieStorage(maxage, path) {
    if (!navigator.cookieEnabled) {
        alert('浏览器cookie未开启!');
        return;
    }
    //获取并存储全部document.cookie信息大cookie对象
    var cookies = (function () {
        var cookies = {};
        var all = document.cookie;
        if ("" === all) {
            return cookies;
        }
        var list = all.split('; ');              //分离出名值对
        //for (var i = 0; i < list.length; i++) {   //便利cookie字符串
        //因为cookie对当前web页面以及该页面同目录或子目录的其他web页面可见
        //而子目录页面的cookie在上级目录中并不可见
        //chrome/IE中存储cookie的字符串是按文档路径path由深至浅存储项
        for (var i = list.length - 1; i > -1; i--) {
            var cookie = list[i];                //
            var p = cookie.indexOf('=');         //
            var name = cookie.substring(0, p);   //
            var value = cookie.substring(p + 1); //
            value = decodeURIComponent(value);   //编码便于存储
            //同名存储项path更精确的覆盖上层的
            cookies[name] = value;                //名值对存入cookie对象
        }
        return cookies;
    }());

    //将所有cookie的名字存储到一个数组中
    var keys = [];
    for (var key in cookies) {
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
        return cookies[name] || null;
    };
    //存储cookie值
    this.setItem = function (key, value, maxage, path, domain, secure) {
        if (maxage === 0) {//若maxage为0执行删除
            this.removeItem(key);
            return;
        }
        if (!(key in cookies)) {//null === cookies[key]
            keys.push(key);
            this.length++;
        }
        //将该cookie的名值对加到cookie对象
        cookies[key] = value;

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
        if (!(key in cookies)) {//指定cookie不存在
            return;
        }
        //从内部cookie对象中删除指定cookie
        delete cookies[key];
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
        cookies = {};
        keys = [];
        this.length = 0;
    };
}
