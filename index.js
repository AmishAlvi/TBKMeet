const app = require('express')()
require('dotenv').config();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 4000

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
  socket.emit('chat-message', 'hello world')
})

//server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));
//PORT, () => console.log(`server is running on port ${PORT}`)

http.listen(PORT, function() {
  console.log(`listening on port ${PORT}`)
})
