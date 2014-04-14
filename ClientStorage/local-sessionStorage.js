/*localStorage
 *存  储：永久性(除非web应用可以删除)，当前浏览器以字符串形式存储
 *作用域：文档源同源级别(同源：协议http/https...;主机名www.osopod.com;端口号)
         不跨浏览器，即在一个浏览器中同源网页间不同标签窗口可共享localStorage
 *
 */
localStorage.x = 2;             //设置或添加新属性
localStorage.setItem('x', 2);   //
localStorage.x;                 //获取属性，没有返回undefined
localStorage.getItem('x');      //
localStorage.length;            //存储个数
localStorage.clear();           //清楚所有
localStorage.key();             //从0开始
localStorage.removeItem()       //移除指定存储数据（属性、名值对）



/*sessionStorage
 *存  储：与顶级窗口等同（标签页），特殊当前大多浏览器可恢复指定已关闭标签页，因
          此,sessionStorage时间延长，当前浏览器以字符串形式存储
 *作用域：文档源同源同窗口（同一标签页中的多个同源<iframe>共享）级别，不跨浏览器
 *
*/
sessionStorage.x = 2;             //设置或添加新属性
sessionStorage.setItem('x', 2);   //
sessionStorage.x;                 //获取属性，没有返回undefined
sessionStorage.getItem('x');      //
sessionStorage.length;            //存储个数
sessionStorage.clear();           //清楚所有
sessionStorage.key();             //从0开始
sessionStorage.removeItem('x');   //移除指定存储数据（属性、名值对）

//对象方式存储名值对，因此可在支持delete情况下删除属性 如：delete sessionStorage.x
//但delete sessionStorage.getItem('x')不能删除sessionStorage中的x名值对，因为getItem()
//方法只是返回了指定元素的值副本

//localStorage & sessionStorage存储事件(遵循作用域，firefox/IE8至今仍不支持)
//真正的发生改变才会触发事件，如设置的新值与旧值相同或删除不存在的存储项则不会触发
onstorage = function (e) {
    alert('The changed key is ' + e.key + ' and \nthe new value is ' + e.newValue +
        '\nthe old value is ' + e.oldValue + '\nstorageArea is ' + e.storageArea +
        '\nthe source url is ' + e.url);
}
