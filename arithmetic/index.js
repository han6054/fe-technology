
//给定一个整数数组，请找出两个元素之间的最大差，较小值的元素必须位于较大元素之前

const array = [7, 8, 15, 9, 20, 3, 1, 10];
findLargestDifference(array)
function findLargestDifference(array) {
//TODO
   let dValues = []
    for(let i =1; i< array.length;i++) {
        let diff = array[i] - array[i-1]
        dValues.push(diff);
    }
    return Math.max(...dValues);
}


// 给定一个正整数n（n>2), 要求输出n的素数分乘；

// 如：输入100， 输出2, 2, 5, 5
// 如果本身是素数，输出本身，如输入5,输出5
const result = []
function split(target) {
    if(target < 2) return
    for(let i=2;i<=target;i++) {
        if(target%i == 0) { 
            result.push(i); 
            target = target / i 
            split(target); 
            break;
        }
    }
}

const sum = a => b => b?sum(a+b): a
console.log(sum(1)(2)(3)())

function compose(...func) {
    if(func.lengt === 1) {
        return func[0]
    }
    return func.reduce((a,b) => (...args) => a(b(...args)))
}
function a(str) {
    return 1+str
}
function b(str) {
    return 2+str
}

compose(a,b)('haha')

// sleep函数
