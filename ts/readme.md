##### 模块语法分类
- AMD CMD 
require.js sea.js
- node
commom.js common2.js
- es6 
module
- umd 
兼容以上三种  
---

- 装饰器
1. 类 
2. 属性
    - 装饰为静态属性，target为类 
    - 当装饰的为函数是个普通属性或者方法，target为当前类的原型
3. 参数
> 装饰器执行顺序
1. 属性和方法，谁在前谁先执行
2. 方法时，先参数再方法
3. 类  
4. 如果同类型的，比如对同一个类两个装饰器，或者同一个方法两个装饰器，先执行后面的
- 泛型
> type和interface区别
1. interface用来定义接口，是真正的类型
2. type是一个别名，并不一定是真正类型 