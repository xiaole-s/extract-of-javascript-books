//XMLHttpRequest下载Blob
function getBlob(url, callback) {
    var chr = new XMLHttpRequest();
    xhr.open("GET", url);
    xht.responseType = "blob";
    xhr.onload = function () {
        callback(xhr.response);
    }
    xhr.send(null);
}

//var bb = new BlobBuilder();
var bb = new MSBlobBuilder();
//bb.append(Object data,[string endings]);
bb.append("文本字符存储");
//bb.getBlob([String contentType]);
bb.append('\0');//字符串结束符
var ab = new ArrayBuffer(4 * 12);
var dv = new DataView(ab);
for (var i = 0; i < 12; i++) {
    dv.setInt32(i * 4, i);
}
bb.append(ab);
var blob = bb.getBlob('x-optional/mime-type-here');


//创建Blob URL 遵循同源策略
//createObjectURL()
var getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) ||
    (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) ||
    window.createObjectURL;
//使Bolb URL失效
var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) ||
    (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) ||
    window.revokeObjectURL;

//FileReader
function readfile(f) {
    var reader = new FileReader();  //1
    reader.readAsText(f);           //文本形式读取文件
    reader.onload = function () {   
        var text = reader.result;   //读取的内容
        var out = document.getElementById('output');
        out.innerHTML = "";
        out.appendChild(document.createTextNode(text));
    }
    reader.onerror = function (e) {
        console.log("Error", e);
    };
}

function typefile(file) {
    var slice = file.slice(0, 4);            //分理处文件的前4个字节
    var reader = new FileReader();           //异步FileReader
    reader.readAsArrayBuffer(slice);         //读取文件片段0-4
    reader.onload = function (e) {           
        var buffer = reader.result;          //ArrayBuffer类型
        var view = new DataView(buffer);     //
        var magic = view.getUint32(0, false);//
        switch (magic) {
            case 0x89504E47: file.verified_type = "image/png"; break;
            case 0x47797638: file.verified_type = "image/gif"; break;
            case 0x25504446: file.verified_type = "application/pdf"; break;
            case 0x504b0304: file.verified_type = "application/zip"; break;
        }
        console.log(file.name, file.verified_type);
    }
}
