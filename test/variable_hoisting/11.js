var num = 10;
var obj = {num :20};
obj.fn = (function (num) { // 自执行函数A
   this.num = num * 3;
   num++;
   return function (n) {
       this.num += n;
       num++;
       console.log(num);
   }
})(obj.num);
var fn = obj.fn;
fn(5); //

obj.fn(10);
console.log(num, obj.num);
// A 中 num 为形参，是私有变量  this是 window 这时 window.num = 20 * 3 = 60; 私有变量num++; A.num = 21
// 因为 A 作用域 被obj.fn 和fn 占用所以不销毁
// fn(5) n为形参时私有变量， this是window， window.mum = 65,   num是A.num = 22  => 输出22
// obj.fn(10)  n为形参时私有变量  this是obj, obj.num = 20 + 10 = 30;  A.num = 23 => 输出23

// 65 30

