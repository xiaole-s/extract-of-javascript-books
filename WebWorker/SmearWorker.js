function smear(pixels) {
    var data = pixels.data, width = pixels.width, height = pixels.height;
    var n = 10, m = n - 1;
    for (var row = 0; row < height; row++) {
        var i = row * width * 4 + 4;
        for (var col = 1; col < width; col++, i += 4) {
            data[i] = (data[i] + data[i - 4] * m) / n;
            data[i + 1] = (data[i + 1] + data[i - 3] * m) / n;
            data[i + 2] = (data[i + 2] + data[i - 2] * m) / n;
            data[i + 3] = (data[i + 3] + data[i - 1] * m) / n;
        }
    }
    return pixels;
}
//var pos;
//onmessage = function (e) {
//   pos = smear(e.data);
//}
//error 没有接收到消息前发送空数据
//postMessage(pos);

onmessage = function (e) {
    postMessage(smear(e.data));
    close();//防止主线程中没有terminate关闭该worker线程且自动忽略重复关闭命令
}

