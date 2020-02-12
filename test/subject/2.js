
var a = {}, b = '123', c = 123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);  // a[123] <=> a['123]
// c

var a = {}, b = Symbol('123'), c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]) ; // Symbol(123) === Symbol(123)  false    Symbol创建出来的值是唯一值
// b

var a = {}, b = {key: '123'}, c = {key: 456};
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);

// 对象的属性名不能是一个对象，遇到对象属性名会默认转换成字符串
// 1. let obj = {}, let arr  = [1,2] obj[arr] = 'sss'  obj = {'1,2': 'sss' };
// 2. {}.toString() = "[Object, Object]"

// c

