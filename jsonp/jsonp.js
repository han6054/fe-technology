const http = require('http');
const url = require('url')
const data = {'data': 'hello'};
const queryString = require('querystring')

http.createServer((req, res) => {
    let params = url.parse(req.url);
    let callback = queryString.parse(params.query).callback
    if(params.query && callback) {
      let str = callback + `(${JSON.stringify(data)})`
        console.log(str);
        res.end(str)
    } else {
        console.log(queryString.parse(params.query).callback)
        res.end(JSON.stringify(data))
    }

}).listen(5000,() => {
    console.log('启动端口号5000')
})  