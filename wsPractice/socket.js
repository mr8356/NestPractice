const socketIO = require('socket.io') //use socket.io

module.exports = (server) =>{
  // socketIO를 서버와 연결, 클라이언트와 path가 일치해야한다.
  const io = socketIO(server, {path : '/socket.io'})

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for']; //ip 확인하기
    console.log('new client!',ip,socket.id)

    socket.on('disconnect', () => {
      console.log('disconnect');
      clearInterval(socket.interval)
    })
    socket.on('client', (data) =>{
      console.log(data)
    })

    socket.interval = setInterval(()=>{
      socket.emit('server', '3초마다 서버에서 보냅니다.')
    }, 3000)
  })

}