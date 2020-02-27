let obj =  {
    name: 'han',
    age: {age: 20},
    hobby: [1]
};

function observer(obj) {
   if(typeof obj === 'object') {
       for(let key in obj) {
           defineReactive(obj, key, obj[key])
       }
   }
}

function defineReactive(obj, key, value) {
  observer(value);
  Object.defineProperty(obj, key, {
      get () {
          return value
      },
      set (val) {
          console.log('数据更新了');
          value = val;
      }
  })
}
observer(obj);
// obj.age.age = 30;
// console.log(obj.age);

obj.hobby[0] = 2;
console.log(obj.hobby[0]);
// 数组虽然更改可以触发更新，但是数组的push等方法是不能触发的，因此需要使用

let methods = ['push','pop','shift', 'unshift', 'slice'];
methods.forEach(method => {
    let oldAMethod = Array.prototype[method];
    Array.prototype[method] = function(value) {
        console.log('数组修改更新了');
        oldAMethod.call(this, value)
    };
});
obj.hobby.push(3);
// 数组不能根据length修改，并且也不能通过索引进行修改；因为监听不到

