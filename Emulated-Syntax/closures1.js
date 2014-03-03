//闭包
function foo() {
  var a = 10;
 
  function bar() {//嵌套函数
    a *= 2;
    return a;
  }
   
  return bar;   //嵌套函数bar()把a的作用域保持/带到了foo()执行完后形成闭包
}
/*//测试
var baz = foo(); // baz is now a reference to function bar.
baz(); // returns 20.
baz(); // returns 40.
baz(); // returns 80.
//
var blat = foo(); // blat is another reference to bar.
blat(); // returns 20, because a new copy of a is being used. 
*/
