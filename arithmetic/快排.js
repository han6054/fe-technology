// 先找出一个标识位， 比他小的站左边，比他大的站右边。 把数组分成两份
let arr = [8,5,9.11,22,1,4,8,23];

function quickSort(arr) {  // 复杂度 O(n * lg)  lg16 = 4 （计算机中以2为底）
    if(arr.length<1) {
        return arr
    }
   let flag = arr[0];  // 缺点占用left,right 空间占用太多
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

function quickSort2(arr) {
   if(arr.length <=1) return arr;
    let flag = arr[0];
    let i = 1;
    let j = arr.length -1;
    while (i<j) {
        console.log(arr[j] >= flag, j, arr[j], '----j');
        while (arr[j]>= flag && i<j) { //  右边找到比他小的就终止
           j--;
        }
        console.log(arr[i] <= flag, i, arr[i], '----i');
        while (arr[i]<=flag && i<j) { // 左边找到比他大的终止
           i++
        }
        // 左边比他大的，和右边比他小的互换位置
        let temp = arr[i];
        arr[i]= arr[j];
        arr[j] = temp;
        console.log(`${arr[i]}和${arr[j]}互换`, arr)
    }
    // flag 交换到正确的位置上
    let temp = arr[0];
    arr[0] = arr[j];
    arr[j] = temp;
    return quickSort2(arr.slice(0, i)).concat([flag]).concat(quickSort2(arr.slice(j+1)));
}

console.log(quickSort2([8,5,9,11,22,1,4,8,23]));
// console.log(quickSort(arr));