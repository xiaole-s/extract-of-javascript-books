
// settings

var physics_accuracy = 3,   //精确度 多次处理得到较接近的精确的物理效果，过大影响性能
    mouse_influence = 20,   //鼠标拖动影响范围
    mouse_cut = 5,          //鼠标切割范围限制
    gravity = 1200,         //
    cloth_height = 30,      //网布高
    cloth_width = 50,       //单位点
    start_y = 20,           //y轴方向起点
    spacing = 7,            //间隔
    tear_distance = 60;     //撕破距离   


window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var canvas,
    ctx,
    cloth,
    boundsx,
    boundsy,
    mouse = {
        down: false,
        button: 1,
        x: 0,
        y: 0,
        px: 0,
        py: 0
    };

var Point = function (x, y) {

    this.x = x;         //当前点x坐标
    this.y = y;         //
    this.px = x;        //上一次位置点x坐标
    this.py = y;        //
    this.vx = 0;        //x方向引力
    this.vy = 0;        //
    this.pin_x = null;  //固定钉点x坐标
    this.pin_y = null;  //

    this.constraints = [];//当前点的栓点集 主动
};

Point.prototype.update = function (delta) {
    
    if (mouse.down) {//鼠标点击拖动

        var diff_x = this.x - mouse.x,
            diff_y = this.y - mouse.y,
            dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

        if (mouse.button == 1) {
            //保证只处理在鼠标作用力范围内的点
            if (dist < mouse_influence) {
                this.px = this.x - (mouse.x - mouse.px) * 1.8;
                this.py = this.y - (mouse.y - mouse.py) * 1.8;
            }
        }
        //非左键鼠标点击且小于mouseCut距离的直接切断其所有关联栓点
        else if (dist < mouse_cut) this.constraints = [];
    }
    //引力作用处理

    this.add_force(0, gravity);//更新引力作用距离

    delta *= delta;//引力系数
    nx = this.x + ((this.x - this.px) * .99) + ((this.vx / 2) * delta);
    ny = this.y + ((this.y - this.py) * .99) + ((this.vy / 2) * delta);
    //引力作用前当前点p的位置
    this.px = this.x;
    this.py = this.y;
    //更新引力作用下当前点p的新位置
    this.x = nx;
    this.y = ny;
    //复位已处理点的引力作用
    this.vy = this.vx = 0;
};

Point.prototype.draw = function () {

    if (this.constraints.length <= 0) return;

    var i = this.constraints.length;
    while (i--) this.constraints[i].draw();//只画点与其约束栓点的连线
};

//解析关联栓点
Point.prototype.resolve_constraints = function () {
    //固定钉点关联栓点处理
    if (this.pin_x != null && this.pin_y != null) {
        //钉点的关联栓点就是本身，钉点是固定的不需要栓点
        this.x = this.pin_x;
        this.y = this.pin_y;
        return;
    }

    var i = this.constraints.length;//当前Point点上的关联栓点集
    while (i--) this.constraints[i].resolve();//解析处理关联栓点
    //边界处理 反弹
    this.x > boundsx ? this.x = 2 * boundsx - this.x : 1 > this.x && (this.x = 2 - this.x);
    this.y < 1 ? this.y = 2 - this.y : this.y > boundsy && (this.y = 2 * boundsy - this.y);
};

//附加关联栓点
Point.prototype.attach = function (point) {

    this.constraints.push(
        new Constraint(this, point)
    );
};

//移除当前点的栓点 主动
Point.prototype.remove_constraint = function (lnk) {

    var i = this.constraints.length;
    while (i--)
        if (this.constraints[i] == lnk) this.constraints.splice(i, 1);
};
//
Point.prototype.add_force = function (x, y) {

    this.vx += x;
    this.vy += y;
};

//钉住的固定的点（最顶上一排）
Point.prototype.pin = function (pinx, piny) {
    this.pin_x = pinx;
    this.pin_y = piny;
};

var Constraint = function (p1, p2) {

    this.p1 = p1;
    this.p2 = p2;
    this.length = spacing;//连线长度
};

Constraint.prototype.resolve = function () {

    var diff_x = this.p1.x - this.p2.x,
        diff_y = this.p1.y - this.p2.y,
        dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),              
        //两点的距离可能超过连线的长度 微分系数diff可取+-             //p2.y
        diff = (this.length - dist) / dist;//（p1-p2连线p1.x——p2.x //   ↑ ）
                                                                   //p1.y
    //当前p=p1点受两个点p2链接约束
    //             ↑
    //          ← p1(p2) ← 
    //       ↑        ↑
    //    ← p1(p2) ← p1(p2) ← 
    //          ↑        ↑
    //当前点p即p1与约束点p2的偏移量大于断开距离tear_distance时切断点p1的约束
    if (dist > tear_distance) this.p1.remove_constraint(this);

    //p1、p2各偏移1/2                 拉伸diff>0           压缩diff<0
    var px = diff_x * diff * 0.5;   // p2(偏移后)          p2  
    var py = diff_y * diff * 0.5;   //   ╲                  ╲
                                    //     p2       ↑          p2(偏移后)  ↓
    this.p1.x += px;                //     ↑                   ↑
    this.p1.y += py;                //   ← p1       ↓        ← p1(偏移后)  ↑
    this.p2.x -= px;                //       ╲                 ╲
    this.p2.y -= py;                //        p1(偏移后)           p1
};

Constraint.prototype.draw = function () {
    //p1-p2画关联约束连线,即连接各个顶点p
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
};

//网布
var Cloth = function () {
    //点连接成网
    this.points = [];
    //
    var start_x = canvas.width / 2 - cloth_width * spacing / 2;

    for (var y = 0; y <= cloth_height; y++) {

        for (var x = 0; x <= cloth_width; x++) {

            var p = new Point(start_x + x * spacing, start_y + y * spacing);
            //当前p=p1点受两个栓点p2链接的约束
            //             ↑
            //          ← p1(p2) ← 
            //       ↑        ↑
            //    ← p1(p2) ←  p(p1(p2)) 
            //          ↑        
            x != 0 && p.attach(this.points[this.points.length - 1]);//左边栓点p2约束
            y == 0 && p.pin(p.x, p.y);//处理钉点
            y != 0 && p.attach(this.points[x + (y - 1) * (cloth_width + 1)]);//上边栓点p2约束

            this.points.push(p);
        }
    }
};

//网布更新
Cloth.prototype.update = function () {

    var i = physics_accuracy;
    //多次处理模拟较接近的物理效果，过大影响性能且与物理不符（3-6合适）
    while (i--) {
        var p = this.points.length;
        while (p--) this.points[p].resolve_constraints();
    }

    i = this.points.length;
    while (i--) this.points[i].update(.016);
};

//点连接成网
Cloth.prototype.draw = function () {

    ctx.beginPath();

    var i = cloth.points.length;
    while (i--) cloth.points[i].draw();

    ctx.stroke();
};

//更新函数
function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cloth.update();
    cloth.draw();

    requestAnimFrame(update);
}

//初始化
function start() {

    canvas.onmousedown = function (e) {
        mouse.button = e.which;
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        var rect = canvas.getBoundingClientRect();//当前元素的视口矩形坐标
        mouse.x = e.clientX - rect.left,
        mouse.y = e.clientY - rect.top,
        mouse.down = true;
        e.preventDefault();
    };

    canvas.onmouseup = function (e) {
        mouse.down = false;
        e.preventDefault();
    };

    canvas.onmousemove = function (e) {
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        var rect = canvas.getBoundingClientRect();//当前元素的视口矩形坐标
        mouse.x = e.clientX - rect.left,
        mouse.y = e.clientY - rect.top,
        e.preventDefault();
    };

    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    boundsx = canvas.width - 1;
    boundsy = canvas.height - 1;

    ctx.strokeStyle = '#888';
    cloth = new Cloth();
    update();
}

window.onload = function () {

    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');

    canvas.width = 560;
    canvas.height = 350;

    start();
};
