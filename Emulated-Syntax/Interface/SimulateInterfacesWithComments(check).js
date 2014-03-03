/*

interface Composite {
    function add(child);
    function remove(child);
    function getChild(index);
}

interface FormItem {
    function save();
}

*/
var _interface = {
    Composite: ['add(child)', 'remove(child)', 'getChild(index)'],
    FormItem:['save()']
}
var CompositeForm = function(id, method, action) {
    this.implementsInterfaces = [_interface.Composite, _interface.FormItem];
    //...
};

//检查是否实现指定接口
function checkImpIn(formInstance) {
    if (!implements(formInstance, _interface.Composite, _interface.FormItem)) {
        throw new Error("Object does not implement a required interface.");
    }
    //...
}

// The implements function, which checks to see if an object declares that it 
// implements the required interfaces.
// 检查参数对象object是否实现了需要的接口
function implements(object) {//第一个是实例对象，第二个起是接口类
    for(var i = 0; i < arguments.length; i++) { // Looping through all arguments 
                                                // after the first one.
        var interfaceName = arguments[i+1]; //
        var interfaceFound = false;
        for (var j = 0; j < object.implementsInterfaces[i].length; j++) {
                if (object.implementsInterfaces[i][j] == interfaceName[j]) {
                    interfaceFound = true;
                    break;
                }
        }
        if (!interfaceFound) {
            return false; // An interface was not found.
        }
    } 	
    return true; // All interfaces were found.
}
