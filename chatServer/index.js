const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var users = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (data) => {
      let index = users.findIndex(user =>{
        return user.userId === data.userId
      })
        users[index].socket.emit('chat message', data.message);
      });
      socket.on('online', (userId) => {
        users.push({
          socket,
          userId
        })
        console.log(users);
      });
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});