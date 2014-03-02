
//约定习惯上的私有标记，没有实际约束，且并非构造函数或继承关系的类或原型外不可访问。
//private:_checkIsbn() _isbn _title _author

var Book = function (isbn, title, author) { // implements Publication
    this.setIsbn(isbn);
    this.setTitle(title);
    this.setAuthor(author);
//     this._isbn = isbn;
//     this._title = title || '嗨咯';
//     this._author = author || '筱乐';
}

Book.prototype = {
  _checkIsbn: function (isbn) {
        //验证
      return true;
  },
  getIsbn: function() {
    return this._isbn;
  },
  setIsbn: function(isbn) {
    if(!this._checkIsbn(isbn)) throw new Error('Book: Invalid ISBN.');
    this._isbn = isbn;
  },

  getTitle: function() {
    return this._title;
  },
  setTitle: function(title) {
    this._title = title || 'No title specified';
  },

  getAuthor: function() {
    return this._author;
  },
  setAuthor: function(author) {
    this._author = author || 'No author specified';
  },
  
  display: function() {
      return "国际书号：" + this._isbn + ", 标题：" + this._title +
             ", 作者：" + this._author;
  }
};
