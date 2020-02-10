var a = 10,b = 11, c= 12;
function test(a) {
    a = 1; //  a,b 通过形参和定义，为私有变量不受影响
    var b = 2;
    c = 3;
}
test(10);
console.log(a, b, c); // 10,11,3