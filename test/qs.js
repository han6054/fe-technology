let url = 'https://www.baidu.com/s?wd=javascript&rsv_spt=1';
function queryURLParameter(url) {
    let obj = {};
    let ary = url.indexOf('?');
    url = ary[1];
    ary = url.split('&');
    for(let i= 0;i<ary.length;i++) {
        let cur = ary[i],
            curAry = cur.split('=');
        obj[curAry[0]] = curAry[1];
    }
    return obj
}


function queryURLParameter1(url) {
    let reg = /([^&?=]+)=([^&?=]+)/g,
        obj = {};
    url.replace(reg, function () {
       obj[arguments[1]] = arguments[2];
    });
   return obj;
}
//
String.prototype.myQs = function() {
    let reg = /([^&?=]+)=([^&?=]+)/g,
        obj = {};
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};
console.log(url.myQs());