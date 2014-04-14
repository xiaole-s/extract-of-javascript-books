//应用程序缓存清单应用程序主html页面通过manifest属性指定
/*
<!DOCTYPE HTML>
<html manifest='myapp.appcache">
<head>...</head>
<body>...</body>
</html>
*/

//myapp.appcache文件内容 清单文件
/*
CACHE MANIFEST
#注释 下面是文件清单
# xlapp version 1.0 (ps:更新数字提示浏览器重新下载该清单)
myapp.html
js/app-page.js
js/app-all.js
css/app.css
images/bg.png
*/

//清单更新后，应用刷新才会更新应用，即1.打开缓存2.更新清单3.下载新清单文件4.刷新
//更新缓存过程触发以下事件（ps:事件注册在ApplicationCache对象上，即window属性
//applicationCache上）


//用来返回所有处理状态
function status(msg) {
    // Display the message in the document element with id "statusline"
    document.getElementById("statusline").innerHTML = msg;
    console.log(msg); // And also in the console for debugging
}

// Each time the application is loaded, it checks its manifest file.
// The checking event is always fired first when this process begins.
//检查应用缓存清单
window.applicationCache.onchecking = function () {
    status("Checking for a new version.");
    return false;
};
// If the manifest file has not changed, and the app is already cached,
// the noupdate event is fired and the process ends.
//应用缓存清单无改动
window.applicationCache.onnoupdate = function () {
    status("This version is up-to-date.")
    return false;
};
// If the application is not already cached, or if the manifest has changed,
// the browser downloads and caches everything listed in the manifest.
// The downloading event signals the start of this download process.
//开始下载清单中未缓存文件
window.applicationCache.ondownloading = function () {
    status("Downloading new version");
    window.progresscount = 0; // Used in the progress handler below
    return false;
};
// progress events are fired periodically during the downloading process,
// typically once for each file downloaded.
//下载过程进度事件
window.applicationCache.onprogress = function (e) {
    // The event object should be a progress event (like those used by XHR2)
    // that allows us to compute a completion percentage, but if not,
    // we keep count of how many times we've been called.
    var progress = "";
    if (e && e.lengthComputable) // Progress event: compute percentage
        progress = " " + Math.round(100 * e.loaded / e.total) + "%"
    else // Otherwise report # of times called
        progress = " (" + ++progresscount + ")"
    status("Downloading new version" + progress);
    return false;
};
// The first time an application is downloaded into the cache, the browser
// fires the cached event when the download is complete.
//下载完成并首次将应用程序下载到缓存中时触发缓存完毕
window.applicationCache.oncached = function () {
    status("This application is now cached locally");
    return false;
};
// When an already-cached application is updated, and the download is complete
// the browser fires "updateready". Note that the user will still be seeing
// the old version of the application when this event arrives.
//下载完并更新后触发 便于提示用户刷新
window.applicationCache.onupdateready = function () {
    status("A new version has been downloaded. Reload to run it");
    return false;
};
// If the browser is offline and the manifest cannot be checked, an "error"
// event is fired. This also happens if an uncached application references
// a manifest file that does not exist
//离线时检测清单列表失败 或为缓存应用程序引用不存在的清单文件
window.applicationCache.onerror = function () {
    status("Couldn't load manifest or cache application");
    return false;
};
// If a cached application references a manifest file that does not exist,
// an obsolete event is fired and the application is removed from the cache.
// Subsequent loads are done from the network rather than from the cache.
//已缓存的应用程序引用不存在的清单文件时触发 同时从缓存移除该应用
window.applicationCache.onobsolete = function () {
    status("This application is no longer cached. " +
            "Reload to get the latest version from the network.");
    return false;
};
