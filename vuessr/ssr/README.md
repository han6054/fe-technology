# vue ssr 方案
### prerender-spa-plugin (静态页面预渲染)
```
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
 
module.exports = {
  plugins: [
    ...
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, 'dist'),
      // Required - Routes to render.
      routes: [ '/', '/about' ], // 需要渲染的页面路由
    })
  ]
}
```

