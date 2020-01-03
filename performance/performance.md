从输入 URL 到页面加载完成，发生了了什么?
1. 把xxx.com 把url解析成ip地址
2. ip地址建立tcp链接，发送HTTP请求
3. 服务器请求，查库，读文件等，拼好返回HTTP响应
4. 浏览器收到首屏html，进行渲染
5. 解析html为dom
6. 解析css为css-tree
7. dom+css生成render-tree 绘图
8. 加载script的js文件
9. 执行js

所谓性能优化总结为两个大方面：
1. 减少文件加载
2. 减少执行代码

（1）如何少加载文件

合理利用缓存，首屏加载，返回请求头加上强缓存（针对时间）`expires` ,`cache-control`(http1.1 优先级高),  后端告诉浏览器过期时间，设置多长时间不过期，浏览器会把这个文件保存起来，如果时间没有过期，这个请求不发出，直接读取本地的文件，状态码 200 `from cache`

强缓存失效则会使用协商缓存，浏览器带上header请求头询问后台
`if-modified-since: 日期` 在这个时间之后文件有没有修改，如果没改过响应304，`not modified`
浏览器直接用缓存
 优先级更高etag 文件指纹
 
 ---
 
 performance.getEntriesByType('navigation'); // 查看浏览器属性根据这个耗时进行优化
 
 重定向耗时：`redirectEnd - redirectStart`
 
 DNS查找耗时:  `domainLookupEnd -  domainLookupStart`
 
 TCP链接耗时：`connectEnd - connecrStart`
 
 HTTP请求耗时: `responseEnd - responseStart`

解析dom树耗时: `domComplete - domInteractive`

白屏时间: `responseStart - navigationStart`

DOMready时间: `domContentLoadedEventEnd - navigationStart`

onLoad时间: `loadEventEnd - navigationStart` 也即是onload函数执行的时间

---

defer & async ／ preload & prefetch

- defer 和 async 在网络读取的过程中都是异步解析
- defer是有顺序依赖的，async只要脚本加载完后就会执行
- preload 可以对当前页面所需的脚本、样式等资源进行预加载
- prefetch 加载的资源一般不是用于当前页面的，是未来很可能用到的这样一些资源




 