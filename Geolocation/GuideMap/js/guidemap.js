function myPos(elt) {
    var options = {
        enableHightAccuracy: false,//true请求高精度
        maximumAge: 360000,//6分钟刷新时间
        timeout: 15000 //请求响应时间
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    else {
        elt.innerHTML = "浏览器不支持Geolocation";
    }

    function error(e) {
        elt.innerHTML = "Geolocation 错误：" + e.code + ": " + e.message;
    }

    function success(pos) {
        var latitude = pos.coords.latitude; //获取纬度
        var longitude = pos.coords.longitude;//获取经度
        var accuracy = pos.coords.accuracy;//精确度
        //google map 查询字符串
        var url = "http://maps.google.com/maps/api/staticmap?center=" + latitude +
                  "," + longitude + "&size=640x640&maptype=satellite&sensor=true";
        var zoomlevel = 18;
        if (accuracy > 18)
            zoomlevel -= Math.round(Math.log(accuracy / 50) / Math.LN2);
        url += "&zoom=" + zoomlevel;
        glmap.style.backgroundImage = "url('" + url + "')";
        range.style.width = range.style.height = accuracy * 10 + 'px';

        var msg = "在 " + new Date(pos.timestamp).toLocaleString() + "您在纬度: " +
                  latitude + " 经度: " + longitude + " 的附近" + accuracy + "米范围内";
        if (pos.coords.altitude) {
            msg += "您所在地的海拔高度为" + pos.coords.altitude + "左右" +
                    pos.coords.altitudeAccuracy + "米";
        }
        if (pos.coords.speed) {
            msg += "您正以" + pos.coords.speed + "m/s的速度向" + pos.coords.heading + "方向前进。"
        }
        elt.innerHTML = msg;
    }
}

myPos(document.getElementById("txt"));
