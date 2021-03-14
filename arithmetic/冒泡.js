// 冒泡个高到个矮，依次排序
let arr = [1,4,2,5,2,1,55,1,3,521,55];
// function bubbleSort() {
//     for(let j = 0;j< arr.length-1;j++) {
//         for(let i = 0;i< arr.length-1-j;i++) {
//             if(arr[i] > arr[i+1]) {
//                 let temp = arr[i];
//                 arr[i] = arr[i+1];
//                 arr[i+1] = temp;
//             }
//         }
//     }
// }
// bubbleSort(); // O(n^2)/2
// console.log(arr);


function bubble(arr) {
    for(let j= 0;j<arr.length-1;j++) {
        for(let i=0;i<arr.length-1-j;i++) {
            if(arr[i]> arr[i+1]) {
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp; 
            }
        }
    }
    return arr
}