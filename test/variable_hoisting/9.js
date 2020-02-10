var foo = 'hello';
(function (foo) {
    console.log(foo); // hello
    var foo = foo || 'world';
    console.log(foo); // hello
})(foo);
console.log(foo);
// hello hello hello

