const http = require('http')
const fs = require('fs').promises

const users = {}

http.createServer(async (req, res)=> {
    try {
        console.log(req.method, req.url);
        if (req.method === 'GET'){
            if (req.url === '/'){
                const data = await fs.readFile('./restFront.html')
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            }
            else if (req.url === '/about'){
                const data = await fs.readFile('./about.html')
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data)
            }
            else if (req.url === '/users'){
                res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users))
            }
        } // GET
        else if (req.method === 'POST'){
            if(req.url === '/user'){
                let body = '';
                req.on('data', (data)=>{
                    body += data
                });
                return req.on('end' , ()=>{
                    const {name} = JSON.parse(body)
                    const id = Date.now();
                    users[id] = name;
                    return res.end('등록성공')
                })
            }
        } // POST
        else if (req.method === 'PUT'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2]
                let body = ''
                req.on('data' , (chunk)=>{
                    body += chunk
                })
                req.on('end', ()=>{
                    users[key] = JSON.parse(body).name
                    return res.end(JSON.stringify(users))
                })
            }
        } // PUT
        else if (req.method === 'DELETE'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2]
                req.on('end', ()=>{
                    delete users[key]
                    return res.end(JSON.stringify(users))
                })
            }
        } // DELETE
    } catch (error) {
        console.log(error);
        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(error.message);
    }
    
}).listen(8081, ()=>{
    console.log('8081번 포트에서 대기 중')
})