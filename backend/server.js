

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

const scores = new Map();

io.on('connection', (socket) => {
  console.log(socket.id);
  scores.set(socket.id, 0);

  socket.on('start', () => {
    // socket.removeAllListeners("scores"); // doesn't work, lol
  })

  socket.on('wordcount', (count) => {
    console.log(socket.id, count);
    scores.set(socket.id, count);
    let serializedScores = '';
    scores.forEach((value, key) => {
      serializedScores += '[' + key + ',' + value + ']';
    });
    socket.broadcast.emit('scores', serializedScores);
    socket.emit('scores', serializedScores);

  })

  // // broadcast every 200 ms. maybe should be out of this connect
  // socket.broadcast.emit('scores', scores);
    io.on('disconnect', (socket) => {
      console.log(socket.id, 'has disconnected');
    });
  });


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


