"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 函数
// 有返回值函数
var part1;
(function (part1) {
    function buildName(firstName, lastName) {
        return firstName + lastName;
    }
    // 无返回值函数
    function buildName1(firstName, lastName) {
        firstName + lastName;
    }
})(part1 || (part1 = {}));
// 类的继承
var part2;
(function (part2) {
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        return Person;
    }());
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(name, age, department) {
            var _this = _super.call(this, name, age) || this;
            _this.department = department;
            return _this;
        }
        return Employee;
    }(Person));
    console.log(new Employee('h', 10, 'bj'));
    // 类的修饰符 
    // public    子类 其它任何地方外边都可以访问
    // protecte  子类 都可以访问,其它任何地方不能访问
    // private  子类和其它任何地方都不可以访问
    // 抽象类
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.move = function () {
            console.log('roaming the earch...');
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.makeSound = function () {
            console.log('喵喵喵');
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.makeSound();
    // 抽象类不能被实例化， 抽象类中abstract关键字定义的方法，必须在派生类中实现
})(part2 || (part2 = {}));
var part3;
(function (part3) {
    // 多个接口继承 implements
    var square = {};
    square.color = 'blue';
    square.sideLength = 10;
})(part3 || (part3 = {}));
var part4;
(function (part4) {
    // 泛型
    function createArray(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(value);
        }
        return result;
    }
    console.log(createArray(3, 1));
    // 泛型类
    var MyArray = /** @class */ (function () {
        function MyArray() {
            this.list = [];
        }
        MyArray.prototype.add = function (value) {
            this.list.push(value);
        };
        MyArray.prototype.getMax = function () {
            var result = this.list[0];
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i] > result) {
                    result = this.list[i];
                }
            }
            return result;
        };
        return MyArray;
    }());
    var arr = new MyArray();
    arr.add(1);
    arr.add(2);
    arr.add(3);
    var ret = arr.getMax();
    var add = function (a, b) {
        return a;
    };
    console.log(add(1, 2));
})(part4 || (part4 = {}));
