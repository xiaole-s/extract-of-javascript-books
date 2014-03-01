//XML作为主体的HTTP POST请求
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);
    };
    //创建一个根元素为<query>的XML文档
    //<query>
    //  <find addr="where" radius="radius"> what </find>
    //</query>
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement;
    var find = doc.createElement("find");
    query.appendChild(find);
    //设置<find>的属性
    find.setAttribute("addr", where);
    find.setAttribute("radius", radius);
    //设置<find>的内容
    find.appendChild(doc.createTextNode(what));
    //自动设置Content-Type : ext/plain; charset=UTF-8
    request.send(doc);
}
