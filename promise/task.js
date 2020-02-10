setImmediate(function () {
    console.log(1)
},0);
setTimeout(function () {
    console.log(2)
},0);
new Promise(function (resolve) {
   console.log(3);
    resolve();
    console.log(4)
}).then(function () {
    console.log(5)
});
console.log(6);
process.nextTick(function () {
    console.log(7);
});
console.log(8);


//  Promise 内部代码时同步的先输出 3，4
// 输出 6,8
// 执行微任务队列中代码 输出 7,5
// 检查宏任务队列 I/O 观察这比较考前先执行 2 ,1