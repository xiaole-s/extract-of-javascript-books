/*8种类型化数组
Int8Array();    //有符号字节
Uint8Array();   //
Int16Array();   //有符号16为短整型
Uint16Array();  //
Int32Array();   //有符号32为整型
Uint32Array;    //
Float32Array(); //32位浮点数
Float64Array(); //64位浮点数 javascript常规数
*/
//三种形式  其他相同
//Int8Array(Number length);
//Int8Array(TypedArray array);
//Int8Array(Array array);
//Int8Array(ArrayBuffer, Number byteOffset, Number length);

//找比指定数小的最大素数  埃拉托色尼筛选算法
function sieve(n) {
    var a = new Int8Array(n + 1);
    var max = Math.floor(Math.sqrt(n));
    var p = 2;
    while (p <= max) {
        for (var i = 2*p; i < n; i+=p) {
            a[i] = 1;
        }
        while (a[++p]) /*无体*/;
    }
    while (a[n]) {
        n--;
    }
    return n;
}


//set方法
//set(Number index, Number value);
//set(TypedArray array, [Number offset]);
//set(Array array, [Number offset]);
var bytes = new Uint8Array(1024);
var pattern = new Uint8Array([0, 1, 2, 3]);
//控制偏移量可覆盖

bytes.set(pattern);                 //offset=0 将pattern复制到bytes的开始
bytes.set(pattern, pattern.length); //offset=4 接着在复制一边
bytes.set([4, 5, 6, 7], 8);         //offset=8 

//subarray方法
//subarray(Number begin, [Number end]);
//return view not change origin array
var ints = new Int16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
var last3 = ints.subarray(ints.length - 3, ints.length);//
last3[0];    //= 7

//类型化对象的attribute
buffer;       //基本缓冲区：new出来的缓冲区
byteLength;   //视图或基本缓冲区的字节(8位)数大小
byteOffset;   //视图在缓冲区上的偏移字节数


//基本字节块的视图ArrayBuffer
//ArrayBuffer(Number length);

//注意：只能通过视图访问缓冲区而不能直接以.buffer[1]基本缓冲区字节方式访问
//因为这涉及到计算计CPU大头党和小头党存储方式影响

var bytes = new Uint8Array(8);  //初始化为0
byres[0] = 1;                   //1
bytes.buffer[0];                //undefined
bytes.buffer[1] = 3;            //普通js属性设置，并不能直接访问缓冲区内存
bytes.buffer[1]                 //3
bytes[1]                        //0

//ArrayBuffer是不透明字节块因此需要类型化
var buff = new ArrayBuffer(1024 * 1024);        //
var asbytes = new Uint8Array(buff);             //
var asint = new Int32Array(buff);               //
var lastK = new Uint8Array(buf, 1023 * 1024);   //类型化buff.buffer缓冲区最后1kb为字节
var ints2 = new Int32Array(buff, 1024, 256);    //类型化第二kb为256个int32整数
//上面在遇到大头党小头党的情况会混为一谈 因此，
//使用DataView显示指定
//getInt32(byteOffset [, littleEndian]);//(存取偏移量， 是否低位优先)
//setInt32(byteOffset, data [, littleEndian]);
//.getFloat32()   .setFloat32()   
//.getFloat64()   .setFloat64()
//.getInt8()      .setInt8()
//.getInt16()     .setInt16()
//.getUint8()     .setUint8()
//.getUint16()    .setUint16()
//.getUint32()    .setUint32()    
var data = new ArrayBuffer(64);     //
var view = new DataView(data);      //
var int = view.getInt32(0);         //
int = view.getInt32(4, false);      //
int = view.getInt32(8, true);       //
view.setInt32(8, int, false);       //
