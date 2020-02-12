// 判断一个url地址是否合法
let reg = /^(?:(http|https|ftp):\/\/)?(?:([\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;

console.log(reg.exec('http://baidu.com?a=1&b=2'));