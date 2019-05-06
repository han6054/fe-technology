```
let str = 'The car parked in the garage.'
str.replace(/.ar/g, function() {
    console.log(arguments[0])
})
// car par gar
```
#### 字符集
```
let str = 'The car parked in the garage.'
str.replace(/[Tt]he/g, function(){
    console.log(arguments[0])
})
// The the
例如正则表达式 [Tt]he，表示: 大写 T 或小写 t
```
例如正则表达式 [Tt]he，表示: 大写 T 或小写 t
```
let str = 'A garage is a good place to park a car. carjs'
str.replace(/ar[.]/g, function(){
    console.log(arguments[0])
})
// ar.
```
字符集中的英文句号表示它字面的含义。正则表达式ar[.]，表示小写字母 a，后面跟着一个字母 r，再后面跟着一个英文句号 . 字符。


https://github.com/cdoco/learn-regex-zh#learn-regex


