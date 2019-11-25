const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const path = require('path');

const analyze = entry => {
    const content = fs.readFileSync(entry, 'utf-8');
    const ast = parser.parse(content, {   // 入口文件解析成ast语法树
        sourceType: 'module'
    });
    // console.log(ast);
    // Node {
    //     type: 'File',
    //         start: 0,
    //         end: 60,
    //         loc: SourceLocation {
    //         start: Position { line: 1, column: 0 },
    //         end: Position { line: 3, column: 19 }
    //     },
    //     errors: [],
    //         program: Node {
    //         type: 'Program',
    //             start: 0,
    //             end: 60,
    //             loc: SourceLocation { start: [Position], end: [Position] },
    //         sourceType: 'module',
    //             interpreter: null,
    //             body: [ [Node], [Node], [Node] ],
    //             directives: []
    //     },
    //     comments: []
    // }
    // console.log(ast.program.body);
    let dep = {}; // 依赖
    let dirName = path.dirname(entry)
    traverse(ast, {   // Babel接受得到AST并通过babel-traverse对其进行深度优先遍历
        ImportDeclaration({node}) { // 只解析import语法
            let newFile = './'+ path.join(dirName, node.source.value);
            // console.log(newFile);
            dep[node.source.value] = newFile; // 入口文件引用的依赖遍历之后生成清单
        }
    })
    let {code} = babel.transformFromAst(ast, null, { // 对ast转码
        presets: ['@babel/preset-env']
    });
    // console.log(code)
//   var _a = _interopRequireDefault(require("./a"));
//
// var _b = _interopRequireDefault(require("./b"));
//
// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  return {
       entry,
       dep,
       code
  }
};

// const info = analyze('./src/index.js')
// console.log(info);
//{
//   entry: './src/index.js',
//   dep: { './a': './src/a', './b': './src/b' },
//   code: '"use strict";\n' +
//     '\n' +
//     'var _a = _interopRequireDefault(require("./a"));\n' +
//     '\n' +
//     'var _b = _i '\n' +
// //     'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
// //     '\n' +
// //     "console.log('入口文件');"nteropRequireDefault(require("./b"));\n' +
//
// }


function depend (entry) {
    const ana = analyze(entry);
    let depAry = [ana];
    for(let i =0; i< depAry.length; i++) {
        const item = depAry[i];
        const {dep} = item;
            for(let j in dep) {
                depAry.push(analyze(dep[j]));
            }
    }
    // console.log(depAry);
    let newMenu = {};
    depAry.forEach(item => {
        newMenu[item.entry] = {
           dep: item.dep,
           code: item.code
        }
    });
    // console.log(newMenu);
    return newMenu
}
// depend('./src/index.js');
const generateCode = (entry) => {
   let data = JSON.stringify(depend(entry));

   //1. require执行，先自行自执行函数,  入参`localRequire`的`relativePath`实际上是代码data里code这个字段的代码的其中require函数中的入参
    // 例："code": "\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));
   return `(function(data){
   
     function require(module) {
       function localRequire(relativePath) {
         return require(data[module].dep[relativePath])
       }
       var exports = {}
       
       (function(require, exports, code){
          eval(code)
       })(localRequire, exports, data[module].code);
       return exports;
     }
     require(${entry}) 
   })(${data})`;
};
let code = generateCode('./src/index.js');
console.log(code);

// webpack打包是通过，
// 1. @babel/parser把js代码解析成ast语法树
// 2. @babel/traverse接收ast对入口文件js代码进行深度遍历
// 3. @@babel/core中的 transformFromAst 把ast转成js代码
// 4. 生成入口文件依赖清单，key，value 数据结构，key为文件路径，value中两个字段, dep为依赖清单，code是js代码
// 5. 由于AST把import转成require，创建require函数，执行他的入口文件
// 6. 通过eval执行js代码。如果有require代码，找到对应依赖key`data[module].code`，执行依赖中js代码

// --------------------------------------
// (function(data) {
//
//     function require(module) {
//         function localRequire(relativePath) {
//             return require(data[module].dep[relativePath])
//         }
//         var exports = {}
//
//         (function(require, exports, code) {
//             eval(code)
//         })(localRequire, exports, data[module].code);
//         return exports;
//     }
//     require(. / src / index.js)
// })({
//     "./src/index.js": {
//         "dep": {
//             "./a.js": "./src/a.js",
//             "./b.js": "./src/b.js"
//         },
//         "code": "\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_a[\"default\"] + _b[\"default\"]);"
//     },
//     "./src/a.js": {
//         "dep": {},
//         "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar a = 1;\nvar _default = a;\nexports[\"default\"] = _default;"
//     },
//     "./src/b.js": {
//         "dep": {},
//         "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar b = 2;\nvar _default = b;\nexports[\"default\"] = _default;"
//     }
// })


// 导出规范
// import => exports default
// require => module.exports