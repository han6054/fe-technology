"use strict";
// 存储器
var a;
(function (a) {
    var Person = /** @class */ (function () {
        function Person(name) {
            this.myname = name;
        }
        Object.defineProperty(Person.prototype, "name", {
            get: function () {
                return this.myname;
            },
            set: function (newVal) {
                this.myname = newVal.toUpperCase();
            },
            enumerable: false,
            configurable: true
        });
        return Person;
    }());
    var p = new Person('hhh');
    console.log(p.name);
    p.name = 'jjj';
    console.log(p.name);
})(a || (a = {}));
var b;
(function (b) {
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var p = new Person('jj');
    console.log(p.name);
})(b || (b = {}));
