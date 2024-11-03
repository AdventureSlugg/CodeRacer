

const server = require('node:http').createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
const io = require('socket.io')(server, {
  // allowRequest: (req, callback) => {
  //   const noOriginHeader = req.headers.origin === undefined;
  //   callback(null, noOriginHeader);
  // }
  cors: {
    origin: "*",
    // origin: "http://127.0.0.1:8080",
    methods: ["GET", "POST"],
  }
});

const hostname = '127.0.0.1';
const port = 3000;

let uid = 0;

const scores = new Map();

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.emit('assignUid', uid);
  uid++;
  scores.set(uid, 0);

  socket.on('start', () => {

  })

  socket.on('wordcount', (uid, count) => {
    console.log(uid, count);
    scores.set(uid, count);
  })

  // // broadcast every 200 ms. maybe should be out of this connect
  // socket.broadcast('scores', scores);
});


io.on('disconnect', (socket) => {
  socket.emit('damn, this guy left')
  console.log(socket.id); // undefined
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


