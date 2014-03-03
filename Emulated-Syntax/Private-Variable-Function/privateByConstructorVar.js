var Book = function(newIsbn, newTitle, newAuthor) { // implements Publication

    // Private attributes. 在构造函数中没有加this.(isbn)作用域只在Book函数体中
    //是book对象不可调用的
  var isbn, title, author;

  // Private method.
  function checkIsbn(isbn) {
      //...验证
      return true;
  }  

  // Privileged methods.
  this.getIsbn = function() {
    return isbn;
  };
  this.setIsbn = function(newIsbn) {
    if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
    isbn = newIsbn;
  };

  this.getTitle = function() {
    return title;
  };
  this.setTitle = function(newTitle) {
    title = newTitle || 'No title specified';
  };

  this.getAuthor = function() {
    return author;
  };
  this.setAuthor = function(newAuthor) {
    author = newAuthor || 'No author specified';
  };

  // Constructor code.
  this.setIsbn(newIsbn);
  this.setTitle(newTitle);
  this.setAuthor(newAuthor);
};

// Public, non-privileged methods.
Book.prototype = {
    display: function() {
        return "国际书号：" + this.getIsbn()/*Isbn/this.Isbn:private error*/ + ", 标题：" + this.getTitle() +
                 ", 作者：" + this.getAuthor();
    }
};
