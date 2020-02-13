function Foo() {
    Foo.a = function () {
        console.log(1)
    };
    this.a = function () {
        console.log(2)
    }
}
Foo.prototype.a = function () { // 实例.a()
    console.log(3)
};

Foo.a = function () {
    console.log(4)
};

Foo.a(); // 4
let obj = new Foo(); // 4
obj.a(); // 2
Foo.a(); // 1