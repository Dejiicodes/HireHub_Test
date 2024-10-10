const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('New connection');

  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('newMessage', (data) => {
    io.to(data.receiverId).emit('messageReceived', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
