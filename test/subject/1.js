/*
1.call 和 apply 区别和性能 ？
fn.call(obj,1,2,3,4);
fn.apply(obj,[1,2,3,4]);
fn函数都是Function原型上的方法，每一个函数作为Function这个原型的实例，可以调取call和apply方法。
call和apply都是用来改变函数中this指向的，区别在于传参是call一个个传，apply要求以数组形式传给函数，bind并没有把函数立即执行，只是预先处理改变this。
call比apply性能好一些，传参大约三个的时候。
*/

// 2. (5).add(3).minus(2);
!function () {
    // 每一个方法执行完都要返回Number这个类的实例，这样才可以继续调取Number类中的方法（链式写法）
    function check(n) {
        n = Number(n);
        return isNaN(n) ? 0 : n;
    }
    function add(n) {
        n = check(n);
       return this + n;
    }
    function minus(n) {
        n = check(n);
        return this - n;
    }
    ['add', 'minus'].forEach((item) => {
        Number.prototype[item] = eval(item);
    })
}();
console.log((5).add(3).minus(2));

// 3.箭头函数和普通函数的区别？

 // 1.写法简介
 function fn(x) {
     return function(y) {
         return x + y
     }
 }
 let fn11 = x => y => x + y;
/*
   2.箭头函数this是所属上下文，是继承函数上下文的this
*/
let obj = {};
function fn1() {
    console.log(this)
}
fn1.call(obj); // this是obj
let fn2 = () => {
    console.log(this)
};
fn2.call(obj); // this是window
 // 3.箭头函数没有arguments 类数组

 // 4. 箭头函数不能被new执行，因为箭头函数没有this，也没有prototype


 // 4. 把一个字符串大小写取反，aBc, AbC .

let str = 'aBc';
str = str.replace(/[a-zA-z]/g, content => {
    return content.toUpperCase() === content ? conent.toLowerCase() :
    content.toUpperCase()
});



//5. 实现字符串匹配算法，从字符串S中，查找到是否存在字符串T，若存在返回所在位置，不存在返回-1
!(function() {
    function myIndexOf(T){
      //  let lenT = T.length,
      //      lenS = this.length,
      //      res = -1;
      //  if(lenT > lenS) return -1;
      //  for(let i =0;i<= lenS - lenT; i++) {
      //      if(this.substr(i,lenT) === T) {
      //          res = i;
      //          break;
      //      }
      //  }
      // return res;

        let reg = new RegExp(T);
        let res = reg.exec(this);
        return res === null ?  -1: res.index

    }
    String.prototype.myIndexOf = myIndexOf;
})();
let S = 'abc123efg',
    T = '123';

console.log(S.myIndexOf(T));




