"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 装饰器
var a;
(function (a) {
    function enhancer(target) {
        target.prototype.xx = 'xx';
        target.prototype.yy = 'yy';
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.xx);
    console.log(p.yy);
})(a || (a = {}));
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
var c;
(function (c) {
    function upperCase(target, propertyName) {
        var value = target[propertyName];
        var getter = function () { return value; };
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
    function methodEnumerable(flag) {
        return function (target, methodName, propertyDescriptor) {
            propertyDescriptor.enumerable = flag;
        };
    }
    function setAge(age) {
        return function (target, methodName, propertyDescriptor) {
            target.age = age;
        };
    }
    function toNumber(target, methodName, propertyDescriptor) {
        var oldMethod = propertyDescriptor.value;
        propertyDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return parseFloat(item); });
            return oldMethod.apply(this, args);
        };
    }
    ;
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'han';
        }
        Person.prototype.getName = function () {
            console.log('getName');
        };
        Person.getAge = function () {
        };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (accu, item) { return accu + item; }, 0);
        };
        __decorate([
            upperCase // 装饰name属性，让他变为大写
        ], Person.prototype, "name", void 0);
        __decorate([
            methodEnumerable(false) // 可否枚举
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "sum", null);
        __decorate([
            setAge(100)
        ], Person, "getAge", null);
        return Person;
    }());
    var p = new Person();
    p.name = 'jia';
    console.log(p.name);
    for (var attr in p) {
        console.log(attr);
    }
    console.log(Person.age);
    //  当装饰的为statc是，target为当前的类
    // 当装饰的为函数是个普通属性或者方法，target为当前类的原型
    console.log(p.sum(1, '2', '3'));
})(c || (c = {}));
