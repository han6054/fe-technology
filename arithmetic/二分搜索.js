let arr = [1,2,3,5,7,10,12,13,15,17,18,19,20,23];
function search(arr, item) {
    let low = 0;
    let high = arr.length -1;
    let mid;
    let element;
    while (low <= high) {
        mid = Math.floor((low + high)/2);
        element = arr[mid];
        if(element < item) {
            low = mid + 1
        } else if(element > item){
            high = mid -1
        } else  {
            return {index: mid, cur:arr[mid]}
        }
    }
    return -1
}
// console.log(search(arr, 12));

// 斐波那契数列
//[1,1,2,3,5,8,13,21]
function fib(n) {
    if(n === 1 || n === 2) {
        return 1
    }
    return fib(n-1) +  fib(n-2)
}
// console.log(fib(8)); // 21
// 递归产生大量冗余代码，性能差

// 改进带临时缓存
function fib2(n) {
    let arr = [];
    return fibCache(arr, n)
}
function fibCache(arr, n) {
    if(n === 1 || n === 2) {
        return 1
    }
    if(arr[n]) return arr[n]; // 如果之前计算过重复利用，避免重复计算，降低复杂度
    return arr[n] = fibCache(arr,n-1) + fibCache(arr,n-2)
}

// console.log(fib2(8)); // 21

function fib3(n) {
    // 递归从上向下， 动态规划从底向上
    if (n <= 0) return 0;
    if (n <= 1) return 1;
    let dp = [0,1];
    for(let i=2;i<= n;i++){
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}

console.log(fib3(8)); // 21
