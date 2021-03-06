 // 发布订阅
 class Event {
    constructor() {
        // 缓存事件
        this.callbacks = []
    }
    $on(name, fn) {
        this.callbacks[name].push(fn);
    }
    $emit(name, arg) {
        let cbs = this.callbacks[name];
        if(cbs) {
            cbs.forEach(fn => {
                fn.call(this, arg)
            })
        }
 }
 $off(name) {
     this.callbacks[name] = null
 }
 }

 // 策略模式：定义一系列算法，把他们封装起来，并且使他们相互替换
 let strategies = {
     "S": function( salary ){
         return salary * 4;
     },
     "A": function( salary ){
         return salary * 3;
     },
     "B": function( salary ){
         return salary * 2;
     }
 };
 let calculateBonus = function( level, salary ){
     return strategies[ level ]( salary );
 };
 // console.log( calculateBonus( 'S', 20000 ) );// 输出:80000 console.log( calculateBonus( 'A', 10000 ) );// 输出:30000


 // 单例模式： 创建出的类只有一个实例，第二次使用同一个类创建对象时候，得到的对象和第一次相同
 class Window {
     constructor(name) {
       this.name = name;
     }
     static getInstance(name) {
         if(!this.instance) {
             this.instance = new Window(name);
         }
         return this.instance;
     }
 }
 var w1 = Window.getInstance();
 var w2 = Window.getInstance();
 console.log(w1 === w2);




