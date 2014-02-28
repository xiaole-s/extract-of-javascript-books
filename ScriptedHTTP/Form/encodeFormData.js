//表单编码
function encodeFormData(data) {
    if (!data) return ""; //
    var pairs = []; //保存表单元素和值
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;//过滤继承属性
        if (typeof data[name] === "function") continue;//过滤方法
        var value = data[name].toString();
        //编码名字和值
        name = encodeURIComponent(name.replace("%20", "+"));
        value = encodeURIComponent(value.replace("%20", "+"));
        pairs.push(name + "=" + value);
    }
    return pairs.join("&");//为构建表单编码字符串
}
