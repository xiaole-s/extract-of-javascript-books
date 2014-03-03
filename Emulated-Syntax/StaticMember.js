var Book = (function() {
  
    // Private static attributes.
    //利用闭包使得return后的函数把numOfBooks的作用域保持到了返回函数中
    //把Book函数想象成一个命名空间，对于返回函数而言numOfBooks checkIsbn
    //相当于全局变量/函数，返回后的Book整体而言就是C++中的静态
  var numOfBooks = 0;

  // Private static method.
  function checkIsbn(isbn) {
    //... 
  }    

  // Return the constructor.
  return function(newIsbn, newTitle, newAuthor) { // implements Publication

    // Private attributes.
    var isbn, title, author;

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
    numOfBooks++; // Keep track of how many Books have been instantiated
                  // with the private static attribute.
    if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be '
        + 'created.');

    this.setIsbn(newIsbn);
    this.setTitle(newTitle);
    this.setAuthor(newAuthor);
  }
})();

// Public static method.这个是属于类Book的属性是与Book同在的静态变量/函数
Book.convertToTitleCase = function(inputString) {
  //...
};

// Public, non-privileged methods.
Book.prototype = {
  display: function() {
    //...
  }
};
