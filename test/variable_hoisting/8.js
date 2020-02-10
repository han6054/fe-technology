var a = 4;
function b(x,y,a) {
    console.log(a); // 3
    arguments[2] = 10;
    console.log(a); // 10
}
a = b(1,2,3); // b函数的返回结果付值给a ，a没有返回结果，所以时undefined
console.log(a); // undefined

// 非严格模式下，函数的实参集合（arguments）和形参存在映射关系


// 3, 10, undefined
// 严格模式 3, 3, undefined




