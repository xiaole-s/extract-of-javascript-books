
//原型式继承
//主体
function clone(object) {
    function F() { }     //牺牲一个函数的空间来转储父类
    F.prototype = object;//使得子类中的改变不会影响到父类,
    return new F;
}
/* Person Prototype Object. */

var Person = {
  name: 'default name',
  getName: function() {
    return this.name;
  }
};

var reader = clone(Person);//继承Person
alert(reader.getName()); // This will output 'default name'.
reader.name = 'John Smith';
alert(reader.getName()); // This will now output 'John Smith'.

/* Author Prototype Object. */

var Author = clone(Person);
Author.books = []; // Default value.
Author.getBooks = function() {
  return this.books;
}

var author = [];

author[0] = clone(Author);
author[0].name = 'Dustin Diaz';
author[0].books = ['JavaScript Design Patterns'];

author[1] = clone(Author);
author[1].name = 'Ross Harmes';
author[1].books = ['JavaScript Design Patterns'];

author[1].getName();
author[1].getBooks();
