
//1。两个数的公约数
// 2。 export 导出的是什么， 和export default, module.exports区别?
// 3。内存泄漏的例子
// 4。bfc
// 5。结构 c obj = {a:{b: {c:{}}}}
// 6.数组去重 ,
// 7 vue传值
// 8.页面优化
// 9.http2 http 和https
// 10。map和filter区别
// 11。判断元素是数组
// 12.进程和线程的关系
// 13.put 和post 区别
// 14.监听localstorage
// 15. 继承有多少种方式
// 16.vue中如何重写数组的

//1.

//2.export可以事先定义, import导入需要用{}.
// export default 只能导出一次。默认导出一个对象。import导入不需要{}
//=========================================================================================
// import提供动态引入模块，并且是promise对象提供then方法按需加载  import('xxx').then(res => {});
// 结合promise.all使用 Promise.all(['./module1.js', './module2.js']).then(([mod1,mod2])=> {})
//=========================================================================================
// exports 与 module.exports的关系:
//module.exports才是真正的接口，exports只不过是它的一个辅助工具，
// 最终返回给调用的是module.exports而不是exports。module.exports 初始值为一个空对象 {},
// 而exports为指向module.exports 的引用
//=========================================================================================

//3.垃圾回收机制： 应用程序不需要占用内存的时候，由于某些原因，内存没有被回收。（window对象，或者子级对象外部，ie中Dom事件，定时器事件没有清除）

//4. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

//5. let {a:{b:{c}}} = obj

//6.
//7.
//8.
//9.

//10.map和filter区别，map条件判断会返回布尔值，filter返回条件成立的元素

//11.
// variable instanceof Array
// Object.prototype.toString.call(variable).indexOf('Array') !== -1;
// Array.prototype.isPrototypeOf()
// variable.constructor.toString().indexOf("Array") ！== -1
// isArray()

//12.进程好比车间，线程是干活的工人，，一个程序就要开启一个进程。最少也会开启一个线程。

//13. 幂等：对于相同的输入，每次得到的结果都是相等的
//POST用于提交请求，可以更新或者创建资源，是非幂等的。
// 比如新建一个备忘录便签条，点几次新建就会新建几张空白的便签，这时就用POST。
//
// PUT用于向指定的URI传送更新资源，是幂等的。
// 对便签1输入计划ABCD,得到一张更新的便签表，不管更新几次都一样，仍然是那张便签，得到的内容也一样，这时就用PUT

//14. window.addEventListener("storage", function (e) {
//         alert(e.newValue);
// });

//15.

//16.对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。存取描述符是由getter-setter函数对描述的属性，也就是我们用来给对象做响应式绑定的
// 因为如果我们使用Object.defineProperty对数组进行响应式化是有缺陷的，对数组push等操作和length变化是无法劫持到的，
//当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。因此我们只要把原型上的方法，进行value的重新赋值。
// const arrayProto = Array.prototype // 获取Array的原型
// function def (obj, key) {
//     Object.defineProperty(obj, key, {
//         enumerable: true,
//         configurable: true,
//         value: function(...args) {
//             console.log(key); // 控制台输出 push
//             console.log(args); // 控制台输出 [Array(2), 7, "hello!"]
//
//             // 获取原生的方法
//             let original = arrayProto[key];
//             // 将开发者的参数传给原生的方法，保证数组按照开发者的想法被改变
//             const result = original.apply(this, args);
//
//             // do something 比如通知Vue视图进行更新
//             console.log('我的数据被改变了，视图该更新啦');
//             this.text = 'hello Vue';
//             return result;
//         }
//     });
// }
// 新的原型
// let obj = {
//   push() {}
// }
//
// // 重写赋值
// def(obj, 'push');
//
// let arr = [0];
//
// // 原型的指向重写
// arr.__proto__ = obj;
//
// // 执行push
// arr.push([1, 2], 7, 'hello!');
// console.log(arr);








// 1
let obj = {
    a:1
};
function foo(obj) {
    obj =  {
        a:2,
        b:1
    }
}
// foo(obj);
// console.log(obj);


// 2.
let name = 'the window';

let obj1 = {
    name: 'the object',
    getName: function (fn) {
        fn && fn(); // 'the window'
        console.log(this.name); //the object
        return function () {
            console.log(this.name);
        }
    }
};
function test() {
    console.log(this.name);
}

// let f = obj1.getName(test)();
// this window,
// the object,
// this window
// undefined



