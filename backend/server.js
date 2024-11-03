

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

let users = [];
const scores = new Map();

let interval = null;

io.on('connection', (socket) => {
  console.log(socket.id);
  scores.set(socket.id, 0);
  users.push(socket.id)
  socket.emit('users', users);
  socket.broadcast.emit('connected', socket.id);

  socket.on('start', () => {
    if (interval) {
      console.log('game already started');
    } else {
      interval = setInterval(() => {
        sendScores(socket);
      }, 500);  
      console.log('game started');
      socket.broadcast.emit('start');
      socket.emit('start');
    }
  })

  socket.on('end', () => {
    if (interval) {
      clearInterval(interval);
      socket.broadcast.emit('end');
      socket.emit('end');
      interval = null;
    }
    else { interval = null; }
  })

  socket.on('progress', (percent) => {
    scores.set(socket.id, percent);
  });

  socket.on('disconnect', () => {
    scores.delete(socket.id);
    console.log(socket.id, 'has disconnected');
    socket.broadcast.emit('disconnected', socket.id)
    users.forEach((e, index) => {
      if (e == socket.id) {
        users.splice(index, 1);
      }
    })
  });

})

function sendScores(socket) {
  let arrayScores = [];
  scores.forEach((value, key) => {
    arrayScores.push([key, value])
  });

  socket.broadcast.emit('scores', arrayScores);
  socket.emit('scores', arrayScores);
}

  // // broadcast every 200 ms. maybe should be out of this connect
  // socket.broadcast.emit('scores', scores);


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


