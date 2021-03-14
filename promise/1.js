setTimeout(()=> {
    console.log('timeout')
}, 0)
const p = new Promise((resolve) => {
    resolve(100)
    console.log('promise constructor')
}).then(() => {
    console.log('promise then 1 ')
    Promise.resolve().then(() => {
        console.log('nested promise then')
    })
}).then(() => {
    console.log('promise then 2')
})
console.log('normal execution')