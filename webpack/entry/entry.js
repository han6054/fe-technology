const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const path = require('path');

const analyze = entry => {
    const content = fs.readFileSync(entry, 'utf-8');
    const ast = parser.parse(content, {   // 入口文件解析成ast语法树
        sourceType: 'module'
    })
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
    })
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
}

const info = analyze('./src/index.js')
// console.log(info);
//{
//   entry: './src/index.js',
//   dep: { './a': './src/a', './b': './src/b' },
//   code: '"use strict";\n' +
//     '\n' +
//     'var _a = _interopRequireDefault(require("./a"));\n' +
//     '\n' +
//     'var _b = _interopRequireDefault(require("./b"));\n' +
//     '\n' +
//     'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
//     '\n' +
//     "console.log('入口文件');"
// }