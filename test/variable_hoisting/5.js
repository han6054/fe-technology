var n = 0;
function a() {
    var n = 10;
    function b() {
        n++; // n = 11
        console.log(n); // 11
    }
    b();
    return b;
}
var c = a(); // a作用域下n=11, 因为a作用域被c接收，所以不销毁
c(); // n= 12
console.log(n); // n时window下的不受私有作用域n影响，输出0