let arr = [17,13,1,2,5,3,8,11];
let sum = 18;
let counter = 0;
// 查找数组数组中相加等于sum的数
// function findSum(arr, sum) { // 第一种方法，双重遍历  时间复杂度O(n^2)
//     for(let i=0;i< arr.length;i++) {
//         for(let j=i+1; j<arr.length;j++) {
//             if(arr[i]+ arr[j] === sum) {
//                 console.log(arr[i], arr[j])
//             }
//             counter++
//         }
//     }
// }

function findSum2(arr, sum) { // 第二种方法 和sum相减，找到剩余的数 时间复杂度O(n)
    let obj = {};
    arr.forEach((item, index) => {
        if(String(item) in obj) {
            console.log(arr[obj[item]],arr[index])
        }
        obj[sum-item] = index;  // { 1:0, 5:2,...}
    })
}
findSum2(arr, sum);


