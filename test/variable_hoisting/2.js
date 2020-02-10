console.log(a); // undefined
var a = 12;
function fn() {
    console.log(a); // 12
    a = 13;
}
fn();
console.log(a); // 13