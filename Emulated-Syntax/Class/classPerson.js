// Class Person.
// 类实例
function Person(name) {
  this.name = name;
}
//Person的原型
Person.prototype.getName = function() {
  return this.name;
}

var reader = new Person('John Smith');
reader.getName();
