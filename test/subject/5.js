// // 验证6～16位字符串，必须包含有大小写字母和数字
//
// let reg = /(?!^[a-zA-Z]+$)(?!^[A-Z0-9]+$)(?!^[a-z0-9]+$)^[a-zA-Z0-9]{6,16}$/;
//
// // console.log(reg.test('123aaaJaa'));
//
//
// // 1~5是位数字字母下划线，必须有下划线
//
// let reg1 = /(?=_)\w/;
//
// console.log(reg1.test('q1_s'));
//
// // 英文字母和汉字组成的字符串，用正则给英文单词前后加空格
//
// let str1 = 'you能you上';
// let reg2 = /\b[a-z]+\b/ig;
// str1 = str1.replace(reg2, value => {
//    return " "+ value +" ";
// }).trim();
// console.log(str1);



