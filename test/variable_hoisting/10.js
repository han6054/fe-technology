var a = 9;
function fn() {
    a = 0;
    return function (b) {
        return b+a++;
    }
}
var f = fn();
console.log(f(5)); // 输出5
// （ b + a ）5 + 0 ,
// 之后全局的a = 1; 作用域没有被占用执行完销毁

console.log(fn()(5)); // 输出5
//  5， 全局a = 0； a++ 全局又变成1了  a = 1;

console.log(f(5)); // 输出6
// a++ 全局a = 2


console.log(a); //输出2