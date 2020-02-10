console.log(a); // undefined
var a = 12;
function fn() {
    console.log(a); // 因为函数内部定义了a， 所以输出undefined
    var a = 13;
}
fn();
console.log(a); // 12
// undefined undefined 12

