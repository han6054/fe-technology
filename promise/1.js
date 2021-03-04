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

