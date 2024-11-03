

const server = require('node:http').createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
const io = require('socket.io')(server, {});

const hostname = '127.0.0.1';
const port = 3000;

io.on('connection', (socket) => {
  socket.emit("user connected")
  socket.broadcast('')
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


