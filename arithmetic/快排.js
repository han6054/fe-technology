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

function quickSort2(arr) {  // 原地快排
    if (arr.length <= 1) return arr;
    let pivot = arr[0];
    let i = 1;
    let j = arr.length-1;
    while(i<j){
        let pivot = arr[0];
        while(arr[j]>=pivot && i<j){ // 右边比他大，向左继续查找
            j -- }
        while(arr[i]<=pivot  && i<j){ // 左边比他小，向右继续查找
            i ++
        }
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp
    }
    console.log(arr.slice(1, i + 1));
    return [...quickSort2(arr.slice(1, i+1)), pivot, ...quickSort2(arr.slice(j+1))]
}
console.log(quickSort2([8,5,9,11,22,1,4,8,23]));
// 原地快排，选取基准位，从左到右，从右到左同时查询，左边比他大的，右边比他小的跳出循环，交换位置，截取没有排序的数列，递归调用直到数组为空跳出递归。
// console.log(quickSort(arr));
