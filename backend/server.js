class SessionStore {
  constructor() {
    this.sessions = new Map();
  }

  findSession(id) {
    return this.sessions.get(id);
  }

  saveSession(id, session) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}

const sessionStore = new SessionStore();

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

let userSpots = [1, 2, 3, 4];
let users = [];
const scores = new Map();


let gameInProgress = false;

// will have to wipe sessionstore after each game

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;

      if (gameInProgress) {
        socket.userID = session.userID;
      } else {
        let spot = userSpots.pop();
        users.push(spot);
        socket.userID = spot;  
      }
      return next();
    }
  }
  socket.sessionID = Math.floor(Math.random()*10000);
  let spot = userSpots.pop();
  users.push(spot);
  socket.userID = spot;
  next();
})

io.on('connection', (socket) => {
  socket.emit("session", {
		sessionID: socket.sessionID,
		userID: socket.userID,
	});
  console.log('session id:', socket.sessionID, 'logging in as:', socket.userID)
  console.log('users in room:', users, "\n");
  scores.set(socket.userID, 0);

  let interval = null;
  socket.on('start', () => {
    if (interval) {
      console.log('game already started');
    } else {
      interval = setInterval(() => {
        sendScores(socket);
      }, 500);  
      console.log('game started');
      socket.broadcast.emit('start', users);
      socket.emit('start', users);
    }
  })
  
  socket.on('end', () => {
    if (interval) {
      clearInterval(interval);
      socket.broadcast.emit('end');
      socket.emit('end');
    } 
    interval = null;
  })

  socket.on('progress', (percent) => {
    scores.set(socket.userID, percent);
  });

  socket.on("disconnect",  () => {
    // const matchingSockets = await io.in(socket.userID).allSockets();
    // const isDisconnected = matchingSockets.size === 0;
    // if (isDisconnected) {
      // scores.delete(socket.id);

      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        connected: false,
      });

      socket.broadcast.emit('user disconnected', socket.sessionID)

      users.forEach((e, index) => {
        if (e == socket.userID) {
          users.splice(index, 1);
          userSpots.push(e)
        }
      })
      console.log("\n", socket.sessionID, 'has disconnected');
  // }
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


