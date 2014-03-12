//异步的将图片内容替换成动态模糊版本
function smear(img) {
    //创建一个和图片尺寸相同的屏幕外<canvas>
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    //将图片复制到画布中
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    var pixels = context.getImageData(0, 0, img.width, img.height);

    //创建Worker子线程将像素信息传递给Worker的响应 相对于page
    var worker = new Worker("js/SmearWorker.js");
    worker.postMessage(pixels);

    //注册事件处理程序来获取Worker的响应
    worker.onmessage = function (e) {
        if ('string' === typeof e.data) {//调试有错误时输出 
            console.log("Worker: " + e.data);
           return;
        }
        var smeared_pixels = e.data;
        context.putImageData(smeared_pixels, 0, 0);
        //*
        img.src = canvas.toDataURL();
        /*/
        var img1 = document.createElement('img');
        img1.width = canvas.width;
        img1.height = canvas.height;
        img1.src = canvas.toDataURL();
        content.appendChild(img1);
        ii++;
        //*/
        worker.terminate();
        canvas.width = canvas.height = 0;
    }

    worker.onerror = function (e) {
        console.log("Error at " + e.filename + ":" + e.lineno + ":" + e.message);
    }
}
var ii = 0;
var content = document.getElementById("img_me");
var imgs = content.getElementsByTagName('img');
var src = imgs[0].src;
add.onclick = function () {
    imgs[ii].src = src;
    var time = setInterval(function () { smear(imgs[ii]) }, 60);
    setTimeout(function () { clearInterval(time); }, 3000);
};
