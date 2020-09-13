// 泛型
namespace a {
    function createArray<T>(length: number, value: T): Array<T> {
         let result:Array<any> = [];
         for (let i = 0; i< length;i++) {
             result[i] = value;
         } 
         return result; 
        }
    let result = createArray<number>(3, 1); 
    console.log(result);    
}

// 泛型约束， 由于不知道传过来的类型，不能使用相应类型犯法
interface lengthWise {
    length: number
}
function logger<T extends lengthWise>(val: T) {
    console.log(val.length)
};
logger('aaa');

// 泛型接口
interface Cart<T> {
    list: T[];
}
let  Cart: Cart<string> = {
    list: ['1', '2'],
}
// 泛型类型别名
type Cart2<T> = {list: T[]} | T[];
let c1: Cart2<string> = {list: ['1','2']};
let c2: Cart2<number> = [1,2,3];

interface Calculate { // 用来描述一个函数
    <T>(a: T, b: T): T
}
let add:Calculate = function<T>(a: T, b: T) {
    return a
}


$('root').click();


