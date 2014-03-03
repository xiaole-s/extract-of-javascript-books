
//参元类继承

/* Augment function. */
function augment(receivingClass, givingClass) {
  for(methodName in givingClass.prototype) { //一个一个的拷贝
    if(!receivingClass.prototype[methodName]) {//不覆盖拷贝
      receivingClass.prototype[methodName] = givingClass.prototype[methodName];
    }
  }
}

/* Augment function, improved. */
function augment(receivingClass, givingClass) {//需要继承的方法作为参数枚举
  if(arguments[2]) { // Only give certain methods.
    for(var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  else { // Give all methods.
    for(methodName in givingClass.prototype) { //同上面一种一个一个拷贝
      if(!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}

/* Mixin class. */
var Mixin = function() {};
Mixin.prototype = {
  serialize: function() {
    var output = [];
    for(key in this) {
      output.push(key + ': ' + this[key]);
    }
    return output.join(', ');
  }
};
//Author继承Mixin
augment(Author, Mixin);

var author = new Author('Ross Harmes', ['JavaScript Design Patterns']);
var serializedString = author.serialize();
