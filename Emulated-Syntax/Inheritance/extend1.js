/* Extend function. */

function extend(subClass, superClass) {
    var F = function () { };         //牺牲一个函数的空间来转储父类
  F.prototype = superClass.prototype;//使得子类中的改变不会影响到父
  subClass.prototype = new F();      //类,
    //保证subClass继承之后的原型链上superClass对象的构造函数还是子类本身
  subClass.prototype.constructor = subClass;
}


/* Class Person. */

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
}

/* Class Author. */

function Author(name, books) {
  Person.call(this, name);//此例需要传参给父类，因此须在子类中调用父类构造函数
  this.books = books;
}
extend(Author, Person);

Author.prototype.getBooks = function() {
  return this.books;
};
