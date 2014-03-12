//本文档通过调用js文档(主线程)的Worker线程运行全新的Javascript环境中
//因此他不影响主线程的响应（UI等）
//WorkerGlobalScope全局对象代表了该新运行环境就像窗口中的window对象一样

//与父文档中Worker对象worker.postMessage() .onmessage不是同一个
postMessage();
onmessage = function () { };

var xhr = new XMLHttpRequest();

var wk = new Worker();//子线程Worker（workerLoad.js）创建自己的Worker子线程

WorkerGlobalScope

//相对本文件路径
importScripts("another1.js", "another2.js", "another3.js");


//终止当前Worker与在父文档中worker.terminate()等效
close();

var bT = false;
if (location.href === 'workerLoad1.js')
    bT = true;

