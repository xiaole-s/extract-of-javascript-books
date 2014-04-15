//IndexedDB

var idxDB = window.indexedDB || //标准版本
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
//事务处理对象
var IDBTrans = window.IDBTransaction || window.webkitIDBTransaction;
//表示键值范围对象
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
//IDBKeyRange.bound(Object lower, Object upper,[Boolean lowerOpen],[Boolean upperOpen])
//IDBKeyRange.lowerBound(Object bound,[Boolean open]);
//IDBKeyRange.upperBound(Object bound,[Boolean open]);
//IDBKeyRange.only(Object value);

function logerr(e) {
    console.log("IndexedDB 错误" + e.code + ": " + e.message);
}

//异步获取数据库对象（包括创建可初始化）
function withDB(func) {
    var request = indexedDB.open("zipcode");//打开（或创建）指定数据库
    request.onerror = logerr;               //以日志形式记录发生的错误
    request.onsuccess = function () {       //
        var db = request.result;            //当前打开数据库句柄
        if ('1' === db.version) {           //已初始化
            func(db);
        } else {
            initdb(db, func);
        }
    }
}

//查询邮编的所在城市
function lookupCity(zip, callback) {//查询邮编
    withDB(function (db) {
        //创建一个事务处理对象
        var transaction = db.transaction(["zipcodes"],//所需的对象存储区
                            IDBTransaction.READ_ONLY, //没有更新
                            0);                       //没有超时
        //从事务中获取对象存储区
        var objects = transaction.objectStore("zipcodes");
        //异步在数据库中查询对象
        var request = objects.get(zip);
        request.onerror = logerr;
        request.onsuccess = function () {
            var object = request.result;
            if (object) {
                callback(object.city + ', ' + object.state);
            } else {
                callback("没有找到" + zip + "的记录");
            }
        }
    });
}

//查询城市对应的邮编
function lookupZipcodes(city, callback) {
    withDB(function (db) {
        var transaction = db.transaction(['zipcodes'],
                                         IDBTransaction.READ_ONLY, 0);
        var store = transaction.objectStore('zipcodes');
        var index = store.index("cities");//从对象中获取城市索引
        //这个查询可能会返回很多结果，因此要用游标来获取 
        //需要一个表示键值范围的range对象
        var range = new IDBKeyRange.only(city);//以单键city获取一个range

        //异步请求一个游标
        var request = index.openCursor(range);
        request.onerror = logerr;
        request.onsuccess = function () {//每次有匹配查询都会调用(可调多次)
            var cursor = request.result; //获取的游标
            if (!cursor) return;         //可能有多处匹配，没有则退出返回
            var object = cursor.value;   //获取匹配的数据项
            callback(object);            //回调处理
            cursor.continue();           //继续请求下一个游标
            
        };
    });
}

//使用IndexedDB

//展示查询结果
function displayCity(zip){
    lookupCity(zip,function(s){
        document.getElementById('city').value = s;
    });
}

function displayZipcodes(city){
    var output=document.getElementById("zipcodes");
    output.innerHTML="匹配邮编:";
    lookupZipcodes(city,function(o){
        var div =document.createElement("div");
        var text=o.zipcode+": "+o.city+", "+o.state;
        div.apendChild(document.createTextNode(text));
        output.appendChild(div);
    })
}

//建立数据库
function initdb(db, func) {
    var statusline = document.createElement("div");
    //statusline.style.cssText=\
    document.body.appendChild(statusline);
    function status(msg) {
        statusline.innerHTML = msg.toString();
    }
    status("邮编数据库初始化");
    var request = db.setVersion("1");//控制数据库版本的更新
    request.onerror = status;
    request.onsuccess = function () {
        var store = db.createObjectStore("zipcodes",
                                        { keyPath: "zipcodes" });
        store.createIndex("cities", "city");
        //获取数据（格式：02130，Jamaica Plain,MA,42.309998,-71.11171）
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "zipcodes.csv");
        xhr.send();
        xhr.onerror = status;
        var lastChar = 0, numlines = 0;
        //获取数据后批量处理数据库文件 两个事件共用一个处理函数
        //onload 代替onreadystatus
        xhr.onprogress = xhr.onload = function (e) {
            var lastNewline = xhr.responseText.lasIndexOf("\n");
            if (lastNewline > lastChar) {
                var chunk = xhr.responseText.substring(lastChar, lastNewline);
                lastChar = lastNewline + 1;//计算下次开始位置

                var lines = chunk.split("\n");
                numlines += lines.length;
                //创建写数据事务处理
                var transaction = db.transaction(["zipcodes"],
                                        IDETransaction.READ_WRITE);
                //从事务中获取对象存储区
                var store = transaction.objectStore("zipcode");
                //循环每个数据并存储到数据库
                for (var i = 0; i < lines.length; i++) {
                    var fields = lines[i].split(",");
                    var record = {
                        zipcode: filed[0],
                        city: fields[1],
                        state: fields[2],
                        latitude: field[3],
                        longitude: fields[4]
                    };
                    //像数据库中添加数据
                    store.put(record);//为防止覆盖可用add()方法添加
                }
                status("邮编数据库已初始化" + numlines + "条");
            }
            //处理完数据后做一个查询检测完成后 开始处理其他的
            if (e.type == 'load') {
                lookupCity('02134', function (s) {
                    document.body.removeChild(statusline);
                    withDB(func);
                });
            }
        }
    }
}

