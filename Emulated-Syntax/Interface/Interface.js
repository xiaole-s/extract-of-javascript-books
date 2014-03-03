// Constructor.
//接口类的构造器函数，构造函数在继承中讲解
var Interface = function(name, methods) {
    if(arguments.length != 2) {
        throw new Error("Interface constructor called with构造函数被以..个参数调用 "
            + arguments.length + "arguments, but expected exactly但实际只需 2.");
    }
    
    this.name = name;
    this.methods = [];
    for(var i = 0, len = methods.length; i < len; i++) {
        if(typeof methods[i] !== 'string') {//排除传入的不是函数名
            throw new Error("Interface constructor expects method names to be " 
              + "passed in as a string.");
        }
        this.methods.push(methods[i]);        
    }    
};    

// Static class method.
//每个对象共用一个静态类方法而不产生多个副本
Interface.ensureImplements = function(object) {
    if(arguments.length < 2) {//第一个是检测对象，第二个开始是接口名
        throw new Error("Function Interface.ensureImplements called with " + 
          arguments.length  + "arguments, but expected at least 2.");
    }
    
    for (var i = 1, len = arguments.length; i < len; i++) {
        //检查接口类型
        var interface = arguments[i];
        if(interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments "   
              + "two and above to be instances of Interface.");
        }
        //检查接口中的方法
        for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if(!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " 
                  + "does not implement the " + interface.name 
                  + " interface. Method " + method + " was not found.");
            }
        }
    } 
};

