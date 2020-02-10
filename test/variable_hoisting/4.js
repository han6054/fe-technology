var foo = 1;
function bar() {
    if(!foo) { // !undefined = true
        var foo = 10;
    }
    console.log(foo); // 10
}
bar();
