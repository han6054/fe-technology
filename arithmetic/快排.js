// 先找出一个标识位， 比他小的站左边，比他大的站右边。 把数组分成两份
let arr = [8,5,9.11,22,1,4,8,23];

function quickSort(arr) {
    if(arr.length<1) {
        return arr
    }
   let flag = arr[0];
   let left = [];
   let right = [];
   for(let i = 1;i<arr.length;i++) {
       if(arr[i] > flag) {
           right.push(arr[i]);
       } else {
           left.push(arr[i])
       }
   }
    return [...quickSort(left), flag, ...quickSort(right)]
}

console.log(quickSort(arr));