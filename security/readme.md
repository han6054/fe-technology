xss 跨站脚本攻击

反射型： a站注入脚本向b服务器发送用户信息, 获取到从而伪装用户登录.
存储型：

一 对于xss的防范
1. 模版(ejs)中对url转译， 防止生成脚本
2. 现代浏览器提供了api，koa为例，设置`ctx.set('X-XSS-Protection, 0)`
3. CSP规则 
4. 对url转译,替换`<`等字符
5. httpOnly 不能盗取cookie


二 CSRF 跨站请求伪造，利用用户的登陆状态，已用户的名义完成非法操作

CSRF 防范：

1.Referer Check (https没有referer信息)
```
 app.use(async (ctx, next) => {
     await next()
    const referer = ctx.request.header.referer
    console.log('referer', referer) 
 })
```
2. 验证码

三 iframe 隐藏，诱导用户点击




