let Koa = require('koa');
let app = new Koa();
app.use(async (ctx, next) => {
    Math.random() > 0.9 ? aaa(): '';
    await next()
    ctx.body = 'run'
})
if(!module.parent) {
    app.listen(3000, () => {
        console.log('start at 3000 port')
    })
} else {
    module.exports = app;
}