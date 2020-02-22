// // 分解因数
let factorList = [];
let index = 0;
function factor(number) {
  if(number === 1 || number === 2 || number === 3) {
      factorList[index++] = number;
      return factorList;
  }
  for (let i=2; i<=number;i++) {
      if(number % i === 0 ) {
        factorList[index++] = i;
        factor(number / i);
        break;
      }
    }
    return factorList.toString().replace(/,/g, '*');
}

console.log(factor(75));
