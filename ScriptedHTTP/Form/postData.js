//表单编码的POST请求
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {   //0 - (未初始化)还没有调用send()方法
        if (request.resdyState === 4 && callback)//1 - (载入)已调用send()方法，正在发送请求
            callback(request);                   //2 - (载入完成)send()方法执行完成，
                                                 //3 - (交互)正在解析响应内容
    };                                           //4 - (完成)响应内容解析完成，可以在客户端调用了
    request.setRequestHeader("Content-Type",     //设置请求头的内容类型
            "application/x-www-form-urlencoded");//"Content-Type"
    //发送数据
    request.send(encodeFormData(data));//发送表单编码
}
