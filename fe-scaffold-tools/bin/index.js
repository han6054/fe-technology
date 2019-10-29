#!/usr/bin/env node
 console.log('hs-cli test')

const program = require('commander');
// 下载文件
const download = require('download-git-repo');
// 通用的命令行用户界面集合，用于和用户进行交互
const inquirer = require('inquirer');
// 文件操作
const fs = require('fs');
// handlebars语法处理
const handlebars = require('handlebars');
// loading效果
const ora = require('ora');
// 图标
const symbols = require('log-symbols');
// 颜色插件
const chalk = require('chalk');

program
    .version('1.0.0', '-v, --version')
    .command('init <name>')
    .action((name) => {
        inquirer.prompt([
            {type: 'input', name: 'author', message: '请输入作者名称',default: "joker" },
            {type: 'input', name: 'description', message: '请输入项目描述', default: 'a vue`s project'}
        ]).then((answers) => {
            const spinner = ora('正在下载模板...');
            spinner.start();
            const meta = {
                name,
                description: answers.description,
                author: answers.author
            }
            console.log(meta)
            // 下载模版 第一个参数：github:owner/repoName 第二个参数：模板放置的文件夹
            download('github:han6054/hs-template-vue001', name, function (err) {
                if(err){
                    spinner.fail();
                    console.log(symbols.error, chalk.red(err));
                }else{
                    spinner.succeed();
                    const fileName = `${name}/package.json`;
                    const content = fs.readFileSync(fileName).toString();
                    const result = handlebars.compile(content)(meta);
                    fs.writeFileSync(fileName, result);
                    console.log(symbols.success, chalk.green('项目初始化完成'));
                }
            })
        });
    })
    .on('--help', function(){
     console.log('  Examples:');
     console.log('');
     console.log('    this is an example');
     console.log('');
    });
program.parse(process.argv)
