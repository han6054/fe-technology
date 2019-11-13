let app = new require('koa');

app.use(async (ctx, next)=> {
    Math.random() > 0.9 ? aaa(): '';
    next()
    ctx.body = 'run'
})
if(!module.parent) {
    app.listen(() => {
        console.log('server start at 3000')
      }, 3000)
} else {
    module.exports = app;
}