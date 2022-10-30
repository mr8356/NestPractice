const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '')=>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k,v]) =>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async (req, res)=>{
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 login으로 시작
    if (req.url.startsWith('/login')){
        const {query} = url.parse(req.url)
        const {name} = qs.parse(query)
        const expires = new Date()
        // 유효시간 = 현재 + 5분
        expires.setMinutes(expires.getMinutes + 5)
        res.writeHead(302, {
            'Set-Cookie': `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()}`
        });
        res.end();
    }
    else if (cookies.name){
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`)
    }
    else{
        const data = await fs.readFile('./cookieFront.html');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data)
    }
}).listen(8084, ()=>{
    console.log('8084에서 실행중')
})
