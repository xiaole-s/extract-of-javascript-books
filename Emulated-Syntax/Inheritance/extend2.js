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

/* Class Person. */
function Person(name){
    this.name = name;
}
Person.prototype.getName=function(){
    return this.name;
}
/* Class Teacher. */
function Teacher(name, subjects) {
    //这样可在不知其父类名的情况下赋值 这样耦合性更低
  Teacher.superclass.constructor.call(this, name);
  this.subjects = subjects;
}
//继承函数调用
extend(Teacher, Person);

Teacher.prototype.getSubjects = function() {
  return this.subjects;
};

Teacher.prototype.getName = function() {
  var name = Teacher.superclass.getName.call(this);
  return name + 'is a teacher of' + this.getSubjects().join(', ');
};

(new Teacher("xiaole", ["数学","语文","物理"])).getSubjects().join("和");
//["数学", "语文", "物理"]
(new Teacher("xiaole", ["数学","语文","物理"])).getName()
//"xiaole is a teacher of 数学, 语文, 物理"
