//异步/常规
function getTextAsync(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if (type.match(/^text/))
                callback(request.responseText);
        }
    };
    request.send(null);
}

//同步
function getTextSync(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);

    if (request.status !== 200)
        throw new Error(request.statusText);

    var type = request.getResponseHeader("Content-type");
    if (!type.match(/^text/))
        throw new Error("期望获得文本响应，但获得了：" + type);

    return request.responseText;
}

function gtCallback(t) {
    test.innerHTML += '<div>' + t + '</div>';//测试+=性能不好
}
gt1.onclick = function () {
    getTextAsync(gt1.dataset.url, gtCallback);
}
gt2.onclick = function () {
    gtCallback(getTextSync(gt2.dataset.url));
}
