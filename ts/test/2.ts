// 装饰器
namespace a {
    interface Person {
        xx: string,
        yy: string,
    }
    function enhancer(target:any) { // 装饰类
        target.prototype.xx = 'xx';
        target.prototype.yy = 'yy';
    } 
    @enhancer
    class Person {
        constructor() {}
    }
    let p = new Person();
    console.log(p.xx); 
    console.log(p.yy);
}

// namespace b {  // 如果一个类不能改，用装饰器继承这个父类
//     interface Person {
//         age: number;
//     }
//     function enhancer(target: any) { // 装饰类
//       return class child extends Person {
//           public age: number = 10
//       }
//     } 
//     @enhancer
//     class Person {
//         public name: string = 'haha'
//         constructor() {}
//     }
//     let p = new Person();
//     console.log(p.age);
// }

// 装饰属性
namespace c {
    function upperCase (target: any, propertyName: string) {
        let value = target[propertyName];
        const getter = () => value;
        const setter = (newVal: string) => {
            value = newVal.toUpperCase();
        }
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
    function methodEnumerable(flag: boolean) {
        return function(target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
            propertyDescriptor.enumerable = flag;
        }
    }
    function setAge(age: number) {
        return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
            target.age = age;
        }
    }
    function toNumber(target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
        console.log(methodName, propertyDescriptor ,'@toNumber');
        let oldMethod = propertyDescriptor.value
        propertyDescriptor.value = function(...args: any[]) {
            args = args.map(item => parseFloat(item));
            return oldMethod.apply(this, args);
        }
    };
    class Person {
        static age:number;
        @upperCase  // 装饰name属性，让他变为大写
        name:  string = 'han'
        @methodEnumerable(false) // 可否枚举
        getName() {
            console.log('getName');
        }
        @setAge(100)
        static getAge() {

        }
        @toNumber
        sum(...args: any[]) {
            return args.reduce((accu, item) => accu + item, 0);
        }
    }
    let p = new Person();
    p.name = 'jia'
    console.log(p.name);
    for (let attr in p) {
        console.log(attr);
    }
    console.log(Person.age) 
    //  当装饰的为statc是，target为当前的类
    // 当装饰的为函数是个普通属性或者方法，target为当前类的原型

    console.log(p.sum(1, '2', '3'))
}
