"use strict";
// 泛型
var a;
(function (a) {
    function createArray(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    var result = createArray(3, 1);
    console.log(result);
})(a || (a = {}));
function logger(val) {
    console.log(val.length);
}
;
logger('aaa');
var Cart = {
    list: ['1', '2'],
};
var c1 = { list: ['1', '2'] };
var c2 = [1, 2, 3];
var add = function (a, b) {
    return a;
};
$('root').click();
