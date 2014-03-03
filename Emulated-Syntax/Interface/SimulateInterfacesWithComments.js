/*用注释的方式来模拟接口

interface Composite {
    function add(child);
    function remove(child);
    function getChild(index);
}

interface FormItem {
    function save();
}

*/
//去实现上面接口的模拟类
var CompositeForm = function(id, method, action) { // implements Composite, FormItem
    //...
};

//下面是接口的实现部分
//
// Implement the Composite interface.

CompositeForm.prototype.add = function(child) {
    //...
};
CompositeForm.prototype.remove = function(child) {
    //...
};
CompositeForm.prototype.getChild = function(index) {
    //...
};

// Implement the FormItem interface.

CompositeForm.prototype.save = function() {
    //...
};
