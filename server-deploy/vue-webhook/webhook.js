let http = require('http');
let crypto = require('crypto');
let {spawn} = require('child_process');
const nodemailer = require('nodemailer');
let SECRET = '123456';
function sign(body) {
    return `sha1=` + crypto.createHmac('sha1', SECRET).update(body).digest('hex');
}
let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '83687401@qq.com',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'zpdf0teyhjfbpcaff',
    }
});
function sendMail(message){
    let mailOptions = {
        from: '"12321321" <12321321@qq.com>', // 发送地址
        to: '2321321321@qq.com', // 接收者
        subject: '部署通知', // 主题
        html:message // 内容主体
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
let server = http.createServer((req, res) => {
    if(req.method === 'POST' && req.url === '/webhook') {
        let buffers = [];
        req.on('data', function (buffer) {
            buffers.push(buffer)
        });
        req.on('end', function (buffer) {
           let body = Buffer.concat(buffers);
           let event = req.headers['x-github-event']; // event=push
           let signature = req.headers['x-hub-signature'];
           if(signature !== sign(body)) {
               return res.end(`Not Allowed`)
           }
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify({ok: true}));
            if(event === 'push') { // 部署
                let payload = JSON.parse(body);
                let child = spawn('sh', [`./${payload.repository.name}.sh`]);
                let buffers_ = [];
                child.stdout.on('data', function (buffer) {
                    buffers_.push(buffer);
                });
                child.stdout.on('end', function (buffer) {
                   let logs = buffers_.concat(buffer).toString;
                    sendMail(`
                        <h1>部署日期: ${new Date()}</h1>
                        <h2>部署人: ${payload.pusher.name}</h2>
                        <h2>部署邮箱: ${payload.pusher.email}</h2>
                        <h2>提交信息: ${payload.head_commit&&payload.head_commit['message']}</h2>
                        <h2>布署日志: ${logs.replace("\r\n",'<br/>')}</h2>
                     `);
                });
            }
        });
    } else {
        res.end('Not Found')
    }
});