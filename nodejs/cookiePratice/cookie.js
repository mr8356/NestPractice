const http = require('http')

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie':'mycookie=test'});
    res.end('HELLO COOKIE')
}).listen(8081, ()=> {
    console.log('8081 포트에서 실행중')
})