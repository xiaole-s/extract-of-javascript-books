// Class Person.
// 类实例
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
}

var reader = new Person('John Smith');
reader.getName();

// Class Author.
// 
function Author(name, books) {
  Person.call(this, name); // 给嵌套父类传参Call the superclass' constructor in the scope of this.
  this.books = books; // Add an attribute to Author.
}

Author.prototype = new Person(); // 在原型链上继承Set up the prototype chain.
// Author保证继承之后的原型链上Person对象的构造函数还是Author
Author.prototype.constructor = Author; //Set the constructor attribute to Author.
Author.prototype.getBooks = function() { // Add a method to Author.在原型中扩展方法
  return this.books;
};

var author = [];
author[0] = new Author('Dustin Diaz', ['JavaScript Design Patterns']);
author[1] = new Author('Ross Harmes', ['JavaScript Design Patterns']);

author[1].getName();
author[1].getBooks();
