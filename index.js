const app = require('express')()
require('dotenv').config();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 4000

let users = []

io.on('connection', socket => {
  socket.on('join room', (userID) => {
    const user = {
      userID, 
      id: socket.id,
    };
    users.push(user);
    io.emit("new user", users)
  });

  socket.on('join room', (roomID, cb) => {
    socket.join(roomID);
    cb(messages[roomID]);
    socket.emit('joined', messages[roomID]);
  })

  socket.on('send message', ({content, to, sender}) => {
    const payload = {
      content,
      sender,
    };
    socket.to(to).emit('new message', payload)
  })

  socket.on('disconnect', () => {
      users = users.filter(u => u.id !== socket.id);
      io.emit('new user', users)
  })
})

//server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));
//PORT, () => console.log(`server is running on port ${PORT}`)

http.listen(PORT, function() {
  console.log(`listening on port ${PORT}`)
})
