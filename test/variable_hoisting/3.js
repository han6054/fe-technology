console.log(a);
a = 12;
function fn() {
    console.log(a);
    a = 13
}
fn();
console.log(a);
// 程序报错 a is not defined
