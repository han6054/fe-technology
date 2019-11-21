const cluster = require('cluster');
let os = require('os');
let numCPUs = os.cpus().length;
let process = require('process');

console.log('numCPUs' +  numCPUs); 

let workers = {};  // 保存子进程
if(cluster.isMaster) { // 区分cluster这个进程是不是主进程
    console.log(`主进程 ${process.pid} 正在运行`);
    // 主进程
    cluster.on('death', function(worker) {
        worker = cluster.fork();
        worker[worker.pid] = worker;
    })
    for(let i=0; i< numCPUs.length;i++) {
        const worker = cluster.fork();
        workers[worker.pid] = worker;
    }
} else {
    // 工作分支
    const app = require('./app.js');
    app.use(async (ctx, next) => {
        console.log('worker' + cluster.worker.id + ',PID' + process.id);
        await next();
    })
    app.listen(3000);
} 
// 当主进程终止时发出这个信号
process.on('SIGTEAM', function() {
    for(var pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
})

require('./test');