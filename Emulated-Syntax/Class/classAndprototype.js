//prototype中的对象属性和构造函数中的对象属性
function Range(from, to) {
    this.from = from;
    this.to = to;
    this.originalData = { a: 1 };
}

Range.prototype = {
    protoData:{a:2}
}

var a = new Range(0, 100);
var b = new Range(100, 200);

//-->Object {protoData: Object}
a.protoData === b.protoData
//-->true
a.originalData === b.originalData
//-->false
//构造函数中的属性是每一个新建对象都重新复制一份
//而prototype中的属性只保留了一份
