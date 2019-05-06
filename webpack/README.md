# webpack 配置哪些优化？
#### 1.忽略依赖库的解析 
```
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/, //不去解析jquery | lodash 中的依赖库
  }
};
```
如果js中引入jquery, webpack会去解析jq中是否有依赖库，配置`noParse`后打包时候忽略解析配置的库，提高打包效率。
#### 2.解析时指定和排除查找目录
```
module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/, // 解析不包含的目录,两者写其一即可
				include:path.resolve('src'), // 即系包含的目录,两者写其一即可
				use:{
					loader:'babel-loader',
					options:{
						presets:[
							'@babel/preset-env',
							'@babel/preset-react'
...
```
`exclude`排除目录不进行解析。
#### 3.指定目录不打包
`IgnorePlugin` 是 `webpack`内置插件，可以忽略第三方包不进行打包

举例： 
> moment包

比如引入第三方依赖库`moment`, 该库主要是对时间进行格式化，并且支持多个国家语言。

> moment打包问题

```
import moment from 'moment'
//设置语言
moment.locale('zh-cn');
let r = moment().endOf('day').fromNow();
console.log(r);
```
虽然只设置了一种语言，但是在打包的时候，`moment`会将所有语言引入。这样就导致包很大，打包速度又慢 。
我们需要把其他不需要的与语言包剔除
而`moment`的包含`./locale/`该字段路径的文件目录就是各国语言的目录，比如`./locale/zh-cn`就是中文语言
> IgnorePlugin使用

```
let Webpack = require('webpack');
plugins:[
	new Webpack.IgnorePlugin(/\.\/locale/,/moment/)
]
```
如果在`moment`中引入了`./locale`目录的内容，会忽略掉
传递给`IgnorePlugin`的第一个参数`resourceRegExp`参数并不针对导入或必需的已解析文件名或绝对模块名进行测试，而是针对在导入发生的源代码中传递给require或import的字符串进行测试。例如，如果您试图排除`node_modules/moment/locale/*.js`，这是行不通的
使用第二个`contextRegExp`参数选择导入发生的特定目录。下面的代码将导致这些locale文件被忽略
> 问题存在与解决

如果上述方法忽略了`./locale/`的目录，那么所有语音都会被忽略，如果需要引入中文，需要手动配置
```
import moment from 'moment'

//手动引入所需要的语言包
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

let r = moment().endOf('day').fromNow();
console.log(r);
```
#### 4.DllPlugin动态链接库
场景举例：
当打包一个react项目的时候，项目中引入`reacr`和`react-dom`两个包，而这两个库很大且基本不会变，每次项目打包都会对打包，浪费时间和性能。

处理方法：
将react和react-dom单独打包好，然后动态链接引入即可。如果第二次打包，那么发现react和react-dom已经被打包好了，那么直接找到打包好的文件，不需要再次打包。

实现

src 下 index.js 文件引入 `react`和`react-dom`
```
import React from 'react'
import {render} from 'react-dom'
render('<h1>jsx</h1>')
```

 src 下创建 `test.js`文件
```
module.exports = 'joker';
```
创建` webpack.config.react.js`对`react`包单独打包
```
let path = require('path');
 let webpack = require('webpack');
 module.exports = {
  mode:'development',
  entry:{
   react:['react','react-dom']
  },
  output:{
   filename:'_dll_[name].js',//产生的文件名_dll_react.js 
   path:path.resolve(__dirname,'dist'),
   library:'_dll_[name]',//_dll_react // 
   // libraryTarget:'var',
  },
  plugins:[
   new webpack.DllPlugin({
    name:'_dll_[name]',//这个name要与output中的library同名
    path:path.resolve(__dirname,'dist','manifest.json')
   })
  ]
 }
```
打包出一个`_dll_react.js`和一个是清单`manifest.json`然后在index.html去引用这个打包后的文件
```
<!DOCTYPE html>
 <html>
 <head>
  <title></title>
 </head>
 <body>
  <div id="root"></div>
  <script type="text/javascript" src="/_dll_react.js"></script>
 </body>
 </html>
```
但是现在，我们引用`react`或`react-dom`的时候，我们需要判断是否在清单里，这时候，我们就需要在我们正式的webpack.config.js里进行配置, 需要使用到webpack内置插件` webpack.DllReferencePlugin`
```
let path = require('path');
 let webpack = require('webpack');
 let HtmlWebpackPlugin = require('html-webpack-plugin');
 module.exports = {
  devServer:{
   port:3000,
   open:true,
   contentBase:'./dist'
  },
  mode:'development',
  entry:'./src/index.js',
  output:{
   filename:'bundle.js',
   path:path.resolve(__dirname,'./dist')
  },
  module:{
   rules:[
    {
     test:/\.js$/,
     use:{
      loader:'babel-loader',
      options:{
       presets:[
        '@babel/preset-env',
        '@babel/preset-react'
       ]
      }
     }
    }
   ]
  },
  plugins:[
   new webpack.DllReferencePlugin({
    manifest:path.resolve(__dirname,'dist','manifest.json')
   }),
   new HtmlWebpackPlugin({
    template:'./src/index.html',
    filename:'index.html'
   })
  ]
 }
```
#### 5.抽离公共代码

场景举例：
当多页应用重复使用部分公用代码时，每次单页都会重复加载这些公用代码会造成一下问题：
相同资源，重复加载，增加用户流量和服务器成本

处理方法：
那么，如果将这些公共代码抽取出来，并让浏览器缓存起来，用户在请求资源的时候，可以直接读取缓存中的这些代码，这样就能解决以上问题。

如何抽取公共代码：
现在存在如下文件结构
```
   other.js
        ↑
  -------------
  ↑           ↑
a.js        b.js
  ↓           ↓
  -------------
        ↓
     index.js
```
如上图，`index.js` 和` other.js `都依赖了` a.js` 和 `b.js `，那么只需要将 `a.js`和`b.js`抽离出来并打包成`common.js`，然后让`index.js`和`other.js`直接引用`common.js`即可.

1.webpack.config.js配置 使用optimization的splitChunks属性
```
module.exports = {
	optimization:{
		splitChunks:{//分割代码块，如果只有一个入口，就不需要分割了，只有多页，才需要把公共的抽离出来
			cacheGroups:{//缓存组
				common:{//公共的模块
					chunks:'initial',//刚开始就要抽离
					minSize:0,//大小大于0字节的时候需要抽离出来
					minChunks:2,//重复2次使用的时候需要抽离出来
				}
			}
		}
	},
	...
}
```
npm run build得到的文件为：
```
dist
  |
  ----- common~index~other.js
  |
  ----- index.js
  |
  ----- other.js
  |
  ----- index.html
```
这样，`index.js`和`other.js`都引用了抽离出来的公共代码`common~index~other.js`

如何抽离第三方库
假设在上面的基础上，index.js 和 other.js都引用了jquery库，那么这样来配置抽离第三方库
vendor属性的配置，是用于抽取第三方库的(详看代码和注释)
```
module.exports = {
	optimization:{
		splitChunks:{ //分割代码块，如果只有一个入口，就不需要分割了，只有多页，才需要把公共的抽离出来
			cacheGroups:{ //缓存组
				common:{ //公共的模块
					chunks:'initial',
					minSize:0,
					minChunks:2,
				},
				vendor:{	test:/node_modules/,//把这个目录下符合下面几个条件的库抽离出来
					chunks:'initial',//刚开始就要抽离
					minSize:0,//大小大于0字节的时候需要抽离出来
					minChunks:2,//重复2次使用的时候需要抽离出来
				}
			}
		}
	},
	...
}
```
但是这样会存在问题——代码从上到下执行，会先执行common，然后执行vendor，而在执行common的时候，就把jquery抽离出来打包到跟a.js和b.js里面去了，后面的vendor就没有什么效果了。这并不是个好方案，我们最好是能够将库单独抽离出来，于是，可以这么操作：
在vendor添加权重属性：priority，将权重提高，使得先去抽离第三方库，再去抽离a.js和b.js
```
module.exports = {
	optimization:{
		splitChunks:{//分割代码块，如果只有一个入口，就不需要分割了，只有多页，才需要把公共的抽离出来
			cacheGroups:{//缓存组
				common:{//公共的模块
					chunks:'initial',
					minSize:0,
					minChunks:2,
				},
				vendor:{
					priority:1,//添加权重
					test:/node_modules/,//把这个目录下符合下面几个条件的库抽离出来
					chunks:'initial',//刚开始就要抽离
					minSize:0,//大小大于0字节的时候需要抽离出来
					minChunks:2,//重复2次使用的时候需要抽离出来
				}
			}
		}
	},
	...
}
```
打包结果为
```
common~index~other.js  579 bytes  
           index.html  388 bytes
             index.js   7.38 KiB 
             other.js   7.38 KiB 
vendor~index~other.js    306 KiB 
```
