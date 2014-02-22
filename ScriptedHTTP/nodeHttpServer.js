//安装nodejs,命令行到指定文件目录运行脚本[node nodeHttpServer.js]此目录为该服
//务器目录,即可打开浏览器测试ScriptedHttp中的代码 
// This is a simple NodeJS HTTP server that can serve files from the current
// directory and also implements two special URLs for testing.
// Connect to the server at http://localhost:8000 or http://127.0.0.1:8000
// First, load the modules we'll be using
var http = require('http'); // HTTP server API
var fs = require('fs'); // For working with local files
var server = new http.Server(); // Create a new HTTP server
server.listen(8000); // Run it on port 8000.监听端口 1024-65535
// Node uses the "on()" method to register event handlers.
// When the server gets a new request, run this function to handle it.
//注册服务器的请求事件处理函数
server.on("request", function (request, response) {
    // Parse the requested URL
    var url = require('url').parse(request.url);
    // A special URL that just makes the server wait before sending the
    // response. This can be useful to simulate a slow network connection.
    //用一个指定的URL来使在发送请求之前服务等待，以此来模拟网络链接延迟
    if (url.pathname === "/test/delay") {
        // Use query string for delay amount, or 2000 milliseconds
        //用查询字符串的数量或2000毫秒来做为延迟时间
        var delay = parseInt(url.query) || 2000;
        // Set the response status code and headers
        //设置服务相应头和状态码
        response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
        // Start writing the response body right away
        //即刻开始写响应体
        response.write("Sleeping for " + delay + " milliseconds...");
        // And then finish it in another function invoked later.
        //
        setTimeout(function() {
            response.write("done.");
            response.end();
        }, delay);
    }
        // If the request was for "/test/mirror", send back the request verbatim.
        // Useful when you need to see the request headers and body.
        //支持查询请求头和内容
    else if (url.pathname === "/test/mirror") {
        // Response status and headers
        response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
        // Begin the response body with the request
        response.write(request.method + " " + request.url +
        " HTTP/" + request.httpVersion + "\r\n");
        // And the request headers
        for(var h in request.headers) {
            response.write(h + ": " + request.headers[h] + "\r\n");
        }
        response.write("\r\n"); // End headers with an extra blank line
        // We complete the response in these event handler functions:
        // When a chunk of the request body, add it to the response.
        //将一整块请求体作为响应体完全返回
        request.on("data", function(chunk) { response.write(chunk); });
        // When the request ends, the response is done, too.
        request.on("end", function(chunk) { response.end(); });
    }
        // Otherwise, serve a file from the local directory.
    else {
        // Get local filename and guess its content type based on its extension.
        //获取本地文件并通过其扩展名推测其内容的类型
        var filename = url.pathname.substring(1); // strip leading /
        var type;
        switch(filename.substring(filename.lastIndexOf(".")+1)) { // extension
            case "html":
            case "htm": type = "text/html; charset=UTF-8"; break;
            case "js": type = "application/javascript; charset=UTF-8"; break;
            case "css": type = "text/css; charset=UTF-8"; break;
            case "txt": type = "text/plain; charset=UTF-8"; break;
            case "manifest": type = "text/cache-manifest; charset=UTF-8"; break;
            case "json": type = "application/json"; break;
            case "xml": type = "application/json; charset=UTF-8"; break;
            default: type = "application/octet-stream"; break;
        }
        // Read the file asynchronously and pass the content as a single
        // chunk to the callback function. For really large files, using the
        // streaming API with fs.createReadStream() would be better.
        //请求的文件通过服务其本地读取后加入到响应体返回
        fs.readFile(filename, function (err, content) {
            if (err) { // If we couldn't read the file for some reason
                response.writeHead(404, { // Send a 404 Not Found status
                    "Content-Type": "text/plain; charset=UTF-8"
                });
                response.write(err.message); // Simple error message body
                response.end(); // Done
            }
            else { // Otherwise, if the file was read successfully.
                response.writeHead(200, // Set the status code and MIME type
                { "Content-Type": type });
                response.write(content); // Send file contents as response body
                response.end(); // And we're done 响应结束
            }
        });
    }
});
