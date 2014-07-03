/* Extend function, improved. */

function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
  //降低耦合性 子类直接通过superclass属性访问父类，而不用事先知道父类
  subClass.superclass = superClass.prototype;
  //验证/还原 保证继承没有影响到父类
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}


/* Class Author. */

function Author(name, books) {
    //这样可在不知其父类名的情况下赋值 这样耦合性更低
  Author.superclass.constructor.call(this, name);
  this.books = books;
}
//继承函数
extend(Author, Person);

Author.prototype.getBooks = function() {
  return this.books;
};

Author.prototype.getName = function() {
  var name = Author.superclass.getName.call(this);
  return name + ', Author of ' + this.getBooks().join(', ');
};
