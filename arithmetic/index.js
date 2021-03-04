
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