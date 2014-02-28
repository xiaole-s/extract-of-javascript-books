//表单编码的GET请求
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    //GET无请求体 以查询字符串形式发送数据
    //在asp.net mfc等中还支持http://localhost:23523/parent/child1的方式
    var qUrl = url + "?" + encodeFormData(data);
    request.open("GET", qUrl);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);
    };
    request.send(null);
}
